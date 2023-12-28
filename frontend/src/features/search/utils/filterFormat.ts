import type { FilterType } from "./types";

export const filterFormat = (name: string, data: any[]): FilterType => {
  return {
    id: name,
    name: name,
    options: data.map((item) => {
      return {
        value: item,
        label: typeof item === "string" ? item : String(item),
        checked: false,
      };
    }),
  };
};
