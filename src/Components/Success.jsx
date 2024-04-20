import { IoMdCheckmark } from "react-icons/io";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="flex flex-col justify-evenly h-4/6">
      <div className="h-40 w-40 border-2 border-[#04afef] rounded-full flex items-center justify-center mx-auto">
        <IoMdCheckmark size={35} color="#04afef" />
      </div>
      <div className="text-lg mx-auto w-full text-center">ثبت نام موفق</div>
      <button className="mx-auto w-1/2 bg-[#04afef] text-white rounded-lg py-3">
        <Link to={"/"}>بازگشت به صفحه اصلی</Link>
      </button>
    </div>
  );
};

export default Success;
