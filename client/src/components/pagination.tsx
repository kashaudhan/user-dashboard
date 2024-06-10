import { useState } from "react";

type Pagination = {
  totalRows: number;
  rowsPerPage: number;
};

const Pagination = ({ totalRows, rowsPerPage }: Pagination) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <button
        className="flex items-center gap-2 px-3.5 py-2 bg-white rounded-lg border border-gray-300 shadow-sm"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <div className="flex gap-0.5">
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              className="px-4 py-2.5 rounded-lg"
              onClick={() => handlePageClick(page)}
              disabled={currentPage === page}
            >
              {page}
            </button>
          );
        })}
      </div>
      <button
        className="flex items-center gap-2 px-3.5 py-2 bg-white rounded-lg border border-gray-300 shadow-sm"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </>
  );
};

export default Pagination;
