import React from 'react'

export default function Pagination(props) {
  return (
    <div>
      {props.pages} <br />
      {[].concat(Array.from({ length: props.pages }, (e, i) => i)).map((page) => (
        <button key={page}>{page + 1}</button>
      ))}
    </div>
  )
}
