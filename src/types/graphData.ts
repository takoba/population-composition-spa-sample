import PopulationCompositionPerYear, {
  DataPoint, DataPointHasRate
} from './populationCompositionPerYear'
import Prefecture from './prefecture';

type GraphData = {
  year: DataPoint['year'] | DataPointHasRate['year']
  [value: string]: DataPoint['value'] | DataPointHasRate['value'] | DataPointHasRate['rate']
}
type IntegratedGraphData = {
  label: string
  boundaryYear: PopulationCompositionPerYear['boundaryYear']
  data: GraphData[]
}

type GraphRenderData = [Prefecture, PopulationCompositionPerYear]

export type {
  GraphData,
  GraphRenderData,
  IntegratedGraphData,
}
