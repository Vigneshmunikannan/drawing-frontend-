import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../routes/Context";

export default function Error() {
  const navigate = useNavigate();
  const { isValidToken } = useAuth();

  const handleGoToHome1 = () => {
    navigate('/home', { replace: true });
  };

  const handleGoToHome2 = () => {
    console.log("handleGoToHome2 clicked");
    navigate('/', { replace: true });
  };

  // Check if the user is authenticated
  if (isValidToken()) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='flex flex-col items-center justify-center'>
          <p className="text-center">404 page requested not found private</p>
          <button onClick={handleGoToHome1} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
            Go to Home
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='flex flex-col items-center justify-center'>
          <p className="text-center">404 page requested not found public</p>
          <button onClick={handleGoToHome2} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
            Go to Home
          </button>
        </div>
      </div>
    );
  }
}
