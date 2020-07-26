import React from 'react'

import './List.css'

function List(props) {
  const items = props.items.map((item) => (
    <div className="item" key={item.guid}>
      <h1>
        {item.title}{' '}
        <small>
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            link
          </a>
        </small>
      </h1>
      <p dangerouslySetInnerHTML={{ __html: item.description }} />
      Published on: {item.pubDate} by {item.creator}
      <p>
        <a href={item.comments}>see comments</a>
      </p>
      {/* <br />
      guid: {item.guid} */}
    </div>
  ))
  return <div className="items">{items}</div>
}

export default List
