const user =
localStorage.getItem(
    "sessionUser"
);

if(!user){

    location.href =
    "login.html";
}

document
.getElementById("welcome")
.textContent =
`Welcome, ${user}`;

document
.getElementById("logoutBtn")
.addEventListener(
    "click",
    () => {

    localStorage.removeItem(
        "sessionUser"
    );

    location.href =
    "login.html";
});
