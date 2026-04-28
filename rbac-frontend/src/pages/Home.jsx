import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { getActivities } from "../utils/activity";
import api from "../services/api";

function Home() {

const [assetCount,setAssetCount]=useState(0);
const [ruleCount,setRuleCount]=useState(0);
const [activities,setActivities]=useState([]);

const role=
localStorage.getItem("role");


useEffect(()=>{
loadDashboard();
},[]);



const loadDashboard=async()=>{

try{

const assetsRes=
await api.get("/assets");

if(Array.isArray(assetsRes.data)){
setAssetCount(
assetsRes.data.length
);
}


const rulesRes=
await api.get("/access/rules");

if(Array.isArray(rulesRes.data)){
setRuleCount(
rulesRes.data.length
);
}


setActivities(
getActivities()
);

}
catch(e){
console.log(e);
}

};



return(

<>

<Header/>
<div style={{
    backgroundColor:  "#F9FAFB", // Clean professional background
    minHeight: "100vh",        // Ensures it covers top to bottom
    width: "100%"
  }}>
<div style={{
    backgroundColor: "#FFFFFF",
padding:"35px",
maxWidth:"1100px",
margin:"0 auto"
}}>

<h1 style={{ color: "#111827" }}>
RBAC Admin Dashboard
</h1>

<p style={{ color: "#111827" }}>
Identity and Access Governance Console
</p>



<div style={{
display:"flex",
gap:"20px",
flexWrap:"wrap",

}}>

<div style={{ 
  ...metricBox, 
  backgroundColor: "#c6c0c0", 
  borderColor: "#E5E7EB",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" 
}}>
  <h4 style={{ color: "#111827", margin: 0 }}>Total Assets</h4>
  <h2 style={{ color: "#111827", fontSize: "28px" }}>{assetCount}</h2>
</div>

<div style={{ 
  ...metricBox, 
  backgroundColor: "#c6c0c0", 
  borderColor: "#E5E7EB",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" 
}}>
<h4 style={{ color: "#111827" }}>Resources</h4>
<h2 style={{ color: "#111827" }}>5</h2>
</div>

<div style={{ 
  ...metricBox, 
  backgroundColor: "#c6c0c0", 
  borderColor: "#E5E7EB",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" 
}}>
<h4 style={{ color: "#111827" }}>Access Policies</h4>
<h2 style={{ color: "#111827" }}>{ruleCount}</h2>
</div>



</div>




<h2 style={{
marginTop:"50px",color: "#111827" }}>
Quick Actions
</h2>


<div style={{
display:"flex",
gap:"18px",
flexWrap:"wrap"
}}>

<Link to="/assets">
<button style={{
    ...actionBtn,
    backgroundColor: "#c6c0c0", // Rich Black/Slate
    color: "#111827"         // White text
    ,borderRadius: "6px"
  }}>
Manage Assets
</button>
</Link>





{
role==="ADMIN" &&

<Link to="/rules">
<button style={{
    ...actionBtn,
    backgroundColor: "#c6c0c0", // Rich Black/Slate
    color: "#111827",borderRadius: "6px"          // White text
    
  }}>
Manage Rules
</button>
</Link>

}


{
(role==="ADMIN" || role==="MANAGER") &&

<Link to="/requests">
<button style={{
    ...actionBtn,
    backgroundColor: "#c6c0c0", // Rich Black/Slate
    color: "#111827",borderRadius: "6px"          // White text
    
  }}>
    Approval Inbox

</button>
</Link>

}

{
(role==="ADMIN" || role==="MANAGER" ||  role==="HR") &&

<Link to="/resources">
<button style={{
    ...actionBtn,
    backgroundColor: "#c6c0c0", // Rich Black/Slate
    color: "#111827",borderRadius: "6px"          // White text
    
  }}>
    Resource Catalog

</button>
</Link>

}

{
role && !["ADMIN", "MANAGER"].includes(role) &&

<Link to="/request-access">
<button style={{
    ...actionBtn,
    backgroundColor: "#c6c0c0", // Rich Black/Slate
    color: "#111827",borderRadius: "6px"          // White text
    
  }}>
Request Access

</button>
</Link>

}



</div>





<h2 style={{
marginTop:"50px",
color: "#111827"
}}>
Recent Activity
</h2>


<div style={{
background:"#f7f7f7",
padding:"25px",
borderRadius:"16px"
}}>

{
activities.length===0

?

<p style={{ color: "#111827" }}>No recent activity</p>

:

<ul>

{
activities.map(
(item,index)=>(

<li key={index}>
{item}
</li>

))
}

</ul>

}

</div>


</div>

</div>

</>

);

}



const metricBox={
border:"1px solid #ddd",
padding:"25px",
width:"200px",
borderRadius:"14px"
};


const actionBtn={
padding:"14px 22px",
borderRadius:"10px"
};


export default Home;