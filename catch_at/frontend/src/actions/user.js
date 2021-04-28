import axios from "axios"

export const registration = async (username, password, key, setStatus) => {
    try {
        const response = await axios.post("http://localhost:8000/api/auth/register", {
            username,
            password,
            key
        })
        setStatus({
            ok: response.data.message
        })
        alert(response.data.message)
    } catch (error) {
        if (error.response.status === 400) {
            setStatus({
                error: error.response.data.message
            })
            console.log(error.response.status)

        };
    }


}