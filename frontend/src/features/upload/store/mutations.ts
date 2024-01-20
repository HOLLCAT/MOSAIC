import type { UploadStateType, StudyDetails, Samples } from "../utils/types";


const setStudyDetails = (state: UploadStateType, payload: StudyDetails) => {
  state.studyDetails.content = payload;
}


const setIsLoading = (state: UploadStateType, payload: boolean) => {
  state.samples.loading = payload;
}

const setStudySamples = (state: UploadStateType, payload: Samples[]) => {
  state.samples.content = payload;
}
export default { setStudyDetails, setIsLoading, setStudySamples };