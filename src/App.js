import './App.css';

import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import SignUp from './pages/SingUp';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import MyProfile from './components/Dashboard/MyProfile';
import ProtectedRoute from '../src/components/AuthPage/ProtectedRoute'
import Settings from './components/Dashboard/Setting/Settings';
import AddCourse from './components/Dashboard/AddCourse/AddCourse';
import { ACCOUNT_TYPE } from './helpers/constants';
import { useSelector } from 'react-redux';
import MyCourse from './components/Dashboard/MyCourse/MyCourse';
import EditCourse from './components/Dashboard/AddCourse/EditCourse';
import Catalog from './pages/Catalog';
import CourseDetails from './pages/CourseDetails';
import MyCart from './pages/MyCart';
import EnrolledCourses from './components/Dashboard/Student/EnrolledCourses';
import ViewCourse from './pages/ViewCourse';
import VideoDetail from './components/ViewCourse/VideoDetail';
import Instructor from './components/Dashboard/MyCourse/InstructorDashboard/Instructor';
function App() {

  const { user } = useSelector((state) => state.profile);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/catalog/:catalogName' element={<Catalog />}></Route>
        <Route path='/courses/:courseId' element={<CourseDetails />}></Route>
        <Route path='/forgot-password' element={<ForgotPassword />}></Route>
        <Route path='/update-password/:token' element={<UpdatePassword />}></Route>
        <Route path='/verify-email' element={<VerifyEmail />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
          <Route path='/dashboard/my-profile' element={<MyProfile />} />
          <Route path='/dashboard/settings' element={<Settings />} />

          {
            user?.role === ACCOUNT_TYPE.INSTRUCTOR && (

              <>
                <Route path='/dashboard/add-course' element={<AddCourse />} />
                <Route path='/dashboard/my-courses' element={<MyCourse />} />
                <Route path='/dashboard/instructor' element={<Instructor />} />
                <Route path='/dashboard/edit-course/:courseId' element={<EditCourse />} />
              </>
            )
          }
          {
            user?.role === ACCOUNT_TYPE.STUDENT && (

              <>
                <Route path='/dashboard/my-cart' element={<MyCart />} />
                <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses />} />

              </>
            )
          }

        </Route>

        <Route
          element={
            <ProtectedRoute>
              <ViewCourse />
            </ProtectedRoute>
          }
        >
          {
            user?.role === ACCOUNT_TYPE.STUDENT && (

              <>
                <Route path='/view-course/:courseId/section/:sectionId/sub-section/:subSectionId' element={<VideoDetail />} />

              </>
            )
          }
          {
            user?.role === ACCOUNT_TYPE.STUDENT && (

              <>
                <Route path='/dashboard/my-cart' element={<MyCart />} />
                <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses />} />

              </>
            )
          }

        </Route>
      </Routes>
    </div>
  );
}

export default App;
