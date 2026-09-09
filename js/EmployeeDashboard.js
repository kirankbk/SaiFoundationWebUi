

async function loadEmployeeDashboard() {
debugger
    const pageContent =
        document.getElementById("pageContent");


    if (!pageContent) {

        console.error(
            "pageContent element not found."
        );

        return;
    }
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
   


  

    pageContent.innerHTML = `

<!-- =====================================================
     EMPLOYEE DASHBOARD HEADER
===================================================== -->

<div class="employee-dashboard-header">

    <div class="employee-header-left">

        <div class="employee-header-icon">
            👨‍💼
        </div>

        <div>

            <h1>
                Employee Dashboard
            </h1>

            <p id="employeeWelcome">
                Welcome
            </p>

        </div>

    </div>

</div>



<!-- =====================================================
     EMPLOYEE PROFILE
===================================================== -->

<div class="employee-profile-card">

    <div class="employee-profile-left">

        <div class="profile-icon">
            👤
        </div>

        <div class="employee-profile-info">

            <h2 id="employeeName">
                Employee Name
            </h2>

            <p id="employeeBusiness">
                Business
            </p>

            <p id="employeeSalary">
                Monthly Salary: ₹0
            </p>

        </div>

    </div>


    <div class="employee-profile-right">

        <div class="profile-info-item">

            <span>
                Employee Status
            </span>

            <strong class="active-status">
                ● Active
            </strong>

        </div>

    </div>

</div>



<!-- =====================================================
     TODAY ATTENDANCE
===================================================== -->

<div class="employee-section-header">

    <div>

        <span class="section-small-title">
            ATTENDANCE
        </span>

        <h2>
            📅 आजची उपस्थिती
        </h2>

    </div>

</div>



<div class="employee-attendance-card">


    <!-- CHECK IN -->

    <div class="attendance-time-box">

        <div class="attendance-box-icon checkin-icon">
            🟢
        </div>

        <div class="attendance-box-content">

            <span>
                Check In
            </span>

            <strong id="todayCheckIn">
                --:--
            </strong>

            <small>
                आजची Check In वेळ
            </small>

        </div>

    </div>



    <!-- CHECK OUT -->

    <div class="attendance-time-box">

        <div class="attendance-box-icon checkout-icon">
            🔴
        </div>

        <div class="attendance-box-content">

            <span>
                Check Out
            </span>

            <strong id="todayCheckOut">
                --:--
            </strong>

            <small>
                आजची Check Out वेळ
            </small>

        </div>

    </div>



    <!-- STATUS -->

    <div class="attendance-time-box">

        <div class="attendance-box-icon status-icon">
            📊
        </div>

        <div class="attendance-box-content">

            <span>
                Status
            </span>

            <strong id="todayAttendanceStatus">
                Not Marked
            </strong>

            <small>
                आजची उपस्थिती
            </small>

        </div>

    </div>

</div>



<!-- =====================================================
     CHECK IN / CHECK OUT ACTION
===================================================== -->

<div class="attendance-action-card">

    <div class="attendance-action-info">

        <strong>
            आजची उपस्थिती नोंदवा
        </strong>

        <span>
            कामावर आल्यावर Check In आणि काम पूर्ण झाल्यावर
            Check Out करा.
        </span>

    </div>


    <div class="attendance-action-buttons">

        <button
            id="employeeCheckInBtn"
            class="employee-checkin-btn"
            onclick="employeeCheckIn()">

            <span>
                🟢
            </span>

            Check In

        </button>


        <button
            id="employeeCheckOutBtn"
            class="employee-checkout-btn"
            onclick="employeeCheckOut()">

            <span>
                🔴
            </span>

            Check Out

        </button>

    </div>

</div>



<!-- =====================================================
     MY ATTENDANCE
===================================================== -->

<div class="employee-section-header">

    <div>

        <span class="section-small-title">
            ATTENDANCE HISTORY
        </span>

        <h2>
            📊 माझी उपस्थिती
        </h2>

    </div>

</div>



<div class="employee-filter-card">

    <div class="employee-filter-content">

        <div class="filter-field">

            <label for="employeeAttendanceMonth">
                Select Month
            </label>

            <select
                id="employeeAttendanceMonth">

                <option value="">
                    Select Month
                </option>

            </select>

        </div>


        <button
            class="employee-primary-btn"
            onclick="loadEmployeeAttendance()">

            🔍 View Attendance

        </button>

    </div>

</div>



<div class="employee-table-card">

    <div class="employee-table-header">

        <div>

            <h3>
                Attendance Details
            </h3>

            <p>
                Monthly attendance records
            </p>

        </div>

    </div>


    <div class="employee-table-wrapper">

        <table class="data-table">

            <thead>

                <tr>

                    <th>
                        तारीख
                    </th>

                    <th>
                        Check In
                    </th>

                    <th>
                        Check Out
                    </th>

                    <th>
                        Status
                    </th>

                </tr>

            </thead>


            <tbody
                id="employeeAttendanceTableBody">

            </tbody>

        </table>

    </div>

</div>



<!-- =====================================================
     MY LEAVE
===================================================== -->

<div class="employee-section-header leave-section-header">

    <div>

        <span class="section-small-title">
            LEAVE MANAGEMENT
        </span>

        <h2>
            📝 माझ्या रजा
        </h2>

    </div>


    <button
        type="button"
        class="employee-apply-leave-btn"
        onclick="openEmployeeLeaveModal()">

        <span>
            ＋
        </span>

        Apply Leave

    </button>

</div>



<div class="employee-table-card">

    <div class="employee-table-header">

        <div>

            <h3>
                Leave History
            </h3>

            <p>
                तुमच्या रजेच्या अर्जांची माहिती
            </p>

        </div>

    </div>


    <div class="employee-table-wrapper">

        <table class="data-table">

            <thead>

                <tr>

                    <th>
                        From
                    </th>

                    <th>
                        To
                    </th>

                    <th>
                        Days
                    </th>

                    <th>
                        Reason
                    </th>

                    <th>
                        Status
                    </th>

                </tr>

            </thead>


            <tbody
                id="employeeLeaveTableBody">

            </tbody>

        </table>

    </div>

</div>



<!-- =====================================================
     MY SALARY
===================================================== -->

<div class="employee-section-header">

    <div>

        <span class="section-small-title">
            PAYROLL
        </span>

        <h2>
            💰 माझा पगार
        </h2>

    </div>

</div>



<div class="employee-salary-selector">

    <div class="filter-field">

        <label for="employeeSalaryMonth">
            Salary Month
        </label>

        <input
            type="month"
            id="employeeSalaryMonth">

    </div>


    <button
        class="employee-primary-btn"
        onclick="loadEmployeeSalary()">

        🔍 View Salary

    </button>


    <button
        class="employee-download-btn"
        onclick="downloadMySalarySlip()">

        📄 Download Salary Slip

    </button>

</div>



<div
    id="employeeSalaryResult"
    class="employee-salary-result">

    <div class="salary-empty-state">

        <div class="salary-empty-icon">
            💰
        </div>

        <h3>
            Salary Information
        </h3>

        <p>
            Select a salary month to view your salary details.
        </p>

    </div>

</div>



<!-- =====================================================
     EMPLOYEE FOOTER
===================================================== -->

<div class="employee-dashboard-footer">

    <div>

        <strong>
            SHREE SAI ENTERPRISES
        </strong>

        <span>
            Employee Management System
        </span>

    </div>


    <div>

        <strong>
            SAI FOUNDATION
        </strong>

        <span>
            Salary & Attendance Management
        </span>

    </div>

</div>

`;
        

   await loadEmployeeProfiles();

   await loadEmployeeTodayAttendances();

   await loadEmployeeLeavess();

    await initializeEmployeeAttendanceMonths();

}

