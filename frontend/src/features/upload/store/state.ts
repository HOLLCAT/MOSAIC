import type { UploadStateType } from "../utils/types";

const state = (): UploadStateType => ({
  studyDetails: {
    content: null,
    error: '',
  },
  samples: {
    content: null,
    loading: true,
    error: '',
  },
});
export default state;
