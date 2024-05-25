/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import CourseThumbnail from './CourseThumbnail';
import { useForm } from 'react-hook-form';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { courseEndpoints } from '../../../apis/apis';
import toast from 'react-hot-toast';
import axios from 'axios';
import { setCourse } from '../../../redux/slices/courseSlice';

const CourseSubSection = ({ modalData, setModalData, view = false, add = false, edit = false }) => {
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (view || edit) {
            setValue("lectureTitle", modalData.title)
            setValue("lectureDesc", modalData.description)
            setValue("lectureVideo", modalData.videoUrl)
        }
    }, [])


    const isFormChanged = () => {
        const currentValues = getValues()
        // console.log("changes after editing form values:", currentValues)
        if (
            currentValues.subSectionTitle !== modalData.subSectionTitle ||
            currentValues.description !== modalData.description ||
            currentValues.videoUrl !== modalData.videoUrl
        ) {
            return true;
        }
        return false;
    }


    const handleEditSubsection = async () => {
        const currentValues = getValues()
        // console.log("changes after editing form values:", currentValues)
        const formData = new FormData()
        // console.log("Values After Editing form values:", currentValues)
        formData.append("sectionId", modalData.sectionId)
        formData.append("subSectionId", modalData._id)
        if (currentValues.subSectionTitle !== modalData.title) {
            formData.append("subSectionTitle", currentValues.subSectionTitle)
        }
        if (currentValues.description !== modalData.description) {
            formData.append("description", currentValues.description)
        }
        if (currentValues.videoUrl !== modalData.videoUrl) {
            formData.append("videoUrl", currentValues.videoUrl)
        }

        setLoading(true)
        try {

            const { data } = await axios.put(courseEndpoints.UPDATE_SUBSECTION_API, { ...formData, courseId: course._id }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if (!data.success) {
                throw new Error(data.error);
            }
            dispatch(setCourse(data?.updatedCourse));
            setModalData(null)
            toast.success("Lecture updated successfully");


        } catch (error) {
            console.log("Error while calling update subsection API: ", error);
            toast.error("Unable to update Lecture");

        }
        setLoading(false)
    }


    const onSubmit = async (data) => {
        // console.log(data)
        if (view) return;

        if (edit) {
            if (!isFormChanged()) {
                toast.error("No changes made to the form")
            } else {
                handleEditSubsection()
            }
            return;
        }

        const formData = new FormData()
        formData.append("sectionId", modalData)
        formData.append("subSectionTitle", data.subSectionTitle)
        formData.append("description", data.description)
        formData.append("videoUrl", data.videoUrl)
        formData.append("courseId", course._id);


        setLoading(true)

        try {

            const { data } = await axios.post(courseEndpoints.CREATE_SUBSECTION_API, formData, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            if (!data.success) {
                throw new Error(data.error);
            }

            dispatch(setCourse(data.updatedCourse));
            setModalData(null)
            console.log("UPDATEDCOURSE:", data.updatedCourse)
            toast.success("Lecture uploaded successfully");


        } catch (error) {
            console.log("Error while calling create subsection API: ", error);
            toast.error("Failed to create Lecture");

        }
        setLoading(false)
    }

    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">

                <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
                    <p className="text-xl font-semibold text-richblack-5">
                        {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
                    </p>
                    <button onClick={() => (!loading ? setModalData(null) : {})}>
                        <RxCross2 className="text-2xl text-richblack-5" />
                    </button>
                </div>


                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-8 px-8 py-10"
                >

                    <CourseThumbnail
                        name="videoUrl"
                        label="Lecture Video"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData.videoUrl : null}
                        editData={edit ? modalData.videoUrl : null}
                    />
                    {/* Lecture Title */}
                    <div className="flex flex-col space-y-2">
                        <label className="label-style" htmlFor="subSectionTitle">
                            Lecture Title: {!view && <sup className="text-pink-200">*</sup>}
                        </label>
                        <input
                            disabled={view || loading}
                            id="lectureTitle"
                            placeholder="Enter Lecture Title"
                            {...register("subSectionTitle", { required: true })}
                            className="input-field-style"
                        />
                        {errors.subSectionTitle && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Lecture title is required
                            </span>
                        )}
                    </div>
                    {/* Lecture Description */}
                    <div className="flex flex-col space-y-2">
                        <label className="label-style" htmlFor="description">
                            Lecture Description:{" "}
                            {!view && <sup className="text-pink-200">*</sup>}
                        </label>
                        <textarea
                            disabled={view || loading}
                            id="description"
                            placeholder="Enter Lecture Description"
                            {...register("description", { required: true })}
                            className="input-field-style resize-x-none min-h-[130px] w-full"
                        />
                        {errors.description && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Lecture Description is required
                            </span>
                        )}
                    </div>
                    {!view && (
                        <div className="flex justify-end">
                            <button
                                disabled={loading}
                                className='bg-yellow-50 text-richblack-800 px-3 py-2 rounded-md'
                            >
                                {loading ? "Loading.." : edit ? "Save Changes" : "Save"}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default CourseSubSection;
