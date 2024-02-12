import { filterFormat } from "../utils/filterFormat";
import type { FilterFuncType, SearchResultType } from './types'

export const createFilterFormat = (
    field: 'Tissue' | 'Organism',
    data: SearchResultType[],
    filterFunc: FilterFuncType
) => {
    return filterFormat(
        field,
        [...new Set(data.flatMap((item) => item.samples.map((sample) => sample[field])))],
        filterFunc
    );
};