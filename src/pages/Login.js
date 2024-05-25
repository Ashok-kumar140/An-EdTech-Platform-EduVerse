import React from 'react'
import Template from '../components/AuthPage/Template';
import image from "../assets/images/login.png";


const Login = () => {
    return (

        <Template
            heading="Welcome Back"
            desc1="Build skills for today, tomorrow, and beyond."
            desc2="Education to future-proof your career."
            formType="login"
            image={image}
            

        />

    )
}

export default Login
