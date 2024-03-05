<template>
  <div v-if="!loading">
    <h2> loading ..</h2>
  </div>
  <div v-else>
    <MobileFilter v-if="hasResults" @filter-close="handleFilterClose" :isOpen="mobileFiltersOpen" :filters="filters" />
    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      <div v-if="!downloadPageOpen"
        class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6 md:pt-24">
        <h1 class="text-xl md:text-4xl font-bold tracking-tight text-gray-900 break-all">
          Search Results for <span class="text-purpleHover">"{{ search }}"</span>
          <span v-if="filteredResults" class="text-gray-500 text-2xl ml-1">({{ filteredResults.length }})</span>
        </h1>
        <DownloadButton v-if="filteredResults" class="ml-auto" @download-clicked="handleDownloadClicked" />
        <div v-if="hasResults" class="flex items-center">
          <button type="button" class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
            @click="mobileFiltersOpen = true">
            <span class="sr-only">Filters</span>
            <FunnelIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div v-else class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6 md:pt-24">
        <h1 class="text-xl md:text-4xl font-bold tracking-tight text-gray-900 break-all">
          Samples Available for Download: <span class="text-purpleHover">"{{ search }}"</span>
          <span v-if="filteredSamples" class="text-gray-500 text-2xl ml-1">({{ filteredSamples.length }})</span>
          <span v-else class="text-gray-500 text-2xl ml-1">(0)</span>
        </h1>
        <BackToStudiesButton v-if="filteredResults" class="ml-20" @back-to-studies-clicked="handleDownloadClicked" />
      </div>

      <section aria-labelledby="reuslt-heading" class="pb-24 pt-6 w-full">
        <div v-if="hasResults" class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 w-full">
          <SearchFilter :filters="filters" />
          <div v-if="!downloadPageOpen && filteredResults" class="lg:col-span-3 bg-[#FAF9F6] border rounded-xl p-3">
            <SearchResultsItem :searchResults="filteredResults" />
          </div>
          <div v-else class="py-10 flex justify-center lg:col-span-3 w-full">
            <SampleDownloadTable v-if="filteredSamples" :samplesAsStudies="filteredSamples" />
            <ResultNotFound v-else />
          </div>
        </div>
        <ResultNotFound v-else />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FunnelIcon } from "@heroicons/vue/20/solid";
import MobileFilter from "./components/MobileSearchFilter.vue";
import SearchFilter from "./components/SearchFilter.vue";
import SearchResultsItem from "./components/SearchResultsItem.vue";
import useSearchResults from "./composable/useSearchResults";
import ResultNotFound from "./components/ResultNotFound.vue";
import DownloadButton from "./components/DownloadButton.vue";
import BackToStudiesButton from "./components/BackToStudiesButton.vue";
import SampleDownloadTable from "./components/SampleDownloadTable.vue";

const { search, filteredResults, hasResults, filters, loading, filteredSamples } = useSearchResults();
const mobileFiltersOpen = ref(false);
const handleFilterClose = () => mobileFiltersOpen.value = false;

const downloadPageOpen = ref(false);
const handleDownloadClicked = () => downloadPageOpen.value = !downloadPageOpen.value;
</script>
