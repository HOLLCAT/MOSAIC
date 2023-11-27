import { type StateType } from '../utils/type';

const getStudy = (state: StateType) => state.study;

const getSamples = (state: StateType) => state.samples;

const getSamplesColumns = (state: StateType) => {
    if (state.samples && state.samples.length > 0) {
        return Object.keys(state.samples[0])
    }
}

const getSamplesRows = (state: StateType) => {
    return state.study?.samples.map(sample => {
        return Object.values(sample)
    })
}

export default { getStudy, getSamples, getSamplesColumns, getSamplesRows };