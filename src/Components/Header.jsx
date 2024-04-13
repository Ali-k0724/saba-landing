import { Link } from "react-router-dom";
import image from "../assets/Asset 12@2x.png";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

const Header = () => {
  return (
    <div
      className="md:h-[100vh] h-[88vh] w-[95%] mx-auto flex md:flex-row flex-col mb-5 md:mb-0"
      id="home"
    >
      <div className="md:my-auto my-20 fadeInLeft md:w-1/2 w-full flex flex-col items-center relative">
        <img
          // className=" md:h-3/6 h-[37%] "
          className=" h-96 mt-10 w-72"
          src={image}
          alt=""
        />
        <FlipClockCountdown
          to={new Date("2024/4/20")}
          labels={["روز", "ساعت", "دقیقه", "ثانیه"]}
          labelStyle={{
            fontSize: 15,
            fontWeight: 500,
            textTransform: "uppercase",
            color: "white",
          }}
          digitBlockStyle={{
            width: 25,
            height: 30,
            fontSize: 17,
            color: "black",
            backgroundColor: "white",
          }}
          showLabels
          separatorStyle={{ size: "0px", color: "red" }}
          dividerStyle={{ color: "rgb(156, 163, 175)" }}
          className="absolute bottom-0"
        />
      </div>
      <div className="md:w-1/2 w-full font-semibold flex flex-col justify-center items-center fadeInRight ">
        <div className="md:w-[80%] text-black md:text-[36px] text-4xl text-center leading-[4.25rem] font-black yekan-semi">
          چهارمین دوره مسابقات برنامه نویسی صبا
        </div>
        <div className="rtl text-xl tracking-wide">
          ۲۰ اردیبهشت ۱۴۰۳ | دانشگاه باهنر کرمان
        </div>
        <div className="flex ">
          <Link to={"/info"}>
            <button className="mt-14 border px-4 py-2.5 rounded-md border-red-500  bg-[#BE1E2F] text-white flex items-center justify-center hover:-translate-y-1 hover:shadow-lg hover:shadow-red-200 transition-all ">
              <span className="font-medium text-[17px]">اطلاعات بیشتر</span>
            </button>
          </Link>
          {/* <Link to={"/register"}>
            <button className="mt-14 border px-8 py-2.5 rounded-md border-[#04afef] bg-[#04afef] text-white flex items-center justify-center hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-200 transition-all ml-4">
              <span className="font-medium text-[17px]">ثبت نام</span>
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
