import { useEffect, useRef, useState } from "react";
import "../App.css";
import svg1 from "../assets/Asset 13.png";
import svg2 from "../assets/Asset 15.png";
import svg3 from "../assets/Asset 19@2x.png";
import image from "../assets/Saba contest 4 main poster (Landescape).png";
import mobileimage from "../assets/Saba Contest 4 main poster (1).png";

import Event from "./Event";
const History = ({ width }) => {
  const ref = useRef(null);
  const [isVisable, setIsVisable] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsVisable(true);
      }
    });
    observer.observe(ref.current);
  }, []);

  return (
    <>
      <div className="w-10/12 mx-auto pt-24" id="history">
        <div className="font-semibold text-3xl text-center mb-16">تاریخچه</div>
        <div className="flex flex-row-reverse">
          <div className="w-1 bg-slate-300 ml-6"></div>
          <div className="">
            <Event
              title={"دوره اول"}
              image={svg1}
              text={
                "با تلاش‌ها و پیگیری‌های آقای بنیامین مظهری‌صفات دانشجوی رشته علوم کامپیوتر دانشگاه شهید باهنر کرمان برای اولین بار مسابقات برنامه نویسی صبا در اسفند ماه 1396 برگزار گردید. هدف ایشان از برگزاری این بود که مسابقات صبا یکی از مسابقات آمادگی رسمی برای مسابقات غرب آسیا سایت تهران باشد."
              }
            />
            <Event
              title={"دوره دوم"}
              image={svg2}
              text={
                "خوشبختانه علاقه دانشجویان و پیگیری اساتید و نیاز به چنین رقابت‌هایی باعث شد تا دوره دوم از مسابقات در 30 فروردین ماه 1397 برگزار گردد. در این سال حامی مسابقات شرکت ملّی صنایع مس ایران و سامانه حمل و نقل هوشمند اسنپ بودند. در این دوره تیم انجمن علوم کامپوتر با تلاش‌های فراوان باعث شدند شاهد یکی از بهترین مسابقات در کشور باشیم."
              }
            />
            <Event
              title={"دوره سوم"}
              image={svg3}
              text={
                "گروه برنامه‌نویسی و مسابقات ACM انجمن علمی علوم کامپیوتر شهید باهنر کرمان، دوره سوم مسابقات را در 28 فروردین ماه 1398 برگزار کردند. در این دوره فرخوان برای تمامی مدارس و دانشگاه‌های کشور ارسال شد که در نهایت شاهد حضور افراد از دانشگاه‌های سراسر کشور بودیم. در این دوره مسابقات به صورت آنلاین برگزار شده بود که باعث شد افرادی از خارج از کشور در این مسابقات شرکت کنند."
              }
            />
          </div>
        </div>
        <div className="h-[25vh] relative  flex items-center ml-auto ">
          <div
            className="h-[0.7px] relative right-[30px] w-[33%] border-b-[1px] border-slate-300 ml-auto after:block after:w-1/3 after:-z-40 after:absolute after:-right-[30px]
           after:bottom-0 after:border-b-[.5px] after:border-r-[1.5px] after:border-slate-300 after:h-[12.5vh] after:rounded-br-[30px] before:h-[15vh] before:rounded-tl-[30px]
           before:block before:w-1/2 before:absolute before:-left-[20%] md:before:-left-[40%] before:top-0 before:border-t-[1px] before:border-l-[1px] before:border-slate-300"
          ></div>
        </div>
        <div
          className={`mt-8 md:w-9/12 items-center flex flex-col mx-auto mb-20 new-event ${
            isVisable ? "fadeInDown" : null
          }`}
          ref={ref}
        >
          <h4 className="mx-auto text-center font-semibold text-4xl mb-8">
            دوره چهارم
          </h4>
          <p className="text-right leading-9 text-lg rtl">
            دوره چهارم مسابقات به همت دانشجویان و پشتیبانی دانشکده ریاضی و
            کامپیوتر و معاونت امور فرهنگی دانشگاه شهید باهنر کرمان، بعد از غیبتی
            طولانی در 20 اردیبهشت ماه 1403 برگزار خواهد شد. انجمن علمی علوم
            کامپیوتر دانشگاه شهید باهنر کرمان با حمایت و راهنمایی‌های آقای
            بنیامین مظهری صفات و آقای محمد رنجبر مسئول محترم شرکت آتما توانستند
            شرایط استاندارد برای برگزاری مسابقات را فراهم کنند که این مسابقه
            همچون قبل آبرومندانه در کرمان برگزار گردد.
          </p>
          <img
            src={width > 768 ? image : mobileimage}
            className="rounded mt-5 w-[100vw]"
          />
        </div>
      </div>
    </>
  );
};

export default History;
