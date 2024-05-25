import React, { useState } from 'react'

import { HomePageExplore } from '../../data/home_card_data';
import CourseCard from './CourseCard';
import HighlightedText from '../HighlightedText';

const tabs = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
];
const CardSection = () => {

    const [currentTab, setCurrentTab] = useState(tabs[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(
        HomePageExplore[0].courses[0].heading
    );


    const setMyCards = (ele) => {
        setCurrentTab(ele);
        const result = HomePageExplore.filter((course) => course.tag === ele);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    };

    return (
        <div className='flex flex-col justify-center items-center gap-3'>

            <div className='text-4xl font-semibold'>
                Unlock the <HighlightedText gradient={"bg-gradient-to-b from-[#0890f0] via-[#04b9f2] to-[#09f36b]"}>power of Code</HighlightedText>
            </div>

            <p className='text-center text-richblack-300 text-lg font-semibold mt-1'>Learn to build anything you can imagine</p>
            <div className='flex flex-col md:flex-row lg:flex-row  gap-5 md:gap-1 mt-4 mb-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-xl font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>
                {
                    tabs.map((item, index) => (
                        <div
                            className={` text-[16px] flex flex-row items-center gap-2 ${currentTab === item
                                ? "bg-richblack-900 text-richblack-5 font-medium"
                                : "text-richblack-200"
                                } px-7 md:px-5 lg:px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
                            key={index} 
                            onClick={() => setMyCards(item)}
                        >
                            {item}
                        </div>
                    ))
                }
            </div>
            <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
                {courses.map((ele, index) => {
                    return (
                        <CourseCard
                            key={index}
                            cardData={ele}
                            currentCard={currentCard}
                            setCurrentCard={setCurrentCard}
                        />
                    );
                })}
            </div>
            <div className="hidden lg:block lg:h-[200px]"></div>

        </div>
    )
}

export default CardSection;
