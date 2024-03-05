import { useStudyStore } from "@/stores/studyStore";
import { storeToRefs } from "pinia";

export const useStudy = () => {
  const studyStore = useStudyStore();
  const { study } = storeToRefs(studyStore);

  return study;
};
