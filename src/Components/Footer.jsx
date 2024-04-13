import { BsTelegram } from "react-icons/bs";
import logo1 from "../assets/Saba Logo Blue(Itself).png";
import logo2 from "../assets/Saba Logo Red(University).png";
import logo3 from "../assets/Saba Logo Yellow(CS Association).png";
import logo4 from "../assets/IMG_7339.png";
import ita from "../assets/ita.png";
import insta from "../assets/Instagram 2022 New.svg";
import { FaWhatsappSquare } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

import { AiOutlineMail } from "react-icons/ai";
const Footer = () => {
  return (
    <footer className="bg-[#E2E8F0] md:h-[32vh] h-[68vh] flex flex-col absolute w-full items-center justify-between text-center mt-auto overflow-hidden">
      <div className="w-11/12 flex md:flex-row flex-col-reverse flex-1">
        <div className="md:w-1/2 flex flex-col items-end justify-center md:h-full h-1/2 mx-auto w-full">
          <div className="text-[1.8em]">مسابقه صبا ۴</div>
          <div className="flex mt-5 w-full md:w-8/12 justify-between items-center">
            <a href="https://limoo.host/">
              <img src={logo4} alt="" className="w-28 h-28 mr-2 md:mr-6" />
            </a>
            <img src={logo1} alt="" className="w-20 h-20 mr-2 md:mr-6" />
            <img src={logo3} alt="" className="w-20 h-20 mr-2 md:mr-6" />
            <a href="https://uk.ac.ir/">
              <img src={logo2} alt="" className="w-20 h-20" />
            </a>
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col justify-center items-end text-[17px] mt-5 h-1/2 md:h-full">
          <div className=" flex flex-row-reverse items-center mb-6">
            <IoLocationOutline className="ml-2" size={25} />
            <p className="text-right">
              کرمان،بزرگراه امام خمینی ،میدان پژوهش دانشگاه شهید باهنر کرمان
            </p>
          </div>
          <div className="flex mt-5 item">
            <a href="https://t.me/saba_contest">
              <BsTelegram fill="#24A1DE" size={48} className="mr-4" />
            </a>
            <a href="https://eitaa.com/SabaContest">
              <img src={ita} alt="" className="h-12 w-12 mr-4" />
            </a>
            <a href="https://www.instagram.com/sabacontest.ir?igsh=MWRjM2thNWs3d3F2NA==">
              <img src={insta} alt="" className="h-12 w-12" />
            </a>
          </div>
        </div>
      </div>
      <div className="py-2 border-t border-slate-400 w-11/12">
        © انجمن علمی علوم کامپیوتر دانشگاه شهید باهنر کرمان
      </div>
    </footer>
  );
};

export default Footer;
