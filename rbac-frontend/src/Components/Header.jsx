import {
Link,
useNavigate
}
from "react-router-dom";

import {
useEffect,
useState
}
from "react";

import api from "../services/api";


function Header(){

const username=
localStorage.getItem("username");

const role=
localStorage.getItem("role");

const navigate=
useNavigate();

const [badgeCount,setBadgeCount]=
useState(0);



const loadBadge=
async()=>{

try{

const res=
await api.get(
"/access/requests"
);

const reads=
JSON.parse(
localStorage.getItem("reads")
||"[]"
);

let unread=[];


if(
role==="ADMIN"
||
role==="MANAGER"
){

unread=
res.data.filter(
r=>
r.status==="PENDING"
&&
(
r.approverRole===role
||
r.approver_role===role
)
&&
!reads.includes(
`${role}-${r.id}`
)
);

}
else{

unread=
res.data.filter(
r=>
r.username===username
&&
r.status!=="PENDING"
&&
!reads.includes(
`${username}-${r.id}`
)
);

}

setBadgeCount(
unread.length
);

}
catch(e){
console.log(e);
}

};



useEffect(()=>{

loadBadge();

const interval=
setInterval(
loadBadge,
3000
);

window.addEventListener(
"notificationsUpdated",
loadBadge
);

return()=>{

clearInterval(
interval
);

window.removeEventListener(
"notificationsUpdated",
loadBadge
);

};

},[]);




const logout=()=>{

localStorage.clear();

navigate("/");

};



return(

<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"18px 30px",
borderBottom:"1px solid #ddd",
background:"#fff",
 color: "#111827"
}}>

<div>

<b>
{username}
</b>

<span style={{
marginLeft:"8px",
color:"#666"
}}>
({role})
</span>

</div>



<div style={{
display:"flex",
gap:"15px"
}}>

<Link to="/notifications">
<button style={{ color: "#f0f2f7", backgroundColor: "#0a0909",borderRadius: "6px" }}>
🔔 Notifications

{
badgeCount>0 &&

<span style={{
marginLeft:"8px",
background:"red",
color:"white",
borderRadius:"50%",
padding:"3px 8px",
fontSize:"12px"
}}>
{badgeCount}
</span>
}

</button>
</Link>


<button style={{ color: "#f0f2f7", backgroundColor: "#0a0909" ,borderRadius: "6px"}}
onClick={logout}
>
Logout
</button>

</div>

</div>

);

}

export default Header;