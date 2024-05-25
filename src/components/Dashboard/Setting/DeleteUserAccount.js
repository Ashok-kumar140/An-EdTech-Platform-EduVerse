import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmationModal from '../../ConfirmationModal';
import { profileEndPoints } from '../../../apis/apis';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setToken } from '../../../redux/slices/authSlice'
import { resetCart } from "../../../redux//slices/cartSlice"
import { setUser } from "../../../redux//slices/profileSlice"

const DeleteUserAccount = () => {
    // const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const [confirmationData, setConfirmationData] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDeleteUser = async () => {


        try {

            const { data } = await axios.delete(profileEndPoints.DELETE_PROFILE_API, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            if (!data.success) {
                throw new Error(data.message);
            }
            toast.success("Profile Deleted Successfully")
            console.log("Response", data);
            dispatch(setToken(null))
            dispatch(setUser(null))
            dispatch(resetCart())
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            toast.success("Logged Out")
            navigate("/")

        } catch (error) {
            console.log("Error while calling delete user api:", error.message);
            toast.error("Failed to delete user");
        }

        console.log("User deleted successfully")

    }

    return (
        <div>
            <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12">

                <div className="flex flex-col space-y-2">
                    <h2 className="text-lg font-semibold text-richblack-5">
                        Delete Account
                    </h2>
                    <div className="w-3/5 text-pink-25">

                        <p>
                            This account may contain Paid Courses. Deleting your account is
                            permanent and will remove all the contain associated with it.
                        </p>
                    </div>

                </div>
                <div className='flex justify-center items-center'>
                    <button className="bg-pink-700 p-2 px-3 rounded-md flex items-center gap-2"
                        onClick={() =>
                            setConfirmationData({
                                text1: "Are you sure?",
                                text2: "You will be logged out of your account.",
                                btnText1: "Cancel",
                                btnText2: "Delete",
                                btnHandler1: () => setConfirmationData(null),
                                btnHandler2: handleDeleteUser,
                            })
                        }
                    >
                        <RiDeleteBin6Line />
                        <p>Delete</p>
                    </button>
                </div>
            </div>
            {
                confirmationData && <ConfirmationModal modalData={confirmationData} />
            }

        </div >
    )
}

export default DeleteUserAccount
