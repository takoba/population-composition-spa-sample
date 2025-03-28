import {
  PopulationCompositionPerYearResponse,
  PrefecturesAPIResponse,
} from './apiResponse'
import { GraphData, GraphRenderData, IntegratedGraphData } from './graphData'
import PopulationCompositionPerYear, {
  DataPoint,
  DataPointHasRate,
} from './populationCompositionPerYear'
import Prefecture from './prefecture'

export type {
  DataPoint,
  DataPointHasRate,
  GraphData,
  GraphRenderData,
  IntegratedGraphData,
  Prefecture,
  PrefecturesAPIResponse,
  PopulationCompositionPerYear,
  PopulationCompositionPerYearResponse,
}
