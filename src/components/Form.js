import React from 'react'

function Form() {
  function fetch() {
    console.log('hah we be fetchin')
  }

  return (
    <div>
      <input type="text" placeholder="Type XML URL Feed" />
      <button onClick={fetch}>Fetch</button>
    </div>
  )
}

export default Form
