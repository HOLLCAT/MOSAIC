<template>
  <ul role="list" class="divide-y divide-gray-200">
    <li v-for="item in searchResults" class="flex justify-between gap-x-6 py-5">
      <div class="flex-col min-w-0 gap-x-4">
        <div class="flex">
          <span class="text-xsm md:text-sm text-gray-500">{{ item.accession_id }}</span>
          <span class="md:hidden text-xsm md:text-sm text-gray-500 ml-2">{{ formatDate(item.created_date) }}</span>

          <!-- <span v-if="item." class="text-xsm md:text-sm text-gray-500 ml-2">{{ item.releaseFiles }}</span>
          <span v-if="item.releaseViews" class="text-xsm md:text-sm text-gray-500 ml-2">{{ item.releaseViews }}</span> -->
        </div>
        <div class="flex-col">
          <RouterLink :to="`/study/${item.accession_id}`"
            class="mt-3 text-sm md:text-lg font-medium leading-6 hover:cursor-pointer hover:underline">
            {{ item.title }}
          </RouterLink>
          <h4 class="mt-2 text-xsm md:text-sm text-gray-500">
            {{ item.description.length > 140 ? item.description.slice(0, 140) + "..." : item.description }}
          </h4>
        </div>
      </div>
    </li>
  </ul>
</template>
<script setup lang="ts">
import type { SearchResultType } from '../utils/types'
defineProps<{ searchResults: SearchResultType[] }>();

const formatDate = (date: string) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
};
</script>
