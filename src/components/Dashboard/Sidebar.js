import React, { useState } from 'react';
import { sidebarLinks } from '../../data/DashboardLinks';
import { IoSettingsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, matchPath, NavLink, useNavigate } from 'react-router-dom'
import { VscAccount } from "react-icons/vsc";
import { LuHistory } from "react-icons/lu";
import { VscMortarBoard } from "react-icons/vsc";
import { VscArchive } from "react-icons/vsc";
import { VscDashboard } from 'react-icons/vsc';
import { VscVm } from 'react-icons/vsc';
import { VscAdd } from 'react-icons/vsc';
import { setToken } from '../../redux/slices/authSlice';
import { setUser } from '../../redux/slices/profileSlice';
import { resetCart } from '../../redux/slices/cartSlice';
import toast from 'react-hot-toast';
import ConfirmationModal from '../ConfirmationModal';

const SideBar = () => {

    const { loading: authLoading } = useSelector((state) => state.auth);
    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationData, setConfirmationData] = useState(null);

    // console.log("User inside sidebar: ", user);

    const checkPath = (route) => {
        return matchPath(route, location.pathname);
    }


    if (authLoading || profileLoading) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }
    const handleLogOut = async () => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
    return (
        <>
            <div className='hidden  md:flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10'>
                <div className='flex flex-col'>
                    {
                        sidebarLinks.map((element) => {



                            if ((element.type && user?.role !== element.type)) return null
                            return (
                                <NavLink to={element.path}
                                    className={`relative px-8 py-2 text-sm font-medium ${checkPath(element.path) ? "bg-yellow-800 text-yellow-50" : "bg-opacity-0 text-richblack-300"} transition-all duration-200`}
                                    key={element.id}>

                                    <span className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${checkPath(element.path) ? "opacity-100" : "opacity-0"}`}></span>

                                    <div className="flex items-center gap-x-2">
                                        {element.id === 1 && <VscAccount />}
                                        {element.id === 6 && <LuHistory />}
                                        {element.id === 5 && <VscMortarBoard />}
                                        {element.id === 7 && <VscArchive />}
                                        {element.id === 2 && <VscDashboard />}
                                        {element.id === 3 && <VscVm />}
                                        {element.id === 4 && <VscAdd />}

                                        <span>{element.name}</span>
                                    </div>

                                </NavLink>
                            )
                        })
                    }

                </div>

                <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700"></div>

                <NavLink to={'/dashboard/settings'}
                    className={`relative px-8 py-2 text-sm font-medium ${checkPath("/dashboard/settings") ? "bg-yellow-800 text-yellow-50" : "bg-opacity-0 text-richblack-300"} transition-all duration-200`}
                >
                    <span></span>
                    <div className='flex gap-3'>
                        <IoSettingsOutline />
                        <p>Settings</p>
                    </div>
                </NavLink>

                <button className={`relative px-8 py-2 text-sm font-medium bg-opacity-0 text-richblack-300 transition-all duration-200`}
                    type='button'
                    onClick={() => setConfirmationData({
                        text1: "Are You Sure?",
                        text2: "You will be logged out from your account.",
                        btnText1: "Cancel",
                        btnText2: "LogOut",
                        btnHandler2: () => handleLogOut(),
                        btnHandler1: () => setConfirmationData(null)
                    })}
                >
                    <span></span>
                    <div className='flex gap-3'>
                        <LuLogOut />
                        <p>Logout</p>
                    </div>
                </button>



            </div >
            {
                confirmationData && (
                    <ConfirmationModal modalData={confirmationData} />
                )
            }
        </>
    )


}


export default SideBar;
