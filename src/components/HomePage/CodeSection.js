import React from 'react';
import { TypeAnimation } from "react-type-animation";
import Button from '../Button';

const CodeSection = ({ flexdir, heading, subheading,bgGradient,textColor}) => {
    return (
        <div className={`flex ${flexdir} flex-col lg:flex-row my-20 justify-between gap-10 px-4`}>

            <div className='w-[100%] lg:w-[50%] flex flex-col gap-8'>
                <div className="text-4xl font-semibold">
                    {heading}
                </div>
                <p className=''>
                    {subheading}
                </p>
                <div className='flex flex-col md:flex-row gap-7 items-center mt-10 '>
                    <Button linkTo={"/signup"} bgColor={"bg-yellow-50 text-black"}>Try it yourself ➡</Button>
                    <Button linkTo={"/signup"} bgColor={"bg-richblack-800"}>Learn more</Button>


                </div>

            </div>
            <div className='h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]'>
                <div className="text-center flex flex-col   w-[10%] select-none text-richblack-400 font-inter font-bold ">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>
                <div
                    className={`w-[90%] flex flex-col gap-2 font-bold font-mono text-${textColor} pr-1`}
                >
                    <div className={`${bgGradient} absolute`}></div>
                    <TypeAnimation
                        sequence={[`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`, 1000, ""]}
                        cursor={true}
                        repeat={Infinity}
                        style={{
                            whiteSpace: "pre-line",
                            display: "block",
                        }}
                    // omitDeletionAnimation={true}
                    />
                </div>
                <div>


                </div>

            </div>
        </div >
    )
}

export default CodeSection;
