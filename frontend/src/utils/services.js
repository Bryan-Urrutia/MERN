export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const postRequest = async (url, body) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body,
    })

    const data = await response.json()

    if (!response.ok) {
        let message

        if (data?.message) {
            message = data.message
        } else {
            message = data
        }

        return { error: true, message }
    }

    return data;
}

export const getRequest = async (url, token) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    })

    const data = await response.json()

    if (!response.ok) {
        let message = "Un error ha ocurrido..."

        if (data?.message) {
            message = data.message
        }

        return { error: true, message }
    }

    return data;
}