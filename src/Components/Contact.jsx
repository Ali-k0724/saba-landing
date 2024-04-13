import { useState } from "react";
import Input from "../Input";
import useComponentVisible from "../hooks/useComponentVisible";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const Contact = () => {
  const { ref, isVisable } = useComponentVisible();
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    about: "",
    text: "",
  });
  const updateFields = (fields) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };
  const validationSchema = Yup.object({
    name: Yup.string().required(".نام و نام خانوداگی اجباری است"),

    email: Yup.string().required(".ایمیل اجباری است").email("ایمیل نا معتبر"),
    phoneNumber: Yup.string()
      .matches(/^\d{11}$/, ".شماره موبایل باید ۱۰ رقم باشد")
      .required(".شماره تماس اجباری است"),
    about: Yup.string().required("فیلد اجباری"),
    text: Yup.string().max(150, "بیشتر از ۱۵۰ کارکتر").required("فیلد اجباری"),
  });

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(data, { abortEarly: false }).then(() => {
        setErrors({});
        Email.send({
          Host: "smtp.elasticemail.com",
          Username: "karimiali2332@gmail.com",
          Password: "B5129791AC31AD222D0CA79BD5387D15E155",
          To: "karimiali2332@gmail.com",
          From: "karimiali2332@gmail.com",
          Subject: data.about,
          Body: `نام و نام خانوادگی :${data.name}<br> ایمیل :${data.email}<br> شماره تماس:${data.phoneNumber}<br> پیام :${data.text}`,
        }).then((message) => {
          if (message == "OK") {
            toast.success(".پیام شما با موفقیت ارسال شد", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              className: "text-right rtl",
            });
            setData({
              name: "",
              phoneNumber: "",
              email: "",
              about: "",
              text: "",
            });
          } else {
            toast.error(message, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        });
      });
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };
  return (
    <div className="w-full mb-20 mx-auto pt-24" id="contact" ref={ref}>
      <h1 className="text-center my-10 font-semibold text-3xl">تماس با ما</h1>
      <div className="flex md:flex-row flex-col-reverse justify-between w-10/12 mx-auto">
        <form
          noValidate
          onSubmit={handelSubmit}
          className={`md:w-[50%] text-right new-event ${
            isVisable ? "fadeInLeft" : null
          }`}
        >
          <div className="flex justify-between">
            <div className="w-[47%]">
              <Input
                title={"شماره تماس"}
                className="h-14 w-full px-6 text-lg border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
                value={data.phoneNumber}
                required
                onChange={(e) => updateFields({ phoneNumber: e.target.value })}
                type={"text"}
                error={errors.phoneNumber}
              />
            </div>
            <div className="w-[47%]">
              <Input
                title={"نام و نام خانوادگی"}
                className="h-14 w-full px-6 text-lg border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
                value={data.name}
                required
                onChange={(e) => updateFields({ name: e.target.value })}
                type={"text"}
                error={errors.name}
              />
            </div>
          </div>
          <Input
            title={"موضوع"}
            className="h-14 w-full px-6 text-lg border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
            value={data.about}
            required
            onChange={(e) => updateFields({ about: e.target.value })}
            type={"text"}
            error={errors.about}
          />
          <Input
            title={"ایمیل"}
            className="h-14 w-full px-6 text-lg border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 text-right"
            value={data.email}
            required
            onChange={(e) => updateFields({ email: e.target.value })}
            type={"text"}
            error={errors.email}
          />
          <div className="relative cursor-text h-40 rounded-lg mb-6">
            <textarea
              type="text"
              placeholder="Input"
              className={`h-full mb-8 w-full px-6 text-lg border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 resize-none pt-2 text-right ${
                errors.text && "border-red-600"
              }`}
              value={data.text}
              required
              onChange={(e) => updateFields({ text: e.target.value })}
              error={errors.text}
              id="textarea"
            />
            <label
              className="text-base text-slate-800 text-opacity-80  absolute right-5 top-3 px-1 transition duration-200 input-field cursor-text"
              htmlFor="textarea"
            >
              متن پیام
            </label>
          </div>
          {errors.text ? (
            <div className="-mt-4 text-right mb-2 text-sm text-red-600">
              {errors.text}
            </div>
          ) : null}
          <button
            className="flex border px-6 py-3 bg-blue-500 text-white rounded-lg"
            type="submit"
          >
            ارسال پیام
          </button>
        </form>
        <div
          className={`md:w-[45%] md:mb-0 mb-5 text-right text-xl text-slate-800 new-event ${
            isVisable ? "fadeInRight" : null
          }`}
        >
          <div className="mb-4 rtl">
            کرمان،بزرگراه امام خمینی ،میدان پژوهش دانشگاه شهید باهنر
            کرمان،دانشکده ریاضی و کامپیوتر
          </div>
          {/* <div className="mb-4">saba@test.com</div>
          <div className="mb-4">۰۹۱۳۵۶۹۸۷۱۹</div>
          <div className="mb-4">۰۹۱۳۵۶۹۸۷۱۹</div> */}
        </div>
      </div>
    </div>
  );
};

export default Contact;
