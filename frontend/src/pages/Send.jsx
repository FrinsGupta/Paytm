import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import { useState,useEffect } from "react";
import axios from 'axios'
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";


export default function () {
  const navigate = useNavigate();
  const[amount,setAmount]= useState(0);
  const [reRender, setRerender] = useState(false);
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name")
  const email = searchParams.get("email")

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
    }
  }, [navigate]);
  console.log(reRender);

  if (!name || !email) {
   return navigate('/signin')
    // return <div>Loading...</div>; // or handle the case when name or email is not present
  }
  
  return (
  <>
  <AppBar/>
  <Balance render={reRender} />
    <div className=" flex justify-center items-center  h-[80%] rounded-3xl bg-gray-300">
      <div className=" bg-white flex flex-col items-center w-fit h-fit rounded-lg py-4 ">
        <Heading element={"Send Money"} />
        <div className="flex items-center w-full px-8 mt-8 mb-3">
          <button className="bg-green-400 font-bold text-xl rounded-full px-3 py-1  mr-3">
            {name[0]}
          </button>
          <p className=" font-semibold text-xl"> {name}</p>
        </div>
        <InputBox 
          type={"number"}
          label={"Amount (in Rs)"}
          placeholder={"Enter amount"}
          onChange={e=> setAmount(e.target.value)}
        />

        <Button btname={"Initiate Transfer"} onClick={async(e)=>{
            await axios.post("http://localhost:3000/api/v1/account/transfer",{
              to: email,
              amount: amount
            },{
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            }).then(setRerender(c => !c)).then(navigate('/success'))
        }} />
      </div>
    </div>
    </>
  );
}
