import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
import { Swiper, SwiperSlide } from "swiper/react";
import { FaStar } from "react-icons/fa"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay, FreeMode } from 'swiper/modules';
import { reviewAndRatingEndPoints } from "../apis/apis";
import axios from "axios";

const ReviewSlider = () => {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {

            setLoading(true);

            try {
                const { data } = await axios.get(reviewAndRatingEndPoints.GET_ALL_REVIEWS_API);
                console.log("REview data", data);
                if (!data.success) {
                    throw new Error(data.message);
                }
                setReviews(data.allReviews);
            } catch (error) {
                console.log("Error while calling get all reviews API: ", error)
            }
            setLoading(false);

        })();
    }, []);

    return (
        <div className="text-white">
            <div className="hidden sm:block my-[50px] h-[250px] ">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={25}
                    loop={true}
                    freeMode={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[FreeMode, Pagination, Autoplay]}
                    className=" w-[92vw] lg:w-[60vw] "
                >
                    {reviews.map((review, i) => (

                        <SwiperSlide key={i} className="w-full">
                            <div className="place-items-center min-h-[240px] flex flex-col items-baseline justify-baseline gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={
                                            review?.user?.image
                                                ? review?.user?.image
                                                : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                                        }
                                        alt=""
                                        className="h-9 w-9 rounded-full object-cover"
                                    />
                                    <div className="flex flex-col">
                                        <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                                        <h2 className="text-[12px] font-medium text-richblack-500">
                                            {review?.course?.courseName}
                                        </h2>
                                    </div>
                                </div>
                                <p className="font-medium text-richblack-25">
                                    {review?.review.split(" ").length > 15
                                        ? `${review?.review
                                            .split(" ")
                                            .slice(0, 15)
                                            .join(" ")} ...`
                                        : `${review?.review}`}
                                </p>
                                <div className="flex items-center gap-2 ">
                                    <h3 className="font-semibold text-yellow-100">
                                        {review.rating.toFixed(1)}
                                    </h3>
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
                        </SwiperSlide>

                    ))}

                </Swiper>
            </div>
            <div className=" sm:hidden my-[50px] h-[250px] max-w-maxContent ">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={25}
                    loop={true}
                    freeMode={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[FreeMode, Pagination, Autoplay]}
                    className="w-[60vw] "
                >
                    {reviews.map((review, i) => (

                        <SwiperSlide key={i} className="w-full">
                            <div className="place-items-center min-h-[240px] lg:min-h-[200px] flex flex-col items-baseline justify-center gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={
                                            review?.user?.image
                                                ? review?.user?.image
                                                : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                                        }
                                        alt=""
                                        className="h-9 w-9 rounded-full object-cover"
                                    />
                                    <div className="flex flex-col">
                                        <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                                        <h2 className="text-[12px] font-medium text-richblack-500">
                                            {review?.course?.courseName}
                                        </h2>
                                    </div>
                                </div>
                                <p className="font-medium text-richblack-25">
                                    {review?.review.split(" ").length > 15
                                        ? `${review?.review
                                            .split(" ")
                                            .slice(0, 15)
                                            .join(" ")} ...`
                                        : `${review?.review}`}
                                </p>
                                <div className="flex items-center gap-2 ">
                                    <h3 className="font-semibold text-yellow-100">
                                        {review.rating.toFixed(1)}
                                    </h3>
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
                        </SwiperSlide>

                    ))}

                </Swiper>
            </div>
        </div>
    )
}

export default ReviewSlider;
