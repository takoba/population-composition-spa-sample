import { isDataPointHasRate } from './typeGuard'
import { IntegratedGraphData, GraphRenderData } from '~/types'

const integratedGraphDataConverter =
  (dataList: GraphRenderData[]): IntegratedGraphData[] => {
    const res: IntegratedGraphData[] = []
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

export {
  integratedGraphDataConverter,
}
