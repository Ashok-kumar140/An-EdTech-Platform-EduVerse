import React, { useState } from 'react';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BsEyeSlash } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { setLoading } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { userEndPoints } from '../apis/apis';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BiArrowBack } from "react-icons/bi";



const UpdatePassword = () => {

    const { loading } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
    const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [criteria, setCriteria] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });

    const { password, confirmPassword } = formData;

    const handleOnChange = (e) => {

        e.preventDefault();
        const { name, value } = e.target;
        setFormData((prevData) => (
            {
                ...prevData,
                [name]: value,
            }
        ))
        if (name === 'password') {
            setCriteria(validatePassword(value));
        }

    }
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

        handleResetPassword();

    };

    const handleResetPassword = async () => {
        // e.preventDefault()

        const passwordCriteria = validatePassword(formData.password);
        if (!Object.values(passwordCriteria).every(Boolean)) {
            toast.error("Password is not strong")
            return;
        }
        dispatch(setLoading(true));
        try {

            const token = location.pathname.split('/').at(-1);

            const { data } = await axios.post(userEndPoints.RESETPASSWORD_API, { password, confirmPassword, token })
            console.log("Response from resetpassword :", data);

            if (!data.success) {
                toast.error(data.message);
                // throw new Error(data.message)
            }
            toast.success("Password updated");
            navigate('/login');

        } catch (error) {

            console.log("Error at the time of calling update password api :", error.message);
            toast.error(error.message);

        }

        dispatch(setLoading(false));

    }

    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="max-w-[500px] p-4 lg:p-8">
                        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Choose new Password</h1>
                        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">Almost done. Enter your new password and you are all set.</p>

                        <form onSubmit={handleOnSubmit} className='relative' >
                            <label htmlFor="password" className="relative">
                                <p className="label-style">
                                    New Password <sup className="text-pink-200">*</sup>
                                </p>

                                <input type={`${!showPassword ? "password" : "text"}`} required name='password'
                                    value={formData.password} placeholder='Enter Password'
                                    onChange={handleOnChange} className='input-field-style mb-3' />
                                <ul className='mb-5'>
                                    {renderCriteria()}
                                </ul>


                            </label>
                            {
                                showPassword ? (

                                    <BsEyeSlash className='absolute left-[93%] top-[12%] text-white' onClick={(e) => setShowPassword(!showPassword)} />
                                ) : (

                                    <MdOutlineRemoveRedEye className='absolute left-[93%] top-[12%] text-white' onClick={(e) => setShowPassword(!showPassword)} />
                                )
                            }

                            <label htmlFor="confirmPassword" className="relative mt-14">
                                <p className="label-style">
                                    Confirm New Password <sup className="text-pink-200">*</sup>
                                </p>

                                <input type={`${!showConfirmedPassword ? "password" : "text"}`} required name='confirmPassword'
                                    value={formData.conformPassword} placeholder='Renter Password'
                                    onChange={handleOnChange} className='input-field-style'
                                />
                            </label>
                            {
                                showConfirmedPassword ? (

                                    <BsEyeSlash className='absolute left-[93%] top-[73%] text-white' onClick={(e) => setShowConfirmedPassword(!showConfirmedPassword)} />
                                ) : (

                                    <MdOutlineRemoveRedEye className='absolute left-[93%] top-[73%] text-white' onClick={(e) => setShowConfirmedPassword(!showConfirmedPassword)} />
                                )
                            }

                            <button
                                type="submit"
                                className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
                            >
                                Reset Password
                            </button>
                        </form>
                        <div className="mt-6 flex items-center justify-between">
                            <Link to="/login">
                                <p className="flex items-center gap-x-2 text-richblack-5">
                                    <BiArrowBack /> Back To Login
                                </p>
                            </Link>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default UpdatePassword;
