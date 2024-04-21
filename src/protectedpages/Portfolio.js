import React, { useEffect, useState } from 'react';
import { useAuth } from "../routes/Context";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import MessageComponent from "./Message";

export default function Portfolio() {
    const { isValidToken, logout } = useAuth();
    const navigate = useNavigate();
    const { artistId } = useParams();
    const [portfolioData, setPortfolioData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isValidToken()) {
            logout();
            navigate('/admin', { replace: true });
        } else {
            fetchPortfolioData();
        }
    }, [isValidToken, logout, navigate]);

    const fetchPortfolioData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}artists/works/${artistId}`);
            setPortfolioData(response.data);
            setLoading(false);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                logout();
                navigate('/admin', { replace: true });
            } else {
                setErrorMessage(error.response.data.error);
                setTimeout(() => {
                    setErrorMessage('');
                }, 2000)
                setLoading(false);
            }
        }
    };

    // addd image

    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image || !category) {
            setErrorMessage('Please select an image and enter a category.');
            setTimeout(() => {
                setErrorMessage('');
            }, 2000)
            return;
        }

        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('specialty', category);

            await axios.post(`${process.env.REACT_APP_BACKEND_URL}artists/${artistId}/works`, formData);

            setSuccessMessage('Work added successfully');
            setImage(null);
            setCategory('');
            setErrorMessage('');
            setTimeout(() => {
                setSuccessMessage('');
                window.location.reload(); 
            }, 2000)
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMessage('Unauthorized. Please login again.');
                logout();
            } else {
                setErrorMessage('Failed to add work. Please try again later.');
                setTimeout(() => {
                    setErrorMessage('');
                }, 2000)
            }
        }
    };
    // handle delete 

    const handleDelete = async (id) => {
        try {
          await axios.delete(`${process.env.REACT_APP_BACKEND_URL}artists/delete/works/${id}`);
          
          setSuccessMessage(`Work deleted successfully`);
          setTimeout(() => {
            setSuccessMessage('');
            window.location.reload(); 
        }, 2000)
        } catch (error) {
          if (error.response && error.response.status === 401) {
            setErrorMessage('Unauthorized. Please login again.');
            logout()
          } else {
            setErrorMessage(`Failed to delete work. Please try again later.`);
            setTimeout(() => {
                setErrorMessage('');
            }, 2000)
          }
        }
      };

    return (
        <div className="container mx-auto px-4 py-8">
            {successMessage && <MessageComponent type="success" message={successMessage} />}
            {errorMessage && <MessageComponent type="error" message={errorMessage} />}
            {loading && <p>Loading...</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {portfolioData && portfolioData.map(data => (
                    <div key={data._id} className="bg-white p-4 rounded-lg shadow-md">
                        <img src={`${process.env.REACT_APP_IMAGE_URL}${data.imageUrl}`} alt="Artist Portfolio" className="w-full h-48 object-cover rounded-md mb-4" />
                        <p className="text-gray-800 font-semibold mb-2">{data.specialty}</p>
                        <button onClick={()=>{
                            handleDelete(data._id)
                        }} className="bg-red-500 text-white px-2 py-1 rounded-md">Delete</button>
                    </div>
                ))}
                <div className="p-4 border border-gray-300 rounded-lg">
                    <h2 className="text-lg font-semibold mb-2">Add Work</h2>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-4">
                            <label htmlFor="image" className="block mb-1">Select Image:</label>
                            <input type="file" id="image" name="image" onChange={handleImageChange} accept="image/*" className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="category" className="block mb-1">Category:</label>
                            <input type="text" id="category" name="category" value={category} onChange={handleCategoryChange} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter category" />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Work</button>
                    </form>
                </div>

            </div>



        </div>
    );
}
