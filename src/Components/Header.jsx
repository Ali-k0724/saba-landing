import image from "../assets/Saba Contest 4 site timer banner.png";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import { Link } from "react-router-dom";

const Header = ({ width }) => {
  return (
    <div
      className="md:h-[100vh] h-[88vh] w-[95%] mx-auto flex md:flex-row flex-col mb-5 md:mb-0 items-center"
      id="home"
    >
      <div className="md:my-auto my-20 fadeInLeft md:w-1/2 w-full flex flex-col items-center relative">
        <img
          className=" h-96 md:mt-14 mt-10  md:scale-125"
          src={image}
          alt="header-logo"
        />
        <FlipClockCountdown
          to={new Date("2024/5/10")}
          labels={["روز", "ساعت", "دقیقه", "ثانیه"]}
          labelStyle={{
            fontSize: 15,
            fontWeight: 500,
            textTransform: "uppercase",
            color: "white",
          }}
          digitBlockStyle={
            width > 764
              ? {
                  width: 42,
                  height: 50,
                  fontSize: 25,
                  color: "black",
                  backgroundColor: "white",
                }
              : {
                  width: 32,
                  height: 43,
                  fontSize: 20,
                  color: "black",
                  backgroundColor: "white",
                }
          }
          showLabels
          separatorStyle={{ size: "0px", color: "red" }}
          dividerStyle={{ color: "rgb(156, 163, 175)" }}
          className="absolute md:-bottom-10 bottom-0"
        />
      </div>
      <div className="md:w-1/2 w-full font-semibold flex flex-col justify-center items-center fadeInRight text-center">
        <div className="md:w-[100%] text-black md:text-[36px] text-4xl text-center md:leading-[4.25rem] leading-[3.75rem] font-black yekan-semi mb-5 md:mb-0">
          چهارمین دوره مسابقات بین المللی برنامه نویسی صبا
        </div>
        <div className="rtl text-xl tracking-wide">
          ۲۰ اردیبهشت ۱۴۰۳ | دانشگاه شهید باهنر کرمان
        </div>
        <div className="flex md:flex-row flex-col-reverse items-center mb32">
          <Link to={"/info"}>
            <button className="mt-8 md:mt-14 border px-4 py-2.5 rounded-md border-red-500  bg-[#BE1E2F] text-white flex items-center justify-center hover:-translate-y-1 hover:shadow-lg hover:shadow-red-200 transition-all ">
              <span className="font-medium text-[17px]">اطلاعات بیشتر</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;

