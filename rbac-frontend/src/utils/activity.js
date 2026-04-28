export const getActivities = () => {
const data = localStorage.getItem("activities");

if(data){
 return JSON.parse(data);
}

const seed = [
"Admin logged in",
"Viewed RBAC dashboard",
"Loaded asset inventory"
];

localStorage.setItem(
"activities",
JSON.stringify(seed)
);

return seed;
};


export const addActivity = (message) => {

const current =
getActivities();

const updated = [
message,
...current
].slice(0,10);

localStorage.setItem(
"activities",
JSON.stringify(updated)
);

};