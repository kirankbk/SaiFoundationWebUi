async function loadAdvancePage() {
debugger
    const content =
        document.getElementById(
            "pageContent"
        );


    content.innerHTML = `

        <div class="page-heading">

            <div>

                <h1>
                    💰 Advance Management
                </h1>

                <p>
                    Date-wise Advance / Monthly Advance /
                    Balance / Carry Forward
                </p>

            </div>

            <button
                class="primary-btn"
                onclick="openAdvanceModal()">

                + Advance

            </button>

        </div>


        <div class="filter-card">

            <select
                id="advanceEmployeeFilter"
                onchange="loadAdvances()">

                <option value="">
                    सर्व कर्मचारी
                </option>

            </select>


            <input
                type="month"
                id="advanceMonthFilter"
                value="${getCurrentMonth()}"
                onchange="loadAdvances()">

        </div>


        <div class="stats-grid">

            <div class="stat-card">

                <div class="stat-icon">
                    💰
                </div>

                <div>

                    <span>
                        या महिन्याचा Advance
                    </span>

                    <strong id="monthlyAdvance">
                        ₹0
                    </strong>

                </div>

            </div>


            <div class="stat-card">

                <div class="stat-icon">
                    🔄
                </div>

                <div>

                    <span>
                        Remaining Advance
                    </span>

                    <strong id="remainingAdvance">
                        ₹0
                    </strong>

                </div>

            </div>

        </div>


        <div class="section-card">

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
                                Advance
                            </th>

                            <th>
                                Remark
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
                        id="advanceTableBody">
                    </tbody>

                </table>

            </div>

        </div>

    `;


    await loadEmployeeDropdown(
        "advanceEmployeeFilter"
    );


    await loadAdvances();

    closeSidebarMobile();
}


