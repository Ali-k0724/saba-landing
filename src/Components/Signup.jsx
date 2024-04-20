import { Link } from "react-router-dom";
import Input from "../Input";
import * as Yup from "yup";
import { IoMdCheckmark } from "react-icons/io";
import Countdown from "react-countdown";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
const Signup = ({
  firstName,
  lastName,
  phoneNumber,
  nationalId,
  email,
  password,
  confirmPassword,
  updateFields,
  fatherName,
  errors,
  timerRunning,
  setTimerRunning,
  currentStepIndex,
  step,
  next,
  setErrors,
  gender,
  age,
  complete,
}) => {
  const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
  const [time, setTime] = useState(null);
  const handelClick = async () => {
    const scheme = Yup.string()
      .length(11, "شماره موبایل باید ۱۱ رقم باشد ")
      .required("شماره موبایل اجباری است");
    try {
      await scheme
        .validate(phoneNumber, { abortEarly: false })
        .then(async () => {
          if (currentStepIndex === 0) {
            await axios
              .post("http://localhost:3000/auth/send-code", {
                phone_number: p2e(phoneNumber),
              })
              .then(({ status }) => {
                if (status == 200) {
                  setTime(Date.now());
                  setTimerRunning(true);
                  next();
                }
              })
              .catch((e) => {
                console.log(e.response.data);
                toast.error(Object.values(e.response.data)[0], {
                  position: "bottom-right",
                  autoClose: 8000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
              });
          }
        });
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors["phoneNumber"] = err.message;
      });
      console.log(newErrors);
      setErrors(newErrors);
    }
    if (currentStepIndex == 1 && complete == false && timerRunning == false) {
      await axios
        .post("http://localhost:3000/auth/send-code", {
          phone_number: p2e(phoneNumber),
        })
        .then(({ status }) => {
          if (status == 200) {
            setTimerRunning(true);
            setTime(Date.now());
          }
        })
        .catch((e) => {
          console.log(e.response.data);
          toast.error(Object.values(e.response.data)[0], {
            position: "bottom-right",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    }
  };
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <div className="cursor-pointer">ارسال مجدد</div>;
    } else {
      return (
        <span className="flex flex-col-reverse text-[15px]">
          <span
            className=" -mt-1
          "
          >
            تا درخواست مجدد
          </span>
          <span>
            {minutes}:{seconds}
          </span>
        </span>
      );
    }
  };
  return (
    <>
      <div className="mb-6 text-center font-semibold text-[25px]">
        پیش ثبت نام
      </div>
      <div className="flex justify-between">
        <div className="w-[48.5%]">
          <Input
            title={" نام خانوادگی"}
            className="h-12 w-full px-6 text-[17px] border-[1.5px] rounded-lg border-[1.5px]-opacity-50 outline-none focus:border-[1.5px]-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
            type="text"
            value={lastName}
            required
            onChange={(e) => updateFields({ lastName: e.target.value })}
            error={errors.lastName}
          />
        </div>
        <div className="w-[48.5%]">
          <Input
            title={"نام"}
            className="h-12 w-full px-6 text-[17px] border-[1.5px] rounded-lg border-[1.5px]-opacity-50 outline-none focus:border-[1.5px]-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
            value={firstName}
            required
            onChange={(e) => updateFields({ firstName: e.target.value })}
            type={"text"}
            error={errors.firstName}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-[48.5%]">
          <Input
            title={"کد ملی"}
            className="h-12 w-full px-6 text-[17px] border-[1.5px] rounded-lg border-[1.5px]-opacity-50 outline-none focus:border-[1.5px]-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
            type="text"
            value={nationalId}
            required
            onChange={(e) => updateFields({ nationalId: e.target.value })}
            error={errors.nationalId}
          />
        </div>
        <div className="w-[48.5%]">
          <Input
            title="نام پدر"
            className="h-12 w-full px-6 text-[17px] border-[1.5px] rounded-lg border-[1.5px]-opacity-50 outline-none focus:border-[1.5px]-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
            value={fatherName}
            required
            onChange={(e) => updateFields({ fatherName: e.target.value })}
            type={"text"}
            error={errors.fatherName}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          className="w-[30%] bg-[#04afef] text-white rounded-lg h-12 border-none"
          onClick={handelClick}
          type="button"
        >
          {currentStepIndex == 0 ? (
            "ارسال کد"
          ) : (
            <div className="flex items-center justify-center relative z-10">
              {complete ? (
                <IoMdCheckmark size={28} />
              ) : (
                <>
                  {timerRunning ? (
                    <>
                      <Countdown
                        date={time + 120000}
                        renderer={renderer}
                        onComplete={() => setTimerRunning(false)}
                      />
                    </>
                  ) : (
                    " ارسال مجدد"
                  )}
                </>
              )}
            </div>
          )}
        </button>
        {step}
      </div>
      <Input
        title={"ایمیل"}
        className="h-12 w-full px-6 text-[17px] border-[1.5px] rounded-lg border-[1.5px]-opacity-50 outline-none focus:border-[1.5px]-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
        value={email}
        required
        onChange={(e) => updateFields({ email: e.target.value })}
        type={"email"}
        error={errors.email}
      />
      <div className="flex flex-row-reverse justify-between">
        <div className="w-[48.5%]">
          <div
            className={`register-select ${errors.gender && " border-red-600 "}`}
          >
            <select
              name="format"
              id="format"
              className={`input-select`}
              required
              value={gender}
              onChange={(e) => updateFields({ gender: e.target.value })}
            >
              <option value="" disabled selected>
                جنسیت
              </option>
              <option value="Female">زن </option>
              <option value="Male">مرد</option>
            </select>
          </div>
          {errors.gender ? (
            <div className="mt-2 text-right mb-2 text-sm text-red-600">
              {errors.gender}
            </div>
          ) : null}
        </div>
        <div className="w-[48.5%]">
          <Input
            title={"سن"}
            className="h-12 w-full px-6 text-[17px] border-[1.5px] rounded-lg border-[1.5px]-opacity-50 outline-none focus:border-[1.5px]-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
            value={age}
            required
            onChange={(e) => updateFields({ age: e.target.value })}
            type={"text"}
            error={errors.age}
          />
        </div>
      </div>
      <Input
        title={"رمز عبور"}
        className="h-12 w-full px-6 text-[17px] border-[1.5px] rounded-lg border-[1.5px]-opacity-50 outline-none focus:border-[1.5px]-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
        value={password}
        required
        type={"password"}
        onChange={(e) => updateFields({ password: e.target.value })}
        error={errors.password}
      />
      <Input
        title={"تکرار رمز عبور "}
        className="h-12 w-full px-6 text-[17px] border-[1.5px] rounded-lg border-[1.5px]-opacity-50 outline-none focus:border-[1.5px]-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
        value={confirmPassword}
        required
        type={"password"}
        onChange={(e) => updateFields({ confirmPassword: e.target.value })}
        error={errors.confirmPassword}
      />
      {/* <div className="text-right text-base">
        <span className=" ml-1">ثبت نام کرده اید؟</span>
        <Link to={"/login"}>
          <span className="text-blue-400 cursor-pointer underline">ورود</span>
        </Link>
      </div> */}
    </>
  );
};

export default Signup;
