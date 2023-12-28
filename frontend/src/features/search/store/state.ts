import { data, type SearchItemType } from "@/utils/dummyDataNew";
import { sortYears } from "@/utils/sortYesrs";
import { filterFormat } from "../utils/filterFormat";
import type { StateType } from "../utils/types";

const state = (): StateType => ({
  fileredResults: data as SearchItemType[],
  OriginalResults: data as SearchItemType[],
  filters: [filterFormat("Year", sortYears(data))],
});
export default state;
