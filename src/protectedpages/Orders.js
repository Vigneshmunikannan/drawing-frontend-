import React, { useEffect,useState } from 'react'
import { useAuth } from "../routes/Context";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MessageComponent from './Message';
export default function Orders() {
  const { isValidToken,logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isValidToken()) {
      navigate('/admin', { replace: true });
    }
  }, []);
  const [artists, setArtists] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
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
  return (
    <div>
      {successMessage && <MessageComponent type="success" message={successMessage} />}
      {errorMessage && <MessageComponent type="error" message={errorMessage} />}
    </div>
  );
}

