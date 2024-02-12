import type { FilterType, FilterFuncType } from "./types";

export const filterFormat = (name: string, data: any[], filterFunc: FilterFuncType): FilterType => {
  return {
    id: name,
    name: name,
    filterFunc: filterFunc,
    options: data.map((item) => {
      return {
        value: item,
        label: typeof item === "string" ? item : String(item),
        checked: false,
      };
    }),
  };
};
