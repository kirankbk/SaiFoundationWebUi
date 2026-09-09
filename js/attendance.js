async function loadAttendancePage() {
debugger
    const content =
        document.getElementById(
            "pageContent"
        );

const id="1";
    const owner =
        getUserRole()
            ?.toUpperCase() ===
        "OWNER";


    content.innerHTML = `

        <div class="page-heading">

            <div>

                <h1>
                    📅 उपस्थिती व्यवस्थापन
                </h1>

                <p>
                    Daily Present / Absent / Leave
                </p>

            </div>

            ${
                owner
                ? `
                    <button
                        class="primary-btn"
                        onclick="openAttendanceModal(${id})">

                        + Attendance

                    </button>
                `
                : ""
            }

        </div>


        <div class="filter-card">

            ${
                owner
                ? `
                    <select
                        id="attendanceFilterEmployee">

                        <option value="">
                            सर्व कर्मचारी
                        </option>

                    </select>
                `
                : ""
            }


            <input
                type="date"
                id="attendanceFilterDate"
                value="${getToday()}"
                onchange="loadAttendanceRecords()">


            ${
                owner
                ? `
                    <button
                        class="success-btn"
                        onclick="markAllPresent()">

                        ✓ सर्व उपस्थित

                    </button>
                `
                : ""
            }

        </div>


        <div class="section-card">

            <div class="section-header">

                <h2>
                    Daily Attendance
                </h2>

                ${
                    owner
                    ? `
                        <span
                            id="attendanceSummary">
                        </span>
                    `
                    : ""
                }

            </div>


            <div class="table-wrapper">

                <table>

                    <thead>

                        <tr>

                            <th>
                                तारीख
                            </th>

                            <th>
                                कर्मचारी
                            </th>

                            <th>
                                व्यवसाय
                            </th>

                            <th>
                                Status
                            </th>

                            ${
                                owner
                                ? `
                                    <th>
                                        Action
                                    </th>
                                `
                                : ""
                            }

                        </tr>

                    </thead>

                    <tbody
                        id="attendanceTableBody">
                    </tbody>

                </table>

            </div>

        </div>

    `;


    if (owner) {

        await loadEmployeeDropdown(
            "attendanceFilterEmployee"
        );

    }


  await loadAttendanceRecords();

    closeSidebarMobile();
}


let Attendancerecord = [];
async function loadAttendanceRecords() {
debugger
    const date =
        document.getElementById(
            "attendanceFilterDate"
        )?.value ||
        getToday();


    const employeeId =
        document.getElementById(
            "attendanceFilterEmployee"
        )?.value;


    let endpoint =
        `/attendance?date=${date}`;


    if (employeeId) {

        endpoint +=
            `&employeeId=${employeeId}`;
    }


    try {

        const response =
            await apiRequest(
                endpoint
            );

           Attendancerecord =
            response.data ||
            response.employees ||
            response;


        if (!Array.isArray(
            Attendancerecord
        )) {

            Attendancerecord = [];
        }

        const data =
            response.data ||
            response.attendance ||
            response;


        renderAttendance(
            Array.isArray(data)
                ? data
                : []
        );

    }
    catch (error) {

        showToast(
            error.message,
            "error"
        );
    }
}


function renderAttendance(
    records
) {
debugger
    const tbody =
        document.getElementById(
            "attendanceTableBody"
        );


    if (!tbody)
        return;


    if (!records.length) {

        tbody.innerHTML = `

            <tr>

                <td colspan="5">

                    <div class="empty-state">
                        Attendance उपलब्ध नाही.
                    </div>

                </td>

            </tr>

        `;

        return;
    }

    tbody.innerHTML =
        records.map(
            record => {
             
			 
                const id =
                    record.attendanceId ||
                    record.attendanceId ||
                    record.AttendanceId;


                const employeeName =
                    record.employeeName ||
                    record.EmployeeName ||
                    "-";


                const business =
                    record.businessNameMarathi ||
                    record.businessNameMarathi ||
                    "-";


                const status =
                    record.status ||
                    record.Status ||
                    "Present";
     

                return `

                    <tr>

                        <td>
                            ${formatDate(
                                record.attendanceDate ||
                                record.attendanceDate ||
                                record.AttendanceDate
                            )}
                        </td>

                        <td>
                            ${employeeName}
                        </td>

                        <td>
                            ${business}
                        </td>

                        <td>
                            ${statusBadge(status)}
                        </td>

                        ${
                            getUserRole()
                                ?.toUpperCase() ===
                            "OWNER"
                            ? `
                                <td>

                                    <button
                                        class="icon-btn edit"
                                        onclick="openAttendanceModalUpdate(${id})">

                                        ✏️

                                    </button>

                                </td>
                            `
                            : ""
                        }

                    </tr>

                `;

            }
        ).join("");
}


