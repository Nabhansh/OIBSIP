const loginBtn =
document.getElementById("loginBtn");

loginBtn.addEventListener(
    "click",
    async () => {

    const username =
    document
    .getElementById("username")
    .value
    .trim();

    const password =
    document
    .getElementById("password")
    .value;

    const message =
    document
    .getElementById("message");

    if(
        username === "" ||
        password === ""
    ){
        message.textContent =
        "All fields are required.";
        return;
    }

    const hashedPassword =
        await hashPassword(password);

    const users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];

    const user =
        users.find(
            u =>
            u.username === username &&
            u.password === hashedPassword
        );

    if(!user){

        message.textContent =
        "Invalid credentials.";

        return;
    }

    localStorage.setItem(
        "sessionUser",
        username
    );

    location.href =
    "dashboard.html";
});
