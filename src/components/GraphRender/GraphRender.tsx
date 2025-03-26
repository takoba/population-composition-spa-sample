import { useState } from 'react';
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styles from './GraphRender.module.scss'
import { DataPoint, DataPointHasRate, PopulationCompositionPerYear, Prefecture } from '~/types';

type Data = [Prefecture, PopulationCompositionPerYear]
type IntegratedData = {
  label: string
  boundaryYear: PopulationCompositionPerYear['boundaryYear']
  data: {
    year: DataPoint['year'] | DataPointHasRate['year']
    [value: string]: DataPoint['value'] | DataPointHasRate['value'] | DataPointHasRate['rate']
  }[]
}

const isDataPointHasRate =
  (data: DataPoint | DataPointHasRate | undefined): data is DataPointHasRate =>
    data !== undefined && 'rate' in data


const integratedDataConverter = (dataList: Data[]) => {
  const res: IntegratedData[] = []
  dataList.forEach(([pref, data]) => {
    data.data.forEach(({ label, data: origin }) => {
      const target = res.find((datum) => datum.label === label)
      if (target === undefined) {
        res.push({
          label,
          boundaryYear: data.boundaryYear,
          data: origin.map(
            (datum) => (('rate' in datum)
              ? {
                year: datum.year,
                [`${pref.prefName}`]: datum.value,
                [`${pref.prefName}（割合）`]: datum.rate,
              }
              : {
                year: datum.year,
                [`${pref.prefName}`]: datum.value,
              })
          )
        })
        return
      }

      res[res.indexOf(target)] = {
        label: target.label,
        boundaryYear: target.boundaryYear,
        data: target.data.map((datum) => {
          const { year } = datum
          const source = origin.find((candidate) => candidate.year === year)
          if (source === undefined) {
            return datum
          }

          datum[`${pref.prefName}`] = source.value
          if (isDataPointHasRate(source)) {
            datum[`${pref.prefName}（割合）`] = source.rate
          }
          return datum
        })
      }
    })
  })

  return res
}


type Props = {
  dataList: Data[]
}
const GraphRender: React.FC<Props> = ({dataList}) => {
  const prefectures = dataList.map(([pref]) => pref)
  const integratedData = integratedDataConverter(dataList)
  const labels = integratedData.map((datum) => datum.label)

  const [data, ] = useState(integratedData.find(({label}) => label === labels[2])?.data)

  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={600}
          height={300}
          data={data}
        >
          <XAxis dataKey="year" />
          <YAxis yAxisId={1} type='number' width={80} />
          <YAxis
            yAxisId={2}
            type='number'
            tickFormatter={(value) => `${value.toFixed(2)}%`}
            domain={[0, 100]}
            width={80}
            orientation='right'

          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={prefectures[0].prefName}
            name={prefectures[0].prefName}
            stroke="#8884d8"
            yAxisId={1}
          />
          <Line
            type="monotone"
            dataKey={`${prefectures[0].prefName}（割合）`}
            name={`${prefectures[0].prefName}（割合）`}
            stroke="#8884d8"
            yAxisId={2}
          />

        </LineChart>
      </ResponsiveContainer>
      <pre style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(integratedData)}</pre>
    </div>
  )
}
export default GraphRender
