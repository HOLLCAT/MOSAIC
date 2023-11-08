import type { stateType } from "../utils/storeTypes";

const getMatchedSearch = (state: stateType) => (search: string) => {
    return state.fileredData.filter(result => {
        return result.title.toLowerCase().includes(search.toLowerCase());
    });
};

export default { getMatchedSearch };