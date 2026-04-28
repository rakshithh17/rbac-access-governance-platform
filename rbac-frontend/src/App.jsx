import {
BrowserRouter,
Routes,
Route,
Navigate
}
from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Assets from "./pages/Assets";
import Resources from "./pages/Resources";
import Rules from "./pages/Rules";
import Requests from "./pages/Requests";
import RequestAccess from "./pages/RequestAccess";
import Notifications from "./pages/Notifications";



function ProtectedRoute({
children,
allowedRoles
}){

const role=
localStorage.getItem(
"role"
);

if(
!allowedRoles.includes(
role
)
){
return (
<Navigate to="/home"/>
);
}

return children;

}



function App(){

return(

<BrowserRouter>

<Routes>

<Route
path="/"
element={<Login/>}
/>


<Route
path="/home"
element={<Home/>}
/>


<Route
path="/assets"
element={<Assets/>}
/>



<Route
path="/resources"
element={
<ProtectedRoute
allowedRoles={[
"ADMIN",
"MANAGER",
"HR"
]}
>
<Resources/>
</ProtectedRoute>
}
/>



<Route
path="/rules"
element={
<ProtectedRoute
allowedRoles={[
"ADMIN"
]}
>
<Rules/>
</ProtectedRoute>
}
/>



<Route
path="/requests"
element={
<ProtectedRoute
allowedRoles={[
"ADMIN",
"MANAGER"
]}
>
<Requests/>
</ProtectedRoute>
}
/>



<Route
path="/request-access"
element={
<ProtectedRoute
allowedRoles={[
"USER",
"HR",
"SUPPORT",
"AUDITOR"
]}
>
<RequestAccess/>
</ProtectedRoute>
}
/>



<Route
path="/notifications"
element={
<Notifications/>
}
/>


</Routes>

</BrowserRouter>

);

}

export default App;