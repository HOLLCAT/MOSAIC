import {type  stateType } from "../utils/storeTypes";
const clearFilteredResults = function(state: stateType) {
    state.fileredData = [];
};

const filterResults = (state: stateType, years: number[]) => {
    state.fileredData = state.data.results.filter(result => {
        const year = Number(result.releaseDate.split(" ")[2]);
        return years.includes(year);
    });
};

export default { 
    clearFilteredResults, filterResults 
};