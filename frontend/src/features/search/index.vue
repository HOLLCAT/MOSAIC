<template>
    <div class="mx-auto max-w-7xl mt-5 min-h-[66vh] flex">
        <SearchFilter v-if="searchResults.length" />
        <section class=" grow mt-4 pb-7 rounded-lg border rounded-s-none p-2">
            <div class="relative">
                <div class="relative flex justify-start">
                    <span class="pl-3 text-lg font-medium text-neutral-600"> Results for "{{ search }}"</span>
                </div>
            </div>
            <div v-if="searchResults.length > 0" class=" bg-white p-6 items-center justify-center overflow-hidden">
                <div class="space-y-8 lg:divide-y xl:divide-gray-300">
                    <SearchItem v-for="result in searchResults" :key="result.accession" :item="result" />
                </div>
            </div>
            <div v-else class="text-center text-gray-700">No results found</div>
        </section>
    </div>  
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import SearchItem from './components/SearchItem.vue';
import SearchFilter from './components/SearchFilter.vue';
import useSearchResults  from './composable/useSearchResults';

export default defineComponent({
    name: 'SearchPage',
    components: {
        SearchItem,
        SearchFilter,
    },
    setup() {
        const { search, searchResults } = useSearchResults();
        return { search, searchResults };
    },
});
</script>./composables/useSearchResults