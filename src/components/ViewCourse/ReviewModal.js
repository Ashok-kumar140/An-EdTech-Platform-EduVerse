import React from 'react'
import { useForm } from 'react-hook-form';
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';
import ReactStars from 'react-stars';
import { reviewAndRatingEndPoints } from '../../apis/apis';
import axios from 'axios';
import toast from 'react-hot-toast';

const ReviewModal = ({ setReviewModal }) => {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { register, setValue, handleSubmit, formState: { errors }, } = useForm();
    const { courseEntireData } = useSelector((state) => state.viewCourse);


    const onSubmit = async (values) => {

        try {

            const { data } = await axios.post(reviewAndRatingEndPoints.CREATE_REVIEW_API,
                { courseId: courseEntireData._id, rating: values.courseRating, review: values.review }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            // console.log("DATA FROM CREATE REVIEW API :",data)
            if (!data.success) {
                throw new Error(data);
            }
            setReviewModal(false);
            toast.success("Review added successfully");

        } catch (error) {
            console.log("Error while calling create review API: ", error);
            toast.error(error?.response?.data?.message)
        }

    }
    const ratingChanged = (newRating) => {
        // console.log(newRating)
        setValue("courseRating", newRating)
    }


    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
                {/* Modal Header */}
                <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
                    <p className="text-xl font-semibold text-richblack-5">Add Review</p>
                    <button onClick={() => setReviewModal(false)}>
                        <RxCross2 className="text-2xl text-richblack-5" />
                    </button>
                </div>
                {/* Modal Body */}
                <div className="p-6">
                    <div className="flex items-center justify-center gap-x-4">
                        <img
                            src={user?.image}
                            alt={user?.firstName + "profile"}
                            loading='lazy'
                            className="aspect-square w-[50px] rounded-full object-cover"
                        />
                        <div className="">
                            <p className="font-semibold text-richblack-5">
                                {user?.firstName} {user?.lastName}
                            </p>
                            <p className="text-sm text-richblack-5">Posting Publicly</p>
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-6 flex flex-col items-center"
                    >
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            activeColor="#ffd700"
                        />
                        <div className="flex w-11/12 flex-col space-y-2">
                            <label
                                className="text-sm text-richblack-5"
                                htmlFor="courseExperience"
                            >
                                Add Your Experience <sup className="text-pink-200">*</sup>
                            </label>
                            <textarea
                                id="review"
                                placeholder="Add Your Experience"
                                {...register("review", { required: true })}
                                className="input-field-style"
                            />
                            {errors.review && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">
                                    Please Add Your Experience
                                </span>
                            )}
                        </div>
                        <div className="mt-6 flex w-11/12 justify-end gap-x-2">
                            <button
                                onClick={() => setReviewModal(false)}
                                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                            >
                                Cancel
                            </button>
                            <button type='submit' className='bg-yellow-50 px-3 py-2 rounded-md text-richblack-900' >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ReviewModal
