import React from "react";
import s from "./login.module.css";
import logo from "./logo.png";
import Header from "../header/header";


const Content = () =>{
    return (
        <div className= {s.content}>
            <h1 className={s.registration}> Login</h1>
            <img src={logo} class={s.logo} alt={"logo"} />
            <div className={s.field}>
                <p>username</p>
                <input type="text" name="username" placeholder="username" className={s.input} required autocomplete="off" />
            </div>
            <div className={s.field}>
                <p>password</p>
                <input type="password" name="password" placeholder="password" className={s.input} required autocomplete="off" />
            </div>
            <button className={s.loginButton}>Login</button>
            <button className={s.forgetPassword}>Forget password?</button>
        </div>
    )
}


const Login = () =>{
    return (
        <div>
        <Header buttonTwoName = "Register" link="/register" />
        <Content />
    </div>
    )
}

export default Login;