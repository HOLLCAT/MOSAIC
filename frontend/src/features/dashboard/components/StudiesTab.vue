<template>
    <div class="text-purple container mx-auto mt-4 mb-10 p-4 shadow-lg bg-white rounded-xl">
        <div class="flex border-b p-2">
            <h1 class="font-bold text-lg mt-2">Published Studies<span class="text-gray-500 text-1xl ml-1">({{
                filteredStudies ? filteredStudies.length : 0 }})</span></h1>
            <div class="flex-grow flex justify-center">
                <SearchBar @search-value="handleSearchValue" />
            </div>
        </div>

        <div v-if="studies" class="bg-white rounded-lg p-4 mt-3">
            <div v-if="studies.length > 0 && filteredStudies">
                <Studies :studies="filteredStudies" />
            </div>
            <div v-else class="lg:col-span-3 bg-[#FAF9F6] text-center border rounded-xl p-3 h-[46.6vh]">
                <h2 class="text-2xl font-bold text-gray-900">No Studies found</h2>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Studies from './Studies.vue';
import SearchBar from './SearchBar.vue';
import { computed, ref, onBeforeMount } from 'vue';
import { useDashboardStore } from '@/stores/dashboardStore';

const dashboardStore = useDashboardStore();
const studies = computed(() => dashboardStore.studies);

onBeforeMount(() => {

    dashboardStore.getStudies();
});


let searchValue = ref('');

const handleSearchValue = (value: string) => {
    searchValue.value = value;
};

const filteredStudies = computed(() => {
    if (!searchValue.value) {
        return studies.value;
    }
    const regex = new RegExp(searchValue.value, 'i');
    return studies.value?.filter(study => regex.test(study.title));
});

</script>@/stores/dashboardStore
