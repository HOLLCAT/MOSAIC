import type { StateType } from "../utils/types";

const getResults = (state: StateType) => {
  return state.fileredResults;
};

const hasResults = (state: StateType) => {
  return state.OriginalResults.length > 0;
};

const getFilters = (state: StateType) => {
  return state.filters;
};
export default { getResults, getFilters, hasResults };
