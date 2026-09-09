async function loadSalaryPage() {

    const content =
        document.getElementById(
            "pageContent"
        );


    content.innerHTML = `

        <div class="page-heading">

            <div>

                <h1>
                    💵 Salary Management
                </h1>

                <p>
                    Attendance + Advance + Salary
                </p>

            </div>

        </div>


        <div class="filter-card">

            <select
                id="salaryEmployeeFilter">

                <option value="">
                    सर्व कर्मचारी
                </option>

            </select>


            <input
                type="month"
                id="salaryMonth"
                value="${getCurrentMonth()}">


            <button
                class="primary-btn"
                onclick="calculateSalary()">

                🧮 Salary Calculate

            </button>

        </div>


        <div
            id="salarySummary">
        </div>


        <div class="section-card">

            <div class="table-wrapper">

                <table>

                    <thead>

                        <tr>

                            <th>
                                कर्मचारी
                            </th>

                            <th>
                                व्यवसाय
                            </th>

                            <th>
                                मासिक पगार
                            </th>

                            <th>
                                Present
                            </th>

                            <th>
                                Absent
                            </th>

                            <th>
                                Advance
                            </th>

                            <th>
                                Advance Deduction
                            </th>

                            <th>
                                Remaining Advance
                            </th>

                            <th>
                                Net Salary
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody
                        id="salaryTableBody">
                    </tbody>

                </table>

            </div>

        </div>

    `;


    await loadEmployeeDropdown(
        "salaryEmployeeFilter"
    );


    closeSidebarMobile();
}

let SalaryDetails=[];
async function calculateSalary() {
debugger
    const employeeId =
        document.getElementById(
            "salaryEmployeeFilter"
        ).value;


    const monthValue =
        document.getElementById(
            "salaryMonth"
        ).value;


    if (!monthValue) {

        showToast(
            "महिना निवडा.",
            "error"
        );

        return;
    }


    const [
        year,
        month
    ] =
        monthValue.split("-");


    const payload = {

        employeeId:
            employeeId
                ? Number(employeeId)
                : null,

        month:
            Number(month),

        year:
            Number(year)

    };


    try {

        const response =
            await apiRequest(
                "/salary/calculate",
                {
                    method: "POST",

                    body:
                        JSON.stringify(
                            payload
                        )
                }
            );


        const data =
            response.data ||
            response.salary ||
            response;


        // SalaryDetails =
            // response.data ||
            // response.salary ||
            // response;


        // if (SalaryDetails.length >1 && !Array.isArray(
            // SalaryDetails
        // )) {

            // SalaryDetails = [];
        // }
        const records =
            Array.isArray(data)
                ? data
                : [data];


        renderSalary(
            records
        );

    }
    catch (error) {

        showToast(
            error.message,
            "error"
        );
    }
}
 

function renderSalary(
    records
) {
debugger
    const tbody =
        document.getElementById(
            "salaryTableBody"
        );


    if (!tbody)
        return;


    tbody.innerHTML =
        records.map(
            salary => {

                const id =
                    salary.salaryId ||
                    salary.SalaryId ||
                    salary.id;

              const employeeId =
                    salary.employeeId ||
                    salary.employeeId ||
                    salary.employeeId;


                return `

                    <tr>

                        <td>
                            ${
                                salary.employeeName ||
                                salary.employeeName ||
                                "-"
                            }
                        </td>

                        <td>
                            ${
                                salary.businessName ||
                                salary.businessName ||
                                "-"
                            }
                        </td>

                        <td>
                            ${formatCurrency(
                                salary.monthlySalary ||
                                salary.MonthlySalary ||
                                salary.salary ||
                                salary.Salary ||
                                0
                            )}
                        </td>

                        <td>
                            ${
                                salary.presentDays ||
                                salary.PresentDays ||
                                0
                            }
                        </td>

                        <td>
                            ${
                                salary.absentDays ||
                                salary.AbsentDays ||
                                0
                            }
                        </td>

                        <td>
                            ${formatCurrency(
                                salary.totalAdvance ||
                                salary.TotalAdvance ||
                                0
                            )}
                        </td>

                        <td>
                            ${formatCurrency(
                                salary.advanceDeduction ||
                                salary.AdvanceDeduction ||
                                0
                            )}
                        </td>

                        <td>
                            ${formatCurrency(
                                salary.remainingAdvance ||
                                salary.RemainingAdvance ||
                                0
                            )}
                        </td>

                        <td>
                            <strong>
                                ${formatCurrency(
                                    salary.netSalary ||
                                    salary.NetSalary ||
                                    0
                                )}
                            </strong>
                        </td>

                        <td>
                            ${statusBadge(
                                salary.status ||
                                salary.Status ||
                                "Generated"
                            )}
                        </td>

                        <td>

                            <div class="action-buttons">

                                <button
                                    class="icon-btn"
                                    onclick="approveSalary(${id})">

                                    ✓

                                </button>

                                <button
                                    class="icon-btn"
                                    onclick="paySalary(${id})">

                                    💵

                                </button>

                                <button
                                    class="icon-btn"
                                    onclick="sendSalarySlip(${employeeId})">

                                    📧

                                </button>

                            </div>

                        </td>

                    </tr>

                `;

            }
        ).join("");
}


async function approveSalary(
    salaryId
) {
	debugger

    if (!confirm(
        "Salary approve करायचा आहे का?"
    )) {
        return;
    }
	const payload = {

       remarks:"Approve"
            
   };



    try {

        // await apiRequest(
            // `/salary/${salaryId}/approve`,
            // {
                // method: "PUT"
            // }
        // );
        await apiRequest(
                `/salary/${salaryId}/approve`,
                {
                    method: "PUT",
                    body:
                        JSON.stringify(payload)
                }
            );

        showToast(
            "Salary approved.",
            "success"
        );


    }
    catch (error) {

        showToast(
            error.message,
            "error"
        );
    }
}


async function paySalary(
    salaryId
) {

    if (!confirm(
        "Salary Paid म्हणून mark करायचा आहे का?"
    )) {
        return;
    }
const payload = {

       paymentReference:"kiran",
	   remarks:"bykiran"
            
   };


    try {

        await apiRequest(
            `/salary/${salaryId}/pay`,
            {
                method: "PUT",
				 body:
                        JSON.stringify(payload)
            }
        );


        showToast(
            "Salary Paid.",
            "success"
        );


    }
    catch (error) {

        showToast(
            error.message,
            "error"
        );
    }
}


async function sendSalarySlip(
    employeeId
) {
	
	   
    const monthValue =
        document.getElementById(
            "salaryMonth"
        ).value;


    if (!monthValue) {

        showToast(
            "महिना निवडा.",
            "error"
        );

        return;
    }


    const [
        year,
        month
    ] =
        monthValue.split("-");


    const payload = {

        employeeId:employeeId
                ? Number(employeeId)
                : null,
           

        month:
            Number(month),

        year:
            Number(year)

    };


    try {

        await apiRequest(
            "/salary/send-salary-slip",
            {
                method: "POST",

                body:
                    JSON.stringify({
                        payload
                    })
            }
        );

       
        showToast(
            "Salary Slip email वर पाठवली.",
            "success"
        );

    }
    catch (error) {

        showToast(
            error.message,
            "error"
        );
    }
}