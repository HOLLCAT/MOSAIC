import { useRoute } from 'vue-router';
import { useStore } from 'vuex'
import { computed } from 'vue';

export default function useSearchResults() {
    const route = useRoute();
    const search = route.params.query as string;
    const store = useStore();

    const searchResults = computed(() => store.getters['search/getMatchedSearch'](search));

    return {
        searchResults,
        search,
    };
}