function openEmployeeLeaveModal() {

    const modal =
        document.getElementById(
            "employeeLeaveModal"
        );

    if (!modal) {
        console.error(
            "employeeLeaveModal not found."
        );
        return;
    }

    // Reset form
    const form =
        document.getElementById(
            "employeeLeaveForm"
        );

    if (form) {
        form.reset();
    }

    // Clear error
    //clearEmployeeLeaveError();

    // Reset leave days
    const daysContainer =
        document.getElementById(
            "employeeLeaveDays"
        );

    const daysCount =
        document.getElementById(
            "employeeLeaveDaysCount"
        );

    if (daysContainer) {
        daysContainer.style.display = "none";
    }

    if (daysCount) {
        daysCount.textContent = "0";
    }

    modal.style.display = "flex";

    document.body.style.overflow = "hidden";
}

document.addEventListener(
    "change",
    function (event) {

        if (
            event.target.id ===
                "employeeLeaveFrom" ||

            event.target.id ===
                "employeeLeaveTo"
        ) {

            calculateEmployeeLeaveDays();
        }
    }
);

function calculateEmployeeLeaveDays() {

    const fromInput =
        document.getElementById(
            "employeeLeaveFrom"
        );

    const toInput =
        document.getElementById(
            "employeeLeaveTo"
        );

    const daysContainer =
        document.getElementById(
            "employeeLeaveDays"
        );

    const daysCount =
        document.getElementById(
            "employeeLeaveDaysCount"
        );


    if (!fromInput ||
        !toInput ||
        !daysContainer ||
        !daysCount) {

        return;
    }


    const fromDate =
        fromInput.value;

    const toDate =
        toInput.value;


    if (!fromDate ||
        !toDate) {

        daysContainer.style.display =
            "none";

        return;
    }


    const from =
        new Date(
            fromDate + "T00:00:00"
        );

    const to =
        new Date(
            toDate + "T00:00:00"
        );


    if (to < from) {

        daysContainer.style.display =
            "block";

        daysCount.textContent =
            "Invalid date range";

        return;
    }


    const difference =
        to.getTime() -
        from.getTime();


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        ) + 1;


    daysContainer.style.display =
        "block";

    daysCount.textContent =
        days;
}

