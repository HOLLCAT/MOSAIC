import type { SearchItemType } from "@/utils/dummyData";
export type stateType = {
    fileredData: SearchItemType[], 
    data: {
        results: SearchItemType[], 
        years: number[]
    }
}