import {useEffect,useState}
from "react";

import Header
from "../components/Header";

import api
from "../services/api";


function Rules(){

const [rules,setRules]=
useState([]);

useEffect(()=>{
loadRules();
},[]);




const loadRules=
async()=>{

try{

const res=
await api.get(
"/access/rules"
);

setRules(
res.data
);

}
catch(e){

console.log(e);

alert(
"Failed loading rules"
);

}

};






const hasPermission=(
role,
resource,
action
)=>{

return rules.some(
rule=>

rule.roleName===role

&&

rule.resource===resource

&&

rule.action===action

&&

rule.allowed===true

);

};



const roles=[
"ADMIN",
"MANAGER",
"USER"
];


const permissions=[

["USER","READ"],
["ASSET","READ"],
["ASSET","CREATE"],
["ASSET","UPDATE"],
["ASSET","DELETE"]

];





return(

<>

<Header/>


<div style={{
padding:"35px",
maxWidth:"1100px",
margin:"0 auto"
}}>


<h1>
Access Policy Matrix
</h1>

<p style={{
color:"#666",
marginBottom:"30px"
}}>
Dynamic authorization policy evaluation by role
</p>




<div style={{
background:"#f7f7f7",
padding:"25px",
borderRadius:"16px",
boxShadow:
"0 2px 6px rgba(0,0,0,.06)"
}}>


<table
style={{
width:"100%",
borderCollapse:"collapse",
background:"#fff"
}}
>

<thead>

<tr style={{
background:"#eef4ff"
}}>

<th style={thStyle}>
Permission
</th>

{
roles.map(role=>(

<th
key={role}
style={thStyle}
>
{role}
</th>

))
}

</tr>

</thead>



<tbody>

{
permissions.map(
([resource,action],index)=>(

<tr
key={index}
style={{
borderBottom:
"1px solid #ddd"
}}
>

<td style={tdStyle}>
{resource} {action}
</td>


{
roles.map(role=>(

<td
key={role}
style={tdStyle}
>

{
hasPermission(
role,
resource,
action
)

?

"✔"

:

"✖"
}

</td>

))
}

</tr>

))
}

</tbody>

</table>


</div>






<h2 style={{
marginTop:"50px"
}}>
Configured Rule Count:
{rules.length}
</h2>



</div>

</>

);

}




const thStyle={

padding:"14px",
textAlign:"center",
border:"1px solid #ddd"

};


const tdStyle={

padding:"14px",
textAlign:"center",
border:"1px solid #ddd"

};



export default Rules;