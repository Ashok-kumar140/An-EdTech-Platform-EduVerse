import React, { useState } from 'react'
import Tab from '../Tab';
import { ACCOUNT_TYPE } from '../../helpers/constants';
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { setSignUpData } from '../../redux/slices/authSlice';
import { useDispatch } from "react-redux";
import { userEndPoints } from '../../apis/apis';
import axios from 'axios';
import { setLoading, } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const tabData = [
    {
        id: 1,
        tabName: "Student",
        type: ACCOUNT_TYPE.STUDENT,
    },
    {
        id: 2,
        tabName: "Instructor",
        type: ACCOUNT_TYPE.INSTRUCTOR,
    },
]
const SignupForm = () => {

    const [role, setRole] = useState(ACCOUNT_TYPE.STUDENT);
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });


    const { firstName, lastName, email, password, confirmPassword } = formData;

    const handleOnChange = (e) => {
        setFormData((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value,
        }))
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        const signupData = {
            ...formData,
            role,
        }

        dispatch(setSignUpData(signupData));
        dispatch(setLoading(true));

        try {

            const { data } = await axios.post(userEndPoints.SENDOTP_API, {
                email
            });

            console.log("SEND OTP API responses :", data);

            if (!data.success) {
                throw new Error(data.message);
            }

            toast.success("OTP Sent Successfully");

            navigate("/verify-email");

        } catch (error) {

            console.log("Error in send otp api :", error);
            toast.error("Could Not Send OTP");

        }

        dispatch(setLoading(false));

        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
        setRole(ACCOUNT_TYPE.STUDENT);

    };

    return (
        <div>
            {/* Tab */}
            <Tab tabData={tabData} field={role} setField={setRole} />
            {/* Form */}
            <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
                <div className="flex gap-x-4">
                    <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            First Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={handleOnChange}
                            placeholder="Enter first name"

                            className='bg-slate-800 p-[12px] bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full'
                            style={{ "boxShadow": "rgba(255, 255, 255, 0.18) 0px -1px 0px inset" }}
                        />
                    </label>
                    <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Last Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={handleOnChange}
                            placeholder="Enter last name"
                            className='bg-slate-800 p-[12px] bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full'
                            style={{ "boxShadow": "rgba(255, 255, 255, 0.18) 0px -1px 0px inset" }}
                        />
                    </label>
                </div>
                <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Email Address <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                        placeholder="Enter email address"
                        className='bg-slate-800 p-[12px] bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full'
                        style={{ "boxShadow": "rgba(255, 255, 255, 0.18) 0px -1px 0px inset" }}
                    />
                </label>
                <div className="flex gap-x-4">
                    <label className="relative">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Create Password <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={handleOnChange}
                            placeholder="Enter Password"
                            className='bg-slate-800 p-[12px] bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full'
                            style={{ "boxShadow": "rgba(255, 255, 255, 0.18) 0px -1px 0px inset" }}
                        />
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {showPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                    </label>
                    <label className="relative">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Confirm Password <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleOnChange}
                            placeholder="Confirm Password"
                            className='bg-slate-800 p-[12px] bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full'
                            style={{ "boxShadow": "rgba(255, 255, 255, 0.18) 0px -1px 0px inset" }}
                        />
                        <span
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {showConfirmPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                    </label>
                </div>
                <button
                    type="submit"
                    className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                >
                    Create Account
                </button>
            </form>
        </div>
    )
}

export default SignupForm