async function openAttendanceModalUpdate(id) {
debugger
      if (!id) {

        showToast(
            "उपस्थितीची माहिती उपलब्ध नाही.",
            "error"
        );

        return;
    }

       const attendancerec =
        Attendancerecord.find(
            x =>
                (
                    x.attendanceId ||
                    x.attendanceId ||
                    x.attendanceId
                ) == id
        );


    if (!attendancerec)
        return;
	
			const date=	
				attendancerec.attendanceDate ||
				attendancerec.attendanceDate ||
				attendancerec.AttendanceDate
				
                const employeeName =
                    attendancerec.employeeName ||
                    attendancerec.employeeName ||
                    "-";
 const attendanceId =
                    attendancerec.attendanceId ||
                    attendancerec.attendanceId ||
                    "-";

                const business =
                    attendancerec.businessNameMarathi ||
                    attendancerec.businessNameMarathi ||
                    "-";


                const status =
                    attendancerec.status ||
                    attendancerec.Status ||
                    "Present";
	
	document.getElementById(
        "editAttendanceEmployee"
    ).value =employeeName;
 document.getElementById(
        "editAttendanceId"
    ).value =attendancerec.attendanceId;


    document.getElementById(
        "editAttendanceDate"
    ).value =attendancerec.attendanceDate;
       


    document.getElementById(
        "editAttendanceStatus"
    ).value =status;
       


    // await loadEmployeeDropdown(
        // "attendanceEmployee"
    // );


    openModal(
        "editAttendanceModal"
    );
}



async function openAttendanceModal(id) {
debugger
    document.getElementById(
        "attendanceDate"
    ).value =
        getToday();


    await loadEmployeeDropdown(
        "attendanceEmployee"
    );


    openModal(
        "attendanceModal"
    );
}


async function saveAttendance(
    event
) {

    event.preventDefault();


    const payload = {

        employeeId:
            Number(
                document.getElementById(
                    "attendanceEmployee"
                ).value
            ),

       
        attendancedate:
            document.getElementById(
                "attendanceDate"
            ).value,

        status:
            document.getElementById(
                "attendanceStatus"
            ).value

    };


    try {

        await apiRequest(
            "/attendance",
            {
                method: "POST",

                body:
                    JSON.stringify(
                        payload
                    )
            }
        );


        closeModal(
            "attendanceModal"
        );


        showToast(
            "Attendance save झाली.",
            "success"
        );


        await loadAttendanceRecords();

    }
    catch (error) {

        showToast(
            error.message,
            "error"
        );
    }
}


async function markAllPresent() {

    const date =
        document.getElementById(
            "attendanceFilterDate"
        ).value;


    if (!confirm(
        `${date} साठी सर्व कर्मचारी Present mark करायचे आहेत का?`
    )) {
        return;
    }


    try {

        await apiRequest(
            "/attendance/mark-all-present",
            {
                method: "POST",

                body: JSON.stringify({
                    date
                })
            }
        );


        showToast(
            "सर्व कर्मचारी Present mark झाले.",
            "success"
        );


        await loadAttendanceRecords();

    }
    catch (error) {

        showToast(
            error.message,
            "error"
        );
    }
}

// ============================================================
// EDIT ATTENDANCE
// ============================================================

