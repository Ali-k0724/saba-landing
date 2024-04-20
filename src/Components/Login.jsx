import { Link, useNavigate } from "react-router-dom";
import Input from "../Input";
import logo from "../assets/logo.png";
import { useRef, useState } from "react";
import * as Yup from "yup";
import axios from "../utils/axios";
import { AuthState } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import HCaptcha from "@hcaptcha/react-hcaptcha";
const Login = () => {
  const initiaData = {
    nationalId: "",
    password: "",
  };
  const { setAuth } = AuthState();
  const [data, setData] = useState(initiaData);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const updateFields = (fields) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };
  const schemea = Yup.object({
    nationalId: Yup.string().required(),
    password: Yup.string().required(),
  });

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await schemea.validate(data, { abortEarly: false }).then(async () => {
        await axios
          .post("http://localhost:3000/auth/login", {
            nationalId: data.nationalId,
            password: data.password,
          })
          .then(({ status, data }) => {
            if (status == 202) {
              navigate("/profile");
              setAuth(data.access_token);
            }
          })
          .catch((e) => {
            toast.error(e.response.data.error, {
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
      });
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      console.log(newErrors);
    }
  };
  return (
    <div className="bg-[#F0F4F7] h-screen min-h-screen md:min-h-full w-screen">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Link to={"/"}>
          <div className="h-20 w-20 mb-6 mx-auto">
            <img src={logo} alt="" />
          </div>
        </Link>
        <div className="md:h[45vh] h[50vh]  md:w-[26vw] w-[90vw]  shadow-lg rounded-lg mx-auto p-8 bg-white flex flex-col justify-evenly">
          <div className="mb-6 text-right font-semibold text-xl">ورود</div>
          <form onSubmit={handelSubmit} noValidate>
            <Input
              title={"کد ملی"}
              className="h-12 w-full px-6 text-[17px] border-[1.5px] rounded-lg border-[1.5px]-opacity-50 outline-none focus:border-[1.5px]-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
              type="text"
              value={data.nationalId}
              required
              onChange={(e) => updateFields({ nationalId: e.target.value })}
              error={errors.nationalId}
            />
            <Input
              title={"رمز عبور"}
              className="h-12 w-full px-6 text-[17px] border-[1.5px] rounded-lg border-[1.5px]-opacity-50 outline-none focus:border-[1.5px]-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
              type="password"
              value={data.password}
              required
              onChange={(e) => updateFields({ password: e.target.value })}
              error={errors.password}
            />
            <button
              className="w-full border bg-blue-500 py-3 rounded-lg text-white mb-6"
              type="submit"
            >
              ورود
            </button>
            {/* <HCaptcha
            sitekey="e5b9adf8-9ff6-4c19-b943-afd2afcea3d3"
            size="invisible"
            onVerify={handleSendData}
            onError={onError}
            onExpire={onExpire}
            ref={captchaRef}
            /> */}
          </form>
          <div className="text-right text-base">
            <span className=" ml-1">ثبت نام نکرده اید؟</span>
            <Link to={"/register"}>
              <span className="text-blue-400 cursor-pointer underline">
                ثبت نام
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
