import type { StateType } from "../utils/types";

const getResults = (state: StateType) => {
  return state.fileredResults;
};

const hasResults = (state: StateType) => {
  return state.OriginalResults !== null;
};

const getFilters = (state: StateType) => {
  return state.filters;
};

const isLoading = (state: StateType) => {
  return state.loading
}
export default { getResults, getFilters, hasResults, isLoading };
