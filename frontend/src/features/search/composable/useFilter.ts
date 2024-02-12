import { useStore } from "vuex";
import { ref, watch } from "vue";
import type { FilterType } from "../utils/types";

export const useFilter = (props: { filters: FilterType[] }) => {
  const store = useStore();

  const filters = ref(props.filters);

  watch(
    () => filters.value,
    () => {
      store.commit("search/filterResults", filters.value);
    },
    { deep: true }
  );

  return filters;
};
