import React from "react";
import styles from '@/styles/Pagination.module.css'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const pagesToShow = 8;
  let indexOfLastPage = pagesToShow ;
  let indexOfFirstPage = indexOfLastPage - pagesToShow;
  if (currentPage>=pagesToShow && currentPage%pagesToShow===0){
    indexOfLastPage= pagesToShow * currentPage
    indexOfFirstPage=currentPage-1    
  }
  const visiblePageNumbers = pageNumbers.slice(
    indexOfFirstPage,
    indexOfLastPage
  );

  return (
    <div className={styles.navigation_container}>
      <button className={styles.navigation_button}
        id={styles.previous}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {visiblePageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={currentPage===page?styles.page_numbers+' '+styles.active:styles.page_numbers}
        >
          {page}
        </button>
      ))}
      <button className={styles.navigation_button}
        id={styles.next}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}