function closeEmployeeLeaveModal() {

    const modal =
        document.getElementById(
            "employeeLeaveModal"
        );

    if (!modal) {
        return;
    }

    modal.style.display = "none";

    document.body.style.overflow = "";
}

async function loadEmployeeSalary() {
debugger
    const token = localStorage.getItem("token");

    const month =
        document.getElementById(
            "employeeSalaryMonth"
        ).value;


    if (!month) {

        showToast(
            "Please select salary month.",
            "error"
        );

        return;
    }
let endpoint ="/reports/salary";


    const params = [];



const employeeId=localStorage.getItem("employeeId");
const businessId=localStorage.getItem("BusinessId");
    if (month) {
      // if (employeeId)
        params.push(
            `employeeId=${employeeId}`
        );
        // if (businessId)
         params.push(
           `businessId=${businessId}`
        );
        const [
            year,
            selectedMonth
        ] =
            month.split("-");


        params.push(
            `month=${Number(selectedMonth)}`
        );

        params.push(
            `year=${Number(year)}`
        );
    }

    if (params.length)
        endpoint +=
            "?" + params.join("&");


    try {
		
		const response= await apiRequest(
                endpoint             
               );

        
      

        const container =
            document.getElementById(
                "employeeSalaryResult"
            );


        if ( response.data[0]!=undefined && response.data[0].salaryStatus !== "APPROVED" &&
            response.data[0].salaryStatus !== "PAID") {

            container.innerHTML = `

                <div class="salary-status pending">

                    <h3>⏳ Salary Pending</h3>

                    <p>
                        Admin has not approved this month's
                        salary yet.
                    </p>

                </div>

            `;

            return;
        }


        if (response.data[0]!=undefined) {
             container.innerHTML = `

            <div class="salary-card">

                <div class="salary-row">
                    <span>Month</span>
                    <strong>${month}</strong>
                </div>

                <div class="salary-row">
                    <span>Monthly Salary</span>
                    <strong>₹${response.data[0].monthlySalary}</strong>
                </div>

                <div class="salary-row">
                    <span>Present Days</span>
                    <strong>${response.data[0].presentDays}</strong>
                </div>

                <div class="salary-row">
                    <span>Leave Days</span>
                    <strong>${response.data[0].leaveDays}</strong>
                </div>

                <div class="salary-row">
                    <span>Advance Deduction</span>
                    <strong>
                        ₹${response.data[0].advanceDeducted}
                    </strong>
                </div>

                <div class="salary-row total">
                    <span>Net Salary</span>
                    <strong>
                        ₹${response.data[0].netSalary}
                    </strong>
                </div>

                
                <div class="salary-actions">

                    <button
                        class="primary-btn"
                        onclick="downloadMySalarySlip('${month}')">

                        📄 Download Salary Slip

                    </button>

                </div>

            </div>

        `;
		}
		else{

        showToast(
            "Salary Record not found for selected month.",
            "error"
        );
	 }
    }
    catch (error) {

        console.error(error);

        showToast(
            error.message,
            "error"
        );
    }
}


