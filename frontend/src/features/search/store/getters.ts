import type { StateType } from '../utils/types';

const getResults = (state: StateType) => {
    return state.fileredResults;
};

const hasResults = (state: StateType) => {
    if (state.OriginalResults !== null && state.OriginalResults.length !== 0) {
        return true;
    }
    return false;
};

const getFilters = (state: StateType) => {
    return state.filters;
};

const getSamples = (state: StateType) => {
    return state.filteredSamples;
};

export default { getResults, getFilters, hasResults, getSamples };
