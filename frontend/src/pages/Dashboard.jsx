import { useState } from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios"
import { useEffect } from "react";

export default function(){
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])

  useEffect(()=>{
    axios.get("http://localhost:3000/api/v1/user/bulk",{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(res =>{
      // console.log(res.data.users);
    // console.log(res.data.filteredUsers);
      setUsers(res.data.users)
      // setFilteredUsers(res.data.filteredUsers)
    })
  },[])

  useEffect(()=>{
    
    console.log(users);
  },[users])
  
    return <div>
      <AppBar/>
      <Balance/>
      <Users/>
    </div>
}