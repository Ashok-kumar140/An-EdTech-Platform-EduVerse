import React from 'react'
import image from "../assets/images/signup.jpg";

import Template from '../components/AuthPage/Template';

const SignUp = () => {
    return (

        <Template
            heading="Join the millions learning to code with StudyNotion for free"
            desc1="Build skills for today, tomorrow, and beyond."
            desc2="Education to future-proof your career."
            formType="signup"
            image={image}
            
        />

    )
}

export default SignUp
