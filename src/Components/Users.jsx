import { useMemo } from "react";
import Table from "./Table";

const Users = () => {
  const data = [
    {
      firstName: "محمد",
      lastName: "ابطحی",
      university: "09131431243",
      status: "0",
    },
    {
      firstName: "محمد",
      lastName: "ابطحی",
      university: "09131431243",
      status: "0",
    },
    {
      firstName: "محمد",
      lastName: "ابطحی",
      university: "09131431243",
      status: "0",
    },
    {
      firstName: "محمد",
      lastName: "ابطحی",
      university: "09131431243",
      status: "0",
    },
    {
      firstName: "محمد",
      lastName: "ابطحی",
      university: "09131431243",
      status: "0",
    },
    {
      firstName: "محمد",
      lastName: "ابطحی",
      university: "09131431243",
      status: "0",
    },
    {
      firstName: "محمد",
      lastName: "ابطحی",
      university: "09131431243",
      status: "0",
    },
    {
      firstName: "محمد",
      lastName: "ابطحی",
      university: "09131431243",
      status: "0",
    },
  ];
  const columns = useMemo(
    () => [
      {
        id: "status",
        Header: () => <div className="yekan-semi text-black"></div>,
        Cell: ({ row }) => (
          <div className=" h-full flex items-center justify-center cursor-pointer">
            مشاهده
          </div>
        ),
        minWidth: 100,
      },
      {
        id: "uni",
        Header: () => (
          <div className="yekan-semi text-black ml-10">شماره تماس</div>
        ),
        Cell: ({ row }) => (
          <div
            className={`py-0.5 mx-auto rounded-md ml-10
            `}
          >
            {row.original.university}
          </div>
        ),
        minWidth: 200,
      },
      {
        id: "NAME",
        Header: () => (
          <div className="font-extrabold yekan-semi text-black ml-20">
            نام خانوادگی
          </div>
        ),
        Cell: ({ row }) => (
          <div className="ml-20">
            <div>{row.original.lastName}</div>
          </div>
        ),
        minWidth: 150,
      },
      {
        id: "Name",
        Header: () => (
          <div className="font-extrabold yekan-semi text-black ml-20">نام </div>
        ),
        Cell: ({ row }) => (
          <div className="ml-20">
            <div>{row.original.firstName}</div>
          </div>
        ),
        minWidth: 150,
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
        minWidth: 10,
      },
    ],
    []
  );
  return (
    <>
      <div className="w-full mx-auto">
        <Table
          columns={columns}
          data={data}
          className={
            "bg-white w-full p2 border-[1.5] rounded-lg shadow-g overflow-auto"
          }
          //   paginate
        />
      </div>
    </>
  );
};

export default Users;
