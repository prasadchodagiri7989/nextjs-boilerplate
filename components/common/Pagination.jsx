"use client";
import React from "react";

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  if (totalPages <= 1) return null; // Hide pagination if only 1 page

  return (
    <ul className="tf-pagination-wrap tf-pagination-list tf-pagination-btn">
      {/* Previous Page */}
      <li className={currentPage === 1 ? "disabled" : ""}>
        <button
          className="pagination-link"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <span className="icon icon-arrow-left" />
        </button>
      </li>

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, index) => (
        <li key={index} className={currentPage === index + 1 ? "active" : ""}>
          <button className="pagination-link" onClick={() => onPageChange(index + 1)}>
            {index + 1}
          </button>
        </li>
      ))}

      {/* Next Page */}
      <li className={currentPage === totalPages ? "disabled" : ""}>
        <button
          className="pagination-link"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <span className="icon icon-arrow-right" />
        </button>
      </li>
    </ul>
  );
}
