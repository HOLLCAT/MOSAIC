import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, onBeforeMount, watchEffect } from "vue";
import type { FilterType, SearchResultType } from "../utils/types";


export const useSearchResults = () => {
  const route = useRoute();
  const search = route.params.query as string;
  const store = useStore();

  onBeforeMount(() => {
    const store = useStore();
    store.dispatch("search/getSearchResults", search);
  })

  const searchResults = computed<SearchResultType[]>(() => store.getters["search/getResults"]);
  const hasResults = computed(() => store.getters["search/hasResults"]);
  const filters = computed(() => store.getters["search/getFilters"] as FilterType[]);
  const loading = computed(() => searchResults.value !== null);

  return { searchResults, search, hasResults, filters, loading };
}

export default useSearchResults;