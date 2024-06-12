import { usePagination, useSortBy, useTable } from "react-table";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import ReactPaginate from "react-paginate";
import { BsArrowBarRight } from "react-icons/bs";
import { useEffect, useLayoutEffect } from "react";
const Table = ({ columns, data, className, paginate }) => {
  const table = useTable({ columns, data }, useSortBy, usePagination);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    pageOptions,
    canNextPage,
    nextPage,
    canPreviousPage,
    previousPage,
    setPageSize,
    gotoPage,
    rows,
  } = table;
  const { pageIndex } = state;
  useLayoutEffect(() => {
    setPageSize(15);
  }, []);
  const handlePageClick = (event) => {
    gotoPage(event.selected);
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div className={className}>
        <table className="w-full mx-auto " {...getTableProps()}>
          <thead className="thead py-5">
            {headerGroups.map((headerGroup) => (
              <tr className="tr py-3 " {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className="th text-center text-slate-500 text-[15px] font-medium py-3"
                    {...column.getHeaderProps({
                      style: {
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,
                        width: column.width,
                      },
                    })}
                  >
                    {column.render("Header")}
                    {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="tbody text-slate-700 " {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  className="table-row tr border-b last:border-none first:border-t"
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => (
                    <td
                      className="td table-d text-center pb h-[7vh] whitespace-nowrap"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {paginate && (
        <ReactPaginate
          breakLabel="..."
          previousLabel={<MdOutlineKeyboardArrowRight size={24} />}
          onPageChange={handlePageClick}
          pageCount={pageOptions.length}
          nextLabel={<MdOutlineKeyboardArrowLeft size={24} />}
          renderOnZeroPageCount={false}
          containerClassName={"pagination-container"}
          activeClassName={"active-page"}
          pageClassName={"page"}
          previousClassName={"page-next"}
          nextClassName={"page-prev"}
          forcePage={page.current}
        />
      )}
    </>
  );
};

export default Table;
