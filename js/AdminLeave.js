

let adminLeaveList = [];


// ======================================
// LOAD ADMIN LEAVE PAGE
// ======================================

async function loadAdminLeave() {
debugger
    const pageContent =
        document.getElementById("pageContent");

    if (!pageContent) {
        return;
    }

    pageContent.innerHTML =
        getAdminLeaveHTML();

    await loadAdminLeaveRequests();
}

function getAdminLeaveHTML() {

    return `

        <div class="page-header">

            <div>
                <h2>Leave Approval</h2>

                <p>
                    Manage employee leave requests
                </p>
            </div>

            <button
                type="button"
                class="primary-btn"
                onclick="loadAdminLeave()">

                🔄 Refresh

            </button>

        </div>


        <!-- Summary Cards -->

        <div class="leave-summary-grid">

            <div class="leave-summary-card">

                <div class="leave-summary-icon pending">
                    ⏳
                </div>

                <div>
                    <span>Pending</span>

                    <strong id="adminPendingLeaveCount">
                        0
                    </strong>
                </div>

            </div>


            <div class="leave-summary-card">

                <div class="leave-summary-icon approved">
                    ✓
                </div>

                <div>
                    <span>Approved</span>

                    <strong id="adminApprovedLeaveCount">
                        0
                    </strong>
                </div>

            </div>


            <div class="leave-summary-card">

                <div class="leave-summary-icon rejected">
                    ✕
                </div>

                <div>
                    <span>Rejected</span>

                    <strong id="adminRejectedLeaveCount">
                        0
                    </strong>

                </div>

            </div>

        </div>


        <!-- Filter -->

        <div class="admin-leave-filter">

            <div class="form-group">

                <label for="adminLeaveStatus">
                    Leave Status
                </label>

                <select
                    id="adminLeaveStatus"
                    onchange="filterAdminLeaves()">

                    <option value="All">
                        All
                    </option>

                    <option value="Pending">
                        Pending
                    </option>

                    <option value="Approved">
                        Approved
                    </option>

                    <option value="Rejected">
                        Rejected
                    </option>

                </select>

            </div>


            <div class="form-group">

                <label for="adminLeaveSearch">
                    Search Employee
                </label>

                <input
                    type="text"
                    id="adminLeaveSearch"
                    placeholder="Search employee..."
                    oninput="filterAdminLeaves()">

            </div>

        </div>


        <!-- Leave Table -->

        <div class="table-card">

            <div class="table-header">

                <h3>
                    Employee Leave Requests
                </h3>

                <span id="adminLeaveTotal">
                    0 Requests
                </span>

            </div>


            <div class="table-responsive">

                <table class="data-table">

                    <thead>

                        <tr>

                            <th>Employee</th>

                            <th>Business</th>

                            <th>From Date</th>

                            <th>To Date</th>

                            <th>Days</th>

                            <th>Reason</th>

                            <th>Applied On</th>

                            <th>Status</th>

                            <th>Admin Remark</th>

                            <th>Action</th>

                        </tr>

                    </thead>


                    <tbody id="adminLeaveTableBody">

                        <tr>

                            <td
                                colspan="10"
                                class="text-center">

                                Loading leave requests...

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    `;
}


async function loadAdminLeaveRequests() {

    const token =
        localStorage.getItem("token");

    if (!token) {

        alert(
            "Session expired. Please login again."
        );

        return;
    }


    const tableBody =
        document.getElementById(
            "adminLeaveTableBody"
        );


    try {

        
			
			const response= await apiRequest(
                `/Leave`          
               );

 
        if (!response) {

            throw new Error(
                "Unable to load leave requests."
            );
        }


        adminLeaveList =
             response


        updateLeaveSummary();

        renderAdminLeaveTable(
            adminLeaveList
        );

    }
    catch (error) {

        console.error(
            "Admin leave error:",
            error
        );


        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="10"
                    class="text-center">

                    Unable to load leave requests.

                </td>

            </tr>

        `;
    }
}

function renderAdminLeaveTable(leaves) {

    const tbody =
        document.getElementById(
            "adminLeaveTableBody"
        );


    if (!tbody) {
        return;
    }


    if (!leaves ||
        leaves.length === 0) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="10"
                    class="text-center">

                    No leave requests found.

                </td>

            </tr>

        `;

        updateLeaveTotal(0);

        return;
    }


    tbody.innerHTML =
        leaves.map(leave => {

            const employeeName =
                `${leave.firstName || ""} ${leave.lastName || ""}`
                .trim();


            const fromDate =
                formatDate(
                    leave.fromDate
                );


            const toDate =
                formatDate(
                    leave.toDate
                );


            const days =Number(leave.leaveDays);
                // calculateLeaveDays(
                    // leave.fromDate,
                    // leave.toDate
                // );


            const status =
                leave.status || "Pending";


            let actionHtml = "";


            if (status === "Pending") {

                actionHtml = `

                    <div class="leave-action-buttons">

                        <button
                            class="success-btn small-btn"
                            onclick="openAdminLeaveAction(
                                ${leave.leaveId},
                                'Approved'
                            )">

                            ✓ Approve

                        </button>


                        <button
                            class="danger-btn small-btn"
                            onclick="openAdminLeaveAction(
                                ${leave.leaveId},
                                'Rejected'
                            )">

                            ✕ Reject

                        </button>

                    </div>

                `;

            }
            else {

                actionHtml = `

                    <span class="action-completed">
                        Completed
                    </span>

                `;
            }


            return `

                <tr>

                    <td>

                        <div class="employee-name-cell">

                            <strong>
                                ${escapeHtml(
                                    employeeName
                                )}
                            </strong>

                            <small>
                                ID:
                                ${leave.employeeId || "-"}
                            </small>

                        </div>

                    </td>


                    <td>
                        ${escapeHtml(
                            leave.businessName || "-"
                        )}
                    </td>


                    <td>
                        ${fromDate}
                    </td>


                    <td>
                        ${toDate}
                    </td>


                    <td>

                        <strong>
                            ${days}
                        </strong>

                    </td>


                    <td>

                        <div
                            class="leave-reason-cell">

                            ${escapeHtml(
                                leave.reason || "-"
                            )}

                        </div>

                    </td>


                    <td>
                        ${formatDate(
                            leave.appliedAt
                        )}
                    </td>


                    <td>

                        ${getLeaveStatusBadge(
                            status
                        )}

                    </td>


                    <td>

                        ${escapeHtml(
                            leave.adminRemark || "-"
                        )}

                    </td>


                    <td>

                        ${actionHtml}

                    </td>

                </tr>

            `;

        }).join("");


    updateLeaveTotal(
        leaves.length
    );
}

function getLeaveStatusBadge(status) {

    switch (status) {

        case "Approved":

            return `
                <span class="leave-status approved">
                    ✓ Approved
                </span>
            `;


        case "Rejected":

            return `
                <span class="leave-status rejected">
                    ✕ Rejected
                </span>
            `;


        default:

            return `
                <span class="leave-status pending">
                    ⏳ Pending
                </span>
            `;
    }
}

function openAdminLeaveAction(
    leaveId,
    action
) {

    const leave =
        adminLeaveList.find(
            x =>
                Number(x.leaveId) ===
                Number(leaveId)
        );


    if (!leave) {

        alert(
            "Leave request not found."
        );

        return;
    }


    document.getElementById(
        "selectedLeaveId"
    ).value = leaveId;


    document.getElementById(
        "selectedLeaveAction"
    ).value = action;


    const employeeName =
        `${leave.firstName || ""} ${leave.lastName || ""}`
        .trim();


    document.getElementById(
        "reviewEmployeeName"
    ).textContent =
        employeeName || "-";


    document.getElementById(
        "reviewBusinessName"
    ).textContent =
        leave.businessName || "-";


    document.getElementById(
        "reviewLeavePeriod"
    ).textContent =
        `${formatDate(
            leave.fromDate
        )} - ${formatDate(
            leave.toDate
        )}`;


    document.getElementById(
        "reviewLeaveDays"
    ).textContent =leave.leaveDays;
       


    document.getElementById(
        "reviewLeaveReason"
    ).textContent =
        leave.reason || "-";


    document.getElementById(
        "adminLeaveRemark"
    ).value = "";


    const title =
        document.getElementById(
            "adminLeaveActionTitle"
        );


    if (action === "Approved") {

        title.textContent =
            "Approve Leave";

    }
    else {

        title.textContent =
            "Reject Leave";
    }


    document.getElementById(
        "adminLeaveActionModal"
    ).style.display = "flex";


    document.body.style.overflow =
        "hidden";
}

