import React from "react";
import logo from "./logo.png";
import s from "./notAuth.module.css";
import {Link} from "react-router-dom";
import Header from "../header/header";


const Content = () =>{
    return (
        <div className= {s.content}>
            <h1 class={s.welcome}> Welcome</h1>
            <img src={logo} class={s.logo + " " + s.logo_mainPage} alt={"logo"}></img>
            <Link to="/login">
            <button className={s.button}>Login</button>
            </Link>
            <Link to="/register">
            <button className={s.button}>Register</button>
            </Link>
        </div>
    )
}

const NotAuth = () =>{
    return (
        <div>
        <Header buttonOneName = "about app"/>
        <Content />        
        </div>
    )
}

export default NotAuth;