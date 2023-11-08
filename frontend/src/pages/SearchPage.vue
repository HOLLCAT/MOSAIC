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
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex'
import { type SearchItemType } from '@/utils/dummyData';
import SearchItem from '@/components/SearchItem.vue';
import SearchFilter from '@/components/SearchFilter.vue';

export default defineComponent({
    name: 'SearchPage',
    components: {
        SearchItem,
        SearchFilter,
    },
    setup() {
        const route = useRoute();
        const search = route.params.query as string;
        const store = useStore();
        const data = computed(() => store.state.fileredData);
        const searchResults = computed(() => getResults(data.value));

        const getResults = (data: SearchItemType[]) => {
            return data.filter((item: SearchItemType) => {
                return item.title.toLowerCase().includes(search.toLowerCase());
            });
        };
        
        return { search, searchResults };
    },
});
</script>