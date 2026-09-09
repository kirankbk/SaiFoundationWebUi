

async function loadEmployeesPage() {

    const content =
        document.getElementById(
            "pageContent"
        );


    content.innerHTML = `

        <div class="page-heading">

            <div>

                <h1>
                    कर्मचारी व्यवस्थापन
                </h1>

                <p>
                    Add / Edit / Delete / Business-wise
                </p>

            </div>

            <button
                class="primary-btn"
                onclick="openAddEmployee()">

                + कर्मचारी जोडा

            </button>

        </div>


        <div class="filter-card">

            <input
                id="employeeSearch"
                placeholder="कर्मचारी शोधा..."
                oninput="filterEmployees()">


            <select
                id="employeeBusinessFilter"
                onchange="filterEmployees()">

                <option value="">
                    सर्व व्यवसाय
                </option>

                <option>
                    श्री साई वे ब्रिज
                </option>

                <option>
                    हॉटेल आनंदराज
                </option>

                <option>
                    चिंतामणी पेट्रोल पंप
                </option>

                <option>
                    हॉटेल राजनंदिनी
                </option>

            </select>

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
                                Mobile
                            </th>

                            <th>
                                व्यवसाय
                            </th>

                            <th>
                                पगार
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody
                        id="employeeTableBody">

                    </tbody>

                </table>

            </div>

        </div>

    `;


    await fetchEmployees();

    closeSidebarMobile();
}


let allEmployees = [];


async function fetchEmployees() {

    try {

        const response =
            await apiRequest(
                "/employees"
            );


        allEmployees =
            response.data ||
            response.employees ||
            response;


        if (!Array.isArray(
            allEmployees
        )) {

            allEmployees = [];
        }


        renderEmployees(
            allEmployees
        );

    }
    catch (error) {

        showToast(
            error.message,
            "error"
        );
    }
}



function renderEmployees(
    employees
) {

    const tbody =
        document.getElementById(
            "employeeTableBody"
        );


    if (!tbody)
        return;


    if (!employees.length) {

        tbody.innerHTML = `

            <tr>

                <td colspan="5">

                    <div class="empty-state">
                        कर्मचारी उपलब्ध नाहीत.
                    </div>

                </td>

            </tr>

        `;

        return;
    }


    tbody.innerHTML =
        employees.map(
            employee => {

                const id =
                    employee.employeeId ||
                    employee.EmployeeId ||
                    employee.id;


                const firstName =
                    employee.firstName ||
                    employee.FirstName ||
                    "";


                const lastName =
                    employee.lastName ||
                    employee.LastName ||
                    "";


                const email =
                    employee.email ||
                    employee.Email ||
                    "";


                const mobile =
                    employee.mobile ||
                    employee.Mobile ||
                    employee.mobileNo ||
                    employee.MobileNo ||
                    "";


                const business =
                    employee.businessNameMarathi ||
                    employee.businessNameMarathi ||
                    employee.businessNameMarathi ||
                    employee.businessNameMarathi ||
                    "";


                const salary =
                    employee.salary ||
                    employee.Salary ||
                    0;


                return `

                    <tr>

                        <td>

                            <div class="employee-cell">

                                <div class="avatar">
                                    ${firstName
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>

                                <div>

                                    <strong>
                                        ${firstName}
                                        ${lastName}
                                    </strong>

                                    <small>
                                        ${email}
                                    </small>

                                </div>

                            </div>

                        </td>


                        <td>
                            ${mobile}
                        </td>


                        <td>
                            ${business}
                        </td>


                        <td>
                            ${formatCurrency(
                                salary
                            )}
                        </td>


                        <td>

                            <div class="action-buttons">

                                <button
                                    class="icon-btn edit"
                                    onclick="editEmployee(${id})">

                                    ✏️

                                </button>

                                <button
                                    class="icon-btn delete"
                                    onclick="deleteEmployee(${id})">

                                    🗑️

                                </button>

                            </div>

                        </td>

                    </tr>

                `;

            }
        ).join("");
}


