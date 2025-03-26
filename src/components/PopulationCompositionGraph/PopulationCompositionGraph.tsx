
import randomColor from 'randomcolor'
import React, { JSX } from 'react'
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'
import { GraphData, Prefecture } from '~/types'


const colors = randomColor({ count: 47, luminosity: 'dark' })

type Props = {
  graphData: GraphData[]
  prefectures: Prefecture[]
}
const PopulationCompositionGraph: React.FC<Props> =
  ({ graphData, prefectures }): JSX.Element => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        width={600}
        height={300}
        data={graphData}
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

        {prefectures.map(({prefCode, prefName}, index) => (
          [
            <Line
              key={`${prefCode}-${prefName}-value`}
              type="monotone"
              dataKey={prefName.trim()}
              name={prefName}
              stroke={colors[index]}
              strokeWidth={2}
              yAxisId={1}
            />,
            graphData.length > 0 && `${prefName}（割合）` in graphData[0]
              && <Line
                key={`${prefCode}-${prefName}-rate`}
                type="monotone"
                dataKey={`${prefName.trim()}（割合）`}
                name={`${prefName}（割合）`}
                stroke={colors[index]}
                strokeDasharray='4 4'
                yAxisId={2}
              />,
          ]
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
export default PopulationCompositionGraph
