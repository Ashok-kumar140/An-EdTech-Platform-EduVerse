/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function CourseInstructions({ name, label, register, setValue, errors, getValues, }) {

    const { editCourse, course } = useSelector((state) => state.course)
    const [prerequisite, setPrerequisite] = useState("")
    const [prerequisitesList, setPrerequisites] = useState([])

    useEffect(() => {
        if (editCourse) {
            setPrerequisites(course?.instructions)
        }
        register(name, { required: true, validate: (value) => value.length > 0 })
       
    }, [])

    useEffect(() => {
        setValue(name, prerequisitesList)
        
    }, [prerequisitesList])

    const handleAddRequirement = () => {
        if (prerequisite) {
            setPrerequisites([...prerequisitesList, prerequisite])
            setPrerequisite("")
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirements = [...prerequisitesList]
        updatedRequirements.splice(index, 1)
        setPrerequisites(updatedRequirements)
    }

    return (
        <div className="flex flex-col space-y-2">
            <label className="label-style" htmlFor={name}>
                {label} <sup className="text-pink-200">*</sup>
            </label>
            <div className="flex flex-col items-start space-y-2">
                <input
                    type="text"
                    id={name}
                    value={prerequisite}
                    onChange={(e) => setPrerequisite(e.target.value)}
                    className="input-field-style"
                />
                <button
                    type="button"
                    onClick={handleAddRequirement}
                    className="font-semibold text-yellow-50"
                >
                    Add
                </button>
            </div>
            {prerequisitesList.length > 0 && (
                <ul className="mt-2 list-inside list-disc">
                    {prerequisitesList.map((requirement, index) => (
                        <li key={index} className="flex items-center text-richblack-5">
                            <span>{requirement}</span>
                            <button
                                type="button"
                                className="ml-2 text-xs text-pure-greys-300 "
                                onClick={() => handleRemoveRequirement(index)}
                            >
                                clear
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    {label} is required
                </span>
            )}
        </div>
    )
}