function filterEmployees() {
debugger
    const search =
        document.getElementById(
            "employeeSearch"
        )
        ?.value
        .toLowerCase() || "";


    const business =
        document.getElementById(
            "employeeBusinessFilter"
        )
        ?.value || "";


    const filtered =
        allEmployees.filter(
            employee => {

                const name =
                    `${employee.firstName ||
                    employee.FirstName ||
                    ""} ${
                    employee.lastName ||
                    employee.LastName ||
                    ""}`
                    .toLowerCase();


                const mobile =
                    employee.mobile ||
                    employee.Mobile ||
                    "";


                const employeeBusiness =
                    employee.businessNameMarathi ||
                    employee.businessNameMarathi ||
                    employee.businessNameMarathi ||
                    employee.businessNameMarathi ||
                    "";


                return (
                    (
                        name.includes(search) ||
                        mobile.includes(search)
                    ) &&
                    (
                        !business ||
                        employeeBusiness === business
                    )
                );

            }
        );


    renderEmployees(
        filtered
    );
}


function openAddEmployee() {

    document.getElementById(
        "employeeForm"
    ).reset();


    document.getElementById(
        "employeeId"
    ).value = "";


    document.getElementById(
        "employeeModalTitle"
    ).textContent =
        "नवीन कर्मचारी";


    openModal(
        "employeeModal"
    );
}


function editEmployee(
    employeeId
) {

    const employee =
        allEmployees.find(
            x =>
                (
                    x.employeeId ||
                    x.EmployeeId ||
                    x.id
                ) == employeeId
        );


    if (!employee)
        return;


    document.getElementById(
        "employeeId"
    ).value =
        employeeId;


    document.getElementById(
        "firstName"
    ).value =
        employee.firstName ||
        employee.FirstName ||
        "";


    document.getElementById(
        "lastName"
    ).value =
        employee.lastName ||
        employee.LastName ||
        "";


    document.getElementById(
        "employeeEmail"
    ).value =
        employee.email ||
        employee.Email ||
        "";


    document.getElementById(
        "employeeMobile"
    ).value =
        employee.mobile ||
        employee.Mobile ||
        employee.mobileNo ||
        employee.MobileNo ||
        "";


    document.getElementById(
        "employeeAddress"
    ).value =
        employee.address ||
        employee.Address ||
        "";


    document.getElementById(
        "employeeSalary"
    ).value =
        employee.salary ||
        employee.Salary ||
        "";


    document.getElementById(
        "businessType"
    ).value =
        employee.businessId ||
        employee.businessId ||
        employee.businessId ||
        employee.businessId ||
        "";


    document.getElementById(
        "employeeUsername"
    ).value =
        employee.username ||
        employee.Username ||
        "";


    document.getElementById(
        "employeePassword"
    ).value = "";


    document.getElementById(
        "employeeModalTitle"
    ).textContent =
        "कर्मचारी Edit";


    openModal(
        "employeeModal"
    );
}


async function saveEmployee(
    event
) {

    event.preventDefault();


    const id =
        document.getElementById(
            "employeeId"
        ).value;


    const payload = {

        firstName:
            document.getElementById(
                "firstName"
            ).value.trim(),

        lastName:
            document.getElementById(
                "lastName"
            ).value.trim(),

        email:
            document.getElementById(
                "employeeEmail"
            ).value.trim(),

        mobile:
            document.getElementById(
                "employeeMobile"
            ).value.trim(),

        address:
            document.getElementById(
                "employeeAddress"
            ).value.trim(),

        salary:
            Number(
                document.getElementById(
                    "employeeSalary"
                ).value
            ),

        businessId:
            document.getElementById(
                "businessType"
            ).value,

        username:
            document.getElementById(
                "employeeUsername"
            ).value.trim(),

        password:
            document.getElementById(
                "employeePassword"
            ).value

    };


    try {

        if (id) {

            await apiRequest(
                `/employees/${id}`,
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
        else {

            await apiRequest(
                "/employees",
                {
                    method: "POST",
                    body:
                        JSON.stringify(payload)
                }
            );

            showToast(
                "कर्मचारी यशस्वीरीत्या जोडला.",
                "success"
            );
        }


        closeModal(
            "employeeModal"
        );


        await fetchEmployees();

    }
    catch (error) {

        showToast(
            error.message,
            "error"
        );
    }
}


async function deleteEmployee(
    id
) {

    if (!confirm(
        "हा कर्मचारी delete करायचा आहे का?"
    )) {
        return;
    }


    try {

        await apiRequest(
            `/employees/${id}`,
            {
                method: "DELETE"
            }
        );


        showToast(
            "कर्मचारी delete झाला.",
            "success"
        );


        await fetchEmployees();

    }
    catch (error) {

        showToast(
            error.message,
            "error"
        );
    }
}