import { ref, watch } from "vue";
import type { FilterType } from "../utils/types";
import { useSearchStore } from "@/stores/searchStore";

export const useFilter = (props: { filters: FilterType[] }) => {
  const searchStore = useSearchStore();

  const filters = ref(props.filters);

  watch(
    () => filters.value,
    () => {
      searchStore.filters = filters.value;
    },
    { deep: true }
  );

  return filters;
};
