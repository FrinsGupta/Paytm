import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";

export default function () {
    return (
        <div className=" flex justify-center items-center h-screen bg-gray-300">
            <div className=" bg-white flex flex-col items-center w-fit h-fit rounded-lg py-4 ">
                <Heading element={"Sign In"} />
                <SubHeading
                    subHeading={"Enter your credentials to access your account"}
                />
                <InputBox
                    type={"text"}
                    label={"Email"}
                    placeholder={"johndoe@gmail.com"}
                />
                <InputBox
                    type={"password"}
                    label={"Password"}
                    placeholder={"password"}
                />
                <Button btname={"Sign In"} />
                <BottomWarning warning={"Don't have an account? "} link={"Sign Up"} />
            </div>
        </div>
    );
}
