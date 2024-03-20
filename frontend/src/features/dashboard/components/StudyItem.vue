<template>
    <div class="flex">
        <span class="text-xsm md:text-sm text-gray-500">{{ item.accession_id }}</span>
        <span class="text-xsm md:text-sm text-gray-500 ml-2">|</span>
        <span class="text-xsm md:text-sm text-gray-500 ml-2">{{ item.created_date }}</span>
        <span class="text-xsm md:text-sm text-gray-500 ml-2">|</span>
        <span class="text-xsm md:text-sm text-gray-500 ml-2">Samples: {{ item.samples.length }}</span>
    </div>
    <div class="flex-col">
        <h1 class="mt-3 text-sm md:text-xl font-medium leading-6">
            {{ item.title }}
        </h1>
        <h4 class="mt-2 text-xsm md:text-sm text-gray-500">
            {{ item.description.length > 140 ? item.description.slice(0, 140) + "..." : item.description }}
        </h4>
    </div>
    <div v-if="!showMore" class="flex justify-center items-center">
        <button class="flex flex-col items-center text-purple hover:underline" @click="handleClick">
            <span class="text-purple-500 text-base font-semibold">Show More</span>
            <ChevronDownIcon class="h-6 w-6" />
        </button>
    </div>
    <CollaborationAndAudit @clicked="handleClick" v-if="showMore" :study="item" :isPending="true" />
</template>
<script setup lang="ts">
import CollaborationAndAudit from './CollaborationAndAudit.vue';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import type { DashboardStudyType } from '../utils/types';
import { ref } from 'vue';

defineProps<{ item: DashboardStudyType }>();

const showMore = ref(false);


const handleClick = () => {
    showMore.value = !showMore.value;
};

</script>