import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineArrowDropDown } from "react-icons/md";
import { RiDashboard2Line } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {  setToken } from '../../redux/slices/authSlice'
import { resetCart } from "../../redux//slices/cartSlice"
import { setUser } from "../../redux//slices/profileSlice"



const ProfileDropDown = () => {

    const [open, setOpen] = useState(false);
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // console.log("printing user inside the dropdown",user);

    const dropDownRef = useRef(null);

    useEffect(() => {

        const handleListener = (e) => {

            if (!dropDownRef.current || dropDownRef.current.contains(e.target)) {
                return;
            }
            setOpen(false);
        };

        document.addEventListener("mousedown", handleListener);
        document.addEventListener("touchstart", handleListener);

        return () => {
            document.removeEventListener("mousedown", handleListener);
            document.removeEventListener("touchstart", handleListener);
        }

    }, [dropDownRef, setOpen]);


    const handleLogOut = async () => {
        console.log("Log out clicked")
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    };

    return (
        <button className="relative" onClick={() => setOpen(true)}>
            <div className="flex items-center gap-x-1">
                <img
                    src={user?.image}
                    alt={`profile-${user?.firstName}`}
                    className="aspect-square w-[30px] rounded-full object-cover"
                />
                <MdOutlineArrowDropDown className="text-sm text-richblack-100" />
            </div>
            {open && (
                <>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-[140%] right-[-29%] z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
                        ref={dropDownRef}
                    >
                        <Link to={"/dashboard/my-profile"} onClick={() => setOpen(false)}>
                            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                                <RiDashboard2Line className="text-lg" />
                                Dashboard
                            </div>
                        </Link>
                        <div
                            onClick={handleLogOut}
                            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                        >
                            <MdLogout className="text-lg" />
                            Logout
                        </div>
                    </div>

                </>
            )}
        </button>
    )
}

export default ProfileDropDown;
