import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AuthState } from "../contexts/AuthContext";
import { GrClose } from "react-icons/gr";

import logo from "../assets/logo.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IoPersonCircleSharp } from "react-icons/io5";

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const { auth } = AuthState();
  const navigate = useNavigate();

  return (
    <div className="w-full h-20 fixed top-0 left-0 bg-white opacity-[98%] z-50 border-b">
      <div className="flex lg:justify-start justify-between  w-11/12 md:w-10/12 mx-auto h-full items-center  flex-row-reverse">
        <div className="h-14 w-14 cursor-pointer">
          <div
            onClick={() => {
              navigate("/", { state: { targetId: "home" } });
            }}
          >
            <img src={logo} alt="" />
          </div>
        </div>
        <div className="lg:flex flex-row-reverse hidden justify-between w-[55%] text-base mr-28">
          <div
            className="hover:text-blue-500 mr-4 cursor-pointer"
            onClick={() => {
              navigate("/", { state: { targetId: "about" } });
            }}
          >
            درباره صبا
          </div>
          <div
            className="hover:text-blue-500 mr-4 cursor-pointer"
            onClick={() => {
              navigate("/rules");
            }}
          >
            قوانین
          </div>
          <div
            className="hover:text-blue-500 mr-4 cursor-pointer"
            onClick={() => {
              navigate("/", { state: { targetId: "history" } });
            }}
          >
            تاریخچه
          </div>
          <div
            className="hover:text-blue-500 mr-4 cursor-pointer"
            onClick={() => {
              navigate("/info");
            }}
          >
            اطلاعات بیشتر
          </div>
          <div
            className="hover:text-blue-500 mr-4 cursor-pointer"
            onClick={() => {
              navigate("/participants");
            }}
          >
            شرکت‌کنندگان
          </div>

          <div
            className="hover:text-blue-500 mr-4 cursor-pointer"
            onClick={() => {
              navigate("/", { state: { targetId: "contact" } });
            }}
          >
            تماس با ما
          </div>
        </div>
        {/* {!auth == "" ? (
          <div className="flex-row-reverse items-center relative h-full mr-auto hidden md:flex">
            <IoPersonCircleSharp
              size={52.5}
              className="cursor-pointer lg:block hidden"
              onClick={() => navigate("/profile")}
            />
          </div>
        ) :  */}
        {/* ( */}
        <>
          <Link
            to={"/register"}
            className="mr-auto bg-[#04afef]  text-white px-6 py-2.5 rounded-md hidden md:block yekan-semi"
          >
            ثبت نام
          </Link>
          {/* <Link
              to={"/login"}
              className="mr-4 bg-[#F9B219] ] text-white px-8 py-2.5 rounded-md hidden md:block yekan-semi"
            >
              ورود
            </Link> */}
        </>
        {/* )} */}
        <RxHamburgerMenu
          className="lg:hidden cursor-pointer"
          size={25}
          onClick={() => {
            setSidebar(true);
            document.documentElement.style.overflowY = "hidden";
          }}
        />
        <div
          className={`absolute z-50 h-screen w-screen bg-white top-0 right-0 transition-all  ${
            sidebar ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <GrClose
            onClick={() => {
              setSidebar(false);
              document.documentElement.style.overflowY = "auto";
            }}
            size={27}
            className="mr-7 ml-auto mt-7 cursor-pointer"
          />

          <div className="flex flex-col h-[55%] justify-between mx-auto w-10/12 text-lg mt-[4.5rem] ">
            <div
              className="hover:text-blue-500 mx-auto"
              onClick={() => {
                setSidebar(false);
                document.documentElement.style.overflowY = "auto";
                navigate("/register");
              }}
            >
              ثبت نام
            </div>
            <div
              className="hover:text-blue-500 mx-auto"
              onClick={() => {
                setSidebar(false);
                document.documentElement.style.overflowY = "auto";
                navigate("/", { state: { targetId: "about" } });
              }}
            >
              درباره صبا
            </div>
            <div
              className="hover:text-blue-500 mx-auto"
              onClick={() => {
                setSidebar(false);
                document.documentElement.style.overflowY = "auto";
                navigate("/rules");
              }}
            >
              قوانین
            </div>
            <div
              className="hover:text-blue-500 mx-auto"
              onClick={() => {
                setSidebar(false);
                document.documentElement.style.overflowY = "auto";
                navigate("/", { state: { targetId: "history" } });
              }}
            >
              تاریخچه
            </div>

            <div
              className="hover:text-blue-500 mx-auto"
              onClick={() => {
                setSidebar(false);
                document.documentElement.style.overflowY = "auto";
                navigate("/info");
              }}
            >
              اطلاعات بیشتر
            </div>
            <div
              className="hover:text-blue-500 mx-auto"
              onClick={() => {
                setSidebar(false);
                document.documentElement.style.overflowY = "auto";
                navigate("/participants");
              }}
            >
              شرکت‌کنندگان
            </div>
            <div
              className="hover:text-blue-500 mx-auto"
              onClick={() => {
                setSidebar(false);
                document.documentElement.style.overflowY = "auto";
                navigate("/", { state: { targetId: "contact" } });
              }}
            >
              تماس با ما
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
