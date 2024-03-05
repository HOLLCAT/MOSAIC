import type { Samples } from '@/utils/types';

export type StateType = {
    studies: SearchResultType[] | null;
    pendingStudies: SearchResultType[] | null;
};

type extendedSamples = Samples & { File: boolean };
export type SearchResultType = {
    accession_id: string;
    created_date: string;
    owner_id: string;
    title: string;
    description: string;
    authors: string[];
    samples: extendedSamples[];
    pending: boolean;
};

export type UploadSampleType = {
    accession_id: string;
    sample_id: string;
    file: File;
};