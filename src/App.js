import React, { useState, useEffect } from 'react'

import { fetchAPIAndParseXML, theAPI } from './utils'

import Form from './components/Form'
import List from './components/List'
import Pagination from './components/Pagination'

import './App.css'

const ITEMS_PER_PAGE = 5

function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const result = await fetchAPIAndParseXML(theAPI)
      setLoading(false)

      const theListJSON = Array.from(result.getElementsByTagName('item')).map((item) => {
        const itemJSON = {
          title: item.getElementsByTagName('title')[0].textContent,
          description: item.getElementsByTagName('description')[0].textContent,
          pubDate: item.getElementsByTagName('pubDate')[0].textContent,
          link: item.getElementsByTagName('link')[0].textContent,
          creator: item.getElementsByTagName('dc:creator')[0].textContent,
          comments: item.getElementsByTagName('comments')[0].textContent,
          guid: item.getElementsByTagName('guid')[0].textContent,
        }

        return itemJSON
      })

      // todo: get these numbers from pagination
      setItems(theListJSON)
    })()
  }, [])

  return (
    <div className="app">
      <Form loading={loading} />

      {!loading && <List items={items.slice(0, ITEMS_PER_PAGE)} />}

      {loading && <div className="loading">Loading Content</div>}

      {!loading && <Pagination currentPage={1} pages={items.length / ITEMS_PER_PAGE} />}
    </div>
  )
}

export default App
