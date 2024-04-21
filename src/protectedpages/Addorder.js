import React, { useEffect, useState } from 'react';
import { useAuth } from "../routes/Context";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MessageComponent from "./Message";

export default function AddOrder() {
  const { isValidToken, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(false); // Default value is false
  const [specialty, setSpecialty] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null); // For file upload
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!isValidToken()) {
      navigate('/admin', { replace: true });
    }
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("address", address);
      formData.append("location", city);
      formData.append("paymentStatus", paymentStatus);
      formData.append("specialty", specialty);
      formData.append("mobileNumber", mobileNumber);
      formData.append("email", email);
      formData.append("image", image); // Assuming image is a file
      if (!/^\d{10}$/.test(mobileNumber)) {
        setErrorMessage('Mobile number must contain 10 digits.');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
        return;
      }
      if(specialty===""){
        setErrorMessage('Select specialty');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
        return;
      }
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}artists/order/add`, formData);
      setSuccessMessage("Order added successfully!");

      setTimeout(() => {
        setSuccessMessage('');
        setName('');
        setCity('');
        setPaymentStatus(false);
        setSpecialty('');
        setMobileNumber('');
        setEmail('');
        setImage(null);
        setAddress('');
    }, 2000)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Unauthorized. Please login again.');
        logout();
      } else {
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage('');
      }, 2000)
      }
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-lg">
      {successMessage && <MessageComponent type="success" message={successMessage} />}
      {errorMessage && <MessageComponent type="error" message={errorMessage} />}
      <form onSubmit={handleFormSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">City:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentStatus">Payment Status:</label>
          <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="paymentStatus" value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)} required>
            <option value={true}>Paid</option>
            <option value={false}>Not Paid</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="specialty">Category:</label>
          <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)} required>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">Mobile Number:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="mobileNumber" type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image" type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
