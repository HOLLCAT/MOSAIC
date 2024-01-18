import type { UploadStateType } from "../utils/types";

const getStudyDetails = (state: UploadStateType) => {
  return state.studyDetails;
};

const getStudySamples = (state: UploadStateType) => {
  return state.samples;
};


export default { getStudySamples, getStudyDetails };
