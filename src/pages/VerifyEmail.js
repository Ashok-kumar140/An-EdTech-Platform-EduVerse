import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import OtpInput from "react-otp-input";
import { Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { setLoading } from '../redux/slices/authSlice';
import { userEndPoints } from '../apis/apis';
import axios from 'axios';
import toast from 'react-hot-toast';


const VerifyEmail = () => {

    const { loading, signupData } = useSelector((state) => state.auth);
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!signupData) {
            navigate("/signup");
        }
    }, []);


    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const { role,
            firstName, lastName,
            email, password,
            confirmPassword,
        } = signupData;

        dispatch(setLoading(true));

        try {

            const { data } = await axios.post(userEndPoints.SIGNUP_API, { role, firstName, lastName, email, password, confirmPassword, otp })

            console.log("response from signup API :", data);

            if (!data.success) {
                throw new Error(data.message);
            }

            toast.success("Signup Successful")
            navigate("/login")

        } catch (error) {

            console.log("Error while calling signup API:", error);
            toast.error("Signup Failed");
            navigate('/signup');
        }

        dispatch(setLoading(false));


    }
    const handleResendBtn = async (e) => {

        const { email } = signupData.email;

        try {
            const { data } = await axios.post(userEndPoints.SENDOTP_API, {
                email,
            });

            console.log("SendOtp API Response", data)

            if (!data.success) {
                throw new Error(data.message)
            }

            toast.success("OTP Sent Successfully")
            navigate("/verify-email")
        } catch (error) {
            console.log("Error while calling send otp API", error)
            toast.error("Could Not Send OTP")
        }

    }
    return (
        <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
            {loading ? (
                <div>
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className="max-w-[500px] p-4 lg:p-8">
                    <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
                        Verify Email
                    </h1>
                    <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
                        A verification code has been sent to you. Enter the code below
                    </p>
                    <form onSubmit={handleOnSubmit}>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    placeholder="-"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                />
                            )}
                            containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 6px",
                            }}
                        />
                        <button
                            type="submit"
                            className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
                        >
                            Verify Email
                        </button>
                    </form>
                    <div className="mt-6 flex items-center justify-between">
                        <Link to="/signup">
                            <p className="text-richblack-5 flex items-center gap-x-2">
                                <BiArrowBack /> Back To Signup
                            </p>
                        </Link>
                        <button
                            className="flex items-center text-blue-100 gap-x-2"
                            onClick={handleResendBtn}
                        >
                            <RxCountdownTimer />
                            Resend it
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default VerifyEmail