function editAttendance(attendance) {
debugger
    console.log("Edit attendance:", attendance);

    if (!attendance) {

        showToast(
            "उपस्थितीची माहिती उपलब्ध नाही.",
            "error"
        );

        return;
    }


    // --------------------------------------------------------
    // Attendance ID
    // --------------------------------------------------------

    const attendanceId =
        attendance.id ??
        attendance.attendanceId;


    document.getElementById(
        "editAttendanceId"
    ).value = attendanceId;


    // --------------------------------------------------------
    // Employee Name
    // --------------------------------------------------------

    let employeeName =
        attendance.employeeName;


    if (!employeeName) {

        employeeName =
            `${attendance.firstName || ""} ${attendance.lastName || ""}`
            .trim();
    }


    document.getElementById(
        "editAttendanceEmployee"
    ).value = employeeName || "";


    // --------------------------------------------------------
    // Attendance Date
    // --------------------------------------------------------

    let date =
        attendance.attendanceDate ??
        attendance.date;


    if (date) {

        // Convert:
        // 2026-09-04T00:00:00
        // to:
        // 2026-09-04

        date =
            date.toString().substring(0, 10);
    }


    document.getElementById(
        "editAttendanceDate"
    ).value = date || "";


    // --------------------------------------------------------
    // Status
    // --------------------------------------------------------

    document.getElementById(
        "editAttendanceStatus"
    ).value =
        attendance.status || "Present";


    // --------------------------------------------------------
    // Remarks
    // --------------------------------------------------------

    document.getElementById(
        "editAttendanceRemarks"
    ).value =
        attendance.remarks || "";


    // --------------------------------------------------------
    // Open Existing Custom Modal
    // --------------------------------------------------------

    openModal("editAttendanceModal");
}
async function loadEmployeeDropdown(
    elementId
) {

    try {

        const response =
            await apiRequest(
                "/employees"
            );


        const employees =
            response.data ||
            response.employees ||
            response;


        const select =
            document.getElementById(
                elementId
            );


        if (!select)
            return;


        select.innerHTML =
            `<option value="">
                कर्मचारी निवडा
            </option>`;


        employees.forEach(
            employee => {

                const id =
                    employee.employeeId ||
                    employee.EmployeeId ||
                    employee.id;


                const name =
                    `${
                        employee.firstName ||
                        employee.FirstName ||
                        ""
                    } ${
                        employee.lastName ||
                        employee.LastName ||
                        ""
                    }`;


                select.innerHTML += `

                    <option value="${id}">
                        ${name}
                    </option>

                `;

            }
        );

    }
    catch (error) {

        console.error(
            error
        );
    }
}




/**
 * Update Attendance
 */
async function updateAttendance(event
) {

    event.preventDefault();
debugger
    const id =
        document.getElementById(
            "editAttendanceId"
        ).value;


    const attendanceDate =
        document.getElementById(
            "editAttendanceDate"
        ).value;


    const status =
        document.getElementById(
            "editAttendanceStatus"
        ).value;


    const remarks =
        document.getElementById(
            "editAttendanceRemarks"
        ).value.trim();

const payload = {

        attendanceId:
            Number(
                document.getElementById(
                    "editAttendanceId"
                ).value
            ),

       
        status:
            document.getElementById(
                "editAttendanceStatus"
            ).value,

        attendanceDate:
            document.getElementById(
                "editAttendanceDate"
            ).value,

        remarks:
            document.getElementById(
                "editAttendanceRemarks"
            ).value

    };
    // -----------------------------------------------------
    // Validation
    // -----------------------------------------------------

    if (!id) {

        showToast(
            "Attendance ID is missing.",
            "danger"
        );

        return;
    }


    if (!attendanceDate) {

        showToast(
            "कृपया तारीख निवडा.",
            "warning"
        );

        return;
    }


    if (!status) {

        showToast(
            "कृपया उपस्थिती स्थिती निवडा.",
            "warning"
        );

        return;
    }




    try {

        if (id) {

            await apiRequest(
                `/attendance/${id}`,
                {
                    method: "PUT",
                    body:
                        JSON.stringify(payload)
                }
            );

            showToast(
                "कर्मचारी माहिती अपडेट झाली.",
                "success"
            );

        }
        

        closeModal(
            "editAttendanceModal"
        );


        await loadAttendanceRecords();

    }
    catch (error) {

        showToast(
            error.message,
            "error"
        );
    }

    
}


