/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { BigPlayButton, Player } from 'video-react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import "video-react/dist/video-react.css"
import axios from 'axios';
import { courseEndpoints } from '../../apis/apis';
import { updateCompletedLectures } from '../../redux/slices/viewCourseSlice';
import { FaStar } from 'react-icons/fa';
import ReactStars from 'react-stars';
import Tab from '../Tab';
import MobileCourseSidebar from './MobileCourseSidebar';

const tabData = [
    {
        id: 1,
        tabName: "Course Content",
        type: "Course Content"

    },
    {
        id: 2,
        tabName: "Reviews",
        type: "Reviews"

    },
    {
        id: 3,
        tabName: "Lecture Description",
        type: "Lecture Description"
    }
]
const VideoDetail = () => {

    const { courseId, sectionId, subSectionId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const playerRef = useRef(null);
    const [videoData, setVideoData] = useState(null)
    const [videoEnded, setVideoEnded] = useState(false)
    const [loading, setLoading] = useState(false)
    const { courseSectionData, courseEntireData, completedLectures, totalNoOfLectures } = useSelector((state) => state.viewCourse);
    const [courseThumbnail, setCourseThumbnail] = useState("");
    const [currentTab, setCurrentTab] = useState(tabData[2].tabName)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [reviews, setReviews] = useState([]);



    useEffect(() => {
        (async () => {
            if (!courseSectionData.length) return;
            if (!courseId && !sectionId && !subSectionId) {
                navigate(`/dashboard/enrolled-courses`);
            }
            else {

                const filteredData = courseSectionData.filter((section) => section._id === sectionId)
                console.log("filteredData", filteredData);

                const filteredVideoData = filteredData?.[0]?.subSection.filter(
                    (lecture) => lecture._id === subSectionId
                )
                console.log("filteredVideoData", filteredVideoData);

                setVideoData(filteredVideoData[0])
                console.log("VideoData", videoData);
                setCourseThumbnail(courseEntireData.thumbnail)
                setVideoEnded(false)
            }
        })();

    }, [courseSectionData, courseEntireData, location.pathname]);


    useEffect(() => {
        (async () => {

            const { data } = await axios.post(courseEndpoints.GET_REVIEWS_OF_COURSE, { courseId: courseId })
            console.log("review data", data);
            setReviews(data.reviews);
        })();
    }, [courseId]);

    const isFirstVideo = () => {
        const currentSectionIndx = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )

        const currentSubSectionIndx = courseSectionData[
            currentSectionIndx
        ].subSection.findIndex((data) => data._id === subSectionId)

        if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
            return true
        } else {
            return false
        }
    }

    //   // go to the next video
    const goToNextVideo = () => {
        // console.log(courseSectionData)

        const currentSectionIndx = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )

        const noOfSubsections =
            courseSectionData[currentSectionIndx].subSection.length

        const currentSubSectionIndx = courseSectionData[
            currentSectionIndx
        ].subSection.findIndex((data) => data._id === subSectionId)

        // console.log("no of subsections", noOfSubsections)

        if (currentSubSectionIndx !== noOfSubsections - 1) {
            const nextSubSectionId =
                courseSectionData[currentSectionIndx].subSection[
                    currentSubSectionIndx + 1
                ]._id
            navigate(
                `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
            )
        } else {
            const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
            const nextSubSectionId =
                courseSectionData[currentSectionIndx + 1].subSection[0]._id
            navigate(
                `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
            )
        }
    }

    // check if the lecture is the last video of the course
    const isLastVideo = () => {
        const currentSectionIndx = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )

        const noOfSubsections =
            courseSectionData[currentSectionIndx].subSection.length

        const currentSubSectionIndx = courseSectionData[
            currentSectionIndx
        ].subSection.findIndex((data) => data._id === subSectionId)

        if (
            currentSectionIndx === courseSectionData.length - 1 &&
            currentSubSectionIndx === noOfSubsections - 1
        ) {
            return true
        } else {
            return false
        }
    }

    // go to the previous video
    const goToPrevVideo = () => {
        // console.log(courseSectionData)

        const currentSectionIndx = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )

        const currentSubSectionIndx = courseSectionData[
            currentSectionIndx
        ].subSection.findIndex((data) => data._id === subSectionId)

        if (currentSubSectionIndx !== 0) {
            const prevSubSectionId =
                courseSectionData[currentSectionIndx].subSection[
                    currentSubSectionIndx - 1
                ]._id
            navigate(
                `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
            )
        } else {
            const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
            const prevSubSectionLength =
                courseSectionData[currentSectionIndx - 1].subSection.length
            const prevSubSectionId =
                courseSectionData[currentSectionIndx - 1].subSection[
                    prevSubSectionLength - 1
                ]._id
            navigate(
                `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
            )
        }
    }



    const handleLectureCompletion = async () => {
        console.log("HHHH");

        setLoading(true);

        try {

            const { data } = await axios.post(courseEndpoints.LECTURE_COMPLETION_API, { courseId, subSectionId }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })

            console.log("DATA>>>", data)
            // if (!data.success) {
            //     throw new Error(data.message);
            // }

            dispatch(updateCompletedLectures(subSectionId))

        } catch (error) {
            console.log("Error while marking lecture as completed ", error)
        }
        setLoading(false);

    }
    // console.log("sectiondata",)
    return (
        <>
            <div className="flex flex-col gap-5 text-white">
                {
                    videoData && (
                        <Player
                            ref={playerRef}
                            src={videoData?.videoUrl}
                            fluid
                            // poster={courseThumbnail}
                            aspectRatio="16:9"
                            playsInline
                            preload='auto'


                            onEnded={() => setVideoEnded(true)}
                        >
                            <BigPlayButton position='center' />

                            {videoEnded && (
                                <div

                                    className="absolute inset-0 z-[100] grid place-content-center"
                                >

                                    <div className='flex min-w-[250px] justify-center gap-x-2 text-xl'>

                                        {!completedLectures.includes(subSectionId) && (
                                            <button
                                                disabled={loading}
                                                onClick={() => handleLectureCompletion()}
                                                className='bg-yellow-50 text-richblack-800 p-2 rounded-md '
                                            >
                                                {!loading ? "Mark As Completed" : "Loading..."}
                                            </button>
                                        )}
                                        <button
                                            // disabled={loading}
                                            onClick={() => {
                                                // console.log("player ref",playerRef);
                                                if (playerRef?.current) {
                                                    playerRef?.current?.seek(0)
                                                    setVideoEnded(false);
                                                }
                                            }}
                                            className='bg-yellow-50 text-richblack-800 p-2 rounded-md '
                                        >
                                            Watch again
                                        </button>
                                    </div>

                                    <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                                        {!isFirstVideo() && (
                                            <button
                                                disabled={loading}
                                                onClick={goToPrevVideo}
                                                className="bg-richblack-800 p-2 rounded-md text-richblack-25"
                                            >
                                                &larr; Prev
                                            </button>
                                        )}
                                        {!isLastVideo() && (
                                            <button
                                                disabled={loading}
                                                onClick={goToNextVideo}
                                                className="bg-richblack-800 p-2 rounded-md text-richblack-25"
                                            >
                                                Next &rarr;
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </Player>
                    )

                }

            </div>
            <div className="flex flex-col gap-5 text-white items-center justify-center w-full">
                <Tab tabData={tabData} field={currentTab} setField={setCurrentTab} />
                {
                    currentTab === tabData[2].type && (
                        <div>{videoData?.description} </div>
                    )
                }

                {
                    currentTab === tabData[1].type && (
                        <div className='flex flex-col items-center justify-between w-full'>
                            <div className='w-full sm:px-3 my-3 lg:w-[60%]'>
                                <div className='flex justify-between mb-12'>
                                    <div className=''>
                                        <p>
                                            <span className='text-lg font-semibold'>
                                                {
                                                    reviews.reduce((acc, item) => { return acc += item.rating }, 0) / reviews.length
                                                }
                                            </span>
                                            \5.0
                                        </p>
                                        <p>({reviews?.length} Reviews)</p>
                                    </div>
                                    <div>
                                        <button className='bg-[#dc2626] p-2 rounded-md cursor-pointer'
                                        // onClick={handleReview}
                                        >
                                            Add Review
                                        </button>
                                    </div>
                                </div>

                                {
                                    reviews?.length > 0 ? (
                                        <div className='mb-7'>
                                            {
                                                !loading && <>
                                                    {
                                                        reviews?.map((review) => (
                                                            <div className='mb-7' key={review._id}>
                                                                <div className='flex justify-between items-center'>
                                                                    <div className='flex gap-2 items-center'>
                                                                        <img src={review?.user?.image} alt="user"
                                                                            className='w-[50px] h-[50px] rounded-full' />
                                                                        <p>{review?.user?.firstName}{" "}{review?.user?.lastName}</p>
                                                                    </div>
                                                                    <div>
                                                                        <ReactStars
                                                                            count={5}
                                                                            value={review.rating}
                                                                            size={20}
                                                                            edit={false}
                                                                            activeColor="#ffd700"
                                                                            emptyIcon={<FaStar />}
                                                                            fullIcon={<FaStar />}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div>

                                                                    <p>{review.review}</p>

                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </>
                                            }
                                        </div>
                                    ) : (
                                        <div className="mt-7 text-lg font-semibold flex items-center justify-center">
                                            <p>No Review given yet. You will be first to give review this audio book</p>
                                        </div>
                                    )
                                }




                            </div>
                        </div>
                    )
                }
                {
                    currentTab === tabData[0].type && (

                        <MobileCourseSidebar sectionId={sectionId} subSectionId={subSectionId} />
                    )
                }
            </div>
        </>
    )
}

export default VideoDetail
