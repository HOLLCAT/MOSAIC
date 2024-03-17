import type { StateType } from '../utils/types';

const getStudies = (state: StateType) => {
    return state.studies;
};

const getPendingStudies = (state: StateType) => {
    return state.pendingStudies;
};

const hasResults = (state: StateType) => {
    return state.studies !== null;
};

export default { getStudies, getPendingStudies, hasResults };
