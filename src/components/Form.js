import React from 'react'

import './Form.css'

function Form(props) {
  function fetch() {
    console.log('hah we be fetchin')
  }

  return (
    <div className="input-wrapper">
      <input className="input" type="text" placeholder="Enter XML URL Feed" />
      <button className="submit" onClick={fetch} disabled={props.loading}>
        Fetch
      </button>
    </div>
  )
}

export default Form
