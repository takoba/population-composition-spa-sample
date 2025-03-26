import { DataPoint, DataPointHasRate } from '~/types';

const isDataPointHasRate =
  (data: DataPoint | DataPointHasRate | undefined): data is DataPointHasRate =>
    data !== undefined && 'rate' in data

export {
  isDataPointHasRate,
}
