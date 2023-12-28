import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
import type { FilterType } from "../utils/types";
import type { SearchItemType } from "@/utils/dummyDataNew";

export default function useSearchResults() {
  const route = useRoute();
  const search = route.params.query as string;
  const store = useStore();
  store.commit("search/setResults", search);
  const searchResults = computed<SearchItemType[]>(() => store.getters["search/getResults"]);
  const hasResults = store.getters["search/hasResults"];
  const filters = computed(() => store.getters["search/getFilters"] as FilterType[]);

  return { searchResults, search, hasResults, filters };
}
