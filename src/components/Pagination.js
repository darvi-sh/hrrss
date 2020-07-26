import React from 'react'

import './Pagination.css'

export default function Pagination(props) {
  return (
    <div className="pagination">
      {[].concat(Array.from({ length: props.totalPages }, (e, i) => i)).map((page, index) => (
        <button onClick={() => props.onPageChange(page + 1)} disabled={props.currentPage === index + 1} key={page}>
          {page + 1}
        </button>
      ))}
    </div>
  )
}
