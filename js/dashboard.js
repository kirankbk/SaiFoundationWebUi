async function loadDashboard() {
debugger
    const content =
        document.getElementById(
            "pageContent"
        );


    const role =
        getUserRole();


    if (
        role?.toUpperCase() ===
        "OWNER"
    ) {
		
		const username=localStorage.getItem(
              "loggedUserName"    
               );
			   const userrole=localStorage.getItem(
              "role"    
               );
       document.getElementById(
        "loggedUserName"
    ).textContent=username;
	   
			   
			   document
            .getElementById("loggedUserRole")
            .textContent=userrole;
        await loadOwnerDashboard();
		

    }
    else {

        //await loadEmployeeDashboard();
		//await loadEmployeeProfile();

    //await loadEmployeeTodayAttendance();

    //await loadEmployeeLeaves();

    //initializeAttendanceMonths();

    }
	 document.getElementById(
        "employeeModalTitle"
    ).textContent=localStorage.getItem(
              "loggedUserName"    
               );
	   
			   
			   document
            .getElementById("loggedUserRole")
            .textContent=localStorage.getItem(
              "role"    
               );
}

async function loadEmployeeProfile() {

    const token = localStorage.getItem("token");

    const response = await apiRequest(
        `/employees/me`
    );


    //const employee = await response.json();


    document.getElementById(
        "employeeName"
    ).textContent =
        `${response.employee.firstName} ${response.employee.lastName}`;


    document.getElementById(
        "employeeBusiness"
    ).textContent =
        response.employee.businessType;


    document.getElementById(
        "employeeSalary"
    ).textContent =
        `Monthly Salary: ₹${response.employee.salary}`;

}

function initializeAttendanceMonths() {

    const select =
        document.getElementById(
            "employeeAttendanceMonth"
        );

    select.innerHTML = "";

    const today = new Date();


    for (let i = 0; i < 2; i++) {

        const date =
            new Date(
                today.getFullYear(),
                today.getMonth() - i,
                1
            );


        const year =
            date.getFullYear();

        const month =
            String(
                date.getMonth() + 1
            ).padStart(2, "0");


        const value =
            `${year}-${month}`;


        const option =
            document.createElement("option");


        option.value = value;

        option.textContent =
            date.toLocaleDateString(
                "en-IN",
                {
                    month: "long",
                    year: "numeric"
                }
            );


        select.appendChild(option);

    }

}

async function loadOwnerDashboard() {

    const content =
        document.getElementById(
            "pageContent"
        );


    content.innerHTML = `

        <div class="page-heading">

            <div>

                <h1>
                    ${t("ownerDashboard")}
                </h1>

                <p>
                    SAI ENTERPRISES |
                    मालक: शरद ठाकरे
                </p>

            </div>

            <button
                class="primary-btn"
                onclick="navigate('employees')">

                + कर्मचारी

            </button>

        </div>


        <div class="stats-grid">

            <div class="stat-card">

                <div class="stat-icon">
                    👥
                </div>

                <div>

                    <span>
                        ${t("totalEmployees")}
                    </span>

                    <strong id="totalEmployees">
                        0
                    </strong>

                </div>

            </div>


            <div class="stat-card">

                <div class="stat-icon">
                    🟢
                </div>

                <div>

                    <span>
                        ${t("presentToday")}
                    </span>

                    <strong id="presentToday">
                        0
                    </strong>

                </div>

            </div>


            <div class="stat-card">

                <div class="stat-icon">
                    🔴
                </div>

                <div>

                    <span>
                        ${t("absentToday")}
                    </span>

                    <strong id="absentToday">
                        0
                    </strong>

                </div>

            </div>


            <div class="stat-card">

                <div class="stat-icon">
                    💰
                </div>

                <div>

                    <span>
                        ${t("pendingAdvance")}
                    </span>

                    <strong id="pendingAdvance">
                        ₹0
                    </strong>

                </div>

            </div>

        </div>


        <div class="section-card">

            <div class="section-header">

                <h2>
                    Business-wise Employees
                </h2>

                <button
                    class="secondary-btn"
                    onclick="navigate('employees')">

                    सर्व कर्मचारी

                </button>

            </div>

            <div
                id="businessEmployeeCards"
                class="business-grid">

            </div>

        </div>

    `;


    await loadDashboardStats();

    closeSidebarMobile();
}


