import {
useEffect,
useState
}
from "react";

import {
useNavigate
}
from "react-router-dom";

import axios from "axios";
import api from "../services/api";
import {saveToken}
from "../utils/auth";


function Login(){

const [users,setUsers]=
useState([]);

const [selectedUser,setSelectedUser]=
useState("");

const [password,setPassword]=
useState("");

const navigate=
useNavigate();



const roleMap={

1:"ADMIN",
2:"MANAGER",
3:"HR",
4:"USER",
5:"AUDITOR",
6:"SUPPORT"

};



useEffect(()=>{
loadUsers();
},[]);



const loadUsers=
async()=>{

try{

const res=
await api.get(
"/users"
);

console.log(
"USERS:",
res.data
);

setUsers(
res.data
);

if(
res.data.length>0
){
setSelectedUser(
res.data[0].username
);
}

}
catch(e){
console.log(e);
}

};



const handleLogin=
async()=>{

try{

const res=
await axios.post(
"http://localhost:8083/auth/login",
{
username:
selectedUser,
password
}
);


saveToken(
res.data.message
);


localStorage.setItem(
"username",
selectedUser
);


const user=
users.find(
u=>
u.username===
selectedUser
);

if(user){

localStorage.setItem(
"role",
roleMap[
user.roleId
]
);

}


navigate(
"/home"
);

}
catch(e){

console.log(e);

alert(
"Login Failed"
);

}

};



return (
    <div style={{ 
    backgroundColor:"#F9FAFB", // Change this to any color or hex code
    minHeight: "100vh", 
    margin: 0,
    padding: 0,
    display: "flex",          // Enables Flexbox
    justifyContent: "center", // Horizontal centering
    alignItems: "center",     // Vertical centering   // Full screen height
    width: "100vw"
  }}>
  <div style={{
    backgroundColor: "#FFFFFF",
    width: "430px",
    margin: "80px auto",
    padding: "35px",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    border: "1px solid #D1D5DB",
    borderRadius: "12px",
    boxSizing: "border-box" // Ensures the container doesn't grow
  }}>
    <h2 style={{ color: "#111827" }}>RBAC Login</h2>

    <p style={{ color: "#111827" }}>Select User</p>

    <select
      value={selectedUser}
      onChange={e => setSelectedUser(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        boxSizing: "border-box", // Critical fix
        marginBottom: "20px"     // Using margin instead of <br/> for cleaner spacing
      }}
    >
      {users.map(user => (
        <option key={user.id} value={user.username}>
          {user.username}
        </option>
      ))}
    </select>

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={e => setPassword(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        boxSizing: "border-box", // Critical fix
        marginBottom: "20px"
      }}
    />

    <button
      onClick={handleLogin}
      style={{
        width: "100%",
        padding: "10px",
        boxSizing: "border-box", // Keep it consistent
        cursor: "pointer",
     color: "#FFFFFF",
     background: "#111827",borderRadius: "6px"
      }}
    >
      Login
    </button>
  </div>
  </div>
);

}

export default Login;