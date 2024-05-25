import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { MdNavigateNext, MdOutlineAddCircleOutline } from 'react-icons/md';
import { courseEndpoints } from '../../../apis/apis';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import CourseSubSection from './CourseSection';
import { setCourse, setEditCourse, setStep } from '../../../redux/slices/courseSlice';
import toast from 'react-hot-toast';
const CourseBuilder = () => {

  const { register, setValue, handleSubmit, formState: { errors } } = useForm();
  const [editSectionTitle, setEditSectionTitle] = useState(null);
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleFormSubmit = async (values) => {

    setLoading(true);

    if (editSectionTitle) {
      try {
        // console.log("Editsectiontitle", editSectionTitle);
        // console.log("Updated course,", course);

        const { data } = await axios.put(courseEndpoints.UPDATE_SECTION_API, { sectionName: values.sectionName, sectionId: editSectionTitle, courseId: course._id }, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        // console.log("Response from edit section api:", data);
        if (!data.success) {
          throw new Error(data.message);
        }
        // console.log("esponse course updated ", data?.updatedCourse);
        dispatch(setCourse(data?.updatedCourse));
        // console.log("Updated course after setcourse", course);
        setEditSectionTitle(null)
        setValue("sectionName", "")
        toast.success('section updated successfully');

      } catch (error) {
        console.log("Error while editing course section. Please try again...");
        toast.error("Failed to edit section Name");
      }
    }
    else {
      try {

        // console.log(object)
        // console.log("Updated course,", course);

        const { data } = await axios.post(courseEndpoints.CREATE_SECTION_API, { sectionName: values.sectionName, courseId: course._id }, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        // console.log("Response from create section api:", data);
        if (!data.success) {
          throw new Error(data.message);
        }
        dispatch(setCourse(data?.updatedCourse));
        // setEditSectionTitle(null)
        setValue("sectionName", "")
        toast.success('section created successfully');
        // console.log("updated course after", course);

      } catch (error) {
        console.log("Error while creating course section. Please try again...", error);
        toast.error("Failed to create section");

      }

    }
    setLoading(false);

  }

  const goToNext = () => {
    console.log("I am clicked")
    if (course.courseContent.length === 0) {
      toast.error("Please add at least one section")
      return;
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add at least one lecture in each section")
      return;
    }
    dispatch(setStep(3))
  }

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  const cancelEdit = () => {
    setEditSectionTitle(null)
    setValue("sectionName", "")
  }
  const handleChangeEditSectionName = (sectionId, sectionName) => {

    // console.log("SECTION ID IN FUNC:", sectionId)
    // 
    // console.log("EDITSECTIONTITLE:", editSectionTitle)
    if (editSectionTitle === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionTitle(sectionId)

    setValue("sectionName", sectionName);
    // setEditSectionTitle(sectionId);
    // console.log("EDITSECTIONTITLE:", editSectionTitle)
  }

  return (
    <div className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}>

        <div className='text-white font-semibold text-xl mb-5'>
          Course Builder
        </div>

        <div className='border-richblack-700 border-[1px] p-5 rounded-md'>
          <div className='flex flex-col space-y-2'>
            <label htmlFor="sectionName" className='label-style'>
              Section Title: <sup className='text-pink-200'>*</sup>
            </label>
            <input
              id="sectionName"
              name='sectionName'
              placeholder="Add a section to build your course"
              {...register("sectionName", { required: true })}
              className="input-field-style"
            />
            {errors.sectionName && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Section title is required
              </span>
            )}
          </div>

          <div className='mt-5 flex gap-5 items-baseline'>
            <button className='flex items-center gap-2 bg-yellow-50  p-2 px-3 rounded-md '
              type='submit'
            // disabled={loading}
            >
              <MdOutlineAddCircleOutline />
              <p>{editSectionTitle ? "Edit Section Title" : "Create Section"}</p>

            </button>
            {
              editSectionTitle && (
                <button type='button' onClick={cancelEdit} className='text-richblack-500 text-semibold'>
                  Cancel Edit
                </button>
              )
            }
          </div>

        </div>

      </form>
      {
        course?.courseContent.length > 0 && (
          <CourseSubSection handleChangeEditSectionName={handleChangeEditSectionName} />
        )
      }

      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          Back
        </button>
        <button  onClick={()=>goToNext()}
          className='flex gap-2 bg-yellow-50 items-center justify-center p-3 rounded-md cursor-pointer '>
          <p>Next</p>
          <MdNavigateNext />
        </button>
      </div>
    </div>
  )
}

export default CourseBuilder;
