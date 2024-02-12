import type { SearchResultType, StateType, FilterType } from "../utils/types";

const applyFilter = (result: any, filter: FilterType) => {
  const filterValues = filter.options.filter((item) => item.checked).map((item) => item.value);
  if (filterValues.length === 0) return true;
  return filter.filterFunc(result, filterValues.map((item) => String(item)));
};

const filterResults = (state: StateType, filters: FilterType[]) => {
  if (!state.OriginalResults) return;

  let filteredResults = state.OriginalResults;
  for (const filter of filters) {
    filteredResults = filteredResults.filter((result) => applyFilter(result, filter));
  }

  state.fileredResults = filteredResults;
};

const setResults = (state: StateType, result: SearchResultType[]) => {
  state.OriginalResults = result;
  state.fileredResults = result;
};

const setFilters = (state: StateType, filters: FilterType[]) => {
  state.filters = filters;
};

export default { filterResults, setResults, setFilters };