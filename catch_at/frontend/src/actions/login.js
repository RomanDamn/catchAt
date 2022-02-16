import axios from "axios"
import { useDispatch } from "react-redux"
import s from "../components/pages/login/login.module.css"
import { setToken } from "../reducers/tokenSlice"

export const login = async (username, password, setError) =>{
    try{
        setError(<div className={s.waiting}>Waiting ....</div>)
        const response = await axios.post("http://localhost:8000/api/auth/login", {
            username,
            password
        })
        //const token = useDispatch(setToken(response.data.token))
        console.log(response.data)
        //console.log(token)

    }catch(error){
        console.log(error.response.data.message);
        setError(error.response.data.message)
        

    }
}