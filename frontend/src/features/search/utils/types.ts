
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
  fileredResults: SearchResultType[] | null;
  OriginalResults: SearchResultType[] | null;
  filters: FilterType[] | null;
};

export type SearchResultType = {
  "accession_id": string;
  "created_date": string;
  "title": string;
  "description": string;
  "authors": string[];
}