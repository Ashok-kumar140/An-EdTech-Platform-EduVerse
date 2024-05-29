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
import { Link, useNavigate } from 'react-router-dom';

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
    const [criteria, setCriteria] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });
    const [showCriteria, setShowCriteria] = useState(false);
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
        const { name, value } = e.target;
        setFormData((prevValue) => ({
            ...prevValue,
            [name]: value,
        }))
        if (name === 'password') {
            setCriteria(validatePassword(value));
        }
    };

    const validatePassword = (password) => {
        return {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };

    }
    const renderCriteria = () => {
        const criteriaList = [
            { label: "At least 8 characters", valid: criteria.length },
            { label: "At least one uppercase letter", valid: criteria.uppercase },
            { label: "At least one lowercase letter", valid: criteria.lowercase },
            { label: "At least one number", valid: criteria.number },
            { label: "At least one special character", valid: criteria.specialChar },
        ];

        return criteriaList.map((criterion, index) => (
            <li key={index} className={` flex items-center justify-start ${criterion.valid ? 'text-[#05BF00]' : 'text-[#e11d48]'}`}>
                <span
                    className={`flex items-center text-sm justify-center w-3 h-3 rounded-full text-black mr-2 ${criterion.valid ? 'bg-[#05BF00]' : 'bg-[#e11d48]'
                        }`}
                >
                    {criterion.valid ? '✔' : '-'}
                </span>
                {criterion.label}
            </li>
        ));
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        const passwordCriteria = validatePassword(formData.password);
        if (!Object.values(passwordCriteria).every(Boolean)) {
            toast.error("Password is not strong")
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
                        <p className="label-style">
                            First Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={handleOnChange}
                            placeholder="Enter first name"
                            className='input-field-style'
                        />
                    </label>
                    <label>
                        <p className="label-style">
                            Last Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={handleOnChange}
                            placeholder="Enter last name"
                            className='input-field-style'
                        />
                    </label>
                </div>
                <label className="w-full">
                    <p className="label-style">
                        Email Address <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                        placeholder="Enter email address"
                        className='input-field-style'
                    />
                </label>
                <div className=" flex flex-col gap-7">
                    <label className="relative">
                        <p className="label-style">
                            Create Password <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={handleOnChange}
                            placeholder="Enter Password"
                            className='input-field-style mb-3'
                            onFocus={() => setCriteria(validatePassword(formData.password))}
                            onClick={() => setShowCriteria(true)}
                        />
                        {showCriteria && <ul>
                            {renderCriteria()}
                        </ul>}
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
                        <p className="label-style">
                            Confirm Password <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleOnChange}
                            placeholder="Confirm Password"
                            className='input-field-style'
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
                <Link className='text-[#38bdf8] font-semibold text-center' to={'/login'}>
                    Already have account? Sign in.
                </Link>
            </form>
        </div>
    )
}

export default SignupForm