async function downloadMySalarySlip(month) {
debugger
    const token = localStorage.getItem("token");


    try {


       	const response=  await apiRequest(
                `/salary/my/${month}/salary-slip`
               
                
            );

        

        const blob =
            await response.blob();


        const url =
            window.URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;

        link.download =
            `SalarySlip-${month}.pdf`;


        document.body.appendChild(link);

        link.click();

        link.remove();


        window.URL.revokeObjectURL(url);

    }
    catch (error) {

        console.error(error);

        showToast(
            error.message,
            "error"
        );
    }
}
async function initializeEmployeeAttendanceMonths() {

    const select =
        document.getElementById("employeeAttendanceMonth");

    if (!select) {
        console.error(
            "employeeAttendanceMonth element not found."
        );
        return;
    }

    // Clear existing options
    select.innerHTML = "";

    const today = new Date();

    // Add last 12 months
    for (let i = 0; i < 12; i++) {

        const date = new Date(
            today.getFullYear(),
            today.getMonth() - i,
            1
        );

        const year = date.getFullYear();

        const month = String(
            date.getMonth() + 1
        ).padStart(2, "0");

        // Value used by API
        // Example: 2026-09
        const value = `${year}-${month}`;

        // Display text
        // Example: September 2026
        const displayText =
            date.toLocaleDateString(
                "en-IN",
                {
                    month: "long",
                    year: "numeric"
                }
            );

        const option =
            document.createElement("option");

        option.value = value;

        option.textContent = displayText;

        // Current month selected
        if (i === 0) {
            option.selected = true;
        }

        select.appendChild(option);
    }
}

