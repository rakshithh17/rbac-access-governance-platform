import {
useEffect,
useState
}
from "react";

import Header
from "../components/Header";

import api
from "../services/api";


function Requests(){

const [requests,setRequests]=
useState([]);

const role=
localStorage.getItem(
"role"
);



useEffect(()=>{
loadRequests();
},[]);




const loadRequests=
async()=>{

try{

const res=
await api.get(
"/access/requests"
);


/*
Only requests routed
to current approver
*/

const filtered=
[...res.data]

.filter(
r=>

r.status==="PENDING"

&&

(
r.approverRole===role
||
r.approver_role===role
)

)

.sort(
(a,b)=>
new Date(
b.createdAt
)
-
new Date(
a.createdAt
)
);


setRequests(
filtered
);

}
catch(e){
console.log(e);
}

};






const approveRequest=
async(id)=>{

try{

await api.put(
`/access/requests/${id}/approve`
);


/*
optimistic remove from queue
*/

setRequests(
prev=>
prev.filter(
r=>r.id!==id
)
);


window.dispatchEvent(
new Event(
"notificationsUpdated"
)
);


alert(
"Request Approved"
);

}
catch(e){

console.log(e);

alert(
"Approve failed"
);

}

};






const rejectRequest=
async(id)=>{

try{

await api.put(
`/access/requests/${id}/reject`
);


setRequests(
prev=>
prev.filter(
r=>r.id!==id
)
);


window.dispatchEvent(
new Event(
"notificationsUpdated"
)
);


alert(
"Request Rejected"
);

}
catch(e){

console.log(e);

alert(
"Reject failed"
);

}

};






return(

<>

<Header/>


<div style={{
padding:"30px"
}}>

<h1>
Approval Inbox
</h1>



<h3>

{
role==="MANAGER"

?

"Manager Approval Queue"

:

"Admin Approval Queue"
}

</h3>





{
requests.length===0

?

<p style={{
marginTop:"30px"
}}>
No requests awaiting approval
</p>

:

<ul style={{
listStyle:"none",
padding:"0"
}}>

{
requests.map(req=>(

<li
key={req.id}
style={{
marginBottom:"25px",
background:"#f7f7f7",
padding:"22px",
borderRadius:"12px",
boxShadow:
"0 1px 4px rgba(0,0,0,0.08)"
}}
>


<div style={{
marginBottom:"10px"
}}>

<b>
{req.username}
</b>

requested

<b>
 {req.action}
</b>

on

<b>
 {req.assetName || "N/A"}
</b>

</div>



<div style={{
marginBottom:"12px"
}}>

Approver:

<span style={{
marginLeft:"8px",
padding:"4px 10px",
borderRadius:"8px",
background:"#e8eefc"
}}>
{req.approverRole}
</span>

</div>



<small>
Submitted:
{
new Date(
req.createdAt
).toLocaleString()
}
</small>



<div style={{
marginTop:"18px"
}}>

<button
onClick={()=>
approveRequest(
req.id
)
}
>
Approve
</button>


<button
onClick={()=>
rejectRequest(
req.id
)
}
style={{
marginLeft:"12px"
}}
>
Reject
</button>

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

export default Requests;