import { type StateType } from '../utils/type';

const getStudy = (state: StateType) => state.study;

const getSamples = (state: StateType) => {
    return state.samples?.map(sample => {
        const { file, ...rest } = sample;
        return rest;
    });
}


export default { getStudy, getSamples };