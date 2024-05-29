import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button';
import introVideo from '../assets/images/introVideo.mp4'
import CodeSection from '../components/HomePage/CodeSection';
import SkillSection from '../components/HomePage/SkillSection';
import LearningSection from '../components/HomePage/LearningSection';
import InstructorSection from '../components/HomePage/InstructorSection';
import CardSection from '../components/HomePage/CardSection';
import HighlightedText from '../components/HighlightedText';
import ReviewSlider from '../components/ReviewSlider';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import { ACCOUNT_TYPE } from '../helpers/constants';

// import { TypeAnimation } from "react-type-animation";
const Home = () => {

    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    return (
        <div>

            <div className='w-11/12 relative mx-auto max-w-maxContent flex-col items-center justify-between gap-12 text-white '>
                <div className='flex items-center justify-center'>
                    <div onClick={() => { user ? (user.role === ACCOUNT_TYPE.STUDENT ? (navigate('/signup')) : (navigate('dashboard/my-courses'))) : (navigate('/signup')) }} className='cursor-pointer w-21'>
                        <div className="mx-auto mt-16 w-fit h-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-105 hover:drop-shadow-none mb-10">
                            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[8px] transition-all duration-500 hover:bg-richblack-900 hover:text-white">
                                <p>Become an Instructor</p>
                                <FaArrowRight />
                            </div>
                        </div>
                    </div>
                </div>


                <h1 className='text-center text-4xl font-semibold mb-10'>
                    Empower your Future with <HighlightedText gradient={"bg-gradient-to-b from-[#0890f0] via-[#04b9f2] to-[#09f36b]"}>Coding Skills</HighlightedText>
                </h1>
                <p className='mt-3 w-[90%] text-center text-lg font-bold text-richblack-300 mb-10'>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </p>


                <div className='flex gap-7 items-center justify-center mb-20'>
                    <button onClick={() => { user ? (navigate('/dashboard/my-profile')) : (navigate('/signup')) }} className={`text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] hover:shadow-none hover:scale-95 transition-all duration-200 bg-yellow-50 text-black`}>Learn More</button>
                    <button onClick={() => navigate('/contact')} className="bg-richblack-800 text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] hover:shadow-none hover:scale-95 transition-all duration-200">Book Demo</button>


                </div>

                <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200 overflow-hidden mb-24">
                    <video
                        className="shadow-[20px_20px_rgba(255,255,255)]"
                        muted
                        loop
                        loading="lazy"
                        autoPlay
                        src={introVideo}
                        type="video/mp4"

                    >
                    </video>
                </div>


                <CodeSection textColor={'sky-500'} bgGradient={'codeblock1'} flexdir={"lg:flex-row-reverse"} heading={<div>Unlock your <HighlightedText gradient={"bg-gradient-to-b from-[#0890f0] via-[#04b9f2] to-[#09f36b]"}>coding potential</HighlightedText> with our online courses</div>} subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."} />
                <CodeSection textColor={'yellow-25'} bgGradient={'codeblock2'} flexdir={"lg:flex-row"} heading={<div>Start <HighlightedText gradient={"bg-gradient-to-b from-[#0890f0] via-[#04b9f2] to-[#09f36b]"}>coding in seconds</HighlightedText></div>} subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."} />

                <div className='mt-32'>

                    <CardSection />
                </div>
            </div>
            <div className='bg-pure-greys-5 text-richblack-700 lg:mt-10'>
                <div className='homeBackGround  h-[280px] flex flex-col justify-center items-center'>
                    <div className='w-11/12 mx-auto flex flex-col md:flex-row gap-7 items-center justify-center mt-20'>

                        <Button linkTo={"/signup"} bgColor={"bg-yellow-50"} className="flex items-center justify-center">

                            Explore Full Catalog  ➡

                        </Button>
                        <Button linkTo={user === ACCOUNT_TYPE.STUDENT ? ('/dashboard/enrolled-courses') : ("dashboard/my-profile")} bgColor={"bg-richblack-800 text-white hover:scale(110)"}>Learn More</Button>

                    </div>
                </div>
                <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between'>

                    <div className='flex flex-col lg:flex-row gap-[150px] items-center justify-center'>
                        <div className='text-4xl font-semibold lg:w-[45%]'>
                            Get the Skills you need for a <HighlightedText gradient={"bg-gradient-to-b from-[#0890f0] via-[#04b9f2] to-[#09f36b]"}>Job that is in demand</HighlightedText>
                        </div>
                        <div className='flex flex-col gap-10 lg:w-[40%] mb-10'>

                            <p className='text-[16px]'>The modern EduVerse is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>

                            <Button bgColor={'bg-yellow-50'} linkTo={user === ACCOUNT_TYPE.STUDENT ? ('/dashboard/enrolled-courses') : ("dashboard/my-profile")} className="m-10">Learn more</Button>

                        </div>
                    </div>

                    <SkillSection />

                    <LearningSection />

                </div>
            </div>
            <div className='w-11/12 relative mx-auto max-w-maxContent flex-col items-center justify-between gap-8 text-white '>
                <InstructorSection />

            </div>
            <div className='mt-20'>
                <h1 className="text-center text-4xl font-semibold mt-8 text-richblack-25">
                    Reviews from other learners
                </h1>
                <ReviewSlider />
            </div>

            <Footer />





        </div>
    )
}

export default Home
