async function loadBackupPage() {

    const content =
        document.getElementById(
            "pageContent"
        );


    content.innerHTML = `

        <div class="page-heading">

            <div>

                <h1>
                    💾 Backup / Restore
                </h1>

                <p>
                    ShreeSaiAttendance Database
                </p>

            </div>

        </div>


        <div class="backup-card">

            <div class="backup-info">

                <div class="backup-icon-large">
                    💾
                </div>

                <div>

                    <h2>
                        Database Backup
                    </h2>

                    <p>
                        Employee, Attendance,
                        Advance, Salary आणि
                        सर्व application data.
                    </p>

                </div>

            </div>


            <button
                class="primary-btn"
                onclick="createBackup()">

                💾 Backup तयार करा

            </button>

        </div>


        <div class="backup-card">

            <div class="backup-info">

                <div class="backup-icon-large">
                    ♻️
                </div>

                <div>

                    <h2>
                        Database Restore
                    </h2>

                    <p>
                        .bak backup file मधून
                        database restore करा.
                    </p>

                </div>

            </div>


            <input
                type="file"
                id="backupRestoreFile"
                accept=".bak">


            <button
                class="danger-btn"
                onclick="restoreBackup()">

                ♻️ Restore करा

            </button>

        </div>


        <div class="section-card">

            <div class="section-header">

                <h2>
                    Available Backups
                </h2>

                <button
                    class="secondary-btn"
                    onclick="loadBackupList()">

                    🔄 Refresh

                </button>

            </div>


            <div
                id="backupList">
            </div>

        </div>

    `;


    await loadBackupList();

    closeSidebarMobile();
}


async function createBackup() {

    if (!confirm(
        "Database backup तयार करायचा आहे का?"
    )) {
        return;
    }


    try {

        const response =
            await apiRequest(
                "/backup/create",
                {
                    method: "POST"
                }
            );


        showToast(
            response.message ||
            "Backup तयार झाला.",
            "success"
        );


        await loadBackupList();

    }
    catch (error) {

        showToast(
            error.message,
            "error"
        );
    }
}


async function loadBackupList() {

    const container =
        document.getElementById(
            "backupList"
        );


    if (!container)
        return;


    try {

        const response =
            await apiRequest(
                "/backup/list"
            );


        const backups =
            response.backups ||
            response.data ||
            [];


        if (!backups.length) {

            container.innerHTML = `

                <div class="empty-state">
                    Backup उपलब्ध नाही.
                </div>

            `;

            return;
        }


        container.innerHTML =
            backups.map(
                file => `

                    <div class="backup-row">

                        <div>

                            <span class="backup-file">
                                💾 ${file}
                            </span>

                        </div>

                        <div class="action-buttons">

                            <button
                                class="secondary-btn"
                                onclick="downloadBackup('${file}')">

                                📥 Download

                            </button>


                            <button
                                class="icon-btn delete"
                                onclick="deleteBackup('${file}')">

                                🗑️

                            </button>

                        </div>

                    </div>

                `
            ).join("");

    }
    catch (error) {

        container.innerHTML =
            `<p>${error.message}</p>`;
    }
}


async function downloadBackup(
    fileName
) {

    try {

        const token =
            localStorage.getItem(
                "token"
            );


        const response =
            await fetch(
                `${API_BASE_URL}/backup/download/${encodeURIComponent(fileName)}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                "Backup download failed."
            );
        }


        const blob =
            await response.blob();


        const url =
            URL.createObjectURL(
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


        URL.revokeObjectURL(
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


async function restoreBackup() {

    const input =
        document.getElementById(
            "backupRestoreFile"
        );


    const file =
        input.files[0];


    if (!file) {

        showToast(
            "कृपया .bak file निवडा.",
            "error"
        );

        return;
    }


    if (
        !file.name
            .toLowerCase()
            .endsWith(".bak")
    ) {

        showToast(
            "फक्त .bak file स्वीकारली जाते.",
            "error"
        );

        return;
    }


    const confirmed =
        confirm(
            "⚠️ Restore केल्यास सध्याचा database replace होईल. Continue?"
        );


    if (!confirmed)
        return;


    const formData =
        new FormData();


    formData.append(
        "backupFile",
        file
    );


    try {

        await apiRequest(
            "/backup/restore",
            {
                method: "POST",
                body: formData
            }
        );


        alert(
            "Database Restore यशस्वी झाला. कृपया पुन्हा Login करा."
        );


        logout();

    }
    catch (error) {

        showToast(
            error.message,
            "error"
        );
    }
}


async function deleteBackup(
    fileName
) {

    if (!confirm(
        "हा backup delete करायचा आहे का?"
    )) {
        return;
    }


    try {

        await apiRequest(
            `/backup/${encodeURIComponent(fileName)}`,
            {
                method: "DELETE"
            }
        );


        showToast(
            "Backup delete झाला.",
            "success"
        );


        await loadBackupList();

    }
    catch (error) {

        showToast(
            error.message,
            "error"
        );
    }
}