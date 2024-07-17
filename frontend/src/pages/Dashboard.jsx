import { useState } from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";
import { useEffect } from "react";
import UserSearch from "../components/UserSearch";

export default function () {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [friendName, setFriendName] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUsers(res.data.users);
        console.log(filter);
      });
  }, [filter]);

  // useEffect(()=>{
  //   console.log(users,filteredUsers);
  // },[users])

  return (
    <div>
      <AppBar />
      <Balance  />
      <UserSearch onChange={(e) => setFilter(e.target.value)} />
      {users.map((element) => (
      <Users key={element._id} name={element.firstName} email={element.email} />
      ))}
    </div>
  );
}

