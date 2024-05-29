import React from 'react'
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import { FcGoogle } from "react-icons/fc";
import { useSelector } from 'react-redux';


const Template = (props) => {
    const { heading, desc1, desc2, image, formType } = props;
    const { loading } = useSelector((state) => state.auth);
    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between  gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
                    <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
                        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                            {heading}
                        </h1>
                        <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
                            <span className="text-richblack-100">{desc1}</span>{" "}
                            <span className="font-edu-sa font-bold italic text-blue-100">
                                {desc2}
                            </span>
                        </p>
                        {formType === "signup" ? <SignupForm /> : <LoginForm />}
                    </div>
                    <div className=" mx-auto w-11/12 max-w-[550px] min-h-[80vh] md:mx-0 flex items-center justify-center">

                        <img
                            src={image}
                            alt="Students"
                            // width={558}
                            height={604}
                            loading="lazy"
                            className="top-4 right-4 z-10 object-fill"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Template
