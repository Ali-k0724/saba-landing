import { BsPerson, BsPersonCircle } from "react-icons/bs";
import Input from "../Input";
import { GoTrophy } from "react-icons/go";
import { RxExit } from "react-icons/rx";
import { useState } from "react";
import file from "../assets/file.png";
import { RiAdminFill, RiAdminLine } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import Users from "./Users";
import UserInfo from "./UserInfo";
const Admin = () => {
  const [activeTab, setActiveTab] = useState("info");
  return (
    <div className="bg-[#F5F8FA]">
      <div
        className={`md:w-10/12 mx-auto flex md:flex-row flex-col-reverse justify-between pb-10 text-neutral-800 pt-32`}
      >
        <div
          className={`${
            activeTab == "users" ? "w-[70%] " : "md:w-[65%]"
          }  mx-auto md:mx-0`}
        >
          {activeTab == "users" && <Users />}
          {activeTab == "info" && <UserInfo />}
        </div>
        <div className="md:w-[25%] w-11/12 text-[17px] text-neutral-80 mx-auto md:mx-0 mb-5 md:mb-5">
          <div className="w-full border border-neutral-200 text-right  rounded-md sticky top-24 shadow-g bg-white">
            <div className=" py-3 border-b">
              <div className="flex flex-row-reverse py-1.5 px-3 items-center">
                <RiAdminFill size={35} className="ml-2" />
                <div>
                  <div className="font-medium text-neutral-900">محمد ابطحی</div>
                  <div className="text-[.9rem] text-neutral-400">
                    09388113610
                  </div>
                </div>
              </div>
            </div>
            <div
              className="hover:bg-slate-100 py-3 cursor-pointer border-b"
              onClick={() => setActiveTab("info")}
            >
              <div
                className={`${
                  activeTab === "info" ? "active-side-tab" : null
                } flex flex-row-reverse py-1.5 px-3 text-[15px]`}
              >
                <BsPerson size={26} className="ml-2" />
                <span>اطلاعات حساب</span>
              </div>
            </div>
            <div
              className={`hover:bg-slate-100 py-3 cursor-pointer border-b`}
              onClick={() => setActiveTab("users")}
            >
              <div
                className={`${
                  activeTab == "users" ? "active-side-tab " : null
                } flex flex-row-reverse py-1.5 px-3 text-[15px]`}
              >
                <LuUsers size={25} className="ml-2" />
                <span>کاربران </span>
              </div>
            </div>
            <div className="text-red-600 hover:bg-slate-100 py-3 cursor-pointer border-b">
              <div className="flex flex-row-reverse py-1.5 px-3">
                <RxExit size={25} className="ml-2" />
                <span>خروج</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
