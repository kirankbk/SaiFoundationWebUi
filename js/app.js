window.currentPage =
    "dashboard";


function initializeApplication() {

    const user =
        getCurrentUser();


    if (!user) {

        logout();

        return;
    }


    /*
      This prevents OWNER name
      from appearing in employee dashboard.
    */

    const role =
        getUserRole();


    const name =
        user.employeeName ||
        user.EmployeeName ||
        user.name ||
        user.Name ||
        user.username ||
        user.Username ||
        "User";


    document.getElementById(
        "loggedUserName"
    ).textContent =
        name;


    document.getElementById(
        "loggedUserRole"
    ).textContent =
        role || "User";


    setupRoleBasedUI();


    navigate("dashboard");
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
function setupRoleBasedUIs() {

    const role =
        getUserRole();


    const owner =
        role?.toUpperCase() ===
        "OWNER";


    document
        .querySelectorAll(".owner-only")
        .forEach(element => {

            element.style.display =
                owner
                    ? ""
                    : "none";
        });
}

function navigate(page) {

    console.log("Navigate:", page);


    // Remove active from all menu items

    document
        .querySelectorAll(".menu-item")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    // Set clicked menu active

    const activeButton =
        document.querySelector(
            `.menu-item[data-page="${page}"]`
        );

    if (activeButton) {

        activeButton.classList.add("active");

    }


    switch (page) {

        case "dashboard":

            loadDashboard();

            break;


        case "employees":

            loadEmployeesPage();

            break;


        case "attendance":

            loadAttendancePage();

            break;


        case "advances":

            loadAdvancePage();

            break;


        case "salary":

            loadSalaryPage();

            break;
      case "LeaveApproval":

            loadAdminLeave();

            break;

        case "reports":

            loadReportsPage();

            break;


        case "backup":

            loadBackupPage();

            break;


        /* =================================
           EMPLOYEE
        ================================= */

        case "my-attendance":

        case "check-in-out":

        case "my-leave":

        case "my-salary":

        case "salary-slip":
            
            loadEmployeeDashboard();

            break;


        default:

            loadDashboard();

            break;
    }
}
function navigatess(page) {

    window.currentPage =
        page;


    document
        .querySelectorAll(
            ".menu-item"
        )
        .forEach(item => {

            item.classList.toggle(
                "active",
                item.dataset.page === page
            );
        });


    const title =
        document.getElementById(
            "pageTitle"
        );


    const content =
        document.getElementById(
            "pageContent"
        );


    if (page === "dashboard") {

        title.textContent =
            getUserRole()?.toUpperCase() ===
            "OWNER"
                ? t("ownerDashboard")
                : t("employeeDashboard");

        loadDashboard();
    }


    else if (page === "employees") {

        title.textContent =
            t("employees");

        loadEmployeesPage();
    }


    else if (page === "attendance") {

        title.textContent =
            t("attendance");

        loadAttendancePage();
    }


    else if (page === "advances") {

        title.textContent =
            t("advance");

        loadAdvancePage();
    }


    else if (page === "salary") {

        title.textContent =
            t("salary");

        loadSalaryPage();
    }


    else if (page === "reports") {

        title.textContent =
            t("reports");

        loadReportsPage();
    }


    else if (page === "backup") {

        title.textContent =
            t("backup");

        loadBackupPage();
    }
}


function toggleSidebar() {

    document
        .getElementById("sidebar")
        .classList.toggle("open");
}


function closeSidebarMobile() {

    if (
        window.innerWidth <= 900
    ) {

        document
            .getElementById("sidebar")
            .classList.remove("open");
    }
}


function openModal(id) {

    document
        .getElementById(id)
        .classList.add("show");


    document.body.classList.add(
        "modal-open"
    );
}


function closeModal(id) {

    document
        .getElementById(id)
        .classList.remove("show");


    document.body.classList.remove(
        "modal-open"
    );
}


window.addEventListener(
    "click",
    event => {

        if (
            event.target.classList
                .contains("modal")
        ) {

            event.target
                .classList
                .remove("show");

            document.body
                .classList
                .remove("modal-open");
        }
    }
);

function getToday() {

    const date =
        new Date();


    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    return `${year}-${month}-${day}`;
}


function getCurrentMonth() {

    const date =
        new Date();


    return `${date.getFullYear()}-${
        String(
            date.getMonth() + 1
        ).padStart(2, "0")
    }`;
}


function formatCurrency(
    amount
) {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2
        }
    ).format(
        Number(amount || 0)
    );
}


function formatDate(
    value
) {

    if (!value)
        return "-";


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return value;
    }


    return date.toLocaleDateString(
        "en-IN"
    );
}


function statusBadge(
    status
) {

    const value =
        String(
            status || ""
        );


    const lower =
        value.toLowerCase();


    let css =
        "status-generated";


    if (
        lower === "present" ||
        lower === "paid" ||
        lower === "approved"
    ) {

        css =
            lower === "present"
                ? "status-present"
                : lower === "paid"
                    ? "status-paid"
                    : "status-approved";
    }


    else if (
        lower === "absent"
    ) {

        css =
            "status-absent";
    }


    else if (
        lower === "leave"
    ) {

        css =
            "status-leave";
    }


    return `

        <span class="status-badge ${css}">
            ${value}
        </span>

    `;
}


function showToast(
    message,
    type = "success"
) {

    const existing =
        document.querySelector(
            ".toast"
        );


    if (existing)
        existing.remove();


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        "toast";


    toast.textContent =
        message;


    if (type === "error") {

        toast.style.background =
            "#dc2626";
    }


    document.body.appendChild(
        toast
    );


    setTimeout(
        () => toast.remove(),
        3500
    );
}