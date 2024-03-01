import type { SampleResponseType } from '@/features/search/utils/types';

export type StateType = {
    studies: SearchResultType[] | null;
    pendingStudies: SearchResultType[] | null;
};

export type SearchResultType = {
    accession_id: string;
    created_date: string;
    owner_id: string;
    title: string;
    description: string;
    authors: string[];
    samples: SampleResponseType[];
    pending: boolean;
};
