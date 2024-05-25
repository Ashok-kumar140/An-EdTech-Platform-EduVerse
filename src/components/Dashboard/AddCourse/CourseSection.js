import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RiMenuUnfoldFill, RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit, MdAdd } from "react-icons/md";
import CourseSubSection from './CourseSubSection';
import ConfirmationModal from '../../ConfirmationModal';
import { BiEdit } from 'react-icons/bi';
import toast from 'react-hot-toast';
import axios from 'axios';
import { courseEndpoints, userEndPoints } from '../../../apis/apis';
import { setCourse } from '../../../redux/slices/courseSlice';
const CourseSection = ({ handleChangeEditSectionName }) => {

    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const [editSubSection, setEditSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [addSubSection, setAddSubSection] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const dispatch = useDispatch();
    const handleDeleteSubSection = async () => {

    }
    const handleDeleteSection = async (sectionId) => {

        try {

            const { data } = await axios.delete(courseEndpoints.DELETE_SECTION_API, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    
                },
                data: {
                    sectionId: sectionId,
                    courseId: course._id
                } 
            });
            if (!data.success) {
                throw new Error(data.message);
            }
            dispatch(setCourse(data?.updatedCourse));
            toast.success("Section deleted Successfully")
            setConfirmationModal(null);

        } catch (error) {
            console.log("Error while calling delete section api:", error)
            toast.error("Unable to delete section");
        }

    }
    return (
        <div className='text-white border-richblack-700 border-[1px] p-5 rounded-md'>
            {
                course?.courseContent?.map((section,index) => (
                    <details key={section._id} >
                        <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                            <div className="flex items-center gap-x-3">
                                <RiMenuUnfoldFill className="text-2xl text-richblack-50" />
                                <p className="font-semibold text-richblack-50">
                                  Section {index}{section.sectionName}
                                </p>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <button
                                    onClick={() =>
                                        handleChangeEditSectionName(
                                            section._id,
                                            section.sectionName
                                        )
                                    }
                                >
                                    <BiEdit className="text-xl text-richblack-300" />
                                </button>
                                <button
                                    onClick={() =>
                                        setConfirmationModal({
                                            text1: "Delete this Section?",
                                            text2: "All the lectures in this section will be deleted",
                                            btnText2: "Delete",
                                            btnText1: "Cancel",
                                            btnHandler2: () => handleDeleteSection(section._id),
                                            btnHandler1: () => setConfirmationModal(null),
                                        })
                                    }
                                >
                                    <RiDeleteBinLine className="text-xl text-richblack-300" />
                                </button>
                                <span className="font-medium text-richblack-300">|</span>
                                {/*<RiDeleteBinLine className={`text-xl text-richblack-300`} />*/}
                            </div>
                        </summary>
                        <div className="px-6 pb-4">
                            {/* Render All Sub Sections Within a Section */}
                            {section?.subSection.map((data) => (
                                <div
                                    key={data?._id}
                                    onClick={() => setViewSubSection(data)}
                                    className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                                >
                                    <div className="flex items-center gap-x-3 py-2 ">
                                        <RiMenuUnfoldFill className="text-2xl text-richblack-50" />
                                        <p className="font-semibold text-richblack-50">
                                            {data.subSectionTitle}
                                        </p>
                                    </div>
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center gap-x-3"
                                    >
                                        <button
                                            onClick={() =>
                                                setEditSubSection({ ...data, sectionId: section._id })
                                            }
                                        >
                                            <MdAdd className="text-xl text-richblack-300" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                setConfirmationModal({
                                                    text1: "Delete this Sub-Section?",
                                                    text2: "This lecture will be deleted",
                                                    btnText1: "Delete",
                                                    btnText2: "Cancel",
                                                    btnHandler1: () =>
                                                        handleDeleteSubSection(data._id, section._id),
                                                    btnHandler2: () => setConfirmationModal(null),
                                                })
                                            }
                                        >
                                            <RiDeleteBinLine className="text-xl text-richblack-300" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={() => setAddSubSection(section._id)}
                                className="mt-3 flex items-center gap-x-1 text-yellow-50"
                            >
                                <MdAdd className="text-lg" />
                                <p>Add Lecture</p>
                            </button>
                        </div>


                        <div>
                        </div>

                        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700"></div>
                    </details>
                ))
            }

            {addSubSection ? (
                <CourseSubSection
                    modalData={addSubSection}
                    setModalData={setAddSubSection}
                    add={true}
                />
            ) : viewSubSection ? (
                <CourseSubSection
                    modalData={viewSubSection}
                    setModalData={setViewSubSection}
                    view={true}
                />
            ) : editSubSection ? (
                <CourseSubSection
                    modalData={editSubSection}
                    setModalData={setEditSubSection}
                    edit={true}
                />
            ) : (
                <></>
            )}

            {confirmationModal ? (
                <ConfirmationModal modalData={confirmationModal} />
            ) : (
                <></>
            )}

        </div>
    )
}

export default CourseSection;
