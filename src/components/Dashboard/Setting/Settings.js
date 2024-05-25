import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HiOutlineUpload } from "react-icons/hi";
import axios from 'axios';
import { profileEndPoints } from '../../../apis/apis';
import toast from 'react-hot-toast';
import { setUser } from '../../../redux/slices/profileSlice';
import { IoCameraOutline } from "react-icons/io5";
import EditProfileDetails from "./EditProfileDetails";
import UpdatePassword from "./UpdatePassword";
import DeleteUserAccount from "./DeleteUserAccount";

const Settings = () => {

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();


  const handleClick = (e) => {
    fileInputRef.current.click()

  }

  const handleFileOnChange = (e) => {

    // console.log("inside handle file change", e.target.files);
    const file = e.target.files[0];
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    // console.log(":", reader)
    reader.readAsDataURL(file)
    // console.log("res", reader.result)
    reader.onloadend = () => {
      setPreviewImage(reader.result)
    }
  }
  const handleUploadImage = async (req, res) => {

    try {

      setLoading(true);
      let formData = new FormData()
      formData.append('imageFile', imageFile)
      // console.log("imagefile", imageFile);
      console.log("form data: ", formData);


      const { data } = await axios.put(profileEndPoints.UPDATE_DISPLAY_PICTURE_API, formData, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      console.log("data from dp:", data);

      if (!data.success) {
        throw new Error(data.message)
      }
      toast.success("Display Picture Updated Successfully")
      console.log("updated profile", data.updatedProfile);
      dispatch(setUser(data.updatedProfile));
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(data?.updatedProfile));

    } catch (error) {

      console.log("Error while calling profile picture api. Error: ", error.message);

    }
    setLoading(false);

  }

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile])

  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
        <div className="flex items-center justify-between gap-x-4">
          <img src={previewImage || user?.image} alt="" width={160} height={160} className="aspect-square  rounded-full object-cover" />


          <div className="space-y-2">
            <p>Change Profile Picture</p>
            <div className="flex flex-row gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileOnChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg, image/jpg"
              />
              <button className='flex items-center gap-2 bg-richblack-50 text-richblack-700 p-2 px-3 rounded-md'
                onClick={handleClick}
                disabled={loading}
              >
                <IoCameraOutline />
                <p>Select</p>
              </button>
              <button className='flex items-center gap-2 bg-yellow-50 text-richblack-700 p-2 px-3 rounded-md'
                onClick={handleUploadImage}
              >
                <HiOutlineUpload />
                <p>Upload</p>
              </button>

            </div>
          </div>
        </div>
      </div >
      <EditProfileDetails />
      <UpdatePassword />
      <DeleteUserAccount />



    </>
  )
}

export default Settings;
