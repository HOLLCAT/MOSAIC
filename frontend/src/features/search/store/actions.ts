import { get } from "@/utils/axiosWrapper";
import { sortYears } from "../utils/sortYesrs";
import { filterFormat } from "../utils/filterFormat";
import { createFilterFormat } from '../utils/createFilterFormat'
import FilterFunctions from "../utils/FilterFunctions";
import type { SearchResultType } from "../utils/types";

const isDev = import.meta.env.MODE === "development";

const getSearchResults = async ({ commit }: any, query: string) => {
    try {
        const url = import.meta.env.VITE_STUDY_SEARCH_URL + query;
        const response = await get<SearchResultType[]>(url);
        if (response.error) throw response.error;
        if (!response.data) return;
        
        commit("setResults", response.data);
        commit("setFilters", [
            filterFormat("Year", sortYears(response.data), FilterFunctions.yearFilterFunc),
            createFilterFormat("Organism", response.data, FilterFunctions.organismFilterFunc),
            createFilterFormat("Tissue", response.data, FilterFunctions.tissueFilterFunc)
        ]);
    } catch (error) {
        commit("setResults", [])
        if (isDev) console.log(error);
    }
}
export default { getSearchResults };