export type Samples = {
    Sample: string;
    Sample_ID: string;
    Sample_Project: string;
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

    
    [key: string]: string | null;
}

export type StudyType = {
    accession_id: string,
    created_date: string,
    title: string,
    description: string,
    authors: string[],
    samples: Samples[],
}