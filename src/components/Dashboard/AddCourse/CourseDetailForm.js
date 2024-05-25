/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { categories } from '../../../apis/apis';
import axios from 'axios'
import CourseThumbnail from './CourseThumbnail';
import CourseTag from './CourseTag';
import CourseInstructions from './CourseInstructions';
import { setCourse, setStep } from "../../../redux/slices/courseSlice"
import { MdNavigateNext } from "react-icons/md";
import toast from 'react-hot-toast';
import { COURSE_STATUS } from '../../../helpers/constants'
import { courseEndpoints } from '../../../apis/apis';
const CourseDetailForm = () => {

    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm()

    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const { course, editCourse, step } = useSelector((state) => state.course)
    const [loading, setLoading] = useState(false)
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(() => {
        fetchCatalog();

        if (editCourse) {
            setValue("courseTitle", course.courseName)
            setValue("description", course.courseDescription)
            setValue("price", course.price)
            setValue("tag", course.tag)
            setValue("WhatYouWillLearn", course.whatYouWillLearn)
            setValue("category", course.category)
            setValue("instructions", course.instructions)
            setValue("thumbnail", course.thumbnail)
            setValue("courseLevel", course.courseLevel)
            setValue("courseLanguage", course.courseLanguage)
        }
    }, []);

    const fetchCatalog = async () => {
        setLoading(true);
        try {

            const { data } = await axios.get(categories.CATEGORIES_API);
            // console.log("data from api",data);
            setCourseCategories(data.categories);

        } catch (error) {
            console.log("error while calling api for fetching catalog ", error.message)

        }
        setLoading(false);
    }

    const isFormUpdated = () => {

        const currentValues = getValues()

        if (
            currentValues.courseTitle !== course.courseTitle ||
            currentValues.description !== course.description ||
            currentValues.price !== course.price ||
            currentValues.tag.toString() !== course.tag.toString() ||
            currentValues.whatYouWillLearn !== course.whatYouWillLearn ||
            currentValues.category._id !== course.category._id ||
            currentValues.instructions.toString() !==
            course.instructions.toString() ||
            currentValues.thumbnail !== course.thumbnail
        ) {
            return true;
        }
        return false;
    }

    const handleFormSubmit = async (data) => {

        console.log("data", data)
        if (editCourse) {
            if (isFormUpdated()) {
                const currentValues = getValues()
                const formData = new FormData()
                formData.append("courseId", course._id)
                if (currentValues.courseTitle !== course.courseName) {
                    formData.append("courseTitle", data.courseTitle)
                }
                if (currentValues.description !== course.description) {
                    formData.append("description", data.description)
                }
                if (currentValues.price !== course.price) {
                    formData.append("price", data.price)
                }
                if (currentValues.tag.toString() !== course.tag.toString()) {
                    formData.append("tag", JSON.stringify(data.tag))
                }
                if (currentValues.whatYouWillLearn !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.whatYouWillLearn)
                }
                if (currentValues.category._id !== course.category._id) {
                    formData.append("category", data.category)
                }
                if (
                    currentValues.instructions.toString() !==
                    course.instructions.toString()
                ) {
                    formData.append(
                        "instructions",
                        JSON.stringify(data.instructions)
                    )
                }
                if (currentValues.thumbnail !== course.thumbnail) {
                    formData.append("thumbnail", data.thumbnail)
                }
                // console.log("Edit Form data: ", formData)

                setLoading(true)
                try {
                    const { data } = await axios.put(courseEndpoints.EDIT_COURSE_API, formData, {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    });
                    console.log("Data from edit course:", data);
                    if (!data.success) {
                        throw new Error(data.message);
                    }
                    dispatch(setStep(step + 1));
                    dispatch(setCourse(data.updatedCourse))
                    toast.success("Course edited successfully")

                } catch (error) {
                    console.log("Error while calling edit course creation algorithm:", error.message)
                    toast.error("Unable to edit course. Please try again...")

                }
                setLoading(false)
                // if (result) {
                //     dispatch(setStep(2))
                //     dispatch(setCourse(result))
                // }
            } else {
                toast.error("No changes made to the form")
            }
            return;
        }
        const formData = new FormData()
        formData.append("courseTitle", data.courseTitle)
        formData.append("description", data.description)
        formData.append("price", data.price)
        formData.append("tag", JSON.stringify(data.tag))
        formData.append("WhatYouWillLearn", data.WhatYouWillLearn)
        formData.append("category", data.category)
        formData.append("status", COURSE_STATUS.DRAFT)
        formData.append("instructions", JSON.stringify(data.instructions))
        formData.append("thumbnail", data.thumbnail)
        formData.append("courseLevel", data.courseLevel)
        formData.append("courseLanguage", data.courseLanguage)
        setLoading(true)
        // const result = await addCourseDetails(formData, token)
        // if (result) {
        // dispatch(setStep(2))
        // dispatch(setCourse(result))
        // }
        try {
            const response = await axios.post(courseEndpoints.CREATE_COURSE_API, formData, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            // console.log("REsponse: ",response)
            if (!response?.data?.success) {
                throw new Error(response?.data?.message);
            }
            dispatch(setStep(step + 1));
            dispatch(setCourse(response?.data?.course));
            toast.success("Course created successfully")
        } catch (error) {
            console.log("Error while calling course creation algorithm:", error.message)
            toast.error("Unable to create course. Please try again...")
        }

        setLoading(false)
    }

    return (
        <form className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'
            onSubmit={handleSubmit(handleFormSubmit)}>

            <div className='flex flex-col space-y-2'>
                <label htmlFor="courseTitle" className='label-style'>
                    Course Title: <sup className='text-pink-200'>*</sup>
                </label>
                <input
                    id="courseTitle"
                    name='courseTitle'
                    placeholder="Enter Course Title"
                    value={course?.courseTitle}
                    {...register("courseTitle", { required: true })}
                    className="input-field-style"
                />
                {errors.courseTitle && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course title is required
                    </span>
                )}
            </div>

            <div className='flex flex-col space-y-2'>
                <label htmlFor="description" className='label-style'>
                    Short Description about Course: <sup className='text-pink-200'>*</sup>
                </label>
                <textarea
                    id="description"
                    name='description'
                    value={course?.description}
                    placeholder="Enter Course description"
                    {...register("description", { required: true })}
                    className="input-field-style min-h-[130px]"
                />
                {errors.description && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course description is required
                    </span>
                )}
            </div>

            <div className='flex flex-col space-y-2'>
                <label htmlFor="price" className='label-style'>
                    Course price: <sup className='text-pink-200'>*</sup>
                </label>
                <input
                    id="price"
                    name='price'

                    placeholder="Enter Course price"
                    {...register("price", {
                        required: true, valueAsNumber: true, pattern: {
                            value: /^(0|[1-9]\d*)(\.\d+)?$/,
                        },
                    })}
                    className="input-field-style"
                />
                {errors.price && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course price is required
                    </span>
                )}
            </div>

            <div className='flex flex-col space-y-2'>
                <label htmlFor="category" className='label-style'>
                    Course category: <sup className='text-pink-200'>*</sup>
                </label>
                <select
                    id="category"
                    name='category'
                    defaultValue=""
                    {...register("category", { required: true })}
                    className="input-field-style"
                >
                    <option value="" disabled>
                        Choose a Category
                    </option>
                    {!loading &&
                        courseCategories?.map((category, indx) => (
                            <option key={indx} value={category?._id}>
                                {category?.name}
                            </option>
                        ))}
                </select>
                {errors.category && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course category is required
                    </span>
                )}
            </div>

            <div className='flex flex-col space-y-2'>
                <label htmlFor="WhatYouWillLearn" className='label-style'>
                    What you will learn: <sup className='text-pink-200'>*</sup>
                </label>
                <textarea
                    id="WhatYouWillLearn"
                    name='WhatYouWillLearn'
                    value={course?.WhatYouWillLearn}
                    placeholder="List the learnings from the course"
                    {...register("WhatYouWillLearn", { required: true })}
                    className="input-field-style min-h-[130px]"
                />

                {errors.WhatYouWillLearn && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        WhatYouWillLearn field is required
                    </span>
                )}
            </div>

            <div className='flex flex-col space-y-2'>
                <label htmlFor="courseLevel" className='label-style'>
                    Course Title: <sup className='text-pink-200'>*</sup>
                </label>
                <select
                    id="courseLevel"
                    name='courseLevel'
                    defaultValue=""
                    {...register("courseLevel", { required: true })}
                    className="input-field-style"
                >
                    <option value="" disabled>
                        Choose the level of course
                    </option>
                    <option >
                        Beginner
                    </option>
                    <option >
                        Intermediate
                    </option>
                    <option >
                        Advance
                    </option>
                </select>
                {errors.courseLevel && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course level is required
                    </span>
                )}
            </div>

            <div className='flex flex-col space-y-2'>
                <label htmlFor="courseLanguage" className='label-style'>
                    Course Language: <sup className='text-pink-200'>*</sup>
                </label>
                <select
                    id="courseLanguage"
                    name='courseLanguage'
                    defaultValue=""
                    {...register("courseLanguage", { required: true })}
                    className="input-field-style"
                >
                    <option value="" disabled>
                        Choose the language of course
                    </option>
                    <option >
                        English
                    </option>
                    <option >
                        Hindi
                    </option>
                </select>
                {errors.courseLanguage && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course language is required
                    </span>
                )}
            </div>
            <CourseTag
                name={'tag'}
                label={'Course Tags:'}
                register={register}
                setValue={setValue}
                getValues={getValues}
                errors={errors}
                placeholder={'Enter tag name and press Enter'}
            />
            <CourseThumbnail
                name={'thumbnail'}
                label="Course Thumbnail"
                register={register}
                setValue={setValue}
                errors={errors}
                editData={editCourse ? course?.thumbnail : null}
            />
            <CourseInstructions
                name={'instructions'}
                label="Course Instructions"
                register={register}
                setValue={setValue}
                errors={errors}
                getValues={getValues}

            />

            <div className="flex justify-end gap-x-2">
                {editCourse && (

                    <button onClick={() => dispatch(setStep(step + 1))}
                        disabled={loading}
                        className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50" >
                        Continue Without Saving
                    </button>

                )}
                <button className='flex items-center gap-2 bg-yellow-50  p-2 px-3 rounded-md'
                    type='submit'
                    disabled={loading}
                >
                    <p>{!editCourse ? "Next" : "Save Changes"}</p>
                    <MdNavigateNext />
                </button>
            </div>




        </form>
    )
}

export default CourseDetailForm;
