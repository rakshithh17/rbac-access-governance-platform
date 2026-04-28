import {useState,useEffect}
from "react";

import Header from "../components/Header";
import api from "../services/api";

function RequestAccess(){

const username=
localStorage.getItem("username")
|| "user1";

const [assetName,setAssetName]=
useState("");

const [assets,setAssets]=
useState([]);

const [action,setAction]=
useState("DELETE");

const [duration,setDuration]=
useState("Temporary");

const [reason,setReason]=
useState("");

const [requests,setRequests]=
useState([]);



useEffect(()=>{
loadAssets();
loadRequests();
},[]);



const loadAssets=async()=>{

const res=
await api.get("/assets");

setAssets(res.data);

if(res.data.length>0){
setAssetName(
res.data[0].name
);
}

};



const loadRequests=async()=>{

const res=
await api.get(
"/access/requests"
);

const mine=
res.data
.filter(
r=>
r.username===username
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
mine
);

};



const submitRequest=
async()=>{

if(reason.trim()===""){
alert(
"Provide business justification"
);
return;
}

await api.post(
"/access/requests",
{
username,
assetName,
action,
duration
}
);

alert(
"Request Submitted"
);

setReason("");

loadRequests();

};



return(

<>

<Header/>

<div style={{
display:"flex",
gap:"40px",
padding:"30px"
}}>

<div style={{
flex:1,
background:"#f7f7f7",
padding:"25px"
}}>

<h1>
Access Request Wizard
</h1>


{
action!=="CREATE"
&&

<>

<p>Select Asset</p>

<select
value={assetName}
onChange={e=>
setAssetName(
e.target.value
)
}
>

{
assets.map(asset=>(

<option
key={asset.id}
value={asset.name}
>
{asset.name}
</option>

))
}

</select>

</>

}



<p>Permission Requested</p>

<select
value={action}
onChange={e=>
setAction(
e.target.value
)
}
>

<option value="DELETE">
Delete
</option>

<option value="UPDATE">
Update
</option>

<option value="CREATE">
Create
</option>

</select>


<p>Duration</p>

<select
value={duration}
onChange={e=>
setDuration(
e.target.value
)
}
>
<option>
Temporary
</option>
<option>
Permanent
</option>
</select>


<p>Justification</p>

<textarea
rows="6"
value={reason}
onChange={e=>
setReason(
e.target.value
)
}
/>

<br/><br/>

<button
onClick={submitRequest}
style={{ color: "#f0f2f7", backgroundColor: "#0a0909" ,borderRadius: "6px"}}
>
Submit Request
</button>

</div>




<div style={{
flex:1,
background:"#f7f7f7",
padding:"25px"
}}>

<h1>My Requests</h1>

<ul>

{
requests.map(req=>(

<li
key={req.id}
style={{
marginBottom:"25px"
}}
>

<b>Asset:</b>
{req.assetName}

<br/>

<b>Permission:</b>
{req.action}

<br/>

<b>Status:</b>

<span style={{
padding:"4px 10px",
borderRadius:"8px",
background:

req.status==="APPROVED"
?
"#d4edda"

:

req.status==="REJECTED"
?
"#f8d7da"

:
"#fff3cd"
}}
>
{req.status}
</span>

<br/>

<b>Submitted:</b>

{
new Date(
req.createdAt
).toLocaleString()
}

</li>

))
}

</ul>

</div>

</div>

</>

);

}

export default RequestAccess;