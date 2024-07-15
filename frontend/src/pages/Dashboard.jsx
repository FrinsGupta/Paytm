import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";

export default function(){
    return <div>
      <AppBar/>
      <Balance balance={5000} />
      <Users/>
    </div>
}