async function loadEmployeeLeavess() {

    const token = localStorage.getItem("token");

    try {

        // const response = await fetch(
            // `${API_BASE_URL}/api/leave/my`,
            // {
                // headers: {
                    // "Authorization": `Bearer ${token}`
                // }
            // }
        // );


       const response=  await apiRequest(
                `/Leave/my`
               
                
            );
        // const data = await response.json();


        // if (!response.ok) {
            // throw new Error(
                // data.message || "Unable to load leaves"
            // );
        // }


        const tbody =
            document.getElementById(
                "employeeLeaveTableBody"
            );

        tbody.innerHTML = "";


        response.forEach(leave => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${formatDate(leave.fromDate)}
                </td>

                <td>
                    ${formatDate(leave.toDate)}
                </td>

                <td>
                    ${leave.reason}
                </td>

                <td>
                    ${getLeaveStatusBadge(leave.status)}
                </td>

            `;


            tbody.appendChild(row);

        });

    }
    catch (error) {

        console.error(error);

    }
}

function getLeaveStatusBadge(status) {

    switch (status) {

        case "Approved":

            return `
                <span class="status-badge present">
                    ✅ Approved
                </span>
            `;

        case "Rejected":

            return `
                <span class="status-badge absent">
                    ❌ Rejected
                </span>
            `;

        default:

            return `
                <span class="status-badge leave">
                    ⏳ Pending
                </span>
            `;
    }
}

async function loadEmployeeTodayAttendances() {
debugger
    const token = localStorage.getItem("token");

    try {

       const response= await apiRequest(
                `/attendance/today`,
               
            );


        document.getElementById("todayCheckIn").textContent =
            formatTime(response.checkInTime);

        document.getElementById("todayCheckOut").textContent =
            formatTime(response.checkOutTime);

        document.getElementById("todayAttendanceStatus").textContent =
            response.status || "Not Marked";


        // Disable buttons according to today's state

        const checkInBtn =
            document.getElementById("employeeCheckInBtn");

        const checkOutBtn =
            document.getElementById("employeeCheckOutBtn");


        if (response.checkInTime) {
            checkInBtn.disabled = true;
        }
        else {
            checkInBtn.disabled = false;
        }


        if (response.checkOutTime) {
            checkOutBtn.disabled = true;
        }
        else if (response.checkInTime) {
            checkOutBtn.disabled = false;
        }
        else {
            checkOutBtn.disabled = true;
        }

    }
    catch (error) {

        console.error(error);

    }
}


async function applyEmployeeLeave(event) {

    event.preventDefault();

    const token = localStorage.getItem("token");

    const fromDate =
        document.getElementById(
            "employeeLeaveFrom"
        ).value;

    const toDate =
        document.getElementById(
            "employeeLeaveTo"
        ).value;

    const reason =
        document.getElementById(
            "employeeLeaveReason"
        ).value.trim();


    if (fromDate > toDate) {

        showToast(
            "To Date must be greater than From Date.",
            "error"
        );

        return;
    }


    try {

        // const response = await fetch(
            // `${API_BASE_URL}/api/leave`,
            // {
                // method: "POST",

                // headers: {
                    // "Authorization": `Bearer ${token}`,
                    // "Content-Type": "application/json"
                // },

                // body: JSON.stringify({

                    // fromDate: fromDate,
                    // toDate: toDate,
                    // reason: reason

                // })
            // }
        // );


        const response=  await apiRequest(
                `/Leave`,
                {
                    method: "POST",
                   body: JSON.stringify({
                    fromDate: fromDate,
                    toDate: toDate,
                    reason: reason

                })
                }
            );



        showToast(
            "Leave applied successfully.",
            "success"
        );

       closeEmployeeLeaveModal();
        // closeModal(
            // "employeeLeaveModal"
        // );


        document.getElementById(
            "employeeLeaveFrom"
        ).value = "";

        document.getElementById(
            "employeeLeaveTo"
        ).value = "";

        document.getElementById(
            "employeeLeaveReason"
        ).value = "";


        loadEmployeeLeaves();

    }
    catch (error) {

        console.error(error);

        showToast(
            error.message,
            "error"
        );
    }
}

async function loadEmployeeLeaves() {

    const token = localStorage.getItem("token");

    try {

        // const response = await fetch(
            // `${API_BASE_URL}/api/leave/my`,
            // {
                // headers: {
                    // "Authorization": `Bearer ${token}`
                // }
            // }
        // );


       const response=  await apiRequest(
                `/Leave/my`
               
                
            );
        // const data = await response.json();


        // if (!response.ok) {
            // throw new Error(
                // data.message || "Unable to load leaves"
            // );
        // }


        const tbody =
            document.getElementById(
                "employeeLeaveTableBody"
            );

        tbody.innerHTML = "";


        response.forEach(leave => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${formatDate(leave.fromDate)}
                </td>

                <td>
                    ${formatDate(leave.toDate)}
                </td>

                <td>
                    ${leave.reason}
                </td>

                <td>
                    ${getLeaveStatusBadge(leave.status)}
                </td>

            `;


            tbody.appendChild(row);

        });

    }
    catch (error) {

        console.error(error);

    }
}

