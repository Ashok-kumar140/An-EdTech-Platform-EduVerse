/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { categories } from '../apis/apis';
import Error from './Error';
import { useSelector } from 'react-redux';
import CourseSlider from '../components/Catalog/CourseSlider';
import CourseCard from '../components/Catalog/CourseCard';
import Footer from '../components/Footer';
const Catalog = () => {

    const { catalogName } = useParams();
    const [active, setActive] = useState(1);
    // const [loading, setLoading] = useState(false);
    const { loading } = useSelector((state) => state.profile)
    const [categoryID, setCategoryID] = useState("");
    const [categoryData, setCategoryData] = useState(null);

    useEffect(() => {

        fetchAllCategories();
    }, [catalogName]);

    useEffect(() => {
        if (categoryID) {
            // console.log("USE EFFECT", categoryID)
            fetchCategoryDetails();
        }
    }, [categoryID])

    const fetchAllCategories = async () => {

        try {

            const { data } = await axios.get(categories.CATEGORIES_API);
            // console.log("Data:", data);
            const category_id = data?.categories?.filter(
                (category) => category.name.split(" ").join("-").toLowerCase() === catalogName
            )[0]._id
            setCategoryID(category_id);
            // console.log("CATEGORY ID:", category_id);
            // console.log("CATEGORY ID1:", categoryID);

        } catch (error) {

            console.log("Error while calling fetch all categories API:", error);

        }


    }
    const fetchCategoryDetails = async () => {

        // setLoading(true);
        try {

            const { data } = await axios.post(categories.CATEGORY_DETAILS_API, { categoryId: categoryID });

            setCategoryData(data);

            console.log("CATEGORY DETAILS: ", data);

        } catch (error) {
            console.log("Error while fetching details of category API:..", error);
            toast.error("Failed to fetch the category details");
        }

        // setLoading(false);

    }

    console.log("category data:", categoryData);

    if (loading || !categoryData) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }

    if (!loading && !categoryData.success) {
        return <Error />
    }

    return (
        <>
            <div className=" box-content bg-richblack-900 px-4">
                <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
                    <p className="text-sm text-richblack-300">
                        {`Home / Catalog / `}
                        <span className="text-yellow-25">
                            {categoryData?.data?.selectedCategory?.name}
                        </span>
                    </p>
                    <p className="text-3xl text-richblack-5">
                        {categoryData?.data?.selectedCategory?.name}
                    </p>
                    <p className="max-w-[870px] text-richblack-200">
                        {categoryData?.data?.selectedCategory?.description}
                    </p>
                </div>


                <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                    <div className="text-bold text-3xl text-white font-semibold">Courses to get you started</div>
                    <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                        <p
                            className={`px-4 py-2 ${active === 1
                                ? "border-b border-b-yellow-25 text-yellow-25"
                                : "text-richblack-50"
                                } cursor-pointer`}
                            onClick={() => setActive(1)}
                        >
                            Most Popular
                        </p>
                        <p
                            className={`px-4 py-2 ${active === 2
                                ? "border-b border-b-yellow-25 text-yellow-25"
                                : "text-richblack-50"
                                } cursor-pointer`}
                            onClick={() => setActive(2)}
                        >
                            New
                        </p>
                    </div>
                    <div>
                        <CourseSlider
                            Courses={categoryData?.data?.selectedCategory?.courses}
                        />
                    </div>
                </div>


                <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                    <div className="text-bold text-3xl text-white font-semibold mb-5">
                        <p>Top Courses in {categoryData?.data?.differentCategory?.name}</p>
                    </div>

                    <div>
                        <CourseSlider
                            Courses={categoryData?.data?.differentCategory?.courses}
                        />
                    </div>
                </div>

                <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                    <div className="text-bold text-3xl text-white font-semibold">Frequently Bought</div>
                    <div className="py-8">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            {categoryData?.data?.mostSellingCourses
                                ?.slice(0, 4)
                                .map((course, i) => (
                                    <CourseCard course={course} key={i} Height={"h-[250px]"} />
                                ))}
                        </div>
                    </div>
                </div>

            </div>

            <Footer />

        </>
    )
}

export default Catalog;
