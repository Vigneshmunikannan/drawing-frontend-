import React,{useEffect} from 'react'
import { useAuth } from "../routes/Context";
import { useNavigate } from 'react-router-dom';
export default function Addorder() {
  const { isValidToken } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isValidToken()) {
      navigate('/admin', { replace: true });
    }
  }, []);


  return (
    <div>
      Add Order
    </div>
  );
}
