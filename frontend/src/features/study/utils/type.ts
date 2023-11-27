import { type SearchItemType } from "@/utils/dummyDataNew";
export type StateType = {
    study: SearchItemType | null;
    samples: SearchItemType["samples"] | null;
};
