import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AppBar from '../components/AppBar';

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
    }
  }, [navigate]);
  return (
    <>
    <AppBar/>
    <div className=' flex  justify-center items-center h-screen'>
    <div className='flex  justify-center items-center bg-gray-300 w-[50%] h-[50%] rounded-3xl text-3xl font-semibold'>
      Transaction Successful!
    </div>
    </div>
    </>
  )
}

export default Success
