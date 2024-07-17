import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";


const Users = ({name,email}) => {
  const navigate = useNavigate();
  return (
    <div className="my-6">
      <div className="flex justify-between mx-8 items-center bg-gray-200 rounded-xl ">
        <div className="flex items-center">
          <button className="bg-gray-300 font-bold text-xl rounded-full px-3 py-1  mx-4">
            {name.charAt(0)}
          </button>
          <p className=" font-semibold text-xl"> {name}</p>
        </div>
        <div className="flex items-center">
          <Button btname={"Send Money"} onClick={(e)=>{
            navigate(`/send?email=${email}&name=${name}`)
          }} />
        </div>
      </div>
    </div>
  );
};

export default Users;
