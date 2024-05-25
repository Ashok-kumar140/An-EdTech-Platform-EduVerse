const Category = require('../models/Category');


exports.createCategory = async (req, res) => {

    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(403).json({
                success: false,
                message: "All fields are require"
            })
        }

        const category = await Category.create({ name, description });

        return res.status(200).json({
            success: true,
            message: "category created successfully",
            category: category,
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Unable to create category"
        })
    }

}


exports.getAllCategories = async (req, res) => {

    try {
        const categories = await Category.find({}, { name: true, description: true });

        return res.status(200).json({
            success: true,
            message: "All categories fetched successfully",
            categories: categories,
        })

    } catch (error) {

        return res.status(200).json({
            success: false,
            message: "Error while fetching all categories",
            error: error.message

        })

    }

}


exports.categoryPage = async (req, res) => {

    try {

        const { categoryId } = req.body;

        console.log("CATEGORY: ", categoryId);

        const category = await Category.findById(categoryId).populate({
            path: "courses",
            match: { status: "Published" },
            populate:"instructor",
            // populate: "ratingAndReviews",
        }).exec()

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
        // console.log("CATEGORY:2 ", categoryId);


        if (category.courses.length === 0) {
            console.log("No courses found for the selected category.")
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category.",
            })
        }

        // Get courses for other categories
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        })
        let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
                ._id
        )
            .populate({
                path: "courses",
                match: { status: "Published" },
            })
            .exec()
        console.log("HII")
        // Get top-selling courses across all categories
        const allCategories = await Category.find()
            .populate({
                path: "courses",
                match: { status: "Published" },
            })
            .exec()
        const allCourses = allCategories.flatMap((category) => category.courses)
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10)

        return res.status(200).json({
            success: true,
            data: {
                selectedCategory: category,
                differentCategory,
                mostSellingCourses,
            },
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message

        })
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}