async function loadDashboardStats() {

    try {
debugger
        const employees =
            await apiRequest(
                "/employees"
            );


        const list =
            employees.data ||
            employees.employees ||
            employees;


        const employeeList =
            Array.isArray(list)
                ? list
                : [];


        document.getElementById(
            "totalEmployees"
        ).textContent =
            employeeList.length;


        renderBusinessEmployees(
            employeeList
        );


        /*
          Attendance endpoint may return
          a different DTO depending on your API.
        */

        try {

            const attendance =
                await apiRequest(
                    "/attendance?date=" +
                    getToday()
                );


            const records =
                attendance.data ||
                attendance.attendance ||
                attendance;


            const recordsList =
                Array.isArray(records)
                    ? records
                    : [];


            document.getElementById(
                "presentToday"
            ).textContent =
                recordsList.filter(
                    x =>
                        (
                            x.status ||
                            x.Status
                        )?.toLowerCase() ===
                        "present"
                ).length;


            document.getElementById(
                "absentToday"
            ).textContent =
                recordsList.filter(
                    x =>
                        (
                            x.status ||
                            x.Status
                        )?.toLowerCase() ===
                        "absent"
                ).length;

        }
        catch {
            // Keep dashboard available
        }


    }
    catch (error) {

        console.error(
            error
        );
    }
}


function renderBusinessEmployees(
    employees
) {

    const businesses = [

        {
            key: "Sai Way Wajan Kata",
            name: "श्री साई वे ब्रिज"
        },

        {
            key: "Hotel Anandraj",
            name: "हॉटेल आनंदराज"
        },

        {
            key: "Chintamani Petrol Pump",
            name: "चिंतामणी पेट्रोल पंप"
        },

        {
            key: "Hotel Rajnandini",
            name: "हॉटेल राजनंदिनी"
        }

    ];


    const container =
        document.getElementById(
            "businessEmployeeCards"
        );


    container.innerHTML =
        businesses
            .map(business => {

                const count =
                    employees.filter(
                        employee => {

                            const value =
                                employee.businessNameMarathi ||
                                employee.businessNameMarathi ||
                                employee.businessNameMarathi ||
                                employee.businessNameMarathi;

                            return value ===
                                business.key ||
                                value ===
                                business.name;
                        }
                    ).length;


                return `

                    <div class="business-card">

                        <div class="business-icon">
                            🏢
                        </div>

                        <div>

                            <h3>
                                ${business.name}
                            </h3>

                            <strong>
                                ${count}
                            </strong>

                            <span>
                                कर्मचारी
                            </span>

                        </div>

                    </div>

                `;

            })
            .join("");
}


async function loadEmployeeDashboardss() {
debugger
    const content =
        document.getElementById(
            "pageContent"
        );


    /*
      IMPORTANT:
      employeeId comes from JWT/login response,
      not owner information.
    */

    const employeeId =
        getLoggedEmployeeId();


    const user =
        getCurrentUser();


    const employeeName =
        user?.employeeName ||
        user?.EmployeeName ||
        user?.name ||
        user?.Name ||
        user?.username ||
        user?.Username ||
        "Employee";


    content.innerHTML = `

        <div class="page-heading">

            <div>

                <h1>
                    नमस्कार,
                    ${employeeName}
                </h1>

                <p>
                    Employee Dashboard
                </p>

            </div>

        </div>


        <div class="profile-card">

            <div class="profile-avatar">
                👤
            </div>

            <div>

                <h2>
                    ${employeeName}
                </h2>

                <p>
                    Employee ID:
                    ${employeeId || "-"}
                </p>

            </div>

        </div>


        <div class="stats-grid">

            <div class="stat-card">

                <div class="stat-icon">
                    📅
                </div>

                <div>

                    <span>
                        या महिन्यातील उपस्थिती
                    </span>

                    <strong id="employeePresent">
                        0
                    </strong>

                </div>

            </div>


            <div class="stat-card">

                <div class="stat-icon">
                    💰
                </div>

                <div>

                    <span>
                        Advance Balance
                    </span>

                    <strong id="employeeAdvance">
                        ₹0
                    </strong>

                </div>

            </div>


            <div class="stat-card">

                <div class="stat-icon">
                    💵
                </div>

                <div>

                    <span>
                        Current Salary
                    </span>

                    <strong id="employeeSalary">
                        ₹0
                    </strong>

                </div>

            </div>

        </div>


        <div class="section-card">

            <div class="section-header">

                <h2>
                    माझी उपस्थिती
                </h2>

                <button
                    class="secondary-btn"
                    onclick="navigate('attendance')">

                    तपशील

                </button>

            </div>

            <div id="employeeAttendanceTable">
            </div>

        </div>

    `;

await loadEmployeeAdvanceBalanceData(employeeId);
    await loadEmployeeDashboardData(
        employeeId
    );
await loadEmployeeCureentSalary(employeeId);

    closeSidebarMobile();
}


