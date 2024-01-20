<template>
  <div v-if="!loading">
    <h2> loading ..</h2>
  </div>
  <div v-else >
    <MobileFilter v-if="hasResults" @filter-close="handleFilterClose" :isOpen="mobileFiltersOpen" :filters="filters" />
    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6 md:pt-24">
        <h1 class="text-xl md:text-4xl font-bold tracking-tight text-gray-900 break-all">
          Search Results for <span class="text-purpleHover">"{{ search }}"</span>
        </h1>
        <div v-if="hasResults" class="flex items-center">
          <button type="button" class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
            @click="mobileFiltersOpen = true">
            <span class="sr-only">Filters</span>
            <FunnelIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <section aria-labelledby="products-heading" class="pb-24 pt-6">
        <div v-if="searchResults.length > 0" class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          <SearchFilterTest :filters="filters" />
          <div class="lg:col-span-3 bg-[#FAF9F6] border rounded-xl p-3">
            <SearchResultsItem :searchResults="searchResults" />
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
import SearchFilterTest from "./components/SearchFilter.vue";
import SearchResultsItem from "./components/SearchResultsItem.vue";
import useSearchResults from "./composable/useSearchResults";
import ResultNotFound from "./components/ResultNotFound.vue";

const { search, searchResults, hasResults, filters, loading } = useSearchResults();
const mobileFiltersOpen = ref(false);
const handleFilterClose = () => (mobileFiltersOpen.value = false);
</script>
