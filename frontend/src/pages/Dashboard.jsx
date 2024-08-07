import { useState } from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";
import { useEffect } from "react";
import UserSearch from "../components/UserSearch";
import { useNavigate } from "react-router-dom";
import { BackendUrl } from "../../config";
import Loader from "../components/Loader";

export default function () {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [friendName, setFriendName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    axios
      .get(`${BackendUrl}/api/v1/user/bulk?filter=${filter}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUsers(res.data.users);
        // console.log(filter);
        setLoading(false);
        console.log(loading);
      });
  }, [filter]);

  // useEffect(() => {
  //   console.log("Loading state:", loading);
  // }, [loading]);

  // useEffect(()=>{
  //   console.log(users,filteredUsers);
  // },[users])

  

  return (
    <div>
      <div className={`${loading?'block':'hidden'} absolute top-0 left-0 w-full h-full bg-gray-500 opacity-75 flex items-center justify-center`}>
      <Loader/>
      </div>
      <AppBar />
      <Balance />
      <UserSearch onChange={(e) => setFilter(e.target.value)} />
      {users.map((element) => (
        <Users
          key={element._id}
          name={element.firstName}
          email={element.email}
        />
      ))}
    </div>
  );
}
