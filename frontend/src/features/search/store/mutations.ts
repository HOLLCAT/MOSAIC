import { type StateType } from "../utils/types";

const filterResults = (state: StateType, yearsFilter: StateType["filters"][0]) => {
  state.fileredResults = state.OriginalResults.filter((result) => {
    const year = Number(result.releaseDate.split(" ")[2]);
    const yearFilter = yearsFilter.options.filter((item) => item.checked).map((item) => item.value);
    if (yearFilter.length === 0) return state.OriginalResults;
    else return yearFilter.includes(year);
  });
};

const setResults = (state: StateType, search: string) => {
  state.OriginalResults = state.OriginalResults.filter((result) => {
    return result.title.toLowerCase().includes(search.toLowerCase());
  });
  state.fileredResults = state.OriginalResults;
};

const setYearsFilter = (state: StateType, yearsFilter: StateType["filters"][0]) => {
  state.filters[0] = yearsFilter;
};
export default { filterResults, setYearsFilter, setResults };
