import axios from "axios"

export const registration = async (username, password, key) =>{
    console.log({username,password,key})
    try{
        const response = await axios.post("http://localhost:8000/api/auth/register", {
        username,
        password,
        key
    })
    alert(response.data.message)
    }catch(error){
        alert(error)
    }
    

}