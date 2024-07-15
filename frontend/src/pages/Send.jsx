import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";

export default function () {
  return (
    <div className=" flex justify-center items-center h-screen bg-gray-300">
      <div className=" bg-white flex flex-col items-center w-fit h-fit rounded-lg py-4 ">
        <Heading element={"Send Money"} />
        <div className="flex items-center w-full px-8 mt-8 mb-3">
          <button className="bg-green-400 font-bold text-xl rounded-full px-3 py-1  mr-3">
            U
          </button>
          <p className=" font-semibold text-xl"> Friend's Name</p>
        </div>
        <InputBox
          type={"number"}
          label={"Amount (in Rs)"}
          placeholder={"Enter amount"}
        />

        <Button btname={"Initiate Transfer"} />
      </div>
    </div>
  );
}
