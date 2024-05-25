import React from 'react'
import ContactForm from '../components/AboutPage/ContactForm';
import { IoChatbubblesSharp } from "react-icons/io5";
import { MdWifiCalling1 } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Footer from '../components/Footer';



const Contact = () => {
    return (
        <div>
            <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
                {/* Contact Details */}
                <div className="lg:w-[40%]">
                    <div className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6">

                        <div className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200">
                            <div className="flex flex-row items-center gap-3">
                                <IoChatbubblesSharp size={25} />
                                <h1 className="text-lg font-semibold text-richblack-5 mb-3">
                                    Chat With Us
                                </h1>
                            </div>
                            <p className="font-medium">Some time you need a little help from your friends. Or a EduVerse support representative. Don't worry we are here for you.</p>
                            <p className="font-semibold">info@eduverse.com</p>
                        </div>
                        <div className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200">
                            <div className="flex flex-row items-center gap-3">
                                <MdWifiCalling1 size={25} />
                                <h1 className="text-lg font-semibold text-richblack-5 mb-3">
                                    Talk With Us
                                </h1>
                            </div>
                            <p className="font-medium">Interested in any course at EduVerse or any query regarding any course at EduVerse. Just pick up the phone to talk to a member of our team.</p>
                            <p className="font-semibold">+123 456 78690</p>
                        </div>
                        <div className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200">
                            <div className="flex flex-row items-center gap-3">
                                <HiOutlineLocationMarker size={25} />
                                <h1 className="text-lg font-semibold text-richblack-5 mb-3">
                                    Corporate Mailing Address
                                </h1>
                            </div>
                            <p className="font-medium">Come and say hello at our office HQ.<br />
                                Residency Road, Residency Road,
                            </p>
                            <p className="font-semibold">Jodhpur - 342001 </p>
                        </div>


                    </div>
                </div>

                {/* Contact Form */}
                <div className="lg:w-[60%]">
                    <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
                        <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
                            Got a Idea? We&apos;ve got the skills. Let&apos;s team up
                        </h1>
                        <p className="">
                            Tell us more about yourself and what you&apos;re got in mind.
                        </p>

                        <div className="mt-7">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </div>
    )
}

export default Contact;
