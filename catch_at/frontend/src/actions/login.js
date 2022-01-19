import axios from "axios"
import s from "../components/pages/login/login.module.css"

export const login = async (username, password, setError) =>{
    try{
        setError(<div className={s.waiting}>Waiting ....</div>)
        const response = await axios.post("http://localhost:8000/api/auth/login", {
            username,
            password
        })
        console.log(response.data)

    }catch(error){
        console.log(error.response.data.message);
        setError(error.response.data.message)
        

    }
}