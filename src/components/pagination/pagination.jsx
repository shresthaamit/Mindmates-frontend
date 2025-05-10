import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxPages = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxPages - 1);

    if (end - start < maxPages - 1) {
      start = Math.max(1, end - maxPages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination">
      {/* Go to first */}
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)}>Prev</button>
      )}

      {/* First page and ellipsis */}
      {pageNumbers[0] > 1 && (
        <>
          <button onClick={() => onPageChange(1)}>1</button>
          {pageNumbers[0] > 2 && <span className="dots">...</span>}
        </>
      )}

      {/* Main pages */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={number === currentPage ? "active" : ""}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}

      {/* Ellipsis and last page */}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="dots">...</span>
          )}
          <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </>
      )}

      {/* Next page */}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
      )}
    </div>
  );
};

export default Pagination;
