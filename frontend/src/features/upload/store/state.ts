import type { UploadStateType } from "../utils/types";
import { mockSample } from "../utils/mockSamples"

const state = (): UploadStateType => ({
  studyDetails: {
    content: null,
    error: '',
  },
  samples: {
    content: mockSample,
    loading: false,
    error: '',
  },
});
export default state;
