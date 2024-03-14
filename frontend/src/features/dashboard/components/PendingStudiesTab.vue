<template>
  <div class="text-purple container mx-auto mt-4 mb-10 p-4 shadow-lg bg-white rounded-xl">
      <div class="flex border-b p-2">
          <h1 class="font-bold text-lg mt-2">Pending Studies<span class="text-gray-500 text-1xl ml-1">({{ filteredStudies ? filteredStudies.length : 0 }})</span></h1>
          <div class="flex-grow flex justify-center">
              <SearchBar @search-value="handleSearchValue"/>
          </div>
      </div>

    <div v-if="pendingStudies" class="bg-white rounded-lg p-4 mt-3">
      <div v-if="pendingStudies.length > 0 && filteredStudies">
        <PendingStudies :searchResults="filteredStudies" />
      </div>
      <div v-else class="lg:col-span-3 bg-[#FAF9F6] text-center border rounded-xl p-3 h-[46.6vh]">
        <h2 class="text-2xl font-bold text-gray-900">No Studies found</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import SearchBar from './SearchBar.vue';
import PendingStudies from './PendingStudies.vue';
import { useDashboardStore } from '@/stores/dashboardStore';
import type { SearchResultType } from '../utils/types';

const dashboardStore = useDashboardStore();
const pendingStudies = computed(() => dashboardStore.pendingStudies);
let searchValue = ref('');

const handleSearchValue = (value: string) => {
  searchValue.value = value;
};

onBeforeMount(() => {
  dashboardStore.getPendingStudies();
});

const filteredStudies = computed(() => {
  if (!searchValue.value) {
    return pendingStudies.value;
  }
  const regex = new RegExp(searchValue.value, 'i');
  return pendingStudies.value?.filter(study => regex.test(study.title)) as SearchResultType[];
});

</script>@/stores/dashboardStore