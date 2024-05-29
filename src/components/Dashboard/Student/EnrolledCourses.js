import React, { useEffect, useState } from 'react'
import ProgressBar from "@ramonak/react-progress-bar"
import Tab from '../../Tab';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import axios from 'axios';
import { profileEndPoints } from '../../../apis/apis';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const tabData = [
    {
        id: 1,
        tabName: "All",
        type: "All",
    },
    {
        id: 2,
        tabName: "Pending",
        type: "Pending",
    },
    {
        id: 3,
        tabName: "Completed",
        type: "Completed",
    }
]
const EnrolledCourses = () => {


    const [tabType, setTabType] = useState("All");
    const { token } = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        fetchCourse();
    }, []);


    const fetchCourse = async () => {

        setLoading(true);

        try {

            const { data } = await axios.get(profileEndPoints.GET_ENROLLED_COURSES_API, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if (!data.success) {
                throw new Error(data.message);
            }

            setEnrolledCourses(data.data);
            console.log("EnrolledCourse", data);

        } catch (error) {

            console.log("Error while calling get enrolled course API:", error);
            toast.error("Could not fetched enrolled courses");

        }
        setLoading(false);
    }

    // console.log("Enrolled courses", enrolledCourses);

   
    return (
        <>
            <div className="text-3xl mb-9 text-richblack-50">Enrolled Courses</div>
            <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
               
            </p>
            <Tab tabData={tabData} field={tabType} setField={setTabType} />

            {
                loading ? (
                    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    !enrolledCourses.length ? (
                        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
                            You have not enrolled in any course yet.
                        </p>
                    ) : (
                        <div className="my-8 text-richblack-5">
                            <div className="flex rounded-t-lg bg-richblack-500 ">
                                <p className="w-[45%] px-5 py-3">Course Name</p>
                                <p className="w-1/4 px-2 py-3">Duration</p>
                                <p className="flex-1 px-2 py-3">Progress</p>
                            </div>

                            {
                                enrolledCourses.map((course, i) => (
                                    <div
                                        className={`flex items-center border border-richblack-700 `}
                                        key={i}
                                    >
                                        <div
                                            className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                                        onClick={() => {
                                            navigate(
                                                `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                            )
                                        }}
                                        >
                                            <img
                                                src={course.thumbnail}
                                                alt="course_img"
                                                loading="lazy"
                                                className="h-14 w-14 rounded-lg object-cover"
                                            />
                                            <div className="flex max-w-xs flex-col gap-2">
                                                <p className="font-semibold">{course.courseTitle}</p>
                                                <p className="text-xs text-richblack-300">
                                                    {course.description.length > 50
                                                        ? `${course.description.slice(0, 50)}...`
                                                        : course.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
                                        <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                                            <p>Progress: {course?.progressPercentage||0}%</p>
                                            <ProgressBar
                                                completed={course.progressPercentage || 0}
                                                height="8px"
                                                isLabelVisible={false}
                                            />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                )
            }
        </>
    )
}

export default EnrolledCourses;
