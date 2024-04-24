
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
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const[totalCount,settotalCount]=useState(0)

  useEffect(() => {
    if (!isValidToken()) {
      navigate('/admin', { replace: true });
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    fetchArtists();
  }, [currentPage]);

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
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}artists/order/getall`, {
        params: {
          page: currentPage,
          limit: 10
        }
      });
      console.log(res)
      setOrders(res.data.orders);
      setTotalPages(res.data.totalPages);
      settotalCount(res.data.totalCount);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const handleErrorResponse = (error) => {
    if (error.response && error.response.status === 401) {
      setErrorMessage('Unauthorized access. Please log in again.');
      logout();
    } else {
      setErrorMessage('An error occurred while updating data. Please try again later.');
    }
  };

  const handleAssignArtist = async (orderId, artistId) => {
    try {
      const res = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}artists/order/updateOrder/${orderId}`, {
        assartist: artistId
      });
      if (res.status === 200) {
        setSuccessMessage(res.data.message);
        setTimeout(() => {
          setSuccessMessage('');
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  // Other handle functions...
  const handleImageChange = async (e, orderId) => {
    const file = e.target.files[0]; // Get the selected file
    const formData = new FormData();
    formData.append('image', file); // Append the file to FormData

    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}artists/order/updateOrder/${orderId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
          },
        }
      );
      if (res.status === 200) {
        setSuccessMessage('Image updated successfully!');
        setTimeout(() => {
          setSuccessMessage('');
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      handleErrorResponse(error);
    }
  };
  const handleTogglePaymentStatus = async (orderId, currentStatus) => {
    try {
      const newPaymentStatus = !currentStatus;
      const res = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}artists/order/updateOrder/${orderId}`, {
        paymentStatus: newPaymentStatus
      });
      if (res.status === 200) {
        setSuccessMessage(res.data.message);
        setTimeout(() => {
          setSuccessMessage('');
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      handleErrorResponse(error);
    }
  };
  const handleToggleDeliveredStatus = async (orderId, currentStatus) => {
    try {
      const newDeliverStatus = !currentStatus;
      const res = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}artists/order/updateOrder/${orderId}`, {
        orderDelivered: newDeliverStatus
      });
      if (res.status === 200) {
        setSuccessMessage(res.data.message);
        setTimeout(() => {
          setSuccessMessage('');
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const filteredOrders = orders && orders.filter(order => {
    const searchRegex = new RegExp(searchTerm, 'i');
    return (
      searchRegex.test(order.name) ||
      searchRegex.test(order._id) ||
      searchRegex.test(order.email) ||
      searchRegex.test(order.mobileNumber)
    );
  });
  

  const goToPage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container py-8 px-16">
      {successMessage && <MessageComponent type="success" message={successMessage} />}
      {errorMessage && <MessageComponent type="error" message={errorMessage} />}

      <h2 className="text-2xl font-bold mb-4">Order List - {totalCount}</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Name, Order ID, Email, or Mobile Number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
      </div>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Contact</th>
            <th className="border px-4 py-2">Payment Status</th>
            <th className="border px-4 py-2">Order Delivered</th>
            <th className="border px-4 py-2">Requested Artist</th>
            <th className="border px-4 py-2">Assigned Artist</th>
            <th className="border px-4 py-2">Image</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order._id}>
              <td className="border px-4 py-2">{order._id}</td>
              <td className="border px-4 py-2">{order.name}</td>
              <td className="border px-4 py-2">
                <div className="flex flex-col space-y-2">
                  <div>
                    <button
                      onClick={() => window.open(`https://wa.me/${order.mobileNumber}`, '_blank')}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold rounded px-4 py-2"
                    >
                      WhatsApp
                    </button>
                    {order.mobileNumber}
                  </div>
                  <div>
                    <button
                      onClick={() => window.open(`mailto:${order.email}`, '_blank')}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded px-4 py-2"
                    >
                      Send Email
                    </button>
                    {order.email}
                  </div>
                  <div>
                    <button
                      onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.address)}`, '_blank')}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold rounded px-4 py-2"
                    >
                      Map Location
                    </button>
                    <br />
                    {order.address}
                    <div>
                      <button
                        onClick={() => window.open(`tel:${order.mobileNumber}`)}
                        className="bg-purple-500 hover:bg-purple-700 text-white font-bold rounded px-4 py-2"
                      >
                        Make a Call
                      </button>
                      {order.mobileNumber}
                    </div>
                  </div>
                </div>
              </td>
              <td className="border px-4 py-2" style={{ color: order.paymentStatus ? 'green' : 'red' }}>
                <button
                  onClick={() => handleTogglePaymentStatus(order._id, order.paymentStatus)}
                  className={`text-white font-bold rounded mb-2 ${order.paymentStatus ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'}`}
                >
                  {order.paymentStatus ? 'Mark as Unpaid' : 'Mark as Paid'}
                </button>
              </td>
              <td className="border px-4 py-2" style={{ color: order.orderDelivered ? 'green' : 'red' }}>
                <button
                  onClick={() => handleToggleDeliveredStatus(order._id, order.orderDelivered)}
                  className={`text-white font-bold rounded mb-2 ${order.orderDelivered ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'}`}
                >
                  {order.orderDelivered ? 'Mark as Undelivered' : 'Mark as Delivered'}
                </button>
              </td>
              <td className="border px-4 py-2">
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
              <td className="border px-4 py-2 min-w-52">
                <img
                  src={`${process.env.REACT_APP_IMAGE_URL}${order.imageUrl}`}
                  alt={`Orderimage${order._id}`}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, order._id)}
                  accept="image/*"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center items-center">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded-l"
        >
          Previous
        </button>
        <span className="bg-gray-200 text-gray-600 font-bold py-2 px-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded-r"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Orders;

