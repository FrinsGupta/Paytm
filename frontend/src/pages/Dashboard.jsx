import { useState } from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";
import { useEffect } from "react";
import UserSearch from "../components/UserSearch";
import { useNavigate } from "react-router-dom";
import { BackendUrl } from "../../config";

export default function () {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [friendName, setFriendName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
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
        console.log(filter);
        setLoading(false)
      });
  }, [filter]);

  // useEffect(()=>{
  //   console.log(users,filteredUsers);
  // },[users])

  if (loading) {
    return <div>
      Loading...
    </div>
  }

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

