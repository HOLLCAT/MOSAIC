import { computed } from "vue";
import { useStore } from "vuex";
import type { StudyType } from "../utils/type";

export const useStudy = () => {
  const store = useStore();

  const study = computed(() => store.getters["study/getStudy"] as StudyType);

  return study;
};
