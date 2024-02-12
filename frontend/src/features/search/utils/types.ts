
export type FilterType = {
  id: string;
  name: string;
  options: FilterOptionType[];
  filterFunc: FilterFuncType;
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

export type SampleResponseType = {
  Biological_Repeat: string;
  Biomaterial_Provider: string;
  Cell_Line: string;
  Date_Sample_Prep: string;
  Description: string;
  Mouse_Model: string;
  Organism: string;
  Sample: string;
  SampleGroup: string;
  Sample_ID: string;
  Sample_Project: string;
  Sex: string;
  Tissue: string;
};

export type SearchResultType = {
  accession_id: string;
  created_date: string;
  title: string;
  description: string;
  authors: string[];
  samples: SampleResponseType[];
};

export type FilterFuncType = (result: any, filter: string[]) => boolean;