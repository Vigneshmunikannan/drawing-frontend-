import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MessageComponent from './Message';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../routes/Context";
const Orders = () => {
  const { isValidToken, logout } = useAuth();
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!isValidToken()) {
      navigate('/admin', { replace: true });
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}artists`);
      setArtists(response.data);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}artists/order/getall`);
      setOrders(res.data);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const handleErrorResponse = (error) => {
    if (error.response && error.response.status === 401) {
      setErrorMessage('Unauthorized access. Please log in again.');
      logout();
    } else {
      setErrorMessage('An error occurred while fetching data. Please try again later.');
    }
  };

  const handleAssignArtist = async (orderId, artistId) => {
    try {
      console.log(orderId, artistId)
      const res = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}artists/order/updateOrder/${orderId}`, {
        assartist: artistId
      });
      if (res.status === 200) {
        setSuccessMessage('Assigned artist successfully!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 2000);
      }
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const handleUpdateOrderDelivered = async (orderId) => {
    try {
      const res = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}artists/order/updateOrder/${orderId}`, {
        orderDelivered: true
      });
      if (res.status === 200) {
        setSuccessMessage('Updated order delivered status successfully!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 2000);
      }
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const handleUpdatePaymentStatus = async (orderId) => {
    try {
      const res = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}artists/order/updateOrder/${orderId}`, {
        paymentStatus: true
      });
      if (res.status === 200) {
        setSuccessMessage('Updated payment status successfully!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 2000);
      }
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      {successMessage && <MessageComponent type="success" message={successMessage} />}
      {errorMessage && <MessageComponent type="error" message={errorMessage} />}

      <h2 className="text-2xl font-bold mb-4">Order List</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Mobile Number</th>
            <th className="px-4 py-2">Payment Status</th>
            <th className="px-4 py-2">Order Delivered</th>
            <th className="px-4 py-2">Requested Artist</th>
            <th className="px-4 py-2">Assigned Artist</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td className="border px-4 py-2">{order._id}</td>
              <td className="border px-4 py-2">{order.name}</td>
              <td className="border px-4 py-2">{order.mobileNumber}</td>
              <td className="border px-4 py-2" style={{ color: order.paymentStatus ? 'green' : 'red' }}>
                {order.paymentStatus ? 'Paid' : 'Unpaid'}
              </td>
              <td className="border px-4 py-2" style={{ color: order.orderDelivered ? 'green' : 'red' }}>
                {order.orderDelivered ? 'Delivered' : 'Not Delivered'}
              </td>
              <td className="border px-4 py-2">
                {/* Find the requested artist for the current order */}
                {(function () {
                  const requestedArtist = artists.find(artist => artist._id === order.reqartist);
                  return requestedArtist ? requestedArtist.name : "Artist Not Requested";
                })()}
              </td>

              <td className="border px-4 py-2">
                <select
                  onChange={(e) => handleAssignArtist(order._id, e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="">Select Artist</option>
                  {artists.map(artist => (
                    <option key={artist._id} value={artist._id} selected={order.assartist === artist._id}>
                      {artist.name}
                    </option>
                  ))}
                </select>

              </td>
              <td className="border px-4 py-2">
                <img src={`${process.env.REACT_APP_IMAGE_URL}${order.imageUrl}`} alt={`Orderimage${order._id}`} className="w-full h-48 object-cover rounded-md mb-4" />
              </td>

              <td className="border px-4 py-2 flex flex-col items-center justify-center h-full">
                <button
                  onClick={() => handleUpdatePaymentStatus(order._id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded mb-2"
                >
                  Update Payment Status
                </button>
                <button
                  onClick={() => handleUpdateOrderDelivered(order._id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded"
                >
                  Update Order Delivered
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
