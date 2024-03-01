import type { SearchResultType, StateType } from '../utils/types';

const setStudies = (state: StateType, studies: SearchResultType[]) => {
    state.studies = studies;
};

const setPendingStudies = (state: StateType, studies: SearchResultType[]) => {
    state.pendingStudies = studies;
};

const removePendingStudy = (state: StateType, accession_id: string) => {
    if (state.pendingStudies) {
        state.pendingStudies = state.pendingStudies.filter((study) => study.accession_id !== accession_id);
    }
}
export default { setStudies, setPendingStudies, removePendingStudy };
