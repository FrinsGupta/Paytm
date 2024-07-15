import React from "react";
import Button from "./Button";

const Users = () => {
  return (
    <div>
      <div className='mx-8 my-6 flex font-bold text-2xl'>
      Users
    </div>
      <div className="mx-8">
      <input className=' w-full mb-8 border-2 py-2 pl-3 rounded-md' type="number" name="" id="" placeholder="Search users..." />
      </div>
      <div className="flex justify-between mx-8 items-center bg-gray-200 rounded-xl ">
        <div className="flex items-center">
          <button className="bg-gray-300 font-bold text-xl rounded-full px-3 py-1  mx-4">
            U
          </button>
          <p className=" font-semibold text-xl"> User 1</p>
        </div>
        <div className="flex items-center">
          <Button btname={"Send Money"} />
        </div>
      </div>
    </div>
  );
};

export default Users;
