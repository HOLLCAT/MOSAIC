import type { Samples } from "@/features/upload/utils/types";

export type StateType = {
    study: StudyType | null;
    samples: Samples[] | null;
};

export type StudyType = {
    "accession_id": "MOSAIC-0003",
    "created_date": "18 January 2024",
    "title": string,
    "description": string,
    "authors": string[],
    "samples": Samples[],
}