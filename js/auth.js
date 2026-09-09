async function login() {
debugger
    const username =
        document
            .getElementById("username")
            .value
            .trim();


    const password =
        document
            .getElementById("password")
            .value;


    if (!username ||
        !password) {

        showLoginMessage(
            currentLanguage === "mr"
                ? "Username आणि Password आवश्यक आहे."
                : "Username and password are required.",
            "error"
        );

        return;
    }


    const button =
        document.querySelector(
            ".login-btn"
        );

    button.disabled = true;


    try {


         // const response=  await apiRequest(
                   // '/auth/login',
                   // method: "POST",
                  // body: JSON.stringify({
                        // username,
                        // password,
                        // language:
                            // currentLanguage
                    // }) 
            // );
        const result =
            await fetch(
                `${API_BASE_URL}/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        username,
                        password,
                        language:
                            currentLanguage
                    })
                }
            );


        const data =
            await result.json();


        if (!result.ok) {

            throw new Error(
                data.message ||
                data.title ||
                "Login failed"
            );
        }


        /*
         IMPORTANT

         Adjust these names if your
         Auth API response uses different names.
        */

        const token =
            data.data.token ||
           data.data.accessToken;


        const user =
            data.data.user ||
            data.data.data ||
            data;


        if (!token) {

            throw new Error(
                "JWT token not returned by API."
            );
        }


        localStorage.setItem(
            "token",
            token
        );


        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

      
        localStorage.setItem(
            "language",
            currentLanguage
        );
localStorage.setItem(
    "role",
    user.role
);

localStorage.setItem(
    "employeeId",
    user.employeeId
);
localStorage.setItem(
    "BusinessId",
    user.businessId
);

localStorage.setItem(
    "loggedUserName",
    user.username
);

        document
            .getElementById("loginPage")
            .classList.add("hidden");


        document
            .getElementById("appPage")
             .classList.remove("hidden");
if (user.role === "EMPLOYEE") {

    setupRoleBasedMenu();

     navigate("check-in-out");

 }
 else {

     setupRoleBasedMenu();

     navigate("dashboard");

   }
     //setupRoleBasedMenu();

       // initializeApplication();

    }
    catch (error) {

        showLoginMessage(
            error.message,
            "error"
        );

    }
    finally {

        button.disabled = false;
    }
}


function showLoginMessage(
    message,
    type
) {

    const element =
        document.getElementById(
            "loginMessage"
        );


    element.textContent =
        message;


    element.className =
        `message ${type}`;
}


function togglePassword() {

    const input =
        document.getElementById(
            "password"
        );


    input.type =
        input.type === "password"
            ? "text"
            : "password";
}


function logout() {

    localStorage.removeItem(
        "token"
    );

    localStorage.removeItem(
        "currentUser"
    );


    document
        .getElementById("appPage")
        .classList.add("hidden");


    document
        .getElementById("loginPage")
        .classList.remove("hidden");


    document
        .getElementById("username")
        .value = "";

    document
        .getElementById("password")
        .value = "";
}


function getCurrentUser() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "currentUser"
            )
        );

    }
    catch {

        return null;
    }
}


function getUserRole() {

    const user =
        getCurrentUser();


    if (!user)
        return null;


    return (
        user.role ||
        user.Role ||
        user.userRole ||
        user.UserRole
    );
}


function getLoggedEmployeeId() {

    const user =
        getCurrentUser();


    if (!user)
        return null;


    return (
        user.employeeId ||
        user.EmployeeId ||
        user.employeeID
    );
}

function setupRoleBasedMenu() {

    const role =
        localStorage.getItem("role");


    const isOwner =
        role === "OWNER" ||
        role === "Admin";


    document
        .querySelectorAll(".owner-only")
        .forEach(element => {

            element.style.display =
                isOwner ? "" : "none";

        });


    document
        .querySelectorAll(".employee-only")
        .forEach(element => {

            element.style.display =
                isOwner ? "none" : "";

        });

}