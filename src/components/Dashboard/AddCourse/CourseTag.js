/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';

const CourseTag = ({ name, label, placeholder, errors, setValue, getValues, register }) => {

    const [tags, setTags] = useState([]);
    const { editCourse, course } = useSelector((state) => state.course)


    useEffect(() => {
        if (editCourse) {
            setTags(course?.tag)
        }
        register(name, { required: true, validate: (value) => value.length > 0 })

    }, [])

    useEffect(() => {
        setValue(name, tags);
    }, [tags])



    const handleEnterKey = (e) => {

        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();

            const tagValue = e.target.value.trim();
            if (tagValue && !tags.includes(tagValue)) {
                setTags([...tags, tagValue]);
                e.target.value = "";
            }
        }

    }
    const handleDeleteChip = (tagIndex) => {

        const newTags = tags.filter((element, index) => (index !== tagIndex));
        setTags(newTags);
    }

    return (
        <div className="flex flex-col space-y-2">

            <label className="text-sm text-richblack-5" htmlFor={name}>
                {label} <sup className="text-pink-200">*</sup>
            </label>

            <div className="flex w-full flex-wrap gap-y-2">

                {
                    tags.map((element, index) => (
                        <div
                            key={index}
                            className="m-1 flex items-center rounded-full bg-yellow-600 px-2 py-1 text-sm text-richblack-5"
                        >

                            {element}

                            <button
                                type="button"
                                className="ml-2 focus:outline-none"
                                onClick={() => handleDeleteChip(index)}
                            >
                                <MdClose className="text-sm" />
                            </button>
                        </div>
                    ))
                }

                <input
                    id={name}
                    name={name}
                    type="text"
                    placeholder={placeholder}
                    onKeyDown={handleEnterKey}
                    className="input-field-style"
                />
            </div>

            {errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    {label} is required
                </span>
            )}
        </div>
    )
}

export default CourseTag;
