import React from 'react'
import { useSelector } from 'react-redux';
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FormateDate } from "../../helpers/FormateDate";

const MyProfile = () => {

    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    return (
        <div className='text-white'>

            <h1 className='text-4xl font-semibold mb-5 lg:mb-20'>My Profile</h1>
            <div className='flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
                <div className='flex gap-5 justify-center items-center'>
                    <div >
                        <img src={user.image} alt="" width={140} height={140} 
                        className="aspect-square w-[78px] rounded-full object-cover"
                        loading='lazy' />
                    </div>
                    <div className='space-y-1'>
                        <p className='text-lg font-semibold text-richblack-5'>{user?.firstName}{" "}{user?.lastName}</p>
                        <p className='text-sm text-richblack-300'>{user?.email}</p>
                    </div>
                </div>
                <div>
                    <button className='flex items-center gap-2 bg-yellow-50 text-richblack-700 p-2 px-3 rounded-md'
                        onClick={() => navigate('/dashboard/settings')}>
                        <FaRegEdit />
                        <p>Edit</p>
                    </button>
                </div>
            </div>
            <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">

                <div className="flex w-full items-center justify-between">
                    <p className="text-lg font-semibold text-richblack-5"> Personal Details </p>
                    <button className='flex items-center gap-2 bg-yellow-50 text-richblack-700 p-2 px-3 rounded-md'
                        onClick={() => navigate('/dashboard/settings')}>
                        <FaRegEdit />
                        <p>Edit</p>
                    </button>
                </div>

                <div className="flex max-w-[500px] justify-between">

                    <div className="flex flex-col gap-y-5">
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">First Name</p>
                            <p className="text-sm font-medium text-richblack-5"> {user?.firstName} </p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Email</p>
                            <p className="text-sm font-medium text-richblack-5"> {user?.email} </p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Gender</p>
                            <p className="text-sm font-medium text-richblack-5"> {user?.moreInfo?.gender ?? "Add Gender"} </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-5">
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Last Name</p>
                            <p className="text-sm font-medium text-richblack-5"> {user?.lastName} </p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
                            <p className="text-sm font-medium text-richblack-5"> {user?.moreInfo?.contactNumber ?? "Add Contact Number"} </p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
                            <p className="text-sm font-medium text-richblack-5">
                                {FormateDate(user?.moreInfo?.DOB) ?? "Add Date Of Birth"}
                            </p>
                        </div>
                    </div>

                </div>
                <div className="mx-auto mt-6 mb-6 h-[1px] w-full bg-richblack-700"></div>

                <div className="flex w-full items-center justify-between">
                    <p className="text-lg font-semibold text-richblack-5">About</p>
                    <button className='flex items-center gap-2 bg-yellow-50 text-richblack-700 p-2 px-3 rounded-md'
                        onClick={() => navigate('/dashboard/settings')}>
                        <FaRegEdit />
                        <p>Edit</p>
                    </button>
                </div>
                <p className={`${user?.moreInfo?.about ? "text-richblack-5" : "text-richblack-400"} text-sm font-medium`} >
                    {user?.moreInfo?.about ?? "Write Something About Yourself"}
                </p>


            </div>

        </div>
    )
}

export default MyProfile
