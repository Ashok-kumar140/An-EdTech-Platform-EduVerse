/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import RenderForm from './RenderForm';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { courseEndpoints } from '../../../apis/apis';
import { setCourse, setEditCourse } from '../../../redux/slices/courseSlice';

const EditCourse = () => {

    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const { courseId } = useParams();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {

        fetchCourseDetails();
    }, [])

    const fetchCourseDetails = async () => {

        setLoading(true);
        try {

            const { data } = await axios.post(courseEndpoints.GET_FULL_COURSE_DETAILS_AUTHENTICATED, { courseId }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })

            if (!data.success) {
                throw new Error(data.message);
            }

            console.log("DATA:", data)

            if (data?.data) {
                dispatch(setEditCourse(true));
                dispatch(setCourse(data?.data?.course));
            }

        } catch (error) {
            console.log("Error while calling fetch full details of course API: ", error);
            toast.error("Failed to load course details")
        }

        setLoading(false);

    }

    if (loading) {
        return (
            <div className="grid flex-1 place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }

    return (
        <div>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">
                Edit Course
            </h1>
            <div className="mx-auto max-w-[600px]">
                {course ? (
                    <RenderForm />
                ) : (
                    <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
                        Course not found
                    </p>
                )}
            </div>
        </div>
    )
}

export default EditCourse;
