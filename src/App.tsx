import PrefecturesJsonTest from './components/PrefecturesJsonTest'
import Toggle from './components/Toggle'
import prefecturesJson from './sample/api/v1/prefectures.json'

const App = () => (
  <>
    <h1>都道府県別の総人口推移グラフを表示するSPA</h1>

    <hr />

    <Toggle>
      <PrefecturesJsonTest prefectures={prefecturesJson} />
    </Toggle>
  </>
)
export default App
