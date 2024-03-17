import type { SearchResultType, StateType } from '../utils/types';

const setStudies = (state: StateType, studies: SearchResultType[]) => {
    state.studies = studies;
};

const setPendingStudies = (state: StateType, studies: SearchResultType[]) => {
    state.pendingStudies = studies;
};

export default { setStudies, setPendingStudies };