async function loadEmployeeTodayAttendance() {
debugger
    const token = localStorage.getItem("token");

    try {

       const response= await apiRequest(
                `/attendance/today`,
                {
                    method: "POST"
                   // body:JSON.stringify(payload)
                }
            );


        document.getElementById("todayCheckIn").textContent =
            formatTime(response.data.checkInTime);

        document.getElementById("todayCheckOut").textContent =
            formatTime(response.data.checkOutTime);

        document.getElementById("todayAttendanceStatus").textContent =
            response.data.status || "Not Marked";


        // Disable buttons according to today's state

        const checkInBtn =
            document.getElementById("employeeCheckInBtn");

        const checkOutBtn =
            document.getElementById("employeeCheckOutBtn");


        if (response.data.checkInTime) {
            checkInBtn.disabled = true;
        }
        else {
            checkInBtn.disabled = false;
        }


        if (response.data.checkOutTime) {
            checkOutBtn.disabled = true;
        }
        else if (response.data.checkInTime) {
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


function formatTime(value) {

    if (!value) {
        return "--:--";
    }

    const date = new Date(value);

    return date.toLocaleTimeString(
        "en-IN",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}


async function loadEmployeeMonthAttendance() {

    const token = localStorage.getItem("token");

    const month =
        document.getElementById(
            "employeeAttendanceMonth"
        ).value;

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
                `/attendance/monthly?month=${month}`,
                {
                    method: "POST"
                   // body:JSON.stringify(payload)
                }
            );

        


        const tbody =
            document.getElementById(
                "employeeAttendanceTableBody"
            );

        tbody.innerHTML = "";


        response.data.forEach(item => {

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


function formatDate(value) {

    if (!value) return "-";

    return new Date(value).toLocaleDateString(
        "en-IN"
    );
}


function getAttendanceStatusBadge(status) {


    if (status === "PRESENT") {
        return `<span class="status-badge present">
                    उपस्थित
                </span>`;
    }

    if (status === "ABSENT") {
        return `<span class="status-badge absent">
                    अनुपस्थित
                </span>`;
    }

    if (status === "LEAVE") {
        return `<span class="status-badge leave">
                    रजा
                </span>`;
    }
    if (status === "Present") {
        return `<span class="status-badge present">
                    उपस्थित
                </span>`;
    }

    if (status === "Absent") {
        return `<span class="status-badge absent">
                    अनुपस्थित
                </span>`;
    }

    if (status === "Leave") {
        return `<span class="status-badge leave">
                    रजा
                </span>`;
    }
	

    return `<span class="status-badge">
                ${status || "-"}
            </span>`;
}


async function loadEmployeeSalaryss() {

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


    try {
		
		const response=  await apiRequest(
                `salary/my?month=${month}`
               
                
            );

        // const response = await fetch(
            // `${API_BASE_URL}/api/salary/my?month=${month}`,
            // {
                // headers: {
                    // "Authorization": `Bearer ${token}`
                // }
            // }
        // );


        // const data = await response.json();


        // if (!response.ok) {

            // throw new Error(
                // data.message ||
                // "Salary information not available"
            // );
        // }


        const container =
            document.getElementById(
                "employeeSalaryResult"
            );


        if (response.data.status !== "Approved" &&
            response.data.status !== "Paid") {

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


        container.innerHTML = `

            <div class="salary-card">

                <div class="salary-row">
                    <span>Month</span>
                    <strong>${month}</strong>
                </div>

                <div class="salary-row">
                    <span>Monthly Salary</span>
                    <strong>₹${response.data.monthlySalary}</strong>
                </div>

                <div class="salary-row">
                    <span>Present Days</span>
                    <strong>${response.data.presentDays}</strong>
                </div>

                <div class="salary-row">
                    <span>Leave Days</span>
                    <strong>${response.data.leaveDays}</strong>
                </div>

                <div class="salary-row">
                    <span>Advance Deduction</span>
                    <strong>
                        ₹${response.data.advanceDeduction}
                    </strong>
                </div>

                <div class="salary-row total">
                    <span>Net Salary</span>
                    <strong>
                        ₹${response.data.netSalary}
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
    catch (error) {

        console.error(error);

        showToast(
            error.message,
            "error"
        );
    }
}


async function downloadMySalarySlipss(month) {

    const token = localStorage.getItem("token");


    try {


       	const response=  await apiRequest(
                `salary/my/${month}/salary-slip`
               
                
            );

        // const response = await fetch(
            // `${API_BASE_URL}/api/salary/my/${month}/salary-slip`,
            // {
                // headers: {
                    // "Authorization": `Bearer ${token}`
                // }
            // }
        // );


        // if (!response.ok) {

            // const error =
                // await response.json();

            // throw new Error(
                // error.message ||
                // "Salary slip unavailable"
            // );
        // }


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