async function confirmAdminLeaveAction(
    action
) {

    const leaveId =
        document.getElementById(
            "selectedLeaveId"
        ).value;


    const remark =
        document.getElementById(
            "adminLeaveRemark"
        ).value.trim();


    if (!leaveId) {

        alert(
            "Leave request not selected."
        );

        return;
    }


    if (action === "Rejected" &&
        !remark) {

        alert(
            "Please enter rejection remark."
        );

        return;
    }


    const token =
        localStorage.getItem("token");


    if (!token) {

        alert(
            "Session expired. Please login again."
        );

        return;
    }


    const endpoint =
        action === "Approved"

            ? `/Admin/${leaveId}/approve`

            : `/Admin/${leaveId}/reject`;


    try {



      const response= await apiRequest(
                endpoint,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        adminRemark:
                            remark
                    })
                }
            );

            // showToast(
                // "कर्मचारी माहिती अपडेट झाली.",
                // "success"
            // );
        


        if (!response) {

            alert(
                response.message ||
                `Unable to ${action.toLowerCase()} leave.`
            );

            return;
        }


        alert(
            response.message ||
            `Leave ${action.toLowerCase()} successfully.`
        );


        closeAdminLeaveActionModal();


        await loadAdminLeaveRequests();

    }
    catch (error) {

        console.error(
            "Leave action error:",
            error
        );

        alert(
            "Unable to connect to server."
        );
    }
}
function closeAdminLeaveActionModal() {

    const modal =
        document.getElementById(
            "adminLeaveActionModal"
        );


    if (modal) {

        modal.style.display =
            "none";
    }


    document.body.style.overflow =
        "";
}

function filterAdminLeaves() {

    const status =
        document.getElementById(
            "adminLeaveStatus"
        ).value;


    const search =
        document.getElementById(
            "adminLeaveSearch"
        ).value
        .toLowerCase()
        .trim();


    const filtered =
        adminLeaveList.filter(
            leave => {

                const employeeName =
                    `${leave.firstName || ""} ${leave.lastName || ""}`
                    .toLowerCase();


                const matchesStatus =
                    status === "All" ||
                    leave.status === status;


                const matchesSearch =
                    employeeName.includes(
                        search
                    );


                return (
                    matchesStatus &&
                    matchesSearch
                );
            }
        );


    renderAdminLeaveTable(
        filtered
    );
}

function updateLeaveSummary() {

    const pending =
        adminLeaveList.filter(
            x => x.status === "Pending"
        ).length;


    const approved =
        adminLeaveList.filter(
            x => x.status === "Approved"
        ).length;


    const rejected =
        adminLeaveList.filter(
            x => x.status === "Rejected"
        ).length;


    const pendingElement =
        document.getElementById(
            "adminPendingLeaveCount"
        );


    const approvedElement =
        document.getElementById(
            "adminApprovedLeaveCount"
        );


    const rejectedElement =
        document.getElementById(
            "adminRejectedLeaveCount"
        );


    if (pendingElement)
        pendingElement.textContent = pending;


    if (approvedElement)
        approvedElement.textContent = approved;


    if (rejectedElement)
        rejectedElement.textContent = rejected;


    // Sidebar badge

    const badge =
        document.getElementById(
            "pendingLeaveBadge"
        );


    if (badge) {

        badge.textContent =
            pending;

        badge.style.display =
            pending > 0
                ? "inline-flex"
                : "none";
    }
}

function calculateLeaveDays(
    fromDate,
    toDate
) {

    if (!fromDate || !toDate) {
        return 0;
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
        return 0;
    }


    return Math.floor(
        (
            to.getTime() -
            from.getTime()
        ) /
        (1000 * 60 * 60 * 24)
    ) + 1;
}

function formatAdminLeaveDateTime(
    date
) {

    if (!date) {
        return "-";
    }


    const d =
        new Date(date);


    return d.toLocaleString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}

function updateLeaveTotal(count) {

    const element =
        document.getElementById(
            "adminLeaveTotal"
        );


    if (element) {

        element.textContent =
            `${count} Request${count === 1 ? "" : "s"}`;
    }
}

function escapeHtml(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value ?? "";

    return div.innerHTML;
}