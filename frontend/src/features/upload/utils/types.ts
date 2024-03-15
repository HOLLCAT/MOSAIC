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
    Sample_Project: string;
    Description: string;
    Organism: string;
    Tissue: string;
    Sex: string;
    Cell_Line: string;
    Mouse_Model: string;
    Biomaterial_Provider: string;
    Date_Sample_Prep: string;
    Biological_Repeat: string;

    //more fields to be added
    [key: string]: string | null;
}
export type StudyDetailsType = {
    content: StudyDetails
    error: string
}

export type SamplesDetailsType = {
    content: Samples[]
    loading: boolean
    error: string
}
export type UploadMetadataType = {
    metadata_type: string;
    metadata: File;
    token: string;
}