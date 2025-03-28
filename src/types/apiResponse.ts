import PopulationCompositionPerYear from './populationCompositionPerYear'
import Prefecture from './prefecture'

type APIResponseBase<Result> = {
  message: string | null
  result: Result
}

type PopulationCompositionPerYearResponse = APIResponseBase<PopulationCompositionPerYear>
type PrefecturesAPIResponse = APIResponseBase<Prefecture[]>

export type {
  PopulationCompositionPerYearResponse,
  PrefecturesAPIResponse,
}
