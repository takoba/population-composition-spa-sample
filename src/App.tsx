import 'normalize.css'
import { useContext, useEffect, useState, JSX, Fragment } from 'react'
import PrefecturesPicker from './components/PrefecturesPicker.tsx'
import PickedPrefecturesContext, {
  Provider as PickedPrefecturesContextProvider
} from './context/PickedPrefecturesContext.tsx'
import prefecturesJson from './sample/api/v1/prefectures.json'
import { Prefecture } from '~/types/'

const PickedDisplay = (): JSX.Element => {
  const pickedContext = useContext(PickedPrefecturesContext)
  const [picked, setPicked] = useState<Set<Prefecture>>(new Set<Prefecture>([]))

  useEffect(() => {
    if (!pickedContext) {
      return
    }
    console.log('useEffect:', pickedContext.state.picked)
    setPicked(() => {
      console.log(pickedContext.state.picked)
      return pickedContext.state.picked
    })
  }, [pickedContext, pickedContext?.state.picked])

  return (
    <>
      {picked.forEach((pref) => (
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
    </>
  )

}

const App = () => {
  return (
    <>
      <div style={{width: '100%'}}>
        <h1>都道府県別の総人口推移グラフを表示するSPA</h1>

        <hr />

        <PickedPrefecturesContextProvider>
          <PrefecturesPicker prefectures={prefecturesJson.result} />
        </PickedPrefecturesContextProvider>
        <PickedDisplay />
      </div>
    </>
  )
}
export default App
