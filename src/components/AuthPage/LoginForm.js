import React, { useState } from 'react';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoading, setToken } from '../../redux/slices/authSlice';
import { setUser } from '../../redux/slices/profileSlice';
import axios from 'axios';
import { userEndPoints } from '../../apis/apis';
import toast from 'react-hot-toast';

const LoginForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });


    const handleOnChange = (e) => {

        setFormData((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value,
        }))

    };

    const handleOnSubmit = async (e) => {

        e.preventDefault();

        dispatch(setLoading(true));

        const { email, password } = formData;

        try {

            const { data } = await axios.post(userEndPoints.LOGIN_API, { email, password });

            // console.log("Response from login API :", data);

            if (!data.success) {
                toast.error(data.message);
                throw new Error(data.message);
            }

            toast.success("Logged In Successfully");
            dispatch(setToken(data?.user?.token));

            dispatch(setUser(data?.user))
            localStorage.setItem("token", JSON.stringify(data?.user?.token));
            localStorage.setItem("user", JSON.stringify(data?.user));
            // console.log("Printing token from session storage in logi function", localStorage.getItem("token"));
            // console.log("value of data.token: ", data?.user?.token);

            navigate("/dashboard/my-profile")


        } catch (error) {
            console.log("Error while calling login API: ", error);
            toast.error("Login Failed");
        }
        dispatch(setLoading(false));

    }



    return (
        <form
            onSubmit={handleOnSubmit}
            className="mt-6 flex w-full flex-col gap-y-4"
        >
            <label className="w-full">
                <p className="label-style">
                    Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                    required
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleOnChange}
                    placeholder="Enter email address"
                    className='input-field-style'
                />
            </label>
            <label className="relative">
                <p className="label-style">
                    Password <sup className="text-pink-200">*</sup>
                </p>
                <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleOnChange}
                    placeholder="Enter Password"
                    className='input-field-style'
                />
                <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                    {showPassword ? (
                        <MdOutlineRemoveRedEye fontSize={24} fill="#AFB2BF" />
                    ) : (
                        <BsEyeSlash fontSize={24} fill="#AFB2BF" />
                    )}
                </span>
                <Link to="/forgot-password">
                    <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
                        Forgot Password
                    </p>
                </Link>
            </label>
            <button
                type="submit"
                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
            >
                Sign In
            </button>
            <Link className='text-[#38bdf8] font-semibold text-center' to={'/signup'}>
                New User? Create your account.
            </Link>
        </form>
    )
}

export default LoginForm
