import s from "./register.module.css"
import Header from "../header/header"
import { registration } from "../../actions/register"
import { Formik } from "formik"
import * as yup from "yup"
import { Redirect } from "react-router-dom"


const Content = () =>{
    const validationSchema = yup.object().shape({
        username: yup.string().required("Username is Necessary"),
        password: yup.string().required("Password is Necessary"),
        confirmPassword: yup.string().oneOf([yup.ref("password")],
         "Passwords are different")
        .required("Necessary"),
        keyword: yup.string().required("Keyword is Necessary")
    })
    return (
        <div>
            <Formik
            initialValues={{
                username: "",
                password: "",
                confirmPassword: "",
                keyword: ""
            }}
            validateOnBlur
            onSubmit={(values,{setStatus}) => 
               {registration(values.username,values.password ,values.keyword,setStatus)}
            }
            validationSchema={validationSchema}>
                {({values, errors, touched, handleChange,
                 handleBlur, isValid, handleSubmit, dirty, status}) =>(
                    <div className= {s.content} >
                
                 {status && status.error && <p className={s.error}>{status.error}</p>}
                 {status && status.ok && <Redirect to="login" />}
                        <h1 className={s.registration}> Registration</h1>
                        <p>
                            {touched.username && 
                            errors.username && 
                            <p className={s.error_username}>{errors.username}</p>}
                        </p>
                        <div className={s.field_username}>
                            <label>username</label>
                            <input
                            type={"text"}
                            name={"username"} 
                            placeholder="username" 
                            className={s.input} 
                            required autoComplete="off"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username} />
                        </div>
                        <p>
                            {touched.password &&
                             errors.password &&
                            <p className={s.error_pass}>{errors.password}</p>}
                        </p>
                        <div className={s.field_password}>
                            <label>password</label>
                            <input 
                            type={"password"} 
                            name={"password"} 
                            placeholder="password" 
                            className={s.input} 
                            required autoComplete="off" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password} />
                        </div>
                        <p>
                            {touched.confirmPassword && 
                            errors.confirmPassword && 
                            <p className={s.error_confirm_pass}>{errors.confirmPassword}</p>}
                        </p>
                        <div className={s.field_confirm_pass}>
                            <label>cofirm pass</label>
                            <input 
                            type={"password"} 
                            name={"confirmPassword"} 
                            placeholder="password" 
                            className={s.input + " " + s.confirmPassword} 
                            required autoComplete="off"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmPassword} />
                        </div>
                        <p>
                            {touched.keyword && 
                            errors.keyword && 
                            <p className={s.error_key}>{errors.keyword}</p>}
                        </p>
                        <div className= {s.field_key}>
                            <p>keyword_</p>
                            <input 
                            type={"text" }
                            name={"keyword"} 
                            placeholder="keyword" 
                            className={s.input} 
                            required autoComplete="off" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.keyword} />
                        </div>
                              
                              
                        {isValid && dirty ?
                        <button
                        type="submit"
                        className={s.register}
                        onClick={handleSubmit}>
                            <div className={s.regButton}></div>
                        </button> 
                        : <div className={s.disButton}></div> }
                                 
                                
                    </div>
                )}

            </Formik>
        </div>
    );
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