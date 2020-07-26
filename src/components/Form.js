import React, { useState } from 'react'

import './Form.css'

function Form(props) {
  const [query, setQuery] = useState('https://hnrss.org/newest')

  return (
    <form
      className="input-wrapper"
      onSubmit={(event) => {
        props.onSubmit(query)
        event.preventDefault()
      }}
    >
      <input
        className="input"
        onChange={(event) => setQuery(event.target.value)}
        type="text"
        value={query}
        placeholder="Enter XML URL Feed"
        pattern="(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)"
      />
      <button className="submit" disabled={props.loading}>
        Fetch
      </button>
    </form>
  )
}

export default Form
