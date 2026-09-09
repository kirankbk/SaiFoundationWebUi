async function apiRequest(
    endpoint,
    options = {}
) {

    const token =
        localStorage.getItem("token");


    const headers = {
        ...(options.headers || {})
    };


    if (!(options.body instanceof FormData)) {

        headers["Content-Type"] =
            "application/json";
    }


    if (token) {

        headers["Authorization"] =
            `Bearer ${token}`;
    }


    try {

        const response =
            await fetch(
                `${API_BASE_URL}${endpoint}`,
                {
                    ...options,
                    headers
                }
            );


        if (response.status === 401) {

            logout();

            throw new Error(
                "Session expired. Please login again."
            );
        }


        if (response.status === 403) {

            throw new Error(
                "आपल्याला ही सुविधा वापरण्याची परवानगी नाही."
            );
        }


        const contentType =
            response.headers
                .get("content-type");


        if (
            contentType &&
            contentType.includes(
                "application/json"
            )
        ) {

            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    data.title ||
                    "API request failed"
                );
            }


            return data;
        }


        if (!response.ok) {

            throw new Error(
                "API request failed"
            );
        }


        return response;

    }
    catch (error) {

        console.error(
            "API Error:",
            error
        );

        throw error;
    }
}