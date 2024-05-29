import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import CountryCode from '../../data/countryCode.json';
import { userEndPoints } from '../../apis/apis';
import axios from 'axios';
import toast from 'react-hot-toast';
const ContactForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {


    }, []);

    const handleContactForm = async (values) => {

        const formData = new FormData()
        formData.append("firstName", values.firstName)
        formData.append("lastName", values.lastName)
        formData.append("email", values.email)
        formData.append("phoneNo", values.countryCode + "-" + values.phoneNo)
        formData.append("message", values.message)
        console.log("form data", formData)

        setLoading(true);
        try {

            const { data } = await axios.post(userEndPoints.CONTACT_FROM_SUBMIT_API, formData);
            console.log("DATA FROM CONTACT FORM API:", data);
            if (!data.success) {
                throw new Error(data);
            }
            toast.success("Your message sent successfully")
            reset({
                email: "", firstName: "", lastName: "", message: "", phoneNo: ""
            });

        } catch (error) {
            console.log("Error while calling API for contact form submit :", error.message);
        }

        setLoading(false);

    }


    return (
        <form onSubmit={handleSubmit(handleContactForm)} className="flex w-full flex-col gap-y-7">
            <div className='flex flex-col lg:flex-row gap-x-4'>
                <div className='flex flex-col gap-2 gap-x-4 lg:w-[48%]'>
                    <label htmlFor="firstName" className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        First Name <sup className="text-pink-200">*</sup>
                    </label>
                    <input type="text"
                        id='firstName'
                        name='firstName'
                        placeholder='Enter your first name'
                        {...register('firstName', { required: true })}
                        className='bg-slate-800 p-[12px] bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full'
                        style={{ "boxShadow": "rgba(255, 255, 255, 0.18) 0px -1px 0px inset" }}
                    />
                    {errors.firstName && (
                        <span className="-mt-1 text-[12px] text-pink-200">
                            Please enter your first name.
                        </span>
                    )}
                </div>
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor="lastName" className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Last Name
                    </label>
                    <input type="text"
                        id='lastName'
                        name='lastName'
                        placeholder='Enter your last name'
                        {...register('lastName')}
                        className='bg-slate-800 p-[12px] bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full'
                        style={{ "boxShadow": "rgba(255, 255, 255, 0.18) 0px -1px 0px inset" }}
                    />
                    {errors.lastName && (
                        <span className="-mt-1 text-[12px] text-pink-200">
                            Please enter your last name.
                        </span>
                    )}
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="email" className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Email <sup className="text-pink-200">*</sup>
                </label>
                <input type="email"
                    id='email'
                    name='email'
                    placeholder='Enter your email'
                    {...register('email', { required: true })}
                    className='bg-slate-800 p-[12px] bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full'
                    style={{ "boxShadow": "rgba(255, 255, 255, 0.18) 0px -1px 0px inset" }}
                />
                {errors.email && (
                    <span className="-mt-1 text-[12px] text-pink-200">
                        Please enter email address.
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="phoneNo" className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Phone Number <sup className="text-pink-200">*</sup>
                </label>

                <div className="flex gap-5">
                    <div className="flex w-[81px] flex-col gap-2">
                        <select
                            type="text"
                            name="countryCode"
                            id="countryCode"
                            placeholder=""

                            {...register("countryCode", { required: true })}
                            className='bg-slate-800 p-[12px] bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full'
                            style={{ "boxShadow": "rgba(255, 255, 255, 0.18) 0px -1px 0px inset" }}
                        >
                            {CountryCode.map((element, index) => {
                                return (
                                    <option key={index} value={element.code}>
                                        {element.code} -{element.country}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                        <input
                            type="number"
                            name="phoneNo"
                            id="phoneNo"
                            placeholder="12345 67890"
                            {...register("phoneNo", {
                                required: {
                                    value: true,
                                    message: "Please enter your Phone Number.",
                                },
                                maxLength: { value: 12, message: "Invalid Phone Number" },
                                minLength: { value: 10, message: "Invalid Phone Number" },
                            })}
                            className='bg-slate-800 p-[12px] bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full'
                            style={{ "boxShadow": "rgba(255, 255, 255, 0.18) 0px -1px 0px inset" }}
                        />
                    </div>
                </div>
                {errors.phoneNo && (
                    <span className="-mt-1 text-[12px] text-pink-200">
                        {errors.phoneNo.message}
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="message" className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5" >
                    Message <sup className="text-pink-200">*</sup>
                </label>
                <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="7"
                    placeholder="Enter your message here"

                    {...register("message", { required: true })}
                    className='bg-slate-800 p-[12px] bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full'
                    style={{ "boxShadow": "rgba(255, 255, 255, 0.18) 0px -1px 0px inset" }}
                />
                {errors.message && (
                    <span className="-mt-1 text-[12px] text-pink-200">
                        Please enter your Message.
                    </span>
                )}
            </div>
            <button
                disabled={loading}
                type="submit"
                className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${!loading &&
                    "transition-all duration-200 hover:scale-95 hover:shadow-none"
                    }  disabled:bg-richblack-500 sm:text-[16px] `}
            >
                {loading? "Loading...":"Send Message"}
            </button>
        </form>
    )
}

export default ContactForm
