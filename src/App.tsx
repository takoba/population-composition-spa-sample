import 'normalize.css'
import { JSX, useEffect, useState } from 'react'
import populationCompositionPerYearPref1Json
  from './sample/api/v1/population/composition/perYear-prefCode-1.json'
import populationCompositionPerYearPref2Json
  from './sample/api/v1/population/composition/perYear-prefCode-2.json'
import { Prefecture } from './types'
import { getPrefectures } from '~/api'
import { GraphRender } from '~/components/GraphRender'
import { PrefecturesPicker } from '~/components/PrefecturesPicker'

const App = (): JSX.Element => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([])

  useEffect(() => {
    (async () => {
      const response = await getPrefectures()
      setPrefectures(response.result)
    })()
  }, [])

  return (
    <>
      <div style={{width: '100%'}}>
        <h1>都道府県別の総人口推移グラフを表示するSPA</h1>

        <hr />

        <PrefecturesPicker prefectures={prefectures} />
        <GraphRender dataList={[
          [{prefCode: 1, prefName: '北海道'}, populationCompositionPerYearPref1Json.result],
          [{prefCode: 2, prefName: '青森県'}, populationCompositionPerYearPref2Json.result],
        ]} />
      </div>
    </>
  )
}
export default App
