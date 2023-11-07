<template>
    <div class="mx-auto max-w-7xl mt-5 min-h-[66vh]">
        <div class="pt-2 bg-gray-100 pb-7 rounded-lg">
            <h1 class="mb-5 text-2xl font-medium text-center "> Result for "{{ search }}"</h1>
            <SearchItem v-if="searchResults.length > 0" v-for="result in searchResults" :key="result.accession" :item="result" />
            <div v-else class="text-center text-gray-700">No results found</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import SearchItem from '@/components/SearchItem.vue';
import { data } from '@/utils/dummyData';
import type { SearchItemType } from '@/utils/dummyData';

export default defineComponent({
    name: 'SearchPage',
    components: {
        SearchItem,
    },
    setup() {
        const route = useRoute();
        const search = route.params.query as string;

        const searchResults = data.filter((item: SearchItemType) => {
            return item.title.toLowerCase().includes(search.toLowerCase());
        });

        return { search, searchResults };
    },
});
</script>
