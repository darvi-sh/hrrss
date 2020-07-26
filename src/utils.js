export const theAPI = 'http://localhost:8080/'

export const fetchAPIAndParseXML = async (url) => {
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
