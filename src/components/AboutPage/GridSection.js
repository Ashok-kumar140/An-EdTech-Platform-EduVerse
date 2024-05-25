import React from 'react'
import GridData from '../../data/AboutGridData.json';
import Button from '../Button';
import HighlightedText from '../HighlightedText';
const GridSection = () => {
    return (
        <section className='grid grid-cols-1  xl:grid-cols-4 mx-auto w-[345px] xl:w-fit'>
            {
                GridData.map((element, index) => (
                    <div key={index} className={`h-[290px] xl:h-[300px] ${index === 0 && "xl:col-span-2"}
                     ${element.order % 2 === 1 ? "bg-richblack-700 h-[300px]" : element.order % 2 === 0
                            ? "bg-richblack-800 h-[300px]"
                            : "bg-transparent"}
                      ${element.order === 3 && "xl:col-start-2"} flex flex-col justify-center`}>

                        {element.order < 0 ? (
                            <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">
                                <div className="text-4xl font-semibold ">
                                    {element.heading}{" "}
                                    <HighlightedText gradient={"bg-gradient-to-b from-[#0890f0] via-[#04b9f2] to-[#09f36b]"} >{element.highLiteText}</HighlightedText>
                                </div>
                                <p className="text-richblack-300 font-medium">
                                    {element.description}
                                </p>

                                <div className="w-fit mt-2 mb-8">
                                    <Button bgColor={"bg-yellow-50 text-black"} linkTo={element.BtnLink}>
                                        {element.BtnText}
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="p-8 flex flex-col justify-center gap-8">
                                <h1 className="text-richblack-5 text-lg">{element.heading}</h1>

                                <p className="text-richblack-300 font-medium">
                                    {element.description}
                                </p>
                            </div>
                        )}
                    </div>
                ))
            }


        </section>
    )
}

export default GridSection
