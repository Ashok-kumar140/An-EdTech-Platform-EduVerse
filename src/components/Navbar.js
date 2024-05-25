import React, { useEffect, useRef, useState } from 'react'
import { Link, matchPath, useLocation, useNavigate, NavLink } from 'react-router-dom';
import Logo from '../assets/logo/logo3.png';
import { useDispatch, useSelector } from 'react-redux';
import { MdShoppingCart } from "react-icons/md";
import { AiOutlineMenu, AiOutlineRight } from 'react-icons/ai';
import axios from 'axios'
import { ACCOUNT_TYPE } from '../helpers/constants';
import { categories } from '../apis/apis';
import { IoIosArrowDown, } from "react-icons/io";
import { IoSettingsOutline } from 'react-icons/io5'
import ProfileDropDown from './AuthPage/ProfileDropDown';
import { RxCross2 } from "react-icons/rx";
import { LuLogOut } from "react-icons/lu";
import toast from 'react-hot-toast';
import { setUser } from '../redux/slices/profileSlice';
import { resetCart } from '../redux/slices/cartSlice';
import { setToken } from '../redux/slices/authSlice';
import { sidebarLinks } from '../data/DashboardLinks';
import { VscAccount } from "react-icons/vsc";
import { LuHistory } from "react-icons/lu";
import { VscMortarBoard } from "react-icons/vsc";
import { VscArchive } from "react-icons/vsc";
import { VscDashboard } from 'react-icons/vsc';
import { VscVm } from 'react-icons/vsc';
import { VscAdd } from 'react-icons/vsc';
const navData = [
    {
        title: "Home",
        path: "/",
    },
    {
        title: "Catalog",
        // path: '/catalog',
    },
    {
        title: "About Us",
        path: "/about",
    },
    {
        title: "Contact Us",
        path: "/contact",
    },
];
const Navbar = () => {

    const location = useLocation();
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalCourses } = useSelector((state) => state.cart);
    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSubLinks, setShowSubLinks] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const contentElCatalog = useRef(null);
    const contentElDashboard = useRef(null);

    const [catalogHeight, setCatalogHeight] = useState(0);
    useEffect(() => {
        setCatalogHeight(
            showSubLinks ? contentElCatalog.current.scrollHeight : 0
        );
    }, [showSubLinks]);

    const [dashboardHeight, setDashboardHeight] = useState(0);
    useEffect(() => {
        setDashboardHeight(
            showDashboard ? contentElDashboard.current.scrollHeight : 0
        );
    }, [showDashboard]);


    useEffect(() => {
        fetchCatalog();
    }, [])

    const fetchCatalog = async () => {
        setLoading(true);
        try {

            const { data } = await axios.get(categories.CATEGORIES_API);
            // console.log("data from api",data);
            setSubLinks(data.categories);

        } catch (error) {
            console.log("error while calling api for fetching catalog ", error.message)

        }
        setLoading(false);
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


    const checkPath = (path) => {

        return matchPath(path, location.pathname)
    }


    return (
        <div className='flex h-14 items-center justify-center  border-b-[1px] border-b-richblack-700 bg-richblack-800'>

            <div className={`flex flex-row-reverse md:flex-row row w-11/12 max-w-maxContent items-center justify-between `}>
                <Link to={'/'}>
                    <img src={Logo} alt="" width={160} height={42} loading='lazy' />
                </Link>
                <nav className="hidden md:block">
                    <ul className='flex gap-6 text-richblack-25'>
                        {
                            navData.map((navItem, index) => (

                                <li key={index}>
                                    {
                                        navItem.title !== 'Catalog' ? (
                                            <Link to={navItem?.path} className={`${checkPath(navItem?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                {navItem.title}
                                            </Link>
                                        ) : (
                                            <>
                                                <div
                                                    className={`group relative flex cursor-pointer items-center gap-1 ${checkPath("/catalog/:catalogName")
                                                        ? "text-yellow-25"
                                                        : "text-richblack-25"
                                                        }`}
                                                >
                                                    <p>{navItem.title}</p>
                                                    <IoIosArrowDown />
                                                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                                                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                                        {loading ? (
                                                            <p className="text-center">Loading...</p>
                                                        ) : subLinks && subLinks.length ? (
                                                            <>
                                                                {subLinks?.map((subLink, i) => (
                                                                    <Link
                                                                        to={`/catalog/${subLink.name
                                                                            .split(" ")
                                                                            .join("-")
                                                                            .toLowerCase()}`}
                                                                        className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                                        key={i}
                                                                    >


                                                                        <p className="">{subLink.name}</p>
                                                                    </Link>
                                                                ))}
                                                            </>
                                                        ) : (
                                                            <p className="text-center">No Courses Found</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }

                                </li>

                            ))
                        }


                    </ul>
                </nav>

                <div className="hidden items-center gap-8 md:flex">

                    {
                        user && user?.role !== ACCOUNT_TYPE.INSTRUCTOR && (
                            <Link to="/dashboard/my-cart" className="relative">
                                <MdShoppingCart className="text-2xl text-richblack-100" />
                                {totalCourses > 0 && (
                                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                        {totalCourses}
                                    </span>
                                )}
                            </Link>

                        )
                    }
                    {token === null && (
                        <Link to="/login">
                            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 hover:bg-richblack-900 hover:text-white transition-all duration-500">
                                Log in
                            </button>
                        </Link>
                    )}
                    {token === null && (
                        <Link to="/signup">
                            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 hover:bg-richblack-900 hover:text-white transition-all duration-500">
                                Sign up
                            </button>
                        </Link>
                    )}
                    {token !== null && <ProfileDropDown />}

                </div>
                <nav className="mr-4 md:hidden">
                    <button onClick={() => setOpenSidebar(!openSidebar)}>

                        {
                            openSidebar ? (<RxCross2 fontSize={24} className="text-white" />) : (<AiOutlineMenu fontSize={24} fill="#AFB2BF" />)
                        }

                    </button>
                    <div className={` ${openSidebar ? "block" : "hidden"} fixed top-14 left-0 w-[30vh] h-screen bg-richblack-800 z-[100] flex justify-start items-center transition-all duration-[1s] flex-col overflow-hidden`}>
                        <div className="opacity-100 duration-[4.5s]  w-full transition-all overflow-hidden">

                            <div className="w-full flex gap-4 items-center flex-col justify-center mt-5">

                                {token === null && (
                                    <Link to="/login"
                                        onClick={() => setOpenSidebar(!openSidebar)}
                                    >
                                        <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[30px] py-[8px] text-richblack-50 hover:bg-richblack-900 hover:text-white transition-all duration-500">
                                            Log in
                                        </button>
                                    </Link>
                                )}
                                {token === null && (
                                    <Link to="/signup"
                                        onClick={() => setOpenSidebar(!openSidebar)}
                                    >
                                        <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[30px] py-[8px] text-richblack-100 hover:bg-richblack-900 hover:text-white transition-all duration-500">
                                            Sign up
                                        </button>
                                    </Link>
                                )}

                                {token !== null && (
                                    <Link
                                        className="w-full flex flex-row gap-2 items-center justify-center"
                                        to={"dashboard/my-profile"}
                                        onClick={() => setOpenSidebar(!openSidebar)}
                                    >
                                        <img
                                            src={user?.image}
                                            alt={`profile-${user?.firstName}`}
                                            className="aspect-square w-[50px] rounded-full object-cover"
                                        />
                                        <div className="flex gap-3 items-center">
                                            <div className="space-y-1">
                                                <p className="text-base font-semibold text-richblack-5 hover:underline hover:text-caribbeangreen-300">
                                                    {user?.firstName + " " + user?.lastName}
                                                </p>

                                                <p className="text-xs text-richblack-300">Welcome back</p>
                                            </div>
                                            <AiOutlineRight className="text-lg font-bold text-richblack-5" />
                                        </div>
                                    </Link>
                                )}

                                {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                                    <Link
                                        to="/dashboard/my-cart"
                                        className="relative flex items-center text-richblack-5 gap-3 self-start ml-10"
                                        onClick={() => setOpenSidebar(!openSidebar)}
                                    >
                                        <MdShoppingCart className="text-2xl text-richblack-100" />{" "}
                                        Cart
                                        {totalCourses > 0 && (
                                            <span className="absolute -top-2 left-3 grid h-4 w-4 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                                {totalCourses}
                                            </span>
                                        )}
                                    </Link>
                                )}

                                {token !== null && (
                                    <div
                                        onClick={() => {
                                            handleLogOut();
                                            setOpenSidebar(!openSidebar);
                                        }}

                                        className="flex items-center text-sm text-richblack-100 cursor-pointer   gap-3 self-start ml-10 font-bold"
                                    >
                                        <LuLogOut className="text-2xl" />
                                        Logout
                                    </div>
                                )}

                            </div>

                            <div className="w-full h-[1.5px] bg-white my-5"></div>

                            {
                                location.pathname.split("/").includes("dashboard") &&
                                (
                                    <>

                                        <div>
                                            <div
                                                className="flex gap-2 items-center justify-center cursor-pointer"
                                                onClick={() => setShowDashboard(!showDashboard)}
                                            >
                                                <p className=" text-richblack-5 font-semibold text-center my-2">
                                                    Dashboard
                                                </p>
                                                <IoIosArrowDown
                                                    className={`${showDashboard ? "rotate-180" : "rotate-0"
                                                        } text-lg font-bold text-richblack-5 transition-all duration-1000`}
                                                />
                                            </div>
                                            <div className={`${showDashboard ? 'flex flex-col' : "hidden"}      h-0 transition-[height] duration-1000 overflow-hidden`}
                                                ref={contentElDashboard}
                                                style={{
                                                    height: dashboardHeight,
                                                }}
                                            >
                                                {
                                                    sidebarLinks.map((element) => {



                                                        if ((element.type && user?.role !== element.type)) return null
                                                        return (
                                                            <NavLink to={element.path}
                                                                className={`relative px-8 py-2 text-sm font-medium ${checkPath(element.path) ? "bg-yellow-800 text-yellow-50" : "bg-opacity-0 text-richblack-300"} transition-all duration-200`}
                                                                key={element.id}
                                                                onClick={()=>setOpenSidebar(!openSidebar)}
                                                                
                                                                >

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
                                                {
                                                    <>
                                                        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700"></div>
                                                        <NavLink to={'/dashboard/settings'}
                                                            className={`relative text-center px-8 py-2 text-sm font-medium ${checkPath("/dashboard/settings") ? "bg-yellow-800 text-yellow-50" : "bg-opacity-0 text-richblack-300"} transition-all duration-200`}
                                                        >
                                                            <span></span>
                                                            <div className='flex gap-3'>
                                                                <IoSettingsOutline />
                                                                <p>Settings</p>
                                                            </div>
                                                        </NavLink>
                                                    </>
                                                }

                                            </div>

                                        </div>
                                        <div className="w-full h-[1.5px] bg-white my-5"></div>
                                    </>
                                )
                            }

                            <ul className="flex gap-x-6 text-richblack-25 hover:cursor-pointer flex-col gap-y-10 justify-center items-center">

                                {
                                    navData.map((navItem, index) => (

                                        <li key={index}>
                                            {
                                                navItem.title !== 'Catalog' ? (
                                                    <Link onClick={() => setOpenSidebar(!openSidebar)} to={navItem?.path} className={`${checkPath(navItem?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                        {navItem.title}
                                                    </Link>
                                                ) : (
                                                    <>
                                                        <div
                                                            className={`group relative flex  flex-col cursor-pointer items-center gap-1  ${checkPath("/catalog/:catalogName")
                                                                ? "text-yellow-25"
                                                                : "text-richblack-25"
                                                                }`}
                                                        >
                                                            <div className="flex items-center justify-center gap-x-1" onClick={() => setShowSubLinks(!showSubLinks)}>
                                                                <p>{navItem.title}</p>
                                                                <IoIosArrowDown
                                                                    className={`${showSubLinks ? "rotate-180" : "rotate-0"
                                                                        } text-lg font-bold text-richblack-5 transition-all duration-1000`}
                                                                />

                                                            </div>

                                                            <div className={`${showSubLinks ? 'block' : "hidden"} h-0 transition-[height] duration-1000 overflow-hidden`} ref={contentElCatalog}
                                                                style={{
                                                                    height: catalogHeight,
                                                                }}>
                                                                <div className="w-[30vh] mt-2 h-[1px] bg-white"></div>

                                                                {

                                                                    loading ? (
                                                                        <p className="text-center">Loading...</p>
                                                                    ) : (
                                                                        subLinks && subLinks.map((item, index) => (
                                                                            <Link to={`/catalog/${item.name
                                                                                .split(" ")
                                                                                .join("-")
                                                                                .toLowerCase()}`}
                                                                                key={index}
                                                                                onClick={() => setOpenSidebar(!openSidebar)}
                                                                                className="hover:bg-richblack-700 flex flex-col items-center justify-between text-richblack-100 hover:text-white font-semibold">


                                                                                <p className="mt-2 text-center">{item.name}</p>
                                                                                <div className="w-[30vh] mt-2 h-[1px] bg-white"></div>

                                                                            </Link>
                                                                        ))
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            }

                                        </li>

                                    ))
                                }

                            </ul>
                        </div>

                    </div>
                </nav>
            </div>

        </div>
    )
}

export default Navbar;
