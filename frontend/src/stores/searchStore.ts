import { defineStore } from "pinia";
import { computed, ref, inject } from "vue";
import { get } from "@/utils/axiosWrapper";
import { applyFilter } from "@/utils/applyFilter";
import { sortYears } from "@/features/search/utils/sortYesrs";
import { filterFormat } from "@/features/search/utils/filterFormat";
import FilterFunctions from "@/features/search/utils/FilterFunctions";
import { createFilterFormat } from "@/features/search/utils/createFilterFormat";
import type { StudyType } from "@/utils/types";
import type { FilterType } from "@/features/search/utils/types";

export const useSearchStore = defineStore("search", () => {
    const isDev = inject<boolean>("isDev")!;

    // State
    const searchResults = ref<StudyType[] | null>(null);
    const filters = ref<FilterType[]>([]);


    // Getters
    const hasResults = computed(() => searchResults.value !== null && searchResults.value.length > 0);
    const filteredResults = computed(() => {
        if (searchResults.value === null) return null;

        let filteredResults = searchResults.value;
        filters.value?.forEach((filter) => {
            filteredResults = filteredResults.filter((result) => applyFilter(result, filter));
        });
        return filteredResults;
    });
    const filteredSamples = computed(() => {
        const results = filteredResults.value;
        if (!results) return null;

        let flatResults = results.flatMap((study) =>
            study.samples.map((sample) => ({
                samples: [sample],
            }))
        );

        filters.value?.forEach((filter) => {
            flatResults = flatResults.filter((result) => applyFilter(result, filter));
        });

        return flatResults;
    });


    // Actions
    async function fetchSearchedStudies(query: string) {
        try {
            const url = import.meta.env.VITE_STUDY_SEARCH_URL + `/${query}`;

            const response = await get<StudyType[]>(url);
            if (response.error) throw response.error;
            if (!response.data) return;

            searchResults.value = response.data;
            filters.value = [
                filterFormat("Year", sortYears(response.data), FilterFunctions.yearFilterFunc),
                createFilterFormat("Organism", response.data, FilterFunctions.organismFilterFunc),
                createFilterFormat("Tissue", response.data, FilterFunctions.tissueFilterFunc)
            ];
        } catch (error) {
            if (isDev) console.log(error);
            searchResults.value = [];
        }
    }



    return {
        searchResults,
        hasResults,
        filters,
        filteredResults,
        filteredSamples,
        fetchSearchedStudies,
    };
});