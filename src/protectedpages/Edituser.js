import React, { useEffect, useState } from 'react';
import { useAuth } from "../routes/Context";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MessageComponent from "./Message"
export default function Edituser() {
  const { isValidToken, logout } = useAuth();
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    yearsOfExperience: 0,
    specialty1: "",
    specialty2: "",
    specialty3: "",
    availability: false,
    email: "",
    numberOfOrdersCompleted: 0,
    mobileNumber: ""
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isValidToken()) {
      navigate('/admin', { replace: true });
    }
  }, [isValidToken, navigate]);

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}artists`);
      setArtists(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Unauthorized error, call logout function
        logout();
      } else {
        // Client-side error or other errors
        // Optionally, you can set an error state here to display to the user
        setErrorMessage(error.response.data.error);
      }
    }
  };


  const handleEditClick = (artist) => {
    setSelectedArtist(artist);
    setEditData(artist);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const editedData = { ...editData }; // Copy editData object

      // Iterate through editData to append form data and update editedData
      var flag = true;
      Object.entries(editData).forEach(([key, value]) => {
        if (value !== selectedArtist[key]) { // Check if the value has been changed
          if (key === 'image') { // Handle image separately
            formData.append(key, value); // Append image to formData
            editedData[key] = value; // Add image to editedData object
          } else {
            formData.append(key, value); // Append changed values to formData
            editedData[key] = value; // Add changed values to editedData object
          }
          flag = false;
        }
      });
      if (flag) {
        setErrorMessage("No data is changed");
        setTimeout(() => {
          setSelectedArtist(null)
          setErrorMessage("")
        }, 1000);
        return;
      }

      // Send form data to backend for patching
      const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}artists/${selectedArtist._id}`, formData);

      // Handle success message and reset state
      setSuccessMessage("Updated successfully");
      setEditData({
        name: "",
        yearsOfExperience: 0,
        specialty1: "",
        specialty2: "",
        specialty3: "",
        availability: false,
        numberOfOrdersCompleted: 0,
        imageUrl: "",
      });
      setSelectedArtist(null);
      fetchArtists();

      // Clear success message after 2 seconds
      setTimeout(() => {
        window.location.reload(); 
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        logout(); // Logout on 401 Unauthorized error
        return;
      }
      // Handle error message
      setErrorMessage(error.response.data.error);
      setTimeout(() => {
        setErrorMessage("")
      }, 2000);
    }
  };


  const handledelete = () => {
    console.log("delete");
  }
  const handleviewportfolio = (id) => {
    navigate(`/artist/${id}`, { replace: false })
    console.log("view portfolio")
  }

  return (
    <div className="container mx-auto p-4 md:p-0">
      <h1 className="text-3xl font-bold mb-4">Artists</h1>
      {successMessage && <MessageComponent type="success" message={successMessage} />}
      {errorMessage && <MessageComponent type="error" message={errorMessage} />}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {artists.map(artist => (
          <div key={artist._id} className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-500">
            <img src={`${process.env.REACT_APP_IMAGE_URL}${artist.imageUrl}`} alt={artist.name} className="w-full h-48 object-cover mb-2" />
            <p className="text-lg font-semibold">{artist.name}</p>
            <div className={`p-2 w-[40%] font-bold rounded-md z-50 mb-[5px] ${artist.availability ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
              {artist.availability ? "Available" : "Not Available"}
            </div>
            <div className="flex justify-between mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={handledelete}>Delete</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => handleEditClick(artist)}>Edit</button>
              <button className="bg-purple-500 text-white px-4 py-2 rounded-md" onClick={() => handleviewportfolio(artist._id)}>View portfolio</button>
            </div>
          </div>
        ))}
      </div>

      {selectedArtist && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center overflow-auto">
          
          <div className="bg-white p-6 rounded-lg min-w-screen-lg mx-auto relative z-10 overflow-auto pt-52">
            <div className="mb-4 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                <img src={`${process.env.REACT_APP_IMAGE_URL}${selectedArtist.imageUrl}`} alt={selectedArtist.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{selectedArtist.name}</h3>
            </div>
            <form onSubmit={handleEditSubmit} className="grid  md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="name" className="block mb-1">Name:</label>
                <input type="text" id="name" name="name" value={editData.name} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Name" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-1">Email:</label>
                <input type="email" id="email" name="email" value={editData.email} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Email" />
              </div>
              <div className="mb-4">
                <label htmlFor="mobileNumber" className="block mb-1">Mobile Number:</label>
                <input type="text" id="mobileNumber" name="mobileNumber" value={editData.mobileNumber} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Mobile Number" />
              </div>
              <div className="mb-4">
                <label htmlFor="yearsOfExperience" className="block mb-1">Years of Experience:</label>
                <input type="number" id="yearsOfExperience" name="yearsOfExperience" value={editData.yearsOfExperience} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Years of Experience" />
              </div>
              <div className="mb-4">
                <label htmlFor="specialty1" className="block mb-1">Specialty 1:</label>
                <input type="text" id="specialty1" name="specialty1" value={editData.specialty1} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Specialty 1" />
              </div>
              <div className="mb-4">
                <label htmlFor="specialty2" className="block mb-1">Specialty 2:</label>
                <input type="text" id="specialty2" name="specialty2" value={editData.specialty2} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Specialty 2" />
              </div>
              <div className="mb-4">
                <label htmlFor="specialty3" className="block mb-1">Specialty 3:</label>
                <input type="text" id="specialty3" name="specialty3" value={editData.specialty3} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Specialty 3" />
              </div>
              <div className="mb-4">
                <label htmlFor="availability" className="block mb-1">Availability:</label>
                <input type="checkbox" id="availability" name="availability" checked={editData.availability} onChange={() => setEditData({ ...editData, availability: !editData.availability })} />
              </div>
              <div className="mb-4">
                <label htmlFor="numberOfOrdersCompleted" className="block mb-1">Number of Orders Completed:</label>
                <input type="number" id="numberOfOrdersCompleted" name="numberOfOrdersCompleted" value={editData.numberOfOrdersCompleted} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Number of Orders Completed" />
              </div>
              <div className="mb-4 col-span-2">
                <label htmlFor="image" className="block mb-1">Profile Image:</label>
                <input type="file" id="image" name="image" onChange={(e) => setEditData({ ...editData, image: e.target.files[0] })} accept="image/*" className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md col-span-2">Save Changes</button>
              <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-md col-span-2" onClick={() => setSelectedArtist(null)}>Close</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
