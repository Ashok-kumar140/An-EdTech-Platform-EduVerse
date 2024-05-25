import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios';
import { userEndPoints } from '../apis/apis';
import { setLoading } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';


const ForgotPassword = () => {

    const { loading } = useSelector((state) => state.auth);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();



    const handleOnSubmit = (e) => {

        e.preventDefault();
        getPasswordResetToken(email, setIsEmailSent)

    }

    const getPasswordResetToken = async (email, setIsEmailSent) => {

        dispatch(setLoading(true));

        try {

            const { data } = await axios.post(userEndPoints.RESETPASSTOKEN_API, { email });
            console.log("data from getPasswordResetToken Function ", data);

            if (!data.success) {
                throw new Error(data.message);
            }
            toast.success("Reset Email sent");
            setIsEmailSent(true);


        }
        catch (error) {

            console.log("error in api calling for resetpassword token :", error.message);
            setIsEmailSent(false);
            toast.error("Error in sending email");

        }
        dispatch(setLoading(false));



    }

    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {
                loading ? (
                    <div>Loading....</div>
                ) : (
                    <div className='max-w-[500px] p-4 lg:p-8'>
                        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                            {
                                !isEmailSent ? "Reset your password" : "Check your Email"
                            }
                        </h1>
                        <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>
                            {
                                !isEmailSent ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery" : `We have sent the reset email to ${email}`
                            }
                        </p>

                        <form onSubmit={handleOnSubmit}>
                            {
                                !isEmailSent && (
                                    <label htmlFor="" className="w-full">
                                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                            Email Address:<sup className="text-pink-200">*</sup>
                                        </p>
                                        <input type="email" className='w-full p-[12px] bg-richblack-800 rounded-[0.5rem] text-richblack-5'
                                            style={{ "boxShadow": "rgba(255, 255, 255, 0.18) 0px -1px 0px inset" }}
                                            required
                                            value={email}
                                            name='email'
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder='Enter your email address' />
                                    </label>
                                )
                            }
                            <button type='submit' className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                                {
                                    !isEmailSent ? "Reset Password" : "Resend Email"
                                }
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

export default ForgotPassword;
