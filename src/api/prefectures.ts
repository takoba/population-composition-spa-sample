import { fetchSingle } from '~/lib/api'
import { PrefecturesAPIResponse } from '~/types'

const get = async () => {
  const response = await fetchSingle('/api/v1/prefectures')
  return JSON.parse(await response.text()) as PrefecturesAPIResponse
}

export {
  get,
}
