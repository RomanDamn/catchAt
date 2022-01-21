import React, { useState } from "react";
import s from "./login.module.css";
import logo from "../../../assets/images/logo.png";
import Header from "../../shared/header/header";
import {login} from "../../../actions/login"


const Content = () =>{
    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState('')

    return (
        <div className= {s.content}>
            <h1 className={s.registration}> Login</h1>
            <img src={logo} class={s.logo} alt={"logo"} />
            <div className={s.field}>
                <p>username</p>
                <input value={username} onChange={e => setUsername(e.target.value)} type="text" name="username" placeholder="username" className={s.input} required autoComplete="off" />
            </div>
            <div className={s.field}>
                <p>password</p>
                <input value={pass} onChange={e => setPass(e.target.value)} type="password" name="password" placeholder="password" className={s.input} required autoComplete="off" />
            </div>
            {error ? <div className={s.error}>{error}</div> : ''}
            <button disabled={!username || !pass}
             className={username && pass ? s.loginButton : s.loginButtonDisabled }
             onClick={() => login(username, pass, setError)} >Login</button>
            <button className={s.forgetPassword}>Forget password?</button>
        </div>
    )
}

//onClick={()=>submit(username, pass)}
const Login = () =>{
    return (
        <div>
        <Header buttonTwoName = "Register" link="/register" />
        <Content />
    </div>
    )
}

export default Login;