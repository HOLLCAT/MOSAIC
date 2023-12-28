import type { SearchItemType } from "@/utils/dummyDataNew";

export type FilterType = {
  id: string;
  name: string;
  options: FilterOptionType[];
};
type FilterOptionType = {
  value: string | number;
  label: string;
  checked: boolean;
};
export type StateType = {
  fileredResults: SearchItemType[];
  OriginalResults: SearchItemType[];
  filters: FilterType[];
};
