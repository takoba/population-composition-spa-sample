import 'normalize.css'
import { useAtomValue } from 'jotai'
import { JSX, Fragment } from 'react'
import PrefecturesPicker from './components/PrefecturesPicker.tsx'
import prefecturesJson from './sample/api/v1/prefectures.json'
import { pickedPrefecturesAtom } from '~/atoms'
import { Prefecture } from '~/types/'

const PickedDisplay = (): JSX.Element => {
  const picked = useAtomValue(pickedPrefecturesAtom)

  return (
    <div style={{backgroundColor:'#eee', minHeight: '100px'}}>
      {Array.from(picked).map((pref) => (
        <dl key={`${pref.prefCode}-${pref.prefName}`}>
          {Object.keys(pref).map((key) => (
            <Fragment key={`${pref.prefCode}-${pref.prefName}_${key}`}>
              <dt>{key}</dt>
              <dd><pre>
                {key in pref && pref[key as keyof Prefecture]}
              </pre></dd>
            </Fragment>
          ))}
        </dl>
      ))}
    </div>
  )

}

const App = () => {
  return (
    <>
      <div style={{width: '100%'}}>
        <h1>都道府県別の総人口推移グラフを表示するSPA</h1>

        <hr />

        <PrefecturesPicker prefectures={prefecturesJson.result} />
        <PickedDisplay />
      </div>
    </>
  )
}
export default App