async function loadEmployeeDashboardData(
    employeeId
) {
debugger
    if (!employeeId)
        return;


    try {

        const response =
            await apiRequest(
                `/attendance/employee/${employeeId}`
            );


        const data =
            response.data ||
            response.attendance ||
            response;


        const records =
            Array.isArray(data)
                ? data
                : [];


        const month =
            new Date().getMonth() + 1;


        const year =
            new Date().getFullYear();


        const currentMonth =
            records.filter(x => {

                const date =
                    new Date(
                        x.date ||
                        x.attendanceDate ||
                        x.AttendanceDate
                    );

                return (
                    date.getMonth() + 1 ===
                    month &&
                    date.getFullYear() ===
                    year
                );

            });


        const present =
            currentMonth.filter(
                x =>
                    (
                        x.status ||
                        x.Status
                    )?.toLowerCase() ===
                    "present"
            ).length;


        const element =
            document.getElementById(
                "employeePresent"
            );


        if (element)
            element.textContent =
                present;


        renderEmployeeAttendance(
            currentMonth
        );

    }
    catch (error) {

        console.error(
            error
        );
    }
}

async function loadEmployeeAdvanceBalanceData(
    employeeId
) {
debugger
    if (!employeeId)
        return;


    try {

        const response =
            await apiRequest(
                `/advance/balance/${employeeId}`
            );


        const data =
            response.data ||
            response.advance ||
            response;


        




        const element =
            document.getElementById(
                "employeeAdvance"
            );


        if (element)
            element.textContent =
                data.totalAdvance;


        

    }
    catch (error) {

        console.error(
            error
        );
    }
}




async function loadEmployeeCureentSalary(
    employeeId
) {
debugger
    if (!employeeId)
        return;


    try {

        const response =
            await apiRequest(
                `/salary`
            );


        const data =
            response.data ||
            response.advance ||
            response;


        
       const currentSlary =
        data.find(
            x =>
                (
                    x.employeeId ||
                    x.employeeId ||
                    x.employeeId
                ) == employeeId
        );


    if (!currentSlary)
        return;




        const element =
            document.getElementById(
                "employeeSalary"
            );


        if (element)
            element.textContent =
          currentSlary.monthlySalary;


        

    }
    catch (error) {

        console.error(
            error
        );
    }
}




function renderEmployeeAttendance(
    records
) {

    const container =
        document.getElementById(
            "employeeAttendanceTable"
        );


    if (!records.length) {

        container.innerHTML =
            `<div class="empty-state">
                या महिन्यात attendance उपलब्ध नाही.
            </div>`;

        return;
    }


    container.innerHTML = `

        <div class="table-wrapper">

            <table>

                <thead>

                    <tr>

                        <th>
                            तारीख
                        </th>

                        <th>
                            Status
                        </th>

                    </tr>

                </thead>

                <tbody>

                    ${records
                        .slice(-10)
                        .reverse()
                        .map(record => `

                            <tr>

                                <td>
                                    ${formatDate(
                                        record.date ||
                                        record.attendanceDate ||
                                        record.AttendanceDate
                                    )}
                                </td>

                                <td>
                                    ${statusBadge(
                                        record.status ||
                                        record.Status
                                    )}
                                </td>

                            </tr>

                        `)
                        .join("")}

                </tbody>

            </table>

        </div>

    `;
}