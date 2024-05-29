import React from 'react'
import Logo1 from '../../assets/images/Logo1.svg';
import Logo2 from '../../assets/images/Logo2.svg';
import Logo3 from '../../assets/images/Logo3.svg';
import Logo4 from '../../assets/images/Logo4.svg';
import TimeLineVideo from '../../assets/images/skillsVideo.mp4';

const SkillSection = () => {

    const TimeLine = [
        {
            Logo: Logo1,
            Heading: "Leadership",
            Description: "Fully committed to the success company",
        },
        {
            Logo: Logo2,
            Heading: "Responsibility",
            Description: "Students will always be our top priority",
        },
        {
            Logo: Logo3,
            Heading: "Flexibility",
            Description: "The ability to switch is an important skills",
        },
        {
            Logo: Logo4,
            Heading: "Solve the problem",
            Description: "Code your way to a solution",
        },
    ];

    return (
        <div className='flex flex-col lg:flex-row justify-center items-center gap-20'>

            <div className='lg:w-[45%] flex flex-col gap-14 lg:gap-3'>

                {
                    TimeLine.map((item, index) => (

                        <div className="flex flex-col lg:gap-3" key={index}>
                            <div className="flex gap-6" key={index}>
                                <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
                                    <img src={item.Logo} alt="" loading='lazy'/>
                                </div>
                                <div>
                                    <h2 className="font-semibold text-[18px]">{item.Heading}</h2>
                                    <p className="text-base">{item.Description}</p>
                                </div>
                            </div>
                            <div
                                className={`hidden ${TimeLine.length - 1 === index ? "hidden" : "lg:block"
                                    }  h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}
                            ></div>
                        </div>

                    ))
                }
            </div>
            <div className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]">
                <div className="absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10 ">
                    {/* Section 1 */}
                    <div className="flex gap-5 items-center lg:border-r border-caribbeangreen-300 px-7 lg:px-14">
                        <h1 className="text-3xl font-bold w-[75px]">10</h1>
                        <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                            Years experiences
                        </h1>
                    </div>

                    {/* Section 2 */}
                    <div className="flex gap-5 items-center lg:px-14 px-7">
                        <h1 className="text-3xl font-bold w-[75px]">250</h1>
                        <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                            types of courses
                        </h1>
                    </div>
                    <div></div>
                </div>
                <video
                   
                    muted
                    loop
                    autoPlay
                    loading="lazy"
                    src={TimeLineVideo}
                    type="video/mp4"
                >
                </video>
            </div>


        </div >
    )
}

export default SkillSection