let Advancerecord = [];
async function loadAdvances() {
debugger
    const employeeId =
        document.getElementById(
            "advanceEmployeeFilter"
        )?.value;


    const month =
        document.getElementById(
            "advanceMonthFilter"
        )?.value;

    if (!month) {
        showToast("Please select month.", "error");
        return;
    }
	
    let endpoint =
        "/advance/monthly";


    const params = [];


    


    if (month) {

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
if (employeeId)
        params.push(
            `employeeId=${employeeId}`
        );
// if (businessId)
        // params.push(
            // `businessId=${employeeId}`
        // );
    if (params.length)
        endpoint +=
            "?" + params.join("&");


    try {
debugger
        const response =
            await apiRequest(
                endpoint
            );


        Advancerecord =
            response.data ||
            response.advances ||
            response;


        if (!Array.isArray(
            Advancerecord
        )) {

            Advancerecord = [];
        }
        const data =
            response.data ||
            response.advances ||
            response;


        const records =
            Array.isArray(data)
                ? data
                : [];


        renderAdvances(
            records
        );


        calculateAdvanceTotals(
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


function renderAdvances(
    records
) {

    const tbody =
        document.getElementById(
            "advanceTableBody"
        );


    if (!tbody)
        return;


    if (!records.length) {

        tbody.innerHTML = `

            <tr>

                <td colspan="6">

                    <div class="empty-state">
                        Advance record उपलब्ध नाही.
                    </div>

                </td>

            </tr>

        `;

        return;
    }


    tbody.innerHTML =
        records.map(
            advance => {

                const id =
                    advance.advanceId ||
                    advance.AdvanceId ||
                    advance.id;


                return `

                    <tr>

                        <td>
                            ${formatDate(
                                advance.date ||
                                advance.advanceDate ||
                                advance.AdvanceDate
                            )}
                        </td>

                        <td>
                            ${
                                advance.employeeName ||
                                advance.EmployeeName ||
                                "-"
                            }
                        </td>

                        <td>
                            ${formatCurrency(
                                advance.amount ||
                                advance.Amount ||
                                0
                            )}
                        </td>

                        <td>
                            ${
                                advance.remarks ||
                                advance.Remarks ||
                                "-"
                            }
                        </td>

                        <td>
                            ${statusBadge(
                                advance.status ||
                                advance.Status ||
                                "Active"
                            )}
                        </td>

                        <td>

                            <div class="action-buttons">

                                <button
                                    class="icon-btn edit"
                                    onclick="openAdvanceModalUpdate(${id})">

                                    ✏️

                                </button>

                                <button
                                    class="icon-btn delete"
                                    onclick="cancelAdvance(${id})">

                                    ✕

                                </button>

                            </div>

                        </td>

                    </tr>

                `;

            }
        ).join("");
}



async function openAdvanceModalUpdate(id) {
debugger
      if (!id) {

        showToast(
            "उपस्थितीची माहिती उपलब्ध नाही.",
            "error"
        );

        return;
    }

       const advancerec =
        Advancerecord.find(
            x =>
                (
                    x.advanceId ||
                    x.advanceId ||
                    x.advanceId
                ) == id
        );


    if (!advancerec)
        return;
	
			const date=	
				advancerec.advanceId ||
				advancerec.advanceId ||
				advancerec.advanceId
				
                const employeeName =
                    advancerec.employeeName ||
                    advancerec.employeeName ||
                    "-";
 const advanceDate =
                    advancerec.advanceDate ||
                    advancerec.advanceDate ||
                    "-";

                const remarks =
                    advancerec.remarks ||
                    advancerec.remarks ||
                    "-";


                const status =
                    advancerec.status ||
                    advancerec.Status ||
                    "Present";
	
	document.getElementById(
        "editAdvanceEmployee"
    ).value =employeeName;
 document.getElementById(
        "editAdvanceId"
    ).value =advancerec.advanceId;


    document.getElementById(
        "editAdvanceDate"
    ).value =advancerec.advanceDate;
       


    document.getElementById(
        "editAdvanceAmount"
    ).value =advancerec.amount;
       
	   
    document.getElementById(
        "editAdvanceRemark"
    ).value =remarks;
       


    // await loadEmployeeDropdown(
        // "attendanceEmployee"
    // );


    openModal(
        "editAdvanceModal"
    );
}



/**
 * Update Advance
 */
async function updateAdvance(event
) {

    event.preventDefault();
debugger
    const advanceId =
        document.getElementById(
            "editAdvanceId"
        ).value;


    const advanceDate =
        document.getElementById(
            "editAdvanceDate"
        ).value;


    const amount =
        document.getElementById(
            "editAdvanceAmount"
        ).value;

    
    const remarks =
        document.getElementById(
            "editAdvanceRemark"
        ).value.trim();

const payload = {

        advanceId:
            Number(
                document.getElementById(
                    "editAdvanceId"
                ).value
            ),

       
        amount:
            document.getElementById(
                "editAdvanceAmount"
            ).value,

        advanceDate:
            document.getElementById(
                "editAdvanceDate"
            ).value,

        remarks:
            document.getElementById(
                "editAdvanceRemark"
            ).value

    };
    // -----------------------------------------------------
    // Validation
    // -----------------------------------------------------

    if (!advanceId) {

        showToast(
            "Advance ID is missing.",
            "danger"
        );

        return;
    }


    if (!advanceDate) {

        showToast(
            "कृपया तारीख निवडा.",
            "warning"
        );

        return;
    }


    if (!remarks) {

        showToast(
            "Remarks field is missing",
            "warning"
        );

        return;
    }




    try {

        if (advanceId) {

            await apiRequest(
                `/advance/${advanceId}`,
                {
                    method: "PUT",
                    body:
                        JSON.stringify(payload)
                }
            );

            showToast(
                "Advance अपडेट झाली.",
                "success"
            );

        }
        

        closeModal(
            "editAdvanceModal"
        );


         await loadAdvances();

    }
    catch (error) {

        showToast(
            error.message,
            "error"
        );
    }

    
}

function calculateAdvanceTotals(
    records
) {

    const total =
        records.reduce(
            (
                sum,
                item
            ) =>
                sum +
                Number(
                    item.amount ||
                    item.Amount ||
                    0
                ),
            0
        );


    const element =
        document.getElementById(
            "monthlyAdvance"
        );


    if (element)
        element.textContent =
            formatCurrency(total);
}


function openAdvanceModal() {

    document.getElementById(
        "advanceDate"
    ).value =
        getToday();


    document.getElementById(
        "advanceId"
    ).value = "";


    document.getElementById(
        "advanceAmount"
    ).value = "";


    document.getElementById(
        "advanceRemark"
    ).value = "";


    loadEmployeeDropdown(
        "advanceEmployee"
    );


    openModal(
        "advanceModal"
    );
}


async function saveAdvance(
    event
) {
	debugger

    event.preventDefault();


    const id =
        document.getElementById(
            "advanceId"
        ).value;


    const payload = {

        employeeId:
            Number(
                document.getElementById(
                    "advanceEmployee"
                ).value
            ),

        advanceDate:
            document.getElementById(
                "advanceDate"
            ).value,

        amount:
            Number(
                document.getElementById(
                    "advanceAmount"
                ).value
            ),

        remarks:
            document.getElementById(
                "advanceRemark"
            ).value.trim()

    };


    try {

        if (id) {

            await apiRequest(
                `/advance/${id}`,
                {
                    method: "PUT",

                    body:
                        JSON.stringify(
                            payload
                        )
                }
            );

        }
        else {

            await apiRequest(
                "/advance",
                {
                    method: "POST",

                    body:
                        JSON.stringify(
                            payload
                        )
                }
            );
        }


        closeModal(
            "advanceModal"
        );


        showToast(
            "Advance save झाली.",
            "success"
        );


        await loadAdvances();

    }
    catch (error) {

        showToast(
            error.message,
            "error"
        );
    }
}


async function cancelAdvance(
    id
) {
	debugger

    if (!confirm(
        "हा advance cancel करायचा आहे का?"
    )) {
        return;
    }


    try {

        await apiRequest(
            `/advance/${id}`,
            {
                method: "DELETE"
            }
        );


        showToast(
            "Advance cancel झाला.",
            "success"
        );


        await loadAdvances();

    }
    catch (error) {

        showToast(
            error.message,
            "error"
        );
    }
}