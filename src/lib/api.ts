const fetchSingle = async (url: string) => fetchResolver(url)
const fetchAll = async (urls: string[]) =>
  Promise.all(
    urls.map((url) => fetchResolver(url))
  )

const fetchResolver = (url: string) => fetch(new Request(url, { method: 'GET' }))

export {
  fetchSingle,
  fetchAll,
}
