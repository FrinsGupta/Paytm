import React from "react";
import Heading from "./Heading";


const AppBar = () => {
  return (
    
        <div className="bg-gray-200 rounded-b-2xl">

    <div className="flex justify-between mx-8 ">
      <div className="flex">
        <Heading element={"Payment App"} />
      </div>
      <div className="flex items-center">
        <p className=" font-semibold text-xl">Hello, User</p>
        <button className="bg-gray-300 font-bold text-xl rounded-full px-3 py-1 ml-4">U</button>
      </div>
    </div>
        </div>
  );
};

export default AppBar;
