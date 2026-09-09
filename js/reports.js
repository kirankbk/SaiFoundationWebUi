async function loadReportsPage() {

    const content =
        document.getElementById(
            "pageContent"
        );


    content.innerHTML = `

        <div class="page-heading">

            <div>

                <h1>
                    📑 Reports
                </h1>

                <p>
                    Salary / Attendance / Advance
                </p>

            </div>

        </div>


        <div class="report-grid">

            <div class="report-card">

                <div class="report-icon">
                    💵
                </div>

                <h2>
                    Salary Report
                </h2>

                <p>
                    Employee-wise salary,
                    advance deduction,
                    remaining advance
                    आणि net salary.
                </p>

                <button
                    class="primary-btn"
                    onclick="downloadSalaryReport()">

                    📄 PDF

                </button>

            </div>


            <div class="report-card">

                <div class="report-icon">
                    📅
                </div>

                <h2>
                    Attendance Report
                </h2>

                <p>
                    Monthly Present,
                    Absent आणि Leave report.
                </p>

                <button
                    class="primary-btn"
                    onclick="downloadAttendanceReport()">

                    📄 PDF

                </button>

            </div>


            <div class="report-card">

                <div class="report-icon">
                    💰
                </div>

                <h2>
                    Advance Report
                </h2>

                <p>
                    Date-wise आणि
                    monthly advance details.
                </p>

                <button
                    class="primary-btn"
                    onclick="downloadAdvanceReport()">

                    📄 PDF

                </button>

            </div>

        </div>

    `;

    closeSidebarMobile();
}


async function downloadSalaryReport() {

    await downloadFile(
        "/reports/salary/pdf",
        "Salary-Report.pdf"
    );
}


async function downloadAttendanceReport() {

    await downloadFile(
        "/reports/attendance/pdf",
        "Attendance-Report.pdf"
    );
}


async function downloadAdvanceReport() {

    await downloadFile(
        "/reports/advance/pdf",
        "Advance-Report.pdf"
    );
}


async function downloadFile(
    endpoint,
    fileName
) {

    try {

        const token =
            localStorage.getItem(
                "token"
            );


        const response =
            await fetch(
                `${API_BASE_URL}${endpoint}`,
                {
                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                "PDF generate करता आला नाही."
            );
        }


        const blob =
            await response.blob();


        const url =
            window.URL.createObjectURL(
                blob
            );


        const link =
            document.createElement(
                "a"
            );


        link.href = url;

        link.download =
            fileName;

        link.click();


        window.URL.revokeObjectURL(
            url
        );

    }
    catch (error) {

        showToast(
            error.message,
            "error"
        );
    }
}