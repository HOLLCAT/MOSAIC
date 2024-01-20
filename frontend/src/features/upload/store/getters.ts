import type { UploadStateType } from "../utils/types";

const getStudyDetails = (state: UploadStateType) => {
  return state.studyDetails;
};

const getStudySamples = (state: UploadStateType) => {
  return state.samples;
};

const getStudyMetadata = (state: UploadStateType) => {
  return {
    metadata: state.studyDetails.content?.metadata,
    file_type: state.studyDetails.content?.metadata_type,
  };
}

const getAllStudyData = (state: UploadStateType) => {
  return {
    title: state.studyDetails.content?.title,
    description: state.studyDetails.content?.description,
    authors: state.studyDetails.content?.authors,
  };
}

export default { getStudySamples, getStudyDetails, getStudyMetadata, getAllStudyData };
