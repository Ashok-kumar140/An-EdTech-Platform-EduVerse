/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
// import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import Markdown from 'react-markdown'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import ConfirmationModal from "../components/ConfirmationModal"
// import Footer from "../components/Common/Footer"
import RatingStars from "../components/Catalog/RatingStars"
// import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
// import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import { FormateDate } from "../helpers/FormateDate"
import GetAvgRating from "../helpers/AverageRating"
import Error from "./Error"
import axios from "axios"
import { courseEndpoints } from "../apis/apis"
import toast from "react-hot-toast"
import CourseAccordion from "../components/Course/CourseAccordion"
import CourseDetailsCard from "../components/Course/CourseDetailCard"
import { ACCOUNT_TYPE } from "../helpers/constants"
import { addToCart } from "../redux/slices/cartSlice"
import { buyCourse } from "../Services/Payment"
// import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
// import { BuyCourse } from "../services/operations/studentFeaturesAPI"


const CourseDetails = () => {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const { loading } = useSelector((state) => state.profile)
    const { paymentLoading } = useSelector((state) => state.course)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const { courseId } = useParams()
    console.log(`course id: ${courseId}`)


    const [courseData, setCourseData] = useState(null)
    const [confirmationModal, setConfirmationModal] = useState(null)
    const [avgReviewCount, setAvgReviewCount] = useState(0)
    const [isActive, setIsActive] = useState(Array(0))

    useEffect(() => {

        fetchCourseDetails();
    }, [courseId])

    const fetchCourseDetails = async () => {

        try {

            const { data } = await axios.post(courseEndpoints.COURSE_DETAILS_API, { courseId });

            console.log("Data from API:", data);
            setCourseData(data?.data);

        } catch (error) {
            console.log(`Error while fetching course details of course id:${courseId}`, error);
            toast.error(error.message);

        }
    }

    useEffect(() => {
        const count = GetAvgRating(courseData?.courseDetails.courseRatingAndReviews)
        setAvgReviewCount(count)
    }, [courseData])


    const handleActive = (id) => {
        // console.log("called", id)
        setIsActive(
            !isActive.includes(id)
                ? isActive.concat([id])
                : isActive.filter((e) => e !== id)
        )
    }


    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
    useEffect(() => {
        let lectures = 0
        courseData?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0
        })
        setTotalNoOfLectures(lectures)
    }, [courseData])

    console.log("COURSEDATA", courseData);


    // const {
    //     // _id: course_id,
    //     courseTitle,
    //     courseDescription,
    //     thumbnail,
    //     price,
    //     whatYouWillLearn,
    //     courseContent,
    //     ratingAndReviews,
    //     instructor,
    //     studentsEnroled,
    //     createdAt,
    // } = courseData?.data?.courseDetails
    const handleAddToCart = () => {
        if (user && user?.role === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor. You can't buy a course.")
            return
        }
        if (token) {
            dispatch(addToCart(courseData?.courseDetails?._id))
            return
        }
        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to add To Cart",
            btnText2: "Login",
            btnText1: "Cancel",
            btnHandler2: () => navigate("/login"),
            btnHandler1: () => setConfirmationModal(null),
        })
    }
    const handleBuyCourse = () => {
        if (token) {
            // BuyCourse(token, [courseId], user, navigate, dispatch)
            console.log("TOKEN IN HANDLEBUYCOURSE ", token)
            buyCourse([courseId], token, user, dispatch, navigate)
            return
        }
        setConfirmationModal({
            text1: "You are not logged In!",
            text2: "Please login to Purchase Course.",
            btnText2: "Login",
            btnText1: "Cancel",
            btnHandler2: () => navigate("/login"),
            btnHandler1: () => setConfirmationModal(null),
        })
    }

    if (loading || !courseData) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }
    // if (!courseData.success) {
    //     return <Error />
    // }
    if (paymentLoading) {
        // console.log("payment loading")
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }

    return (
        <>
            <div className={`relative w-full bg-richblack-800`}>
                {/* Hero Section */}
                <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
                    <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
                        <div className="relative block max-h-[30rem] lg:hidden">
                            <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
                            <img
                                src={courseData?.courseDetails?.thumbnail}
                                alt="course thumbnail"
                                // className="aspect-auto w-full"
                                className="max-h-[400px] min-h-[200px] h-[300px] w-[400px] md:w-[700px] md:h-[400px]overflow-hidden rounded-2xl object-cover md:max-w-full"
                            />
                        </div>
                        <div
                            className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
                        >
                            <div>
                                <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                                    {courseData?.courseDetails?.courseTitle}
                                </p>
                            </div>
                            <p className={`text-richblack-200`}>{courseData?.courseDetails?.description}</p>
                            <div className="text-md flex flex-wrap items-center gap-2">
                                <span className="text-yellow-25">{avgReviewCount}</span>
                                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                                <span>{`(${courseData?.courseDetails?.courseRatingAndReviews?.length} reviews)`}</span>
                                <span>{`${courseData?.courseDetails?.studentEnrolled?.length} students enrolled`}</span>
                            </div>
                            <div>
                                <p className="">
                                    Created By {`${courseData?.courseDetails?.instructor?.firstName} ${courseData?.courseDetails?.instructor?.lastName}`}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-5 text-lg">
                                <p className="flex items-center gap-2">
                                    {" "}
                                    <BiInfoCircle /> Created at {FormateDate(courseData?.courseDetails?.createdAt)}
                                </p>
                                <p className="flex items-center gap-2">
                                    {" "}
                                    <HiOutlineGlobeAlt /> English
                                </p>
                            </div>
                        </div>
                        <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
                            <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                                Rs. {courseData?.courseDetails?.price}
                            </p>
                            <button className="bg-yellow-50 text-black font-semibold px-3 py-2 rounded-md"
                                onClick={
                                    user && user.courses?.includes(courseId)
                                        ? () => navigate("/dashboard/enrolled-courses")
                                        : handleBuyCourse
                                }
                            >

                                {
                                    user?.courses.includes(courseId) ? "Go To Course Page" : "Buy Now"
                                }
                            </button>
                            {(!user || !user.courses?.includes(courseId)) && (
                                <button className="bg-richblack-700 text-white font-semibold px-3 py-2 rounded-md"
                                    onClick={handleAddToCart}>
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
                        {
                            courseData && (
                                <CourseDetailsCard
                                    course={courseData?.courseDetails}
                                    setConfirmationModal={setConfirmationModal}
                                    handleBuyCourse={handleBuyCourse}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
                <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
                    {/* What will you learn section */}
                    <div className="my-8 border border-richblack-600 p-8">
                        <p className="text-3xl font-semibold">What you'll learn</p>
                        <div className="mt-5 text-white">
                            <Markdown>{courseData?.courseDetails?.WhatYouWillLearn}</Markdown>
                        </div>
                    </div>


                    <div className="max-w-[830px] ">
                        <div className="flex flex-col gap-3">
                            <p className="text-[28px] font-semibold">Course Content</p>
                            <div className="flex flex-wrap justify-between gap-2">
                                <div className="flex gap-2">
                                    <span>
                                        {courseData?.courseDetails?.courseContent?.length} {`section(s)`}
                                    </span>
                                    <span>
                                        {totalNoOfLectures} {`lecture(s)`}
                                    </span>
                                    <span>{courseData?.totalDuration} total length</span>
                                </div>
                                <div>
                                    <button
                                        className="text-yellow-25"
                                        onClick={() => setIsActive([])}
                                    >
                                        Collapse all sections
                                    </button>
                                </div>
                            </div>
                        </div>


                        <div className="py-4">
                            {courseData?.courseDetails?.courseContent?.map((course, index) => (
                                <CourseAccordion
                                    course={course}
                                    key={index}
                                    isActive={isActive}
                                    handleActive={handleActive}
                                />
                            ))}
                        </div>


                        <div className="mb-12 py-4">
                            <p className="text-[28px] font-semibold">Author</p>
                            <div className="flex items-center gap-4 py-4">
                                <img
                                    src={
                                        courseData?.courseDetails?.instructor?.image
                                            ? courseData?.courseDetails?.instructor?.image
                                            : `https://api.dicebear.com/5.x/initials/svg?seed=${courseData?.courseDetails?.instructor?.firstName} ${courseData?.courseDetails?.instructor?.lastName}`
                                    }
                                    alt="Author"
                                    className="h-14 w-14 rounded-full object-cover"
                                />
                                <p className="text-lg">{`${courseData?.courseDetails?.instructor?.firstName} ${courseData?.courseDetails?.instructor?.lastName}`}</p>
                            </div>
                            <p className="text-richblack-50">
                                {courseData?.courseDetails?.instructor?.moreInfo?.about}
                                I will be your lead trainer in this course. Within no time, I will help you to understand the subject in an easy manner. I have a huge experience in online training and recording videos. Let's get started!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>
    )
}

export default CourseDetails
