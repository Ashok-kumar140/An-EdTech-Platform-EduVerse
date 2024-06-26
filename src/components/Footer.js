import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CareerBuildings, LanguagesLink, SubjectsLink } from '../data/FooterLink';
import { FcGoogle } from "react-icons/fc";
import { GrLinkedin } from "react-icons/gr";
import { FaSquareInstagram } from "react-icons/fa6";
import { AiOutlineGithub } from "react-icons/ai";
// import { GoHeartFill } from "react-icons/go";
import Logo from '../assets/logo/logo.png'

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = ["Articles", "Blog", "Chart Sheet", "Code challenges", "Docs", "Projects", "Videos", "Workspaces",];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-richblack-800">
      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
        <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700">

          <div className="w-full flex flex-wrap flex-row justify-between lg:border-richblack-700 pl-3 lg:pr-5 gap-3">

            <div className="w-[48%] flex flex-col gap-3 lg:w-[16%] mb-7 lg:pl-0">
              <img src={Logo} alt="" className="left-11"
                loading='lazy'
                onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              />
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Company
              </h1>
              <div className="flex flex-col gap-2">
                {["About", "Contact", "Home"].map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      {
                        ele === 'Home' ? (
                          <Link to={'/'}>{ele}</Link>
                        ) : (
                          <div onClick={() => navigate(`/${ele.toLowerCase()}`)}>{ele}</div>
                        )
                      }
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-3 text-lg">
                <a href="www.linkedin.com/in/ashok-kumar3" target='_blank' rel="noreferrer"> <GrLinkedin className='hover:text-[#1d4ed8] transition-all duration-500 hover:scale-150' /></a>
                <a href="https://github.com/Ashok-kumar140" target='_blank' rel="noreferrer">
                  <AiOutlineGithub className='hover:text-richblack-25 transition-all duration-500 hover:scale-150' />
                </a>
                <a href="https://google.com" target='_blank' rel="noreferrer">
                  <FcGoogle className='hover:text-richblack-25 transition-all duration-500 hover:scale-150' />
                </a>
                <a href="https://www.instagram.com/a.k.daukiya/" target='_blank' rel="noreferrer">
                  <FaSquareInstagram className='hover:text-[#ec4899] transition-all duration-500 hover:scale-150' />
                </a>
              </div>

            </div>

            <div className="w-[48%] lg:w-[15%] mb-7 lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Subjects
              </h1>
              <div className="flex flex-col gap-2 mt-2">
                {SubjectsLink.map((link, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <div onClick={() => { navigate("/catalog" + link.link); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{link.title}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="w-[48%] lg:w-[15%] mb-7 lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Plans
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Community
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="w-[48%] lg:w-[15%] mb-7 lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Career and Building
              </h1>
              <div className="flex flex-col gap-2 mt-2">
                {CareerBuildings.map((link, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <div onClick={() => { navigate("/catalog" + link.link); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{link.title}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-[48%] lg:w-[15%] mb-7 lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Languages
              </h1>
              <div className="flex flex-col gap-2 mt-2">
                {LanguagesLink.map((link, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <div onClick={() => { navigate("/catalog" + link.link); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{link.title}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="w-[48%] lg:w-[15%] mb-7 lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Resources
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>

              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Support
              </h1>
              <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                <Link to={"/help-center"}>Help Center</Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto  pb-14 text-sm">

        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {BottomFooter.map((ele, i) => {
              return (
                <div
                  key={i}
                  className={` ${BottomFooter.length - 1 === i
                    ? ""
                    : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    } px-3 `}
                >
                  <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                    {ele}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center flex gap-5 items-center justify-center">Made with <span className='heart text-[#e11d48] hover:scale-150 transition-all duration-500'></span> || EduVerse</div>
        </div>
      </div>
    </div >
  )
}

export default Footer
