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

const isSamplesUploaded = (state: StateType) => (id: string) => {
    if (!state.pendingStudies) return null;
    const study = state.pendingStudies.find(study => study.accession_id === id);
    if (!study) return null;
    return study.samples.every(sample => sample.File == true);
};

export default { getStudies, getPendingStudies, hasResults, isSamplesUploaded };
