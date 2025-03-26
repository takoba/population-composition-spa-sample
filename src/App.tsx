import 'normalize.css'
import { useAtomValue } from 'jotai'
import { JSX, useEffect, useState } from 'react'
import { getPopulationCompositionsByPrefectures, getPrefectures } from '~/api'
import { pickedPrefecturesAtom } from '~/atoms'
import { GraphRender } from '~/components/GraphRender'
import { PrefecturesPicker } from '~/components/PrefecturesPicker'
import { GraphRenderData, Prefecture } from '~/types'

const App = (): JSX.Element => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([])
  useEffect(() => {
    (async () => {
      const response = await getPrefectures()
      setPrefectures(response.result)
    })()
  }, [])

  const pickedPrefectures = useAtomValue(pickedPrefecturesAtom)
  const [dataList, setDataList] = useState<GraphRenderData[]>([])
  useEffect(() => {
    (async () => {
      const responses = await getPopulationCompositionsByPrefectures(Array.from(pickedPrefectures))
      setDataList(
        responses.map(
          ([prefCode, response]) => {
            const prefecture = prefectures.find((pref) => pref.prefCode === prefCode)
            if (prefecture === undefined) {
              throw new Error(
                `Unexpected Error: cannot find prefecture object. prefCode: ${prefCode}`
              )
            }
            return [prefecture, response.result]
          }
        )
      )

    })()
  }, [pickedPrefectures, prefectures])

  return (
    <>
      <div style={{width: '100%'}}>
        <h1>都道府県別の総人口推移グラフを表示するSPA</h1>

        <hr />

        <PrefecturesPicker prefectures={prefectures} />
        <GraphRender dataList={dataList} />
      </div>
    </>
  )
}
export default App
