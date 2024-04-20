import { useState } from "react";
import Input from "../Input";
import cities from "../utils/cities";
import { editInfoValidationSchema } from "../utils/Schemas";
import * as Yup from "yup";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const UserInfo = ({ data, setData }) => {
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const axiosPrivate = useAxiosPrivate();

  const updateFields = (fields) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };
  const handleInfoEdit = async (e) => {
    e.preventDefault();

    try {
      await editInfoValidationSchema
        .validate(data, { abortEarly: false })
        .then(async () => {
          await axiosPrivate
            .post("http://localhost:3000/auth/update", {
              ...data,
            })
            .then(({ status }) => console.log(status));
        })

        .finally(() => setErrors({}));
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };
  const handleChangePassword = async (e) => {
    e.preventDefault();
    const schema = Yup.object({
      password: Yup.string().required(),
      newPassword: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(
          /[a-z]/,
          "Password must contain at least one lowercase letter"
        ),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Confirm password is required"),
    });

    try {
      await schema
        .validate(password, { abortEarly: false })
        .then(() => {
          axiosPrivate.post("http://localhost:3000/auth/password", {
            current_password: password.password,
            new_password: password.newPassword,
            repeat_new_password: password.confirmNewPassword,
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
  };
  return (
    <>
      <div className="w-full border border-neutral-200 text-right p-4 rounded-md mb-10 shadow-g bg-white">
        <h1 className="md:w-1/6 w-[35%] text-right ml-auto text-[17px] mb-10 relative after:block after:bg-blue-400 after:w-8/12 after:h-[.2rem] after:absolute after:-bottom-2 after:right-0">
          اطلاعات حساب
        </h1>
        <div className="w-full mx-auto">
          <div className="flex justify-between">
            <div className="w-[48.5%]">
              <Input
                title={" نام خانوادگی"}
                className="h-12 w-full px-6 text-[17px] border-[1.5px] rounded-lg border-[1.5px]-opacity-50 outline-none focus:border-[1.5px]-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
                type="text"
                value={data.last_name}
                required
                onChange={(e) => updateFields({ last_name: e.target.value })}
                error={errors.last_name}
              />
            </div>
            <div className="w-[48.5%]">
              <Input
                title={"نام"}
                className="h-12 w-full px-6 text-[17px] border-[1.5px] rounded-lg border-[1.5px]-opacity-50 outline-none focus:border-[1.5px]-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
                value={data.first_name}
                required
                onChange={(e) => updateFields({ first_name: e.target.value })}
                type={"text"}
                error={errors.first_name}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-[48.5%]">
              <Input
                title={"کد ملی"}
                className="h-12 w-full px-6 text-[17px] border-[1.5px] rounded-lg border-[1.5px]-opacity-50 outline-none focus:border-[1.5px]-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
                type="text"
                value={data.national_id}
                required
                disabled
                onChange={(e) => updateFields({ national_id: e.target.value })}
                error={errors.national_id}
              />
            </div>
            <div className="w-[48.5%]">
              <Input
                title="نام پدر"
                className="h-12 w-full px-6 text-[17px] border-[1.5px] rounded-lg border-[1.5px]-opacity-50 outline-none focus:border-[1.5px]-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
                value={data.father_name}
                required
                onChange={(e) => updateFields({ father_name: e.target.value })}
                type={"text"}
                error={errors.father_name}
              />
            </div>
          </div>
          <div className="flex flex-row-reverse justify-between">
            <div className="w-[48.5%]">
              <div
                className={`register-select ${
                  errors.gender && " border-red-600 "
                }`}
              >
                <select
                  name="format"
                  id="format"
                  className={`input-select`}
                  required
                  value={data.gender}
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
                value={data.age}
                required
                onChange={(e) => updateFields({ age: e.target.value })}
                type={"text"}
                error={errors.age}
              />
            </div>
          </div>
          <Input
            title={"مؤسسه آموزشی "}
            className="h-12 w-full px-6 text-[17px] border-[1.5px] rounded-lg border-[1.5px]-opacity-50 outline-none focus:border-[1.5px]-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
            value={data.university}
            required
            onChange={(e) => updateFields({ university: e.target.value })}
            type={"text"}
            error={errors.university}
          />
          <Input
            title={"رشته تحصیلی"}
            className="h-12 w-full px-6 text-[17px] border-[1.5px] rounded-lg border-[1.5px]-opacity-50 outline-none focus:border-[1.5px]-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
            required
            value={data.major}
            onChange={(e) => updateFields({ major: e.target.value })}
            type={"text"}
            error={errors.major}
          />

          <div className="flex flex-row-reverse justify-between mb-3 ir-select">
            <div className="w-[48.5%]">
              <div
                className={`register-select ${
                  errors.province && " border-red-600 "
                }`}
              >
                <select
                  name="format"
                  id="format"
                  value={data.province}
                  className="input-select ir-province"
                  required
                  onChange={(e) => updateFields({ province: e.target.value })}
                >
                  <option value="" disabled selected>
                    استان
                  </option>
                  <option value="تهران">تهران</option>
                  <option value="گیلان">گیلان</option>
                  <option value="آذربایجان شرقی">آذربایجان شرقی</option>
                  <option value="خوزستان">خوزستان</option>
                  <option value="فارس">فارس</option>
                  <option value="اصفهان">اصفهان</option>
                  <option value="خراسان رضوی">خراسان رضوی</option>
                  <option value="قزوین">قزوین</option>
                  <option value="سمنان">سمنان</option>
                  <option value="قم">قم</option>
                  <option value="مرکزی">مرکزی</option>
                  <option value="زنجان">زنجان</option>
                  <option value="مازندران">مازندران</option>
                  <option value="گلستان">گلستان</option>
                  <option value="اردبیل">اردبیل</option>
                  <option value="آذربایجان غربی">آذربایجان غربی</option>
                  <option value="همدان">همدان</option>
                  <option value="کردستان">کردستان</option>
                  <option value="کرمانشاه">کرمانشاه</option>
                  <option value="لرستان">لرستان</option>
                  <option value="بوشهر">بوشهر</option>
                  <option value="کرمان">کرمان</option>
                  <option value="هرمزگان">هرمزگان</option>
                  <option value="چهارمحال و بختیاری">چهارمحال و بختیاری</option>
                  <option value="یزد">یزد</option>
                  <option value="سیستان و بلوچستان">سیستان و بلوچستان</option>
                  <option value="ایلام">ایلام</option>
                  <option value="کهگلویه و بویراحمد">کهگلویه و بویراحمد</option>
                  <option value="خراسان شمالی">خراسان شمالی</option>
                  <option value="خراسان جنوبی">خراسان جنوبی</option>
                  <option value="البرز">البرز</option>
                </select>
              </div>
              {errors.province ? (
                <div className="mt2 text-right mb-2 text-sm text-red-600">
                  {errors.province}
                </div>
              ) : null}
            </div>
            <div className="w-[48.5%]">
              <div
                className={`register-select   ${
                  errors.city && " border-red-600 "
                }`}
              >
                <select
                  name="format"
                  id="city"
                  className={`input-select`}
                  required
                  value={data.city}
                  disabled={data.province == ""}
                  onChange={(e) => updateFields({ city: e.target.value })}
                >
                  <option value="" disabled selected>
                    شهر
                  </option>
                  {cities
                    ?.filter((city) => city?.name === data.province)[0]
                    ?.cities?.map((c) => {
                      return <option value={c.name}>{c.name}</option>;
                    })}
                </select>
              </div>
              {errors.city ? (
                <div className="mt2 text-right mb-2 text-sm text-red-600">
                  {errors.city}
                </div>
              ) : null}
            </div>
          </div>
          <Input
            title={"ایمیل"}
            className="h-12 w-full px-6 text-[17px] border-[1.5px] rounded-lg border-[1.5px]-opacity-50 outline-none focus:border-[1.5px]-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
            required
            value={data.email}
            onChange={(e) => updateFields({ email: e.target.value })}
            type={"text"}
            error={errors.email}
          />
          <div className="flex flex-row-reverse justify-between mb-3">
            <div className="w-[48.5%]">
              <div
                className={`register-select ${
                  errors.t_shirt && " border-red-600 "
                }`}
              >
                <select
                  name="format"
                  id="format"
                  className="input-select"
                  required
                  value={data.t_shirt}
                  onChange={(e) => updateFields({ t_shirt: e.target.value })}
                >
                  <option value="" disabled selected>
                    سایز تی شرت
                  </option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="2XL">2XL</option>
                </select>
              </div>
              {errors.t_shirt ? (
                <div className=" text-right mb-2 text-sm text-red-600">
                  {errors.t_shirt}
                </div>
              ) : null}
            </div>
            <div className="w-[48.5%]">
              <div
                className={`register-select ${
                  errors.degree && " border-red-600"
                }`}
              >
                <select
                  name="format"
                  id="format"
                  className={`input-select  "}`}
                  required
                  value={data.degree}
                  onChange={(e) => updateFields({ degree: e.target.value })}
                >
                  <option value="" disabled selected>
                    مقطع تحصیلی
                  </option>
                  <option value="Bachelor">کارشناسی</option>
                  <option value="Master">کارشناسی ارشد</option>
                  <option value="PHD">دکترا</option>
                </select>
              </div>
              {errors.degree ? (
                <div className="mt- text-right mb-2 text-sm text-red-600">
                  {errors.degree}
                </div>
              ) : null}
            </div>
          </div>
          <div className="relative cursor-text h-[4.25rem] rounded-lg mb-5">
            <textarea
              type="text"
              placeholder="Input"
              className={`h-full mb-1.5 w-full px-6 text-[17px] border-[1.5px] rounded-lg  outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 resize-none pt-2 text-right ${
                errors.reason && "border-red-600"
              }`}
              value={data.reason}
              required
              onChange={(e) => updateFields({ reason: e.target.value })}
              error={errors.reason}
              id="textarea"
            />
            <label
              className="text-base text-slate-800 text-opacity-80  absolute right-5 top-3 px-1 transition duration-200 input-major cursor-text"
              htmlFor="textarea"
            >
              علت شرکت در مسابقه
            </label>
            {errors.reason ? (
              <div className="-mt-4 text-right text-sm text-red-600">
                {errors.reason}
              </div>
            ) : null}
          </div>
          <div className="rtl flex items-center mb-5"></div>

          <button
            className="flex border px-6 py-2 bg-blue-500 text-white rounded-lg ml-auto"
            onClick={handleInfoEdit}
          >
            تایید
          </button>
        </div>
      </div>
      {/* <div className="w-full border border-neutral-200 text-right p-4 rounded-md mb-10 bg-white">
        <h1 className="md:w-1/6 w-3/6 text-right ml-auto text-[17px] mb-10 relative after:block after:bg-blue-400 after:w-3/12 after:h-[.2rem] after:absolute after:-bottom-2 after:right-0">
          ایمیل
        </h1>
        <div className="w-full mx-auto">
          <Input
            title={"ایمیل"}
            className="h-12 w-full px-6 text-[17px] border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
          />
          <button className="flex border px-6 py-2 bg-blue-500 text-white rounded-lg ml-auto">
            ارسال کد
          </button>
        </div>
      </div> */}
      {/* <div className="w-full border border-neutral-200 text-right p-4 rounded-md bg-white mb-10">
        <h1 className="md:w-1/6 w-2/6 text-right ml-auto text-[17px] mb-10 relative after:block after:bg-blue-400 after:w-8/12 after:h-[.2rem] after:absolute after:-bottom-2 after:right-0">
          شماره موبایل
        </h1>
        <div className="w-full mx-auto">
          <Input
            title={"شماره موبایل"}
            className="h-12 w-full px-6 text-[17px] border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
          />
          <button className="flex border px-6 py-2 bg-blue-500 text-white rounded-lg ml-auto">
            ارسال کد
          </button>
        </div>
      </div> */}
      <div className="w-full border border-neutral-200 text-right p-4 rounded-md bg-white">
        <h1 className="md:w-1/6 w-[20%] text-right ml-auto text-[17px] mb-10 relative after:block after:bg-blue-400 after:w-8/12 after:h-[.2rem] after:absolute after:-bottom-2 after:right-0">
          رمز عبور
        </h1>
        <div className="w-full mx-auto">
          <Input
            title={"رمز فعلی "}
            className="h-12 w-full px-6 text-[17px] border-[1.5px] rounded-lg outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
            value={password.password}
            required
            onChange={(e) =>
              setPassword({ ...password, password: e.target.value })
            }
            type={"text"}
            error={errors.password}
          />
          <div className="flex flex-row-reverse justify-between">
            <div className="w-[48.5%]">
              <Input
                title={"رمز جدید"}
                className="h-12 w-full px-6 text-[17px] border-[1.5px] rounded-lg  outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
                value={password.newPassword}
                required
                onChange={(e) =>
                  setPassword({ ...password, newPassword: e.target.value })
                }
                type={"text"}
                error={errors.newPassword}
              />
            </div>
            <div className="w-[48.5%]">
              <Input
                title={"تکرار رمز جدید"}
                className="h-12 w-full px-6 text-[17px] border-[1.5px] rounded-lg 0 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
                value={password.confirmNewPassword}
                required
                onChange={(e) =>
                  setPassword({
                    ...password,
                    confirmNewPassword: e.target.value,
                  })
                }
                type={"text"}
                error={errors.confirmNewPassword}
              />
            </div>
          </div>
          <button
            className="flex border px-6 py-2 bg-blue-500 text-white rounded-lg ml-auto"
            onClick={handleChangePassword}
          >
            تایید
          </button>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
