import { useEffect, useState } from "react";
import Header from "../components/Header";
import { addActivity } from "../utils/activity";
import api from "../services/api";

function Assets(){

const [assets,setAssets]=useState([]);
const [grants,setGrants]=useState([]);
const [tick,setTick]=useState(0);
const [editingId,setEditingId]=
useState(null);

const [editName,setEditName]=
useState("");

const [editType,setEditType]=
useState("");

const [showCreate,setShowCreate]=
useState(false);

const [newName,setNewName]=
useState("");

const [newType,setNewType]=
useState("");



useEffect(()=>{

fetchAssets();
loadGrants();

const timer=
setInterval(()=>{
setTick(p=>p+1);
},1000);

const grantPoll=
setInterval(()=>{
loadGrants();
},3000);

return()=>{
clearInterval(timer);
clearInterval(grantPoll);
};

},[]);



const fetchAssets=async()=>{

const res=
await api.get("/assets");

if(Array.isArray(res.data)){
setAssets(res.data);
}
else if(res.data.content){
setAssets(res.data.content);
}
else{
setAssets([]);
}

};



const loadGrants=async()=>{

const username=
localStorage.getItem("username");

if(username==="admin"){
return;
}

const res=
await api.get(
`/access/grants/${username}`
);

setGrants(res.data);

};



const hasGrant=(
assetName,
operation
)=>{

const username=
localStorage.getItem(
"username"
);

if(username==="admin"){
return true;
}

return grants.some(g=>{

if(
g.expiresAt &&
new Date(g.expiresAt)
<
new Date()
){
return false;
}

return(

g.action===operation
&&
(
operation==="CREATE"
||
g.assetName?.trim()
.toLowerCase()
===
assetName?.trim()
.toLowerCase()
)

);

});

};



const deleteAsset=
async(id)=>{

await api.delete(
`/assets/${id}`
);

alert(
"Asset Deleted"
);

addActivity(
"Asset delete executed"
);

fetchAssets();

};



const updateAsset=
(asset)=>{

setEditingId(
asset.id
);

setEditName(
asset.name
);

setEditType(
asset.type
);

};

const saveUpdate=
async(id)=>{

await api.put(

`/assets/${id}`,

{
name:editName,
type:editType
}

);

alert(
"Asset Updated"
);

setEditingId(
null
);

fetchAssets();

};



const createAsset=()=>{

setShowCreate(
true
);

};

const saveCreate=
async()=>{

if(
newName.trim()===""
||
newType.trim()===""
){
alert(
"Enter name and type"
);
return;
}

await api.post(
"/assets",
{
name:newName,
type:newType
}
);

alert(
"Asset Created"
);

setShowCreate(
false
);

setNewName("");
setNewType("");

fetchAssets();

};



return(

<>

<Header/>

<div style={{padding:"30px"}}>

<h2>
Asset Management
</h2>


{
hasGrant(
null,
"CREATE"
)
&&

<>

<button
onClick={createAsset}
style={{
marginBottom:"20px" ,color: "#f0f2f7", backgroundColor: "#0a0909" ,borderRadius: "6px"
}}
>
Create Asset
</button>


{
showCreate &&

<div style={{
border:"1px solid gray",
padding:"20px",
marginBottom:"25px"
}}>

<h3>Create New Asset</h3>

<input
placeholder="Asset Name"
value={newName}
onChange={e=>
setNewName(
e.target.value
)
}
/>

<input
placeholder="Asset Type"
value={newType}
onChange={e=>
setNewType(
e.target.value
)
}
style={{
marginLeft:"10px"
}}
/>

<button
onClick={saveCreate}
style={{
marginLeft:"10px",color: "#f0f2f7", backgroundColor: "#0a0909",borderRadius: "6px"
}}
>
Save
</button>

<button
onClick={()=>
setShowCreate(
false
)
}
style={{
marginLeft:"8px",color: "#f0f2f7", backgroundColor: "#0a0909",borderRadius: "6px"
}}
>
Cancel
</button>

</div>

}

</>

}


<ul>

{
assets.map(asset=>(

<li
key={asset.id}
style={{
marginBottom:"18px"
}}
>

{
editingId===asset.id

?

<>

<input
value={editName}
onChange={e=>
setEditName(
e.target.value
)
}
/>

<input
value={editType}
onChange={e=>
setEditType(
e.target.value
)
}
style={{
marginLeft:"8px"
}}
/>

<button
onClick={()=>
saveUpdate(
asset.id
)
}
style={{
marginLeft:"10px",color: "#f0f2f7", backgroundColor: "#0a0909",borderRadius: "6px"
}}
>
Save
</button>

<button
onClick={()=>
setEditingId(
null
)
}
style={{
marginLeft:"8px",color: "#f0f2f7", backgroundColor: "#0a0909",borderRadius: "6px"
}}
>
Cancel
</button>

</>

:

<>
{asset.name}
-
{asset.type}
</>

}



{
hasGrant(
asset.name,
"UPDATE"
)
&&

<button
style={{
marginLeft:"15px",color: "#f0f2f7", backgroundColor: "#0a0909",borderRadius: "6px"
}}
onClick={()=>
updateAsset(
asset
)
}
>
Update
</button>

}



{
hasGrant(
asset.name,
"DELETE"
)
&&

<button
style={{
marginLeft:"10px",color: "#f0f2f7", backgroundColor: "#0a0909",borderRadius: "6px"
}}
onClick={()=>
deleteAsset(
asset.id
)
}
>
Delete
</button>

}

</li>

))
}

</ul>

</div>

</>

);

}

export default Assets;