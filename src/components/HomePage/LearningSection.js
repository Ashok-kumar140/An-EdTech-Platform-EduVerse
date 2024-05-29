import React from 'react'
import Button from '../Button'
import compare_with_other from '../../assets/images/Compare_with_others.svg';
import know_your_progress from '../../assets/images/Know_your_progress.svg';
import plan_your_lessons from '../..//assets/images/Plan_your_lessons.svg';

const LearningSection = () => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className=''>
                <p className="text-4xl font-semibold text-center my-10">
                    Your Swiss Knife for learning any language
                </p>
                <p className='text-center text-richblack-700 font-medium lg:w-[70%] mx-auto leading-6 text-base mt-3'>
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </p>
            </div>
            <div className='flex flex-col lg:flex-row justify-center items-center'>
                <img className="object-contain  lg:-mr-32 " src={plan_your_lessons} alt=""  loading='lazy'/>
                <img className='object-contain lg:-mb-10 lg:-mt-0 -mt-12' src={compare_with_other} alt="" loading='lazy' />
                <img className="object-contain  lg:-ml-36 lg:-mt-5 -mt-16" src={know_your_progress} alt="" loading='lazy' />

            </div>
            <div className="m-[50px]">

                <Button bgColor={'bg-yellow-50'} linkTo={'/dashboard/my-profile'} >Learn More</Button>
            </div>

        </div>
    )
}

export default LearningSection
