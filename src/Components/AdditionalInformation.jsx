import { useEffect, useState } from "react";
import Input from "../Input";
import cities from "../utils/cities";
import { FaCircleInfo } from "react-icons/fa6";
import { Link } from "react-router-dom";
const AdditionalInformation = ({
  university,
  updateFields,
  errors,
  degree,
  postalcode,
  state,
  city,
  t_shirt,
  major,
  reason,
  illness,
  illnesText,
  term,
  residence,
}) => {
  return (
    <>
      <div className="mb-6 text-center font-semibold text-[25px]">
        پیش ثبت نام
      </div>
      <Input
        title={"مؤسسه آموزشی "}
        className="h-12 w-full px-6 text-[17px] border-[1.5px] rounded-lg border-[1.5px]-opacity-50 outline-none focus:border-[1.5px]-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
        value={university}
        required
        onChange={(e) => updateFields({ university: e.target.value })}
        type={"text"}
        error={errors.university}
        tabindex="11"
      />
      <Input
        title={"رشته تحصیلی"}
        className="h-12 w-full px-6 text-[17px] border-[1.5px] rounded-lg border-[1.5px]-opacity-50 outline-none focus:border-[1.5px]-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
        required
        value={major}
        onChange={(e) => updateFields({ major: e.target.value })}
        type={"text"}
        error={errors.major}
        tabindex="12"
      />

      <div className="flex flex-row-reverse justify-between mb-1">
        <div className="w-[47%]">
          <div
            className={`register-select ${errors.state && " border-red-600 "}`}
          >
            <select
              name="format"
              id="format"
              value={state}
              className="input-select ir-province"
              required
              onChange={(e) => updateFields({ state: e.target.value })}
              tabindex="13"
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
          {errors.state ? (
            <div className="mt2 text-right mb-2 text-sm text-red-600">
              {errors.state}
            </div>
          ) : null}
        </div>
        <div className="w-[47%]">
          <div
            className={`register-select   ${errors.city && " border-red-600 "}`}
          >
            <select
              name="format"
              id="city"
              className={`input-select`}
              required
              value={city}
              disabled={state == ""}
              onChange={(e) => updateFields({ city: e.target.value })}
              tabindex="14"
            >
              <option value="" disabled selected>
                شهر
              </option>
              {cities
                ?.filter((city) => city?.name === state)[0]
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
        title={"کد پستی"}
        className="h-12 w-full px-6 text-[17px] border-[1.5px] rounded-lg border-[1.5px]-opacity-50 outline-none focus:border-[1.5px]-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
        required
        value={postalcode}
        onChange={(e) => updateFields({ postalcode: e.target.value })}
        type={"text"}
        error={errors.postalcode}
        tabindex="15"
      />
      <div className="flex flex-row-reverse justify-between mb-3">
        <div className="w-[47%]">
          <div
            className={`register-select ${
              errors.t_shirt && " border-red-600 "
            }`}
          >
            <select
              name="format"
              id="format"
              className="input-select"
              tabindex="16"
              required
              value={t_shirt}
              onChange={(e) => updateFields({ t_shirt: e.target.value })}
            >
              <option value="" disabled selected>
                سایز تی شرت
              </option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
              <option value="XXXL">XXXL</option>
            </select>
          </div>
          <a
            href="/src/assets/tsh.png"
            target="_blank"
            className="text-sm text-right mr-1 text-blue-400 flex flex-row justify-end mt-0.5 cursor-pointer hover:underline items-center"
          >
            <span>راهنمای سایزبندی</span>
            <FaCircleInfo className="ml-1" />
          </a>
          {errors.t_shirt ? (
            <div className=" text-right mb-2 text-sm text-red-600">
              {errors.t_shirt}
            </div>
          ) : null}
        </div>
        <div className="w-[47%]">
          <div
            className={`register-select ${errors.degree && " border-red-600"}`}
          >
            <select
              name="format"
              id="format"
              className={`input-select  "}`}
              required
              value={degree}
              onChange={(e) => updateFields({ degree: e.target.value })}
              tabindex="17"
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
          className={`h-full mb-1.5 w-full px-6 text-[17px] text-right border-[1.5px] rounded-lg  outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 resize-none pt-2 text-right ${
            errors.reason && "border-red-600"
          }`}
          value={reason}
          required
          onChange={(e) => updateFields({ reason: e.target.value })}
          error={errors.reason}
          id="textarea"
          tabindex="18"
        />
        <label
          className="text-base text-slate-800 text-opacity-80  absolute right-5 top-3 px-1 transition duration-200 input-field cursor-text"
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
      <div className="rtl flex items-center">
        <input
          type="checkbox"
          checked={residence}
          onChange={(e) => updateFields({ residence: !residence })}
          className="h-4 w-4 ml-3"
          tabindex="19"
        />
        <div className="rtl">
          درخواست اسکان(ویژه شرکت کننندگان خارج از استان)
        </div>
      </div>
      {residence === true && (
        <div className="rtl text-sm mb-2">
          در صورت فراهم شدن اسکان به شما اطلاع خواهیم داد.
        </div>
      )}
      <div className="rtl flex items-center">
        <input
          type="checkbox"
          checked={illness}
          onChange={(e) => updateFields({ illness: !illness })}
          className="h-4 w-4 ml-3"
          tabindex="20"
        />
        <label> دارای بیماری های خاص هستم.</label>
      </div>

      {illness && (
        <Input
          title={"توضیحات"}
          className="h-12 w-full px-6 text-[17px] border-[1.5px] rounded-lg border-[1.5px]-opacity-50 outline-none focus:border-[1.5px]-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
          required
          value={illnesText}
          onChange={(e) => updateFields({ illnesText: e.target.value })}
          type={"text"}
          error={errors.illnesText}
          tabindex="21"
        />
      )}
      <div className="rtl flex items-center">
        <input
          type="checkbox"
          className="h-4 w-4 ml-3"
          value={term}
          onChange={(e) => {
            updateFields({ term: !term });
            console.log(e.target.value)
          }}
          tabindex="22"
        />
        <label>
          تمامی
          <Link className="text-[#04afef]" to={"/rules"}>
            {" "}
            قوانین و مقررات{" "}
          </Link>
          را مطالعه کرده و موافق هستم.
        </label>
      </div>
      {errors.term ? (
        <div className="text-right mb-2 text-sm text-red-600">
          {errors.term}
        </div>
      ) : null}
    </>
  );
};

export default AdditionalInformation;
