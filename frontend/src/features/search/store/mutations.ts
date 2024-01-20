import type { SearchResultType, StateType, FilterType } from "../utils/types";

const filterResults = (state: StateType, yearsFilter: FilterType) => {
  if (!state.OriginalResults) return;

  state.fileredResults = state.OriginalResults.filter((result) => {
    const year = Number(result.created_date.split(" ")[2]);
    const yearFilter = yearsFilter.options.filter((item) => item.checked).map((item) => item.value);
    if (yearFilter.length === 0) return state.OriginalResults;
    else return yearFilter.includes(year);
  });
};

const setResults = (state: StateType, result: SearchResultType[]) => {
  state.OriginalResults = result;
  state.fileredResults = result;
};

const setYearsFilter = (state: StateType, yearsFilter: FilterType) => {
  if (state.filters) {
    state.filters[0] = yearsFilter;
  }
};

const setFilters = (state: StateType, filters: FilterType[]) => {
  state.filters = filters;
}

const setIsLoading = (state: StateType, loading: boolean) => {
  state.loading = loading;
}
export default { filterResults, setYearsFilter, setResults, setFilters, setIsLoading };
