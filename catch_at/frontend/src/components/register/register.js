import React, {useState} from "react"
import s from "./register.module.css"
import Header from "../header/header"
import { registration } from "../../actions/user"


const Content = () =>{
    const [username, setName] = useState("");
    const [password, setPass] = useState("");
    const [keyword, setKey] = useState("");
    return (
        <div className= {s.content}>
            <h1 className={s.registration}> Registration</h1>
            
            <div className={s.field}>
                <label>username</label>
                <input id="username"
                type="text"
                name="username" 
                placeholder="username" 
                className={s.input} 
                required autoComplete="off"
                onChange={(e) => setName(e.target.value)} />
            </div>
            <div className={s.field}>
                <label>password</label>
                <input id="password" 
                type="password" 
                name="password" 
                placeholder="password" 
                className={s.input} 
                required autoComplete="off" 
                onChange={(e) => setPass(e.target.value)} />
            </div>
            <div className={s.field}>
                <label>cofirm pass</label>
                <input type="password" 
                name="password_conf" 
                placeholder="password" 
                className={s.input + " " + s.confirmPassword} 
                required autoComplete="off" />
            </div>
            <div className= {s.field}>
                <p>keyword_</p>
                <input id="keyword" 
                type="text" 
                name="keyword" 
                placeholder="keyword" 
                className={s.input} 
                required autoComplete="off" 
                onChange={(e) => setKey(e.target.value)} />
            </div>
             <button type="button" className={s.register}
             onClick={()=>registration(username, password, keyword)} >
                <div className={s.regButton}></div>
            </button>
            
        </div>
    )
}



const Register = () =>{
    return (
        <div>
        <Header buttonTwoName = "Login" link="/login" />
        <Content />
    </div>
    )
}

export default Register;