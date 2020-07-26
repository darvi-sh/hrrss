import React, { useState, useEffect } from 'react'
import { Transition, CSSTransition } from 'react-transition-group'

import { fetchAPIAndParseXML } from './utils'

import Form from './components/Form'
import List from './components/List'
import Pagination from './components/Pagination'

import './App.css'

const ITEMS_PER_PAGE = 5

const fetchAPIAndParseXMLinJSON = async (query) => {
  const result = await fetchAPIAndParseXML(query)

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

  return theListJSON
}

function App() {
  const [query, setQuery] = useState('')
  const [items, setItems] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const onSubmit = (query) => {
    setQuery(query)
  }

  const onPageChange = (pageNr) => {
    setCurrentPage(pageNr)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      let theListJSON

      if (query.length > 0) {
        theListJSON = await fetchAPIAndParseXMLinJSON(query)
      } else {
        // we can avoid loading any default feed
        // and start the page with just a form
        const defaultFeedURL = 'https://hnrss.org/frontpage'
        theListJSON = await fetchAPIAndParseXMLinJSON(defaultFeedURL)
      }

      setItems(theListJSON)
      setLoading(false)
    })()
  }, [query])

  return (
    <div className="app">
      <Form onSubmit={onSubmit} loading={loading} />

      {!loading && (
        <Transition timeout={4000} in={true} appear>
          <List items={items.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)} />
        </Transition>
      )}

      {loading && <div className="loading">Loading Content</div>}

      {!loading && (
        <Pagination onPageChange={onPageChange} currentPage={currentPage} totalPages={items.length / ITEMS_PER_PAGE} />
      )}
    </div>
  )
}

export default App
