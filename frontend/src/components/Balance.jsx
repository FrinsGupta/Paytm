import React, { useState } from 'react'
import axios from "axios";
import { useEffect } from 'react';
import { BackendUrl } from '../../config';

const Balance = ({render,setLoading}) => {
  const [balance, setBalance] = useState(0)
  useEffect(()=>{
      axios.get(`${BackendUrl}/api/v1/account/balance`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).then((res) =>{
         setBalance(res.data.balance) 
        setLoading(false)
      })
  },[render])

  return (
    <>
    <div className='mx-8 my-6 flex font-bold text-2xl'>
      Your Balance <p className='ml-4'>${balance}</p>
    </div>
    </>
  )
}

export default Balance
