import axios from "axios";
import { sortYears } from "../utils/sortYesrs";
import { filterFormat } from "../utils/filterFormat";

const getSearchResults = async ({ commit }: any, query: string) => {
    try {
        const url = import.meta.env.VITE_STUDY_SEARCH_URL + query;
        const response = await axios.get(url);
        commit("setResults", response.data);
        commit("setFilters", [filterFormat("Year", sortYears(response.data))]);
    } catch (error) {
        console.log(error);
    }
}
export default { getSearchResults };