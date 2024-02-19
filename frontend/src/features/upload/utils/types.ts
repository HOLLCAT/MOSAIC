export type StudyDetails = {
    title: string;
    description: string;
    authors: string[];
    metadata_type: string;
    metadata: File;
}

export type Samples = {
    Sample: string;
    Sample_ID: string;
    SampleGroup: string;
    Description: string;
    Organism: string;
    Tissue: string;
    Sex: string;
    Cell_Line: string;
    Mouse_Model: string;
    Biomaterial_Provider: string;
    Date_Sample_Prep: string;
    Biological_Repeat: string;
    Fastq: File | null;
    File: any;

    //more fields to be added
    [key: string]: string | File | null;
}

export type UploadStateType = {
    studyDetails: {
        content: StudyDetails | null;
        error: string;
    }
    samples: {
        content: Samples[] | null;
        loading: boolean;
        error: string;
    }
}

export type UploadMetadataType = {
    metadata_type: string;
    metadata: File;
    token: string;
}