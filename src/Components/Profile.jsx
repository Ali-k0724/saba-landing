import { BsPerson, BsPersonCircle } from "react-icons/bs";
import { RxExit } from "react-icons/rx";
import { useEffect, useState } from "react";
import UserInfo from "./UserInfo";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { AuthState } from "../contexts/AuthContext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const Profile = () => {
  const [activeTab, setActiveTab] = useState("info");
  const { setAuth } = AuthState();
  // const INITIAL_DATA = {
  //   firstName: "",
  //   lastName: "",
  //   fatherName: "",
  //   nationalId: "",
  //   sex: "",
  //   university: "",
  //   grade: "",
  //   degree: "",
  //   postalcode: "",
  //   state: "",
  //   city: "",
  //   tshirt: "",
  //   age: "",
  //   field: "",
  //   reason: "",
  //   illnesText: "",
  //   illness: false,
  // };
  const [data, setData] = useState({});

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    axiosPrivate
      .get("http://localhost:3000/single-user")
      .then(({ data }) => setData(data.user));
  }, []);

  const handleLogout = async () => {
    const { status } = await axiosPrivate.get(
      "http://localhost:3000/auth/logout"
    );
    if (status == 204) {
      navigate("/");
      setAuth("");
    }
  };
  return (
    <div className="bg-[#F5F8FA] min-h-screen">
      <div className="md:w-9/12 mx-auto flex md:flex-row flex-col-reverse justify-between pb-10 text-neutral-800 pt-32">
        <div className="md:w-[65%] w-11/12 mx-auto md:mx-0">
          {activeTab === "info" && <UserInfo data={data} setData={setData} />}
        </div>
        <div className="md:w-[25%] w-11/12 text-[17px] text-neutral-80 mx-auto md:mx-0 mb-5 md:mb-5">
          <div className="w-full border border-neutral-200 text-right  rounded-md sticky top-24 shadow-g bg-white">
            <div className=" py-3 border-b">
              <div className="flex flex-row-reverse py-1.5 px-3 items-center">
                <BsPersonCircle size={45} className="ml-2" />
                <div>
                  <div className="font-medium text-neutral-900">{`${data.first_name} ${data.last_name}`}</div>
                  <div className="text-[.9rem] text-neutral-400">
                    {data.phone_number}
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
              className="text-red-600 hover:bg-slate-100 py-3 cursor-pointer border-b"
              onClick={handleLogout}
            >
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

export default Profile;
