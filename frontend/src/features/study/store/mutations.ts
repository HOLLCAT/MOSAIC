import { type StateType} from "../utils/type";

const setStudy = (state: StateType, study: StateType["study"]) => {  
    state.study = study;
}

const setSamples = (state: StateType, samples: StateType["samples"]) => {
    state.samples = samples;
}

export default { setStudy, setSamples };