/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import CourseSidebar from '../components/ViewCourse/CourseSidebar'
import { Outlet, useParams } from 'react-router-dom'
import axios from 'axios'
import { courseEndpoints } from '../apis/apis'
import { useDispatch, useSelector } from 'react-redux'
import { setEntireCourseData, setCompletedLectures, setCourseSectionData, setTotalNoOfLectures } from '../redux/slices/viewCourseSlice';
import ReviewModal from '../components/ViewCourse/ReviewModal'
const ViewCourse = () => {

    const { courseId, sectionId, subSectionId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [reviewModal, setReviewModal] = useState(false);

    useEffect(() => {
        fetchFullCourseDetails();
    }, [])

    const fetchFullCourseDetails = async () => {

        try {

            console.log("TOken", token);

            const { data } = await axios.post(courseEndpoints.GET_FULL_COURSE_DETAILS_AUTHENTICATED, { courseId }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })

            dispatch(setCourseSectionData(data?.data?.course?.courseContent))
            dispatch(setEntireCourseData(data?.data?.course))
            dispatch(setCompletedLectures(data?.data?.completedVideos));

            let lectures = 0
            data?.data?.course?.courseContent?.forEach((section) => {
                lectures += section.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures))

            console.log("DATA FROM FETCH COURSE DETAILS", data);

        } catch (error) {
            console.log("Error while calling fetch full course details API: ", error);
        }
    }
    return (
        <>
            <div className="relative flex min-h-[calc(100vh-3.5rem)]">
                <CourseSidebar setReviewModal={setReviewModal} />
                <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                    <div className="mx-auto w-11/12 max-w-[1000px] py-10">
                        <Outlet />
                    </div>
                </div>
            </div>

            {
                reviewModal && (
                    <ReviewModal setReviewModal={setReviewModal} />
                )
            }

        </>
    )
}

export default ViewCourse;
