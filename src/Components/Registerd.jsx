import { useEffect, useMemo, useState } from "react";
import Table from "./Table";
import { GoBookmark } from "react-icons/go";
import axios from "axios";
const Registerd = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:3000/table/data")
      .then(({ data }) => setData(data.data))
      .finally(() => setIsLoading(false));
  }, []);

  const columns = useMemo(
    () => [
      {
        id: "status",
        Header: () => <div className="yekan-semi text-black">وضعیت</div>,
        Cell: ({ row }) => (
          <div
            className={`${
              row.original.verified ? "bg-[#04afef] " : "bg-slate-500 "
            } h-full flex items-center justify-center text-white`}
          >
            {row.original.verified ? "تایید شده" : "تایید نشده"}
          </div>
        ),
        minWidth: 150,
      },
      {
        id: "university",
        Header: () => <div className="yekan-semi text-black">دانشگاه</div>,
        Cell: ({ row }) => (
          <div
            className={`py-0.5 mx-auto rounded-md 
            `}
          >
            {row.original.university}
          </div>
        ),
        minWidth: 490,
      },
      {
        id: "NAME",
        Header: () => (
          <div className="font-extrabold yekan-semi text-black">
            {" "}
            نام خانوادگی
          </div>
        ),
        Cell: ({ row }) => (
          <div className=" cursor-pointer">
            <div>{row.original.last_name}</div>
          </div>
        ),
        minWidth: 210,
      },
      {
        id: "Name",
        Header: () => (
          <div className="font-extrabold yekan-semi text-black">نام </div>
        ),
        Cell: ({ row }) => (
          <div className=" cursor-pointer">
            <div>{row.original.first_name}</div>
          </div>
        ),
        minWidth: 210,
      },
      {
        id: "Index",
        Header: () => (
          <div className="text-right mr-8 font-extrabold yekan-semi text-black">
            #
          </div>
        ),
        Cell: ({ row }) => (
          <div className="text-right mr-8 cursor-pointer">
            <div>{row.index + 1}</div>
          </div>
        ),
        minWidth: 50,
      },
    ],
    []
  );
  return (
    <>
      <div className="min-h-screen">
        <h1 className="text-2xl mt-32 mx-auto mb-16 text-center yekan-semi">
          اسامی شرکت کنندگان صبا ۴
        </h1>
        {data.length > 0 ? (
          <div className="w-10/12 mx-auto">
            {/* {!isLoading && ( */}
            <Table
              columns={columns}
              data={data}
              className={
                "bg-white w-full p2 border-[1.5] rounded-lg shadow-g overflow-auto"
              }
              //   paginate
            />
            {/* )} */}
          </div>
        ) : (
          <div className="rtl text-center text-lg">
            تا کنون کسی ثبت نام نکرده.
          </div>
        )}
      </div>
    </>
  );
};

export default Registerd;
