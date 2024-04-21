import React, { useEffect, useState } from 'react'
import { useAuth } from "../routes/Context";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MessageComponent from './Message';
export default function Createuser() {
  const { isValidToken, logout, getToken } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isValidToken()) {
      navigate('/admin', { replace: true });
    }
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    yearsOfExperience: '',
    specialty1: '',
    specialty2: '',
    specialty3: '',
    email: '',
    mobileNumber: '',
    image: null
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate form fields
      if (!validateForm()) {
        return; // Exit early if form validation fails
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${getToken()}`
        }
      };
      const formDataWithImage = new FormData();
      for (const key in formData) {
        formDataWithImage.append(key, formData[key]);
      }
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}artists`, formDataWithImage, config);
      if (res.status === 201) {
        setSuccessMessage('Artist added successfully!');
        setTimeout(() => {
          setSuccessMessage('');
          setFormData(prevFormData => ({
            ...prevFormData, // Spread the previous state to avoid mutating it
            // Update the state with the new values
            name: '',
            yearsOfExperience: '',
            specialty1: '',
            specialty2: '',
            specialty3: '',
            email: '',
            mobileNumber: '',
            image: null
          }));
        }, 2000);

      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.error)
        // Check if error.response.data exists before accessing its properties
        setErrorMessage(error.response.data.error || 'An unexpected error occurred. Please try again later.');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again later.');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
      }
      // Check if error.response.status === 401 instead of error.response === 401
      if (error.response && error.response.status === 401) {
        setErrorMessage('Your session expired');
        setTimeout(() => {
          setErrorMessage('');
          logout();
        }, 2000);

      }
    }
  };

  const validateForm = () => {
    // Validate form fields
    if (!formData.name || !formData.yearsOfExperience || !formData.specialty1 || !formData.specialty2 || !formData.specialty3 || !formData.email || !formData.mobileNumber || !formData.image) {

      setErrorMessage('All fields are required.');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      return false;
    }
    if (isNaN(parseInt(formData.yearsOfExperience))) {
      setErrorMessage('Years of experience must be a number.');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      return false;
    }
    if (!validateEmail(formData.email)) {
      setErrorMessage('Invalid email format.');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      return false;
    }
    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      setErrorMessage('Mobile number must contain 10 digits.');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      return false;
    }
    // Additional validation for image can be added here if needed
    return true; // Form validation passed
  };

  const validateEmail = (email) => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  return (
    <div className="relative">
      {successMessage && <MessageComponent type="success" message={successMessage} />}
      {errorMessage && <MessageComponent type="error" message={errorMessage} />}
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Add New Artist</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="yearsOfExperience" className="block text-gray-700 font-bold mb-2">Years of Experience:</label>
            <input type="text" id="yearsOfExperience" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="specialty1" className="block text-gray-700 font-bold mb-2">Specialty 1:</label>
            <input type="text" id="specialty1" name="specialty1" value={formData.specialty1} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="specialty2" className="block text-gray-700 font-bold mb-2">Specialty 2:</label>
            <input type="text" id="specialty2" name="specialty2" value={formData.specialty2} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="specialty3" className="block text-gray-700 font-bold mb-2">Specialty 3:</label>
            <input type="text" id="specialty3" name="specialty3" value={formData.specialty3} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="mobileNumber" className="block text-gray-700 font-bold mb-2">Mobile Number:</label>
            <input type="text" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Profile Image:</label>
            <input type="file" id="image" name="image" onChange={handleImageChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

