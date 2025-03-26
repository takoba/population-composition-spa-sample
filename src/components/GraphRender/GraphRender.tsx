import { useEffect, useState } from 'react';
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

  const [selectedLabel, setSelectedLabel] = useState(labels[0])
  const [data, setData] = useState(integratedData.find(({label}) => label === selectedLabel)?.data)

  useEffect(() => {
    setData(integratedData.find(({label}) => label === selectedLabel)?.data)
  }, [selectedLabel, integratedData])

  return (
    <div className={styles.container}>
      <div className={styles.tab}>
        {labels.map((label) => (
          <button
            key={label}
            onClick={() => setSelectedLabel(label)}
            className={`${styles.tabButton} ${selectedLabel === label ? styles.selected : ''}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className={styles.graph}>
        { data
          && <PopulationCompositionGraph graphData={data} prefectures={prefectures} />
          || <p>表示できるデータがありません</p>
        }
      </div>
    </div>
  )
}
export default GraphRender
