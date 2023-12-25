function backendcaller(url, requestMethod, jwt, requestBody) {
    const fetchData = {
        headers: {
            'Content-type': 'application/json',
        },
        method: requestMethod,
    };

    if (jwt) {
        fetchData.headers.Authorization = `Bearer ${jwt}`;
    }

    if (requestBody) {
        fetchData.body = JSON.stringify(requestBody);
    }

    return fetch(url, fetchData)
        .then(async (response) => {
            if (response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json();
                } else {
                    const text = await response.text();
                    try {
                        // Attempt to parse as JSON
                        return JSON.parse(text);
                    } catch (error) {
                        return text;
                    }
                }
            }
        })
        .catch((error) => {
            console.error("Fetch error:", error);
            throw error;
        });
}

export default backendcaller;
