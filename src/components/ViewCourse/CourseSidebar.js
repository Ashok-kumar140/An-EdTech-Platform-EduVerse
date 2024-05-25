/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { IoArrowBackCircle } from "react-icons/io5";
import { MdAddCircle } from "react-icons/md";
import { useSelector } from 'react-redux';
import { FaChevronDown } from "react-icons/fa";

const CourseSidebar = ({ setReviewModal }) => {

    const navigate = useNavigate();
    const { courseEntireData, courseSectionData, completedLectures, totalNoOfLectures } = useSelector((state) => state.viewCourse);
    const [activeSection, setActiveSection] = useState("");
    const [activeLecture, setActiveLecture] = useState("");
    const location = useLocation();
    const { courseId, sectionId, subSectionId } = useParams();

    useEffect(() => {

        (() => {
            if (courseSectionData.length === 0) {
                return;
            }
            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId);

            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

            setActiveSection(courseSectionData?.[currentSectionIndex]?._id);
            setActiveLecture(activeSubSectionId);
        })();

    }, [courseSectionData, courseEntireData, location.pathname])


    return (
        <>
            <div className=' flex h-[calc(100vh-3.5rem)] min-w-[250px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10'>
                <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 py-5 text-lg font-bold text-richblack-25">
                    <div className="flex w-full items-center justify-between ">
                        <div
                            onClick={() => {
                                navigate(`/dashboard/enrolled-courses`)
                            }}
                            className="flex h-[35px] w-[35px] items-center justify-center rounded-full cursor-pointer  bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
                            title="back"
                        >
                            <IoArrowBackCircle size={30} />
                        </div>
                        <button
                            onClick={() => setReviewModal(true)}
                            className='flex gap-1 items-center bg-yellow-50 text-richblack-800 px-3 py-2 rounded-md'
                        >
                            <MdAddCircle />
                            <p>Add Review</p>
                        </button>
                    </div>
                    <div className="flex flex-col">
                        <p>{courseEntireData?.courseTitle}</p>
                        <p className="text-sm font-semibold text-richblack-500">
                            Lectures {" "}{" "}
                            {completedLectures?.length} / {totalNoOfLectures}
                        </p>
                    </div>
                </div>

                <div>

                    {
                        courseSectionData.map((section) => (
                            <div key={section._id} className="mt-2 cursor-pointer text-sm text-richblack-5"
                            onClick={() => setActiveSection(section?._id)}
                            >
                                <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                                    <div className="w-[70%] font-semibold">
                                        {section.sectionName}
                                    </div>
                                    <div
                                        className={`${activeSection === section?._id
                                            ? "rotate-0"
                                            : "rotate-180"
                                            } transition-all duration-500`}
                                    >
                                        <FaChevronDown />
                                    </div>
                                </div>


                                {activeSection === section?._id && (
                                    <div className="transition-[height] duration-500 ease-in-out">
                                        {section.subSection.map((lecture, i) => (
                                            <div
                                                className={`flex gap-3  px-5 py-2 ${activeLecture === lecture._id
                                                    ? "bg-yellow-200 font-semibold text-richblack-800"
                                                    : "hover:bg-richblack-900"
                                                    } `}
                                                key={i}
                                                onClick={() => {
                                                    navigate(
                                                        `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${lecture?._id}`
                                                    )
                                                    setActiveLecture(lecture._id)
                                                }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={completedLectures.includes(lecture?._id)}
                                                    onChange={() => { }}
                                                />
                                                {lecture.subSectionTitle}
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </div>
                        ))
                    }

                </div>
            </div>


        </>
    )
}

export default CourseSidebar
