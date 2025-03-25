type DataPoint = {
  year: number
  value: number
}
type DataPointHasRate = DataPoint & {
  rate: number
}

type PopulationCompositionPerYear = {
  boundaryYear: number
  data: {
    label: string
    data: DataPoint[] | DataPointHasRate[]
  }[]
}
export default PopulationCompositionPerYear
export type {
  DataPoint,
  DataPointHasRate
}
