import axios from "axios";
import { sortYears } from "../utils/sortYesrs";
import { filterFormat } from "../utils/filterFormat";
import { createFilterFormat } from '../utils/createFilterFormat'
import FilterFunctions from "../utils/FilterFunctions";
import type { SearchResultType } from "../utils/types";

const getSearchResults = async ({ commit }: any, query: string) => {
    try {
        const url = import.meta.env.VITE_STUDY_SEARCH_URL + query;
        const response = await axios.get<SearchResultType[]>(url);
        commit("setResults", response.data);
        commit("setFilters", [
            filterFormat("Year", sortYears(response.data), FilterFunctions.yearFilterFunc),
            createFilterFormat("Organism", response.data, FilterFunctions.organismFilterFunc),
            createFilterFormat("Tissue", response.data, FilterFunctions.tissueFilterFunc)
        ]);
    } catch (error) {
        commit("setResults", [])
        console.log(error);
    }
}
export default { getSearchResults };