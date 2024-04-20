import * as Yup from "yup";

export const firstValidationSchema = Yup.object({
  firstName: Yup.string().required(" نام اجباری است "),
  lastName: Yup.string().required(" نام خانوادگی اجباری است"),
  fatherName: Yup.string().required("فیلد اجباری"),
  email: Yup.string().required(" ایمیل اجباری است").email("ایمیل نادرست"),
  phoneNumber: Yup.string()
    .length(11, " شماره موبایل باید ۱۱ رقم باشد ")
    .required("شماره موبایل اجباری است"),
  nationalId: Yup.string()
    .length(10, "کد ملی باید ۱۰ رقم باشد")
    .required("کد ملی اجباری است"),
  password: Yup.string()
    .required("رمز عبور اجباری است")
    .min(8, "رمز عبور باید ۸ کاراکتر باشد")
    .matches(/[0-9]/, "رمز عبور باید شامل حداقل یک عدد باشد")
    .matches(/[A-Z]/, "رمز عبور باید شامل حداقل یک حرف بزرک باشد")
    .matches(/[a-z]/, "رمز عبور باید شامل حداقل یک حرف کوچک باشد"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "تکرار رمز عبور باید با رمز عبور برابر باشد")
    .required("تکرار رمز عبور اجباری است"),
  gender: Yup.string().required("جنسیت اجباری است"),
  age: Yup.string().required("سن اجباری است"),
  verifyCode: Yup.string().required("کد ارسالی اجباری است"),
});
export const secondValidationSchema = Yup.object({
  university: Yup.string().required("موسسه اموزشی اجباری است"),
  degree: Yup.string().required("مقطع تحصیلی اجباری است"),
  postalcode: Yup.string().required("کد پستی اجباری است"),
  state: Yup.string().required("استان اجباری است"),
  city: Yup.string().required(" شهر اجباری است"),
  t_shirt: Yup.string().required("سایز تیشرت اجباری است"),
  major: Yup.string().required("رشته تحصیلی اجباری است"),
  term: Yup.boolean().oneOf([true], "موافقت با قوانین و مقررات اجباری است"),
  illness: Yup.boolean(),
  illnesText: Yup.string().when("illness", {
    is: true,
    then(schema) {
      return schema.required("توضیحات اجباری است");
    },
  }),
});

export const editInfoValidationSchema = Yup.object({
  first_name: Yup.string().required("First Name is Required"),
  last_name: Yup.string().required("Last Name is Required"),
  father_name: Yup.string().required("Last Name is Required"),
  national_id: Yup.string()
    .length(10, "National Id must be 10 digits")
    .required("NationalId is required"),
  gender: Yup.string().required(),
  age: Yup.string().required(),
  university: Yup.string().required(),
  degree: Yup.string().required(),
  // postalcode: Yup.string().required(),
  province: Yup.string().required(),
  city: Yup.string().required(),
  t_shirt: Yup.string().required(),
  email: Yup.string()
    .required("Email is Required")
    .email("Invalid email format"),
  major: Yup.string().required(),
  // reason: Yup.string().required(),/
  // illness: Yup.boolean(),
  // illnesText: Yup.string().when("illness", {
  //   is: true,
  //   then(schema) {
  //     return schema.required();
  //   },
  // }),
});
