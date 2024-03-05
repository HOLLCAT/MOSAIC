import { useRoute } from 'vue-router';
import { computed, onBeforeMount } from 'vue';
import { useSearchStore } from '@/stores/searchStore';
import { storeToRefs } from 'pinia';


export const useSearchResults = () => {
    const route = useRoute();
    const search = computed(() => route.params.query as string);
    const searchStore = useSearchStore();
    const { filteredResults, hasResults, filters, filteredSamples } = storeToRefs(searchStore)

    onBeforeMount(() => {
        searchStore.fetchSearchedStudies(search.value);
    });
    const loading = computed(() => filteredResults !== null);

    return { filteredResults, search, hasResults, filters, loading, filteredSamples };
};

export default useSearchResults;
