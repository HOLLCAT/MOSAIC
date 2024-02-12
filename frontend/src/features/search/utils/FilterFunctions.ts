import type { SampleResponseType, FilterFuncType } from "./types";

const yearFilterFunc: FilterFuncType = (result, yearFilter) => {
    const year = result.created_date.split(" ")[2];
    return yearFilter.includes(year);
};

const organismFilterFunc: FilterFuncType = (result, organismFilter) => {
    return result.samples.filter((sample: SampleResponseType) =>
        organismFilter.includes(sample.Organism)).length > 0;
};

const tissueFilterFunc: FilterFuncType = (result, organismFilter) => {
    return result.samples.filter((sample: SampleResponseType) =>
        organismFilter.includes(sample.Tissue)).length > 0;
};

export default { yearFilterFunc, organismFilterFunc, tissueFilterFunc };