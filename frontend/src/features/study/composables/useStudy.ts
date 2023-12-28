import { computed } from "vue";
import { useStore } from "vuex";
import { type SearchItemType } from "@/utils/dummyDataNew";

export const useStudy = () => {
  const store = useStore();

  const study = computed(() => store.getters["study/getStudy"] as SearchItemType);

  return study;
};
