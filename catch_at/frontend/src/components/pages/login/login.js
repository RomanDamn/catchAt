import React, { useState } from "react";
import s from "./login.module.css";
import logo from "../../../assets/images/logo.png";
import Header from "../../shared/header/header";
import {login} from "../../../actions/login"
import { useDispatch, useSelector } from "react-redux";
import { setToken, tokenRequest } from "../../../reducers/tokenSlice";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";


const Content = () => {
    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch();
    const history = useHistory();
    const token = useSelector(state => state.tokenState.token)
    //const decoded = jwt_decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJvbWFuIiwiaWQiOjEsImlhdCI6MTY0NTA5NTU4Nn0.heSoUll9cHy5TJlvb8jcepSQHMjNdyAwibQx2UcWyK8")

    console.log('Token in redux is', token)
    //console.log("decoded token is", decoded)
    const mainPageRedirect = () =>{
        let path = "mainPage"
        history.push(path)
    }

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
             onClick={() => {
                    const lol = dispatch(tokenRequest({username, password: pass, setError}))
                    //login(username, pass, setError)
                    mainPageRedirect()
                 }} >Login
            </button>
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