import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa"
import { removeFromCart } from '../redux/slices/cartSlice';
import { RiDeleteBin6Line } from "react-icons/ri"
const MyCart = () => {
    const { totalAmount, cart, totalCourses } = useSelector((state) => state.cart)
    const { paymentLoading } = useSelector((state) => state.course)
    // const { total, cart } = useSelector((state) => state.cart)
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id)
        // BuyCourse(token, courses, user, navigate, dispatch)
    }
    return (
        <>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">Cart</h1>
            <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
                {totalCourses} Courses in Cart
            </p>
            {totalCourses > 0 ? (
                <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
                    <div className="flex flex-1 flex-col">
                        {cart.map((course, indx) => (
                            <div
                                key={course._id}
                                className={`flex w-full flex-wrap items-start justify-between gap-6 ${indx !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
                                    } ${indx !== 0 && "mt-6"} `}
                                    onClick={()=>navigate(`/courses/${course._id}`)}
                            >
                                <div className="flex flex-1 flex-col gap-4 xl:flex-row">
                                    <img
                                        src={course?.thumbnail}
                                        alt={course?.courseName}
                                        className="h-[148px] w-[220px] rounded-lg object-cover"
                                    />
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-lg font-medium text-richblack-5">
                                            {course?.courseTitle}
                                        </p>
                                        <p className="text-sm text-richblack-300">
                                            {course?.category?.name}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-yellow-5">4.5</span>
                                            <ReactStars
                                                count={5}
                                                value={course?.ratingAndReviews?.length}
                                                size={20}
                                                edit={false}
                                                activeColor="#ffd700"
                                                emptyIcon={<FaStar />}
                                                fullIcon={<FaStar />}
                                            />
                                            <span className="text-richblack-400">
                                                {course?.courseRatingAndReviews?.length} Ratings
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end space-y-2">
                                    <button
                                        onClick={() => dispatch(removeFromCart(course._id))}
                                        className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
                                    >
                                        <RiDeleteBin6Line />
                                        <span>Remove</span>
                                    </button>
                                    <p className="mb-6 text-3xl font-medium text-yellow-100">
                                        ₹ {course?.price}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>


                    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
                        <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
                        <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {totalAmount}</p>
                        <button
                            className='bg-yellow-50 text-richblack-800 px-3 py-2 rounded-md'
                            onclick={handleBuyCourse}
                        >Buy Now</button>
                    </div>
                </div>
            ) : (
                <p className="mt-14 text-center text-3xl text-richblack-100">
                    Your cart is empty
                </p>
            )}
        </>
    )
}

export default MyCart;
