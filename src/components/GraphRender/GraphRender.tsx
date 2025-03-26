import { useState } from 'react';
import PopulationCompositionGraph from '../PopulationCompositionGraph';
import styles from './GraphRender.module.scss'
import { GraphRenderData } from '~/types';
import { integratedGraphDataConverter } from '~/utils/converter';

type Props = {
  dataList: GraphRenderData[]
}
const GraphRender: React.FC<Props> = ({dataList}) => {
  const prefectures = dataList.map(([pref]) => pref)
  const integratedData = integratedGraphDataConverter(dataList)
  const labels = integratedData.map((datum) => datum.label)

  const [data, ] = useState(integratedData.find(({label}) => label === labels[2])?.data)

  return (
    <div className={styles.container}>
      { data
        && <PopulationCompositionGraph graphData={data} prefectures={prefectures} />
        || <p>表示できるデータがありません</p>
      }
      <pre style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(integratedData)}</pre>
    </div>
  )
}
export default GraphRender
