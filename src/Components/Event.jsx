import useComponentVisible from "../hooks/useComponentVisible";

const Event = ({ title, image, text }) => {
  const { ref, isVisable } = useComponentVisible();
  return (
    <div ref={ref}>
      <h4 className="mr-auto text-right font-semibold mb-5 text-3xl relative mt-6">
        <span className="mr-4">{title}</span>
        <div
          className="after:block after:h-[1px] after:top-1/2 after:-translate-y-1/2 
                   after:absolute after:-right-2.5 after:w-4 after:bg-[#B7C9CC] before:block before:w-5
                    before:h-5 before:border before:pt-2 before:bg-white before:border-[#B7C9CC] before:absolute before:rounded-full before:-right-[2.125rem] before:top-1/2 before:-translate-y-1/2"
        ></div>
      </h4>
      <div className="flex md:flex-row-reverse flex-col-reverse justify-between items-center mb-10 ">
        <div className={`md:w-[45%] event ${isVisable ? "fadeInRight" : null}`}>
          <div className="text-right leading-9 text-lg rtl">{text}</div>
        </div>
        <div
          className={`md:w-[45%] max-h-[50vh] event ${
            isVisable ? "fadeInLeft" : null
          }`}
        >
          <img src={image} alt="" className="object-contain h-96 w-f96" />
        </div>
      </div>
    </div>
  );
};

export default Event;
