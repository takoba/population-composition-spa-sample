import 'normalize.css'
import PrefecturesPicker from './components/PrefecturesPicker'
import prefecturesJson from './sample/api/v1/prefectures.json'

const App = () => (
  <>
    <div style={{width: '100%'}}>
      <h1>都道府県別の総人口推移グラフを表示するSPA</h1>

      <hr />

      <PrefecturesPicker prefectures={prefecturesJson.result} />
    </div>
  </>
)
export default App
