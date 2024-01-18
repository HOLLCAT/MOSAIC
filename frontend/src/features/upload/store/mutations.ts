import type { UploadStateType, StudyDetails, Samples } from "../utils/types";


const setStudyDetails = (state: UploadStateType, payload: StudyDetails) => {
  state.studyDetails.content = payload;
}

const setStudySamples = (state: UploadStateType, payload: Samples[]) => {
  state.samples.content = payload;
  console.log(state);
}

export default { setStudyDetails, setStudySamples };