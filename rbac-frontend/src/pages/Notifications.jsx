import {
useEffect,
useState
}
from "react";

import {
useNavigate
}
from "react-router-dom";

import Header from "../components/Header";
import api from "../services/api";


function Notifications(){

const [notifications,setNotifications]=
useState([]);

const [reads,setReads]=
useState(
JSON.parse(
localStorage.getItem("reads")
|| "[]"
)
);

const username=
localStorage.getItem(
"username"
);

const role=
localStorage.getItem(
"role"
);

const navigate=
useNavigate();



useEffect(()=>{
loadNotifications();
},[]);




const loadNotifications=
async()=>{

try{

const res=
await api.get(
"/access/requests"
);

let data=[];


/*
Approver notifications
*/

if(
role==="ADMIN"
||
role==="MANAGER"
){

data=
res.data.filter(
r=>

r.status==="PENDING"

&&

(
r.approverRole===role
||
r.approver_role===role
)

);

}

/*
Requester notifications
*/

else{

data=
res.data.filter(
r=>
r.username===username
&&
r.status!=="PENDING"
);

}



data.sort(
(a,b)=>
new Date(
b.createdAt
)
-
new Date(
a.createdAt
)
);

setNotifications(
data
);

}
catch(e){
console.log(e);
}

};





const readKey=(id)=>

(
role==="ADMIN"
||
role==="MANAGER"
)

?

`${role}-${id}`

:

`${username}-${id}`;





const isRead=(id)=>
reads.includes(
readKey(id)
);





const markRead=(id)=>{

if(
isRead(id)
){
return;
}

const updated=[

...reads,
readKey(id)

];

setReads(
updated
);

localStorage.setItem(
"reads",
JSON.stringify(updated)
);

window.dispatchEvent(
new Event(
"notificationsUpdated"
)
);

};





const openNotification=()=>{

navigate(

(
role==="ADMIN"
||
role==="MANAGER"
)

?

"/requests"

:

"/request-access"

);

};






return(

<>

<Header/>


<div style={{
padding:"35px",
maxWidth:"1000px",
margin:"0 auto"
}}>


<h1 style={{
marginBottom:"30px"
}}>
Notifications
</h1>



{
notifications.length===0

?

<div style={{
background:"#f7f7f7",
padding:"50px",
textAlign:"center",
borderRadius:"16px",
boxShadow:
"0 2px 6px rgba(0,0,0,.08)"
}}>

<h3>
No Notifications
</h3>

<p>
You're all caught up.
</p>

</div>

:

<ul style={{
listStyle:"none",
padding:"0"
}}>

{
notifications.map(req=>(

<li
key={req.id}
style={{
marginBottom:"22px",
background:
isRead(req.id)
?
"#fafafa"
:
"#eef4ff",
padding:"22px",
borderRadius:"14px",
boxShadow:
"0 2px 6px rgba(0,0,0,.06)",
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}
>


<div
onClick={openNotification}
style={{
flex:1,
cursor:"pointer"
}}
>

<div style={{
fontSize:"17px",
marginBottom:"8px"
}}>

{
role==="ADMIN"
||
role==="MANAGER"

?

<>

Approval needed:

<b>
 {req.username}
</b>

requested

<b>
 {req.action}
</b>

on

<b>
 {req.assetName}
</b>

</>

:

<>

Your

<b>
 {req.action}
</b>

request for

<b>
 {req.assetName}
</b>

was

<span style={{
marginLeft:"8px",
padding:"4px 10px",
borderRadius:"8px",
background:

req.status==="APPROVED"
?
"#d4edda"

:

"#f8d7da"
}}>
{req.status}
</span>

</>

}

</div>


<small>
{
new Date(
req.createdAt
).toLocaleString()
}
</small>

</div>





<div
onClick={()=>
markRead(req.id)
}
title="Mark as read"
style={{
marginLeft:"18px",
width:"18px",
height:"18px",
borderRadius:"50%",
border:"2px solid #222",
background:

isRead(req.id)

?

"#222"

:

"white",

cursor:"pointer"
}}
>
</div>



</li>

))
}

</ul>

}


</div>

</>

);

}

export default Notifications;