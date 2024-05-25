import React, { useEffect, useState } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import {  } from "swiper"
import { FreeMode, Pagination,Autoplay } from 'swiper/modules';
import CourseCard from "./CourseCard"

const CourseSlider = ({ Courses }) => {
    return (
        <>
            {Courses?.length ? (
                <Swiper
                    slidesPerView={3}
                    spaceBetween={25}
                    loop={true}
                    freeMode={true}
                    modules={[FreeMode, Pagination,Autoplay]}
                    breakpoints={{
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    className="max-h-[30rem]"
                >
                    {Courses?.map((course, i) => (
                        <SwiperSlide key={i}>
                            <CourseCard course={course} Height={"h-[250px]"} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p className="text-xl text-richblack-5">No Course Found</p>
            )}
        </>
    )
}

export default CourseSlider
