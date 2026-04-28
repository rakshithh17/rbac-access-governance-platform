import {
useState,
useEffect
}
from "react";

import Header
from "../components/Header";

import api
from "../services/api";


function Resources(){

const roleMap={
1:"ADMIN",
2:"MANAGER",
3:"HR",
4:"USER",
5:"AUDITOR",
6:"SUPPORT"
};


const [users,setUsers]=
useState([]);

const [username,setUsername]=
useState("");

const [email,setEmail]=
useState("");

const [roleId,setRoleId]=
useState(4);

const [editingId,setEditingId]=
useState(null);



useEffect(()=>{
loadUsers();
},[]);



const loadUsers=async()=>{

const res=
await api.get(
"/users"
);

setUsers(
res.data
);

};



const saveUser=async()=>{

if(
username.trim()===""
){
return;
}


if(editingId){

await api.put(
`/users/${editingId}`,
{
username,
email,
roleId
}
);

alert(
"User Updated"
);

}
else{

await api.post(
"/users",
{
username,
email,
roleId
}
);

alert(
"User Created"
);

}


setUsername("");
setEmail("");
setRoleId(4);
setEditingId(null);

loadUsers();

};



const editUser=(user)=>{

setEditingId(
user.id
);

setUsername(
user.username
);

setEmail(
user.email
);

setRoleId(
user.roleId
);

};



const deleteUser=
async(id)=>{

await api.delete(
`/users/${id}`
);

alert(
"User Deleted"
);

loadUsers();

};



return(

<>

<Header/>

<div style={{
padding:"30px"
}}>

<h1>
Identity Administration
</h1>



<h2>
User Lifecycle Management
</h2>


<div style={{
marginBottom:"30px"
}}>

<input
placeholder="Username"
value={username}
onChange={e=>
setUsername(
e.target.value
)
}
/>


<input
placeholder="Email"
value={email}
onChange={e=>
setEmail(
e.target.value
)
}
style={{
marginLeft:"10px"
}}
/>


<select
value={roleId}
onChange={e=>
setRoleId(
Number(
e.target.value
)
)
}
style={{
marginLeft:"10px"
}}
>

<option value="1">
ADMIN
</option>

<option value="2">
MANAGER
</option>

<option value="3">
HR
</option>

<option value="4">
USER
</option>

<option value="5">
AUDITOR
</option>

<option value="6">
SUPPORT
</option>

</select>



<button
onClick={saveUser}
style={{
marginLeft:"12px", color: "#f0f2f7", backgroundColor: "#0a0909",borderRadius: "6px"

}}
>

{
editingId
?
"Update User"
:
"Create User"
}

</button>

</div>




<table
border="1"
cellPadding="12"
style={{
borderCollapse:"collapse",
width:"100%"
}}
>

<thead>

<tr>
<th>User</th>
<th>Email</th>
<th>Role</th>
<th>Actions</th>
</tr>

</thead>


<tbody>

{
users.map(user=>(

<tr key={user.id}>

<td>
{user.username}
</td>

<td>
{user.email}
</td>

<td>
{
roleMap[
user.roleId
]
}
</td>


<td>

<button
onClick={()=>
editUser(user)

}
style={{
color: "#f0f2f7", backgroundColor: "#0a0909",borderRadius: "6px"
}}
>
Update
</button>


<button
onClick={()=>
deleteUser(
user.id
)
}
style={{
marginLeft:"10px",color: "#f0f2f7", backgroundColor: "#0a0909",borderRadius: "6px"
}}
>
Delete
</button>

</td>

</tr>

))
}

</tbody>

</table>

</div>

</>

);

}

export default Resources;