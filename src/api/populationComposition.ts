import { fetchAll } from '~/lib/api'
import { PopulationCompositionPerYearResponse, Prefecture } from '~/types'

const getByPrefectures = async (prefectures: Prefecture[]) => {
  const responses = await fetchAll(
    prefectures.map(
      ({ prefCode }) => `/api/v1/population/composition/perYear?prefCode=${prefCode}`
    )
  )
  return await Promise.all(
    responses.map(
      async (res) => {
        const prefCode = (new URL(res.url)).searchParams.get('prefCode')
        if (prefCode === null) {
          throw new Error('Unexpected Error: cannot resolve prefCode from url.')
        }
        return [
          Number(prefCode),
          JSON.parse(await res.text()),
        ]
      }
    )
  ) as [Prefecture['prefCode'], PopulationCompositionPerYearResponse][]
}

export {
  getByPrefectures,
}
