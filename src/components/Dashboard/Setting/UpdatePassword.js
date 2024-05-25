import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { profileEndPoints } from '../../../apis/apis';
import toast from 'react-hot-toast';
// import { setUser } from '../../../redux/slices/profileSlice';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BsEyeSlash } from "react-icons/bs";
const UpdatePassword = () => {

    // const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    // const dispatch = useDispatch()
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [loading, setLoading] = useState(false);


    const handleUpdatePassword = async (formData) => {
        setLoading(true);
        try {

            const { data } = await axios.post(profileEndPoints.CHANGE_PASSWORD_API, formData, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })

            if (!data.success) {
                toast.error(data.error);
                throw new Error(data.message);
            }
            console.log("Response from change password api:", data);
            toast.success("Password Changed Successfully");
        } catch (error) {

            console.log("Error while calling change password api:", error);
            // toast.error(error);
        }

    }
    return (
        <form onSubmit={handleSubmit(handleUpdatePassword)}>
            <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
                <div className="flex flex-col gap-5 lg:flex-row">
                    <div className="relative flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="oldPassword" className="label-style">
                            Current Password
                        </label>
                        <input
                            type={showOldPassword ? "text" : "password"}
                            name="oldPassword"
                            id="oldPassword"
                            placeholder="Enter Current Password"
                            className="input-field-style"
                            {...register("oldPassword", { required: true })}
                        />
                        <span
                            onClick={() => setShowOldPassword((prev) => !prev)}
                            className="absolute right-3 top-[45px] z-[10] cursor-pointer"
                        >
                            {showOldPassword ? (
                                <MdOutlineRemoveRedEye fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <BsEyeSlash fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                        {errors.oldPassword && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your Current Password.
                            </span>
                        )}
                    </div>
                    <div className="relative flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="newPassword" className="label-style">
                            New Password
                        </label>
                        <input
                            type={showNewPassword ? "text" : "password"}
                            name="newPassword"
                            id="newPassword"
                            placeholder="Enter New Password"
                            className="input-field-style"
                            {...register("newPassword", { required: true })}
                        />
                        <span
                            onClick={() => setShowNewPassword((prev) => !prev)}
                            className="absolute right-3 top-[45px] z-[10] cursor-pointer"
                        >
                            {showNewPassword ? (
                                <MdOutlineRemoveRedEye fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <BsEyeSlash fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                        {errors.newPassword && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your New Password.
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-2">
                <button
                    onClick={() => {
                        navigate("/dashboard/my-profile")
                    }}
                    className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                >
                    Cancel
                </button>
                <button className='flex items-center gap-2 bg-yellow-50  p-2 px-3 rounded-md'
                    type='submit' disabled={loading}
                >
                    <p>Submit</p>
                </button>
            </div>
        </form>
    )
}

export default UpdatePassword;
