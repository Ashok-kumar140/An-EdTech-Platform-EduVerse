/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { resetCourseState, setCourse, setStep } from '../../../redux/slices/courseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { COURSE_STATUS } from '../../../helpers/constants';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { courseEndpoints } from '../../../apis/apis';

const PublishCourse = () => {

    const { handleSubmit, setValue, getValues, register } = useForm();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {

        if (course.status === COURSE_STATUS.PUBLISHED) {

            setValue("public", true);

        }

    }, []);



    const handleGoBack = () => {

        dispatch(setStep(2));

    }
    const isValueChanged = () => {

        if ((course.status === COURSE_STATUS.DRAFT && getValues("public") === false) || (course.status === COURSE_STATUS.PUBLISHED && getValues("public") === true)) {
            return false;
        }
        return true;
    }

    const GoToMyCourses = () => {

        dispatch(resetCourseState());
        navigate("/dashboard/my-courses");

    }
    const handleOnSubmit = async () => {

        if (!isValueChanged()) {
            GoToMyCourses();
            return;

        }
        else {

            const formData = new FormData();
            formData.append("courseId", course._id);

            const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
            formData.append("status", courseStatus);

            setLoading(true);

            try {

                const { data } = await axios.put(courseEndpoints.EDIT_COURSE_API, formData, {
                    headers: {
                        'Authorization': "Bearer " + token
                    }
                });
                if (!data.success) {
                    throw new Error(data.message);
                }

                GoToMyCourses();
                toast.success("Course Published Successfully");

            } catch (error) {

                console.log("Error while calling edit course api inside publish course page: ", error);

            }

            setLoading(false);
        }

    }
    return (
        <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            <p className="text-2xl font-semibold text-richblack-5">
                Publish Course
            </p>
            <form onSubmit={handleSubmit(handleOnSubmit)}>

                <div className="my-6 mb-8">
                    <label htmlFor="public" className="inline-flex items-center text-lg">
                        <input
                            type="checkbox"
                            id="public"
                            {...register("public")}
                            className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
                        />
                        <span className="ml-2 text-richblack-400">
                            Make this course as public
                        </span>
                    </label>
                </div>


                <div className="ml-auto flex max-w-max items-center gap-x-4">
                    <button
                        disabled={loading}
                        type="button"
                        onClick={handleGoBack}
                        className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
                    >
                        Back
                    </button>
                    <button disabled={loading} className='bg-yellow-50 text-richblack-900 font-semibold px-3 py-2 rounded-md' >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PublishCourse;
