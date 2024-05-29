import React from 'react'
import instructorImage from '../../assets/images/instructor.jpg';
import Button from '../Button';
import { FaArrowRight } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ACCOUNT_TYPE } from '../../helpers/constants';
const InstructorSection = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.profile);
    return (
        <div className=' flex flex-col lg:flex-row gap-20  justify-center items-center mt-10 mb-10'>
            <div className='lg:w-[50%]'>
                <img className="shadow-blue-200 shadow-[0px_0px_30px_0px]" src={instructorImage} alt="instructor" loading='lazy' />
            </div>

            <div className="lg:w-[50%] flex gap-10 flex-col">
                <div>
                    <p className='lg:w-[50%] text-4xl font-semibold '>Become an</p>
                    <p className='lg:w-[50%] text-4xl font-semibold '>Instructor</p>
                </div>
                <p className="font-medium text-[16px] text-justify w-[90%] text-richblack-300">
                    Instructors from around the world teach millions of students on
                    CodePlay. We provide the tools and skills to teach what you
                    love.
                </p>
                <div className="w-fit">
                    <button
                        onClick={() => { user ? (user.role === ACCOUNT_TYPE.STUDENT ? (navigate('/signup')) : (navigate('dashboard/my-courses'))) : (navigate('/signup')) }}
                        className='bg-yellow-50 text-richblack-800 text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] hover:shadow-none hover:scale-95 transition-all duration-200'>
                        Start Teaching Today →
                    </button>
                </div>
            </div>



        </div>
    )
}

export default InstructorSection
