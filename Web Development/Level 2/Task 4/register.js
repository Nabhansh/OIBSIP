const registerBtn =
document.getElementById("registerBtn");

registerBtn.addEventListener(
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

    message.textContent = "";

    if(
        username === "" ||
        password === ""
    ){
        message.textContent =
        "All fields are required.";
        return;
    }

    if(
        password.length < 8 ||
        !/\d/.test(password)
    ){
        message.textContent =
        "Password must be at least 8 characters and contain 1 number.";
        return;
    }

    let users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];

    const exists =
        users.some(
            user =>
            user.username === username
        );

    if(exists){
        message.textContent =
        "User already exists.";
        return;
    }

    const hashedPassword =
        await hashPassword(password);

    users.push({
        username,
        password: hashedPassword
    });

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    message.style.color = "green";

    message.textContent =
    "Registration successful.";

    setTimeout(() => {
        location.href =
        "login.html";
    },1500);
});
