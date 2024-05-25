import React from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { profileEndPoints } from '../../../apis/apis';
import toast from 'react-hot-toast';
import { setUser } from '../../../redux/slices/profileSlice';

const EditProfileDetails = () => {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

    const { register, handleSubmit} = useForm()

    const handleSubmitProfileForm = async (formData) => {
        // e.preventDefault();
        console.log("data: ", formData);
        try {

            const { data } = await axios.put(profileEndPoints.UPDATE_PROFILE_API, formData, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            console.log("response from update profile api ", data);
            if (!data.success) {
                throw new Error(data.message);
            }
            dispatch(setUser(data?.updatedUserDetails));
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(data?.updatedUserDetails));

            toast.success("Profile Updated Successfully")
        } catch (error) {
            console.log("Error while calling profile update api: ", error.message);

        }

    }
    return (
        <form onSubmit={handleSubmit(handleSubmitProfileForm)}>

            <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">

                <h2 className="text-lg font-semibold text-richblack-5"> Profile Information </h2>

                <div className="flex flex-col gap-5 lg:flex-row text-richblack-5">
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="profession" className="label-style">  Profession  </label>
                        <input type="text" name="profession" id="profession" placeholder="Enter your profession"
                            {...register("profession", { required: true })} defaultValue={user?.role}
                            className='input-field-style' />

                    </div>
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="address" className="label-style"> Address </label>
                        <input type="text" name="address" id="address" placeholder="Enter your address"   {...register("address")} defaultValue={user?.address}
                            className='input-field-style' />

                    </div>
                </div>

                <div className="flex flex-col gap-5 lg:flex-row text-richblack-5">
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="DOB" className="label-style"> Date of Birth  </label>
                        <input type="date" name="DOB" id="DOB" className="input-field-style"
                            {...register("DOB")}
                            defaultValue={user?.moreInfo?.DOB}
                        />

                    </div>
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="gender" className="label-style"> Gender </label>
                        <select type="text" name="gender" id="gender" className="input-field-style" {...register("gender")} defaultValue={user?.moreInfo?.gender} >
                            {genders.map((ele, i) => { return (<option key={i} value={ele}> {ele} </option>) })}
                        </select>

                    </div>
                </div>

                <div className="flex flex-col gap-5 lg:flex-row">
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="contactNumber" className="label-style">  Contact Number  </label>
                        <input type="tel" name="contactNumber" id="contactNumber" placeholder="Enter Contact Number" className="input-field-style"
                            {...register("contactNumber"
                            )}
                            defaultValue={user?.moreInfo?.contactNumber}
                        />

                    </div>
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="about" className="label-style"> About </label>
                        <input type="text" name="about" id="about" placeholder="Enter Bio Details" className="input-field-style"
                            {...register("about")}
                            defaultValue={user?.moreInfo?.about}
                        />

                    </div>
                </div>

            </div>

            <div className="flex justify-end gap-2">
                <button onClick={() => { navigate("/dashboard/my-profile") }} className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50" >
                    Cancel
                </button>
                <button className='flex items-center gap-2 bg-yellow-50  p-2 px-3 rounded-md'
                    type='submit'
                >
                    <p>Submit</p>
                </button>
            </div>

        </form>
    )
}

export default EditProfileDetails;
