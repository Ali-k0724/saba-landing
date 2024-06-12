import { Link } from "react-router-dom";

import register from "../assets/register.jpg";
import { firstValidationSchema } from "../utils/Schemas";
import { secondValidationSchema } from "../utils/Schemas";

import Signup from "./Signup";
import Success from "./Success";
import useMultistepForm from "../hooks/useMultistepForm";
import { useEffect, useRef, useState } from "react";
import AdditionalInformation from "./AdditionalInformation";
import logo from "../assets/Saba Logo Blue(Itself).png";
import logo1 from "../assets/Saba Contest 4 site's registration section landing 2.png";
import Input from "../Input";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { toast } from "react-toastify";
import axios from "axios";
const Register = () => {
  const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
  const INITIAL_DATA = {
    firstName: "",
    lastName: "",
    fatherName: "",
    phoneNumber: "",
    nationalId: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    university: "",
    degree: "",
    postalcode: "",
    state: "",
    city: "",
    t_shirt: "",
    age: "",
    major: "",
    reason: "",
    illnesText: "",
    illness: false,
    term: false,
    residence: false,
  };
  const [verifyCode, setVerifyCode] = useState("");
  const [data, setData] = useState(INITIAL_DATA);
  const [errors, setErrors] = useState({});
  const [token, setToken] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [complete, setcomplete] = useState(false);

  const captchaRef = useRef(null);
  const updateFields = (fields) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };
  const {
    currentStepIndex: phoneIndex,
    step: phoneStep,
    next: phoneNext,
    back: phoneBack,
  } = useMultistepForm([
    <div className={"w-[65%]"}>
      <Input
        title="شماره موبایل"
        className="h-12 w-full px-6 text-[17px] border-[1.5px] rounded-lg border-[1.5px]-opacity-50 outline-none focus:border-[1.5px]-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
        value={data.phoneNumber}
        required
        onChange={(e) => updateFields({ phoneNumber: e.target.value })}
        type={"text"}
        error={errors.phoneNumber}
        tabindex="5"
      />
    </div>,

    <div className="w-[45%]">
      <Input
        title="کد ارسالی"
        className="h-12 w-full px-6 text-[17px] border-[1.5px] rounded-lg border-[1.5px]-opacity-50 outline-none focus:border-[1.5px]-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
        value={verifyCode}
        required
        disabled={complete}
        onChange={(e) => setVerifyCode(e.target.value)}
        type={"text"}
        error={errors.verifyCode}
      />
    </div>,
  ]);
  const { currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <Signup
        {...data}
        updateFields={updateFields}
        errors={errors}
        timerRunning={timerRunning}
        setTimerRunning={setTimerRunning}
        step={phoneStep}
        currentStepIndex={phoneIndex}
        next={phoneNext}
        back={phoneBack}
        setErrors={setErrors}
        complete={complete}
      />,
      <AdditionalInformation
        {...data}
        updateFields={updateFields}
        errors={errors}
        setErrors={setErrors}
      />,
      <Success />,
    ]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (currentStepIndex === 0) {
      try {
        complete && next();
        await firstValidationSchema
          .validate({ verifyCode, ...data }, { abortEarly: false })
          .then(() => {
            complete == false &&
              axios
                .post("/auth/verify-code", {
                  token: p2e(verifyCode),
                })
                .then(({ status }) => {
                  if (status == 200) {
                    setcomplete(true);
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
          })
          .finally(() => setErrors({}));
      } catch (error) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      }
    }
    if (currentStepIndex === 1) {
      try {
        await secondValidationSchema
          .validate(
            {
              term: data.term,
              ...data,
            },
            { abortEarly: false }
          )
          .then(() => {
            !token && captchaRef.current.execute();
          })
          .then(async () => {
            token &&
              (
                await axios
                  .post("/auth/signup", {
                    name: data.firstName,
                    lastname: data.lastName,
                    repeatPassword: data.confirmPassword,
                    province: data.state,
                    postal_code: p2e(data.postalcode),
                    confession: data.term,
                    illness: data.illnesText,
                    father_name: data.fatherName,
                    token,
                    nationalId: p2e(data.nationalId),
                    ...data,
                  })
                  .then(({ status }) => {
                    status == 201 && next();
                    console.log(status);
                  })
              ).catch((e) => {
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
          })

          .finally(() => setErrors({}));
      } catch (error) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };
  const onExpire = () => {
    setToken(null);
    // toast.error("مشکلی پیش امده", {
    //   position: "bottom-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "colored",
    // });
  };

  const onError = (err) => {
    console.log(`hCaptcha Error: ${err}`);
  };
  const handleSendData = (token) => {
    setToken(token);
    next();
  };
  return (
    <div className="bg-[#F0F4F7] h-[140vh] md:h-screen w-screen pt-20">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-2">
        <Link to={"/"}>
          <div className="h-20 w-20 mb-10 mx-auto mt-52 md:mt-0 md:hidden block">
            <img src={logo} alt="" />
          </div>
        </Link>
        <div className="flex md:min-h-[85vh] min-h-screen md:w-[72vw] w-[90vw] bg-white  rounded-lg shadow-lg mt28">
          <div className="hidden lg:block w-1/2 min-h-full rounded-l border-r">
            <img
              src={logo1}
              className="object-contain w-11/12 h-full rounded-lg mx-auto"
              alt="register-image"
            />
          </div>
          <form
            onSubmit={onSubmit}
            className="lg:w-1/2 w-full rounded-lg mx-auto md:py-4 py-10 md:px-14 px-4 flex flex-col justify-between"
            noValidate
          >
            {step}
            <div className="flex justify-between mt-5">
              <div className="w-[33%]">
                {!isFirstStep && !isLastStep && (
                  <button
                    className="w-full border bg-red-500 py-3 rounded-lg text-white mb-1 ml-auto "
                    onClick={() => back()}
                  >
                    برگشت
                  </button>
                )}
              </div>
              {!isLastStep && (
                <div className="w-[33%]">
                  <button
                    className="w-full border bg-blue-500 py-3 rounded-lg text-white mb-1 ml-auto"
                    type="submit"
                  >
                    ادامه
                  </button>
                </div>
              )}
            </div>
            <HCaptcha
              sitekey="e5b9adf8-9ff6-4c19-b943-afd2afcea3d3"
              size="invisible"
              onVerify={handleSendData}
              onError={onError}
              // onExpire={onExpire}
              ref={captchaRef}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
