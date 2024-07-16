import { useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function () {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    return (
        <div className=" flex justify-center items-center h-screen bg-gray-300">
            <div className=" bg-white flex flex-col items-center w-fit h-fit rounded-lg py-4">
                <Heading element={"Sign Up"} />
                <SubHeading
                    subHeading={"Enter your information to create your account"}
                />
                <InputBox type={"text"} label={"First Name"} placeholder={"John"} onChange={e=> setFirstName(e.target.value)} />
                <InputBox type={"text"} label={"Last Name"} placeholder={"Doe"} onChange={e=> setLastName(e.target.value)} />
                <InputBox
                    type={"text"}
                    label={"Email"}
                    placeholder={"johndoe@gmail.com"}
                    onChange={e=> setEmail(e.target.value)}
                />
                <InputBox
                    type={"password"}
                    label={"Password"}
                    placeholder={"password"}
                    onChange={e=> setPassword(e.target.value)}
                />
                <Button btname={"Sign Up"} onClick={async()=>{
                  const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                        firstName,
                        lastName,
                        email,
                        password
                    })
                    localStorage.setItem("token", response.data.token)
                    if (response.data.success) {
                        navigate("/dashboard")   
                    }
                }} />
                <BottomWarning warning={"Already have an account?"} link={"Login"} />
            </div>
        </div>
    );
}
