import React, { useState } from "react";
import Button from "./Button";
import Heading from "./Heading";
import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BackendUrl } from "../../config";

const AppBar = () => {
  const [name, setName] = useState("");
  const token = localStorage.getItem('token');
  const navigate = useNavigate()
  useEffect(() => {
    axios.get(`${BackendUrl}/api/v1/user`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res=> setName(res.data.response.firstName))
  }, []);

  return (
    <div className="bg-gray-200 rounded-b-2xl">
      <div className="flex justify-between mx-8 ">
        <div className="flex">
          <Link to={'/'}>
          <Heading element={"Payment App"} />
          </Link>
        </div>
        <div className="flex items-center">
          <p className=" font-semibold text-xl mr-10">Hello, {name}</p>
            <button onClick={()=>{
            localStorage.removeItem('token')
            navigate('/signin')
            }} className='rounded-md bg-black px-3.5 py-1 font-semibold  text-white '>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
