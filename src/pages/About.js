import React from 'react'
import HighlightedText from '../components/HighlightedText';
import aboutImage1 from '../assets/images/aboutImage1.jpg';
import aboutImage2 from '../assets/images/aboutImage2.jpg';
import aboutImage3 from '../assets/images/aboutImage3.jpg';
import foundationImage from '../assets/images/foundation.png';
import StatsComponent from '../components/AboutPage/StatsComponent';
import GridSection from '../components/AboutPage/GridSection';
import ContactSection from '../components/AboutPage/ContactSection';
import ReviewSlider from '../components/ReviewSlider';
import Footer from '../components/Footer';


const About = () => {
    return (
        <div>
            <section className='bg-richblack-700'>
                <div className='w-11/12 relative mx-auto max-w-maxContent flex-col items-center justify-between gap-10 text-white '>

                    <div className='mx-auto py-20 text-4xl font-semibold lg:w-[70%] '>

                        <h1 className='text-center text-4xl font-semibold mb-10'>
                            Driving Innovation in Online Education for a
                            <br />
                            <HighlightedText gradient={"bg-gradient-to-b from-[#0890f0] via-[#04b9f2] to-[#09f36b]"}>Brighter Future</HighlightedText>
                        </h1>
                        <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300">
                            EduVerse is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                        </p>
                    </div>
                    <div className="sm:h-[70px] lg:h-[150px]"></div>
                    <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
                        <img src={aboutImage1} alt="" loading='lazy' />
                        <img src={aboutImage3} alt="" loading='lazy' />
                        <img src={aboutImage2} alt="" loading='lazy' />
                    </div>

                </div>

            </section>

            <section className='border-b border-richblack-700'>
                <div className='w-11/12 relative mx-auto max-w-maxContent flex-col items-center justify-between gap-10 text-white '>
                    <div className="h-[100px] "></div>
                    <div className=' text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center text-white'>
                        We are passionate about revolutionizing the way we learn. Our innovative platform  <HighlightedText gradient={"bg-gradient-to-b from-[#0890f0] via-[#04b9f2] to-[#09f36b]"}>combines technology</HighlightedText> , <HighlightedText gradient={"bg-gradient-to-b from-[#662D8C] via-[#2193b0] to-[#ED1E79]"}>expertise</HighlightedText>, and community to create an <HighlightedText gradient={"bg-gradient-to-b from-[#eecda3] via-[#2193b0] to-[#ef629f]"}>unparalleled educational experience</HighlightedText>.
                    </div>
                </div>
            </section>

            <section>
                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
                    <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
                        <div className="mt-20 lg:my-24 flex lg:w-[50%] flex-col gap-10">
                            <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                                Our Founding Story
                            </h1>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                                Our e-learning platform was born out of a shared vision and
                                passion for transforming education. It all began with a group of
                                educators, technologists, and lifelong learners who recognized
                                the need for accessible, flexible, and high-quality learning
                                opportunities in a rapidly evolving digital world.
                            </p>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                                As experienced educators ourselves, we witnessed firsthand the
                                limitations and challenges of traditional education systems. We
                                believed that education should not be confined to the walls of a
                                classroom or restricted by geographical boundaries. We
                                envisioned a platform that could bridge these gaps and empower
                                individuals from all walks of life to unlock their full
                                potential.
                            </p>
                        </div>

                        <div className='mt-10 lg:my-24 flex lg:w-[50%] lg:h-[350px] sm:w-[300px] sm:h-[300px] md:w-[400px]'>
                            <img
                                src={foundationImage}
                                alt=""
                                className="shadow-[0_0_20px_0] shadow-[#FC6767]"
                                width={"full"}
                                loading='lazy'
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
                        <div className="mt-10 lg:my-24 flex lg:w-[40%] flex-col gap-10">
                            <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                                Our Vision
                            </h1>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                                At Eduverse, our vision is to be the leading platform for technical skills education, empowering individuals to excel in the ever-evolving tech landscape. We aim to democratize access to high-quality technical education, ensuring that everyone has the chance to develop the skills needed for success in the digital age. We envision a world where learning technical skills is engaging, accessible, and transformative, opening doors to new career paths and opportunities.
                            </p>
                        </div>
                        <div className="mt-10 lg:my-24 flex lg:w-[40%] flex-col gap-10">
                            <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                                Our Mission
                            </h1>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                                Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <StatsComponent />

            <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">

                <GridSection />
                <ContactSection />

            </section>

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

export default About
