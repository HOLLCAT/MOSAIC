<template>
    <div class="border-t border-gray-200 px-4 py-6">
        <h3 class="-mx-2 -my-3 flow-root">
            <!-- Expand/collapse section button -->
            <button type="button" class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-0" aria-expanded="false">
                <span class="font-medium text-gray-900">{{name}}</span>
                <span class="ml-6 flex items-center">
                    <!-- Expand icon, show/hide based on section open state. -->
                    <svg @click="showFilter = true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                    <!-- Collapse icon, show/hide based on section open state. -->
                    <svg @click="showFilter = false" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clip-rule="evenodd" />
                    </svg>
                </span>
            </button>
        </h3>
        <!-- Filter section, show/hide based on section state. -->
        <div v-if="showFilter" v-for="(year,index) in years" :key="year" class="pt-6">
            <div class="space-y-6">
                <div class="flex items-center">
                    <input id="filter-mobile-color-5" name="{{ year }}" value="{{ year }}" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" v-model="selectedYears[index]">
                    <label for="filter-mobile-color-5" class="ml-3 min-w-0 flex-1 text-gray-500">{{ year }}</label>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import type { SearchItemType } from '@/utils/dummyData';
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'FilterComponent',
    props: ['name'],
    setup(props) {
        const store = useStore();
        const years = computed((): number[] => store.state.data.years);
        const {name} = props;
        const showFilter = ref<boolean>(true);
        const selectedYears = ref<boolean[]>([]);
        
        const selectedYesrs = () => {
            return years.value.filter((_, index) => selectedYears.value[index]);
        }

        watch(selectedYears.value, () => {
            const selected = selectedYesrs();
            store.commit('filterResults', selected);
        });
       
        return {
            name,
            years,
            selectedYears,
            showFilter,
        };
    },
};
</script>