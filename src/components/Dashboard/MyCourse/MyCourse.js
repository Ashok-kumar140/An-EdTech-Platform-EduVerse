/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import { courseEndpoints } from '../../../apis/apis';
import axios from 'axios';
import { FormateDate } from '../../../helpers/FormateDate';
import { COURSE_STATUS } from '../../../helpers/constants';
import { RiDraftFill } from "react-icons/ri";
import { MdOutlinePublishedWithChanges, MdModeEdit, MdDeleteForever } from "react-icons/md";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import ConfirmationModal from '../../ConfirmationModal';

const MyCourse = () => {

    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [confirmationData, setConfirmationData] = useState(null);



    useEffect(() => {

        fetchInstructorCourse();
    }, []);

    const fetchInstructorCourse = async (req, res) => {

        setLoading(true);
        try {

            const { data } = await axios.get(courseEndpoints.GET_ALL_INSTRUCTOR_COURSES_API, {
                headers: {
                    'Authorization': 'Bearer ' + token,

                },
            })
            if (!data.success) {
                throw new Error(data.message);
            }
            console.log("Courses", data.courses);
            setCourses(data?.courses);

        } catch (error) {
            console.log("Error while calling fetch instructor course API:", error);
            toast.error("Failed to load Courses");
        }

        setLoading(false);
    }

    const handleCourseDelete = async (courseId) => {

        setLoading(true);

        try {

            const { data } = await axios.delete(courseEndpoints.DELETE_COURSE_API, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                data: {
                    courseId: courseId
                }
            })

            if (!data.success) {
                throw new Error(data.message);
            }

            fetchInstructorCourse()
            toast.success("Course deleted successfully");
            setConfirmationData(null);


        } catch (error) {
            console.log("Error while calling delete course API:", error);
            toast.error("Failed to delete course");
        }
        setLoading(false);
    }
    return (
        <div className='text-white'>

            <div className="mb-14 flex items-center justify-between">
                <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
                <button
                    onClick={() => navigate("/dashboard/add-course")}
                    className='flex gap-2 items-center bg-yellow-50 text-richblack-800 py-2 px-3 rounded-md font-semibold'
                >
                    <p>Add Course</p>
                    <MdAdd className='font-semibold' />
                </button>
            </div>

            <div>
                {
                    courses && (
                        <Table className="rounded-xl border border-richblack-800 ">
                            <Thead>
                                <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                                    <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                                        Courses
                                    </Th>
                                    <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                                        Duration
                                    </Th>
                                    <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                                        Price
                                    </Th>
                                    <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                                        Actions
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {courses?.length === 0 ? (
                                    <Tr>
                                        <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                                            No courses found
                                            {/* TODO: Need to change this state */}
                                        </Td>
                                    </Tr>
                                ) : (
                                    courses?.map((course) => (
                                        <Tr
                                            key={course._id}
                                            className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
                                        >
                                            <Td className="flex flex-1 gap-x-4">
                                                <img
                                                    src={course?.thumbnail}
                                                    alt={course?.courseTitle}
                                                    loading='lazy'
                                                    className="h-[148px] w-[220px] rounded-lg object-cover"
                                                />
                                                <div className="flex flex-col justify-between">
                                                    <p className="text-lg font-semibold text-richblack-5">
                                                        {course.courseTitle}
                                                    </p>
                                                    <p className="text-xs text-richblack-300">
                                                        {course.description.split(" ").length >
                                                            30
                                                            ? course.description
                                                                .split(" ")
                                                                .slice(0, 30)
                                                                .join(" ") + "..."
                                                            : course.description}
                                                    </p>
                                                    <p className="text-[12px] text-white">
                                                        Created: {FormateDate(course.createdAt)}
                                                    </p>
                                                    {course.status === COURSE_STATUS.DRAFT ? (
                                                        <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                                                            <RiDraftFill size={14} />
                                                            Drafted
                                                        </p>
                                                    ) : (
                                                        <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                                                            <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                                                                <MdOutlinePublishedWithChanges size={8} />
                                                            </div>
                                                            Published
                                                        </p>
                                                    )}
                                                </div>
                                            </Td>
                                            <Td className="text-sm font-medium text-richblack-100">
                                                30 min
                                            </Td>
                                            <Td className="text-sm font-medium text-richblack-100">
                                                ₹{course.price}
                                            </Td>
                                            <Td className="text-sm font-medium text-richblack-100 ">
                                                <button
                                                    disabled={loading}
                                                    onClick={() => {
                                                        navigate(`/dashboard/edit-course/${course._id}`)
                                                    }}
                                                    title="Edit"
                                                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                                                >
                                                    <MdModeEdit size={20} />
                                                </button>
                                                <button
                                                    disabled={loading}
                                                    onClick={() => {
                                                        setConfirmationData({
                                                            text1: "Do you want to delete this course?",
                                                            text2:
                                                                "All the data related to this course will be deleted",
                                                            btnText2: !loading ? "Delete" : "Loading...  ",
                                                            btnText1: "Cancel",
                                                            btnHandler2: !loading
                                                                ? () => handleCourseDelete(course._id)
                                                                : () => { },
                                                            btnHandler1: !loading
                                                                ? () => setConfirmationData(null)
                                                                : () => { },
                                                        })
                                                    }}
                                                    title="Delete"
                                                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                                >
                                                    <MdDeleteForever size={20} />
                                                </button>
                                            </Td>
                                        </Tr>
                                    ))
                                )}
                            </Tbody>
                        </Table>
                    )
                }

            </div>

            {
                confirmationData && (
                    <ConfirmationModal modalData={confirmationData} />
                )
            }

        </div>
    )
}

export default MyCourse;
