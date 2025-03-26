import 'normalize.css'
import { JSX } from 'react'
import populationCompositionPerYearPref1Json
  from './sample/api/v1/population/composition/perYear-prefCode-1.json'
import prefecturesJson from './sample/api/v1/prefectures.json'
import { GraphRender } from '~/components/GraphRender'
import { PrefecturesPicker } from '~/components/PrefecturesPicker'

const App = (): JSX.Element => {
  return (
    <>
      <div style={{width: '100%'}}>
        <h1>都道府県別の総人口推移グラフを表示するSPA</h1>

        <hr />

        <PrefecturesPicker prefectures={prefecturesJson.result} />
        <GraphRender dataList={[
          [{prefCode: 1, prefName: '北海道'}, populationCompositionPerYearPref1Json.result],
        ]} />
      </div>
    </>
  )
}
export default App
