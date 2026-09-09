const translations = {

    mr: {

        dashboard: "डॅशबोर्ड",
        employees: "कर्मचारी",
        attendance: "उपस्थिती",
        advance: "अॅडव्हान्स",
        salary: "पगार",
        reports: "रिपोर्ट",
        backup: "बॅकअप / Restore",
        logout: "Logout",

        ownerDashboard:
            "मालक डॅशबोर्ड",

        employeeDashboard:
            "कर्मचारी डॅशबोर्ड",

        totalEmployees:
            "एकूण कर्मचारी",

        presentToday:
            "आज उपस्थित",

        absentToday:
            "आज अनुपस्थित",

        pendingAdvance:
            "प्रलंबित अॅडव्हान्स",

        monthlySalary:
            "मासिक पगार"

    },


    en: {

        dashboard: "Dashboard",
        employees: "Employees",
        attendance: "Attendance",
        advance: "Advance",
        salary: "Salary",
        reports: "Reports",
        backup: "Backup / Restore",
        logout: "Logout",

        ownerDashboard:
            "Owner Dashboard",

        employeeDashboard:
            "Employee Dashboard",

        totalEmployees:
            "Total Employees",

        presentToday:
            "Present Today",

        absentToday:
            "Absent Today",

        pendingAdvance:
            "Pending Advance",

        monthlySalary:
            "Monthly Salary"

    }

};


let currentLanguage =
    localStorage.getItem(
        "language"
    ) || "mr";


function changeLanguage(language) {

    currentLanguage =
        language;

    localStorage.setItem(
        "language",
        language
    );


    document.documentElement.lang =
        language;


    applyTranslations();


    if (
        document.getElementById(
            "appPage"
        ) &&
        !document
            .getElementById("appPage")
            .classList.contains("hidden")
    ) {

        const currentPage =
            window.currentPage ||
            "dashboard";

        navigate(currentPage);
    }
}


function t(key) {

    return (
        translations[
            currentLanguage
        ]?.[key] || key
    );
}


function applyTranslations() {

    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.dataset.i18n;

            element.textContent =
                t(key);
        });


    if (currentLanguage === "mr") {

        document.getElementById(
            "loginTitle"
        ).textContent =
            "लॉगिन";

        document.getElementById(
            "usernameLabel"
        ).textContent =
            "Username";

        document.getElementById(
            "passwordLabel"
        ).textContent =
            "Password";

        document.getElementById(
            "loginButtonText"
        ).textContent =
            "लॉगिन करा";

    }
    else {

        document.getElementById(
            "loginTitle"
        ).textContent =
            "Login";

        document.getElementById(
            "usernameLabel"
        ).textContent =
            "Username";

        document.getElementById(
            "passwordLabel"
        ).textContent =
            "Password";

        document.getElementById(
            "loginButtonText"
        ).textContent =
            "Login";

    }
}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        const language =
            document.getElementById(
                "languageSelect"
            );

        if (language) {
            language.value =
                currentLanguage;
        }


        const appLanguage =
            document.getElementById(
                "appLanguage"
            );

        if (appLanguage) {
            appLanguage.value =
                currentLanguage;
        }


        applyTranslations();
    }
);