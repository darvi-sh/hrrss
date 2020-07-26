export const theAPI = 'http://localhost:8080/'

const fetchAPIAndParseXML = async (url) => {
  const fetchAPI = async (URL) => {
    const response = await fetch(`${theAPI}${URL}`, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    })
    return await response.text()
  }

  const parseXML = (xmlDOM) => {
    const parser = new DOMParser()
    return parser.parseFromString(xmlDOM, 'text/xml')
  }

  const fetchedAPI = await fetchAPI(url)

  return await parseXML(Array(fetchedAPI))
}

// this can only process hackernews RSS
export const fetchAPIAndParseXMLinJSON = async (query) => {
  const result = await fetchAPIAndParseXML(query)

  const getText = (item, name) => {
    return item.getElementsByTagName(name)[0].textContent
  }

  const theListJSON = Array.from(result.getElementsByTagName('item')).map((item) => {
    const itemJSON = {
      title: getText(item, 'title'),
      description: getText(item, 'description'),
      pubDate: getText(item, 'pubDate'),
      link: getText(item, 'link'),
      creator: getText(item, 'dc:creator'),
      comments: getText(item, 'comments'),
      guid: getText(item, 'guid'),
    }

    return itemJSON
  })

  return theListJSON
}
