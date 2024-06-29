import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/Auth';
import { toast } from 'react-toastify';


const Logout = () => {
  const { LogoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    LogoutUser(navigate);
  }, [LogoutUser, navigate]);

  return null;
};

export default Logout;
