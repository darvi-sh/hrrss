import React, { useState, useEffect } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import { fetchAPIAndParseXMLinJSON } from './utils'

import Form from './components/Form'
import List from './components/List'
import Pagination from './components/Pagination'

import './App.css'

const ITEMS_PER_PAGE = 5

function App() {
  const [query, setQuery] = useState('')
  const [items, setItems] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [slideDirection, setSlideDirection] = useState('slide-drop')
  const [loading, setLoading] = useState(false)

  const onSubmit = (query) => {
    setQuery(query)
  }

  const onPageChange = (pageNr) => {
    setLoading(true)
    setCurrentPage((prevPageNr) => {
      if (prevPageNr > pageNr) {
        console.log('slide-forward')
        setSlideDirection('slide-forward')
      } else {
        console.log('slide-backward')
        setSlideDirection('slide-backward')
      }

      return pageNr
    })
    window.scrollTo(0, 0)
    setLoading(false)
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
      setCurrentPage(1)
      setSlideDirection('slide-drop')
      setLoading(false)
    })()
  }, [query])

  return (
    <div className="app">
      <Form onSubmit={onSubmit} loading={loading} />
      <br />
      classNames: {slideDirection}
      <br />
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={`${query}-${currentPage}`}
          in={true}
          timeout={1300}
          classNames={slideDirection}
          unmountOnExit
        >
          <List items={items.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)} />
        </CSSTransition>
      </SwitchTransition>
      {loading && <div className="loading">Loading Content</div>}
      {!loading && items.length === 0 && <div>There is nothing to show here. Try entering a valid URL.</div>}
      {!loading && (
        <Pagination onPageChange={onPageChange} currentPage={currentPage} totalPages={items.length / ITEMS_PER_PAGE} />
      )}
    </div>
  )
}

export default App