function getLeaveStatusBadge(status) {

    switch (status) {

        case "Approved":

            return `
                <span class="status-badge present">
                    ✅ Approved
                </span>
            `;

        case "Rejected":

            return `
                <span class="status-badge absent">
                    ❌ Rejected
                </span>
            `;

        default:

            return `
                <span class="status-badge leave">
                    ⏳ Pending
                </span>
            `;
    }
}


async function loadEmployeeAttendance() {

    const token = localStorage.getItem("token");
 let endpoint =
        "/attendance/Employeemonthly";
    const month =
        document.getElementById(
            "employeeAttendanceMonth"
        ).value;
    const params = [];   

    if (month) {

        const [
            year,
            selectedMonth
        ] =
            month.split("-");

         params.push(
            `year=${Number(year)}`
        );
        params.push(
            `month=${Number(selectedMonth)}`
       );

       
    }
	

// if (businessId)
        // params.push(
            // `businessId=${employeeId}`
        // );
    if (params.length)
        endpoint +=
            "?" + params.join("&");
    if (!month) {

        showToast(
            "Please select month.",
            "error"
        );

        return;
    }


    try {

        // const response = await fetch(
            // `${API_BASE_URL}/api/attendance/monthly?month=${month}`,
            // {
                // headers: {
                    // "Authorization": `Bearer ${token}`
                // }
            // }
        // );
   
   const response=  await apiRequest(
                endpoint             
            );

        


        const tbody =
            document.getElementById(
                "employeeAttendanceTableBody"
            );

        tbody.innerHTML = "";


        response.forEach(item => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${formatDate(item.attendanceDate)}</td>

                <td>
                    ${formatTime(item.checkInTime)}
                </td>

                <td>
                    ${formatTime(item.checkOutTime)}
                </td>

                <td>
                    ${getAttendanceStatusBadge(item.status)}
                </td>
            `;

            tbody.appendChild(row);

        });

    }
    catch (error) {

        console.error(error);

        showToast(
            error.message,
            "error"
        );
    }
}


// =====================================================
// EMPLOYEE ATTENDANCE
// =====================================================

async function employeeCheckIn() {

    const token = localStorage.getItem("token");

    if (!token) {
        showToast("Please login again.", "error");
        return;
    }

    try {

        // const response = await fetch(
            // `${API_BASE_URL}/api/attendance/check-in`,
            // {
                // method: "POST",

                // headers: {
                    // "Authorization": `Bearer ${token}`,
                    // "Content-Type": "application/json"
                // }
            // }
        // );

        // const result = await response.json();

        // if (!response.ok) {
            // throw new Error(
                // result.message || "Check In failed"
            // );
        // }
        await apiRequest(
                `/attendance/check-in`,
                {
                    method: "POST"
                   // body:JSON.stringify(payload)
                }
            );

                  
        showToast(
            "Check In successful.",
            "success"
        );

        await loadEmployeeTodayAttendances();

    }
    catch (error) {

        console.error(error);

        showToast(
            error.message,
            "error"
        );
    }
}


async function employeeCheckOut() {

    const token = localStorage.getItem("token");

    if (!token) {
        showToast("Please login again.", "error");
        return;
    }

    try {

         const response= await apiRequest(
                `/attendance/check-out`,
                {
                    method: "POST"
                   // body:JSON.stringify(payload)
                }
            );

        showToast(
            "Check Out successful.",
            "success"
        );

        await loadEmployeeTodayAttendances();

    }
    catch (error) {

        console.error(error);

        showToast(
            error.message,
            "error"
        );
    }
}


async function loadEmployeeProfiles() {

    const token = localStorage.getItem("token");

    const response = await apiRequest(
        `/employees/me`
    );


    //const employee = await response.json();


    document.getElementById(
        "employeeName"
    ).textContent =
        `${response.firstName} ${response.lastName}`;


    document.getElementById(
        "employeeBusiness"
    ).textContent =
        response.businessNameMarathi;


    document.getElementById(
        "employeeSalary"
    ).textContent =
        `Monthly Salary: ₹${response.salary}`;

}

async function getEmployeeDashboardHTML() {

    return `
    
    <section class="employee-dashboard">

        <!-- ================= PROFILE ================= -->

        <div class="page-header">

    <div>

        <h1>
            👨‍💼 Employee Dashboard
        </h1>

        <p id="employeeWelcome">
            Welcome
        </p>

    </div>

</div>


<div class="dashboard-card employee-profile-card">

    <div class="profile-icon">
        👤
    </div>

    <div>

        <h2 id="employeeName">
            Employee Name
        </h2>

        <p id="employeeBusiness">
            Business
        </p>

        <p id="employeeSalary">
            Monthly Salary: ₹0
        </p>

    </div>

</div>


<div class="section-title">

    <h2>
        📅 आजची उपस्थिती
    </h2>

</div>


<div class="attendance-today-card">

    <div class="attendance-time-box">

        <span>
            Check In
        </span>

        <strong id="todayCheckIn">
            --:--
        </strong>

    </div>


    <div class="attendance-time-box">

        <span>
            Check Out
        </span>

        <strong id="todayCheckOut">
            --:--
        </strong>

    </div>


    <div class="attendance-time-box">

        <span>
            Status
        </span>

        <strong id="todayAttendanceStatus">
            Not Marked
        </strong>

    </div>

</div>


<div class="attendance-action-buttons">

    <button
        id="employeeCheckInBtn"
        class="primary-btn"
        onclick="employeeCheckIn()">

        🟢 Check In

    </button>


    <button
        id="employeeCheckOutBtn"
        class="secondary-btn"
        onclick="employeeCheckOut()">

        🔴 Check Out

    </button>

</div>

        <!-- ================= ATTENDANCE ================= -->

        <div class="section-title">

            <h2>
                📊 माझी उपस्थिती
            </h2>

        </div>


        <div class="filter-row">

            <select
                id="employeeAttendanceMonth">

                <option value="">
                    Select Month
                </option>

            </select>


            <button
                class="primary-btn"
                onclick="loadEmployeeAttendance()">

                🔍 View Attendance

            </button>

        </div>


        <div class="table-container">

            <table class="data-table">

                <thead>

                    <tr>

                        <th>
                            तारीख
                        </th>

                        <th>
                            Check In
                        </th>

                        <th>
                            Check Out
                        </th>

                        <th>
                            Status
                        </th>

                    </tr>

                </thead>


                <tbody
                    id="employeeAttendanceTableBody">

                </tbody>

            </table>

        </div>


        <!-- ================= LEAVE ================= -->

        <div class="section-title">

            <h2>
                📝 माझ्या रजा
            </h2>


            <button
                class="primary-btn"
                onclick="openModal('employeeLeaveModal')">

                ➕ Apply Leave

            </button>

        </div>


        <div class="table-container">

            <table class="data-table">

                <thead>

                    <tr>

                        <th>
                            From
                        </th>

                        <th>
                            To
                        </th>

                        <th>
                            Reason
                        </th>

                        <th>
                            Status
                        </th>

                    </tr>

                </thead>


                <tbody
                    id="employeeLeaveTableBody">

                </tbody>

            </table>

        </div>


        <!-- ================= SALARY ================= -->

        <div class="section-title">

            <h2>
                💰 माझा पगार
            </h2>

        </div>


        <div class="filter-row">

            <input
                type="month"
                id="employeeSalaryMonth">


            <button
                class="primary-btn"
                onclick="loadEmployeeSalary()">

                🔍 View Salary

            </button>

        </div>


        <div
            id="employeeSalaryResult"
            class="salary-result">

            <div class="salary-status">

                Salary information will appear here.

            </div>

        </div>


    </section>

    `;
}
