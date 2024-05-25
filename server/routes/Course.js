const express = require("express")
const router = express.Router()

const { login, signUp, sendOtp, changePassword } = require('../controllers/Auth');
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword");

const { Auth, isAdmin, isInstructor, isStudent } = require('../middlewares/Auth');
const { createCategory, getAllCategories, categoryPage } = require("../controllers/Category");
const { createCourse, editCourse, getAllDetailsOfCourse, getInstructorCourses, deleteCourse, getCourseDetails } = require("../controllers/Course");
const { createSection, updateSection, deleteSection } = require("../controllers/Section");
const { createSubSection, updateSubSection } = require("../controllers/SubSection");
const { createRatingAndReviews,getAllRatingReview } = require('../controllers/RatingAndReview');
const {updateCourseProgress} = require('../controllers/CourseProgress');
router.post('/createCategory', Auth, isAdmin, createCategory);
router.get('/showAllCategories', getAllCategories);
router.post('/getCategoryDetails', categoryPage)

router.post('/createCourse', Auth, isInstructor, createCourse);
router.put('/editCourse', Auth, isInstructor, editCourse);
router.delete('/deleteCourse', Auth, isInstructor, deleteCourse);
router.post('/getFullCourseDetails', Auth, getAllDetailsOfCourse);
router.post('/getCourseDetails', getCourseDetails);


router.delete('/deleteSection', Auth, isInstructor, deleteSection);
router.post('/addSection', Auth, isInstructor, createSection);
router.put('/editSection', Auth, isInstructor, updateSection);

router.post('/addSubSection', Auth, isInstructor, createSubSection);
router.put('/updateSubSection', Auth, isInstructor, updateSubSection);

router.post('/getCourseDetails', getAllDetailsOfCourse);

router.get('/getInstructorCourses', Auth, isInstructor, getInstructorCourses)

router.post('/createRatingAndReviews', Auth, isStudent, createRatingAndReviews)
router.get('/getAllRatingReview', getAllRatingReview)
router.post('/updateCourseProgress',Auth,isStudent,updateCourseProgress)



module.exports = router;