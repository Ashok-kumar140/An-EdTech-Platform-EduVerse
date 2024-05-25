import React from 'react'
import { useSelector } from 'react-redux';
import { FiCheck } from "react-icons/fi";
import CourseDetailForm from './CourseDetailForm';
import CourseBuilder from './CourseBuilder';
// import CoursePublishForm from './CoursePublishForm';
import PublishCourse from './PublishCourse';

const steps = [
    {
        id: 1,
        title: "Course Information",
    },
    {
        id: 2,
        title: "Course Builder",
    },
    {
        id: 3,
        title: "Publish",
    },
]

const RenderForm = () => {
    const { step } = useSelector((state) => state.course);



    return (
        <>
            <div className='relative mb-2 flex w-full justify-center'>
                {
                    steps.map((element) => (
                        <React.Fragment key={element.id}>

                            <div className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${step === element.id
                                ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                                : "border-richblack-700 bg-richblack-800 text-richblack-300"
                                } ${step > element.id && "bg-yellow-50 text-yellow-50"}} `}

                            >
                                {step > element.id ? (
                                    <FiCheck className="font-bold text-richblack-900" />
                                ) : (
                                    element.id
                                )}
                            </div>

                            {element.id !== steps.length && (

                                <div
                                    className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${step > element.id ? "border-yellow-50" : "border-richblack-500"
                                        } `}
                                ></div>

                            )}

                        </React.Fragment>
                    ))
                }
            </div>
            <div className='relative mb-16 flex w-full select-none justify-between'>
                {steps.map((element) => (

                    <div
                        className="flex min-w-[130px] flex-col items-center gap-y-2"
                        key={element.id}
                    >

                        <p
                            className={`text-sm ${step >= element.id ? "text-richblack-5" : "text-richblack-500"
                                }`}
                        >
                            {element.title}
                        </p>
                    </div>


                ))}
            </div>
            {
                step === 1 && <CourseDetailForm />
            }
            {
                step === 2 && <CourseBuilder />
            }
            {
                step === 3 && <PublishCourse />
            }
        </ >
    )
}

export default RenderForm;
