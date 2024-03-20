import type { Samples } from '@/utils/types';

export type StateType = {
    studies: DashboardStudyType[] | null;
    pendingStudies: DashboardStudyType[] | null;
};

type extendedSamples = Samples & { File: boolean };
export type DashboardStudyType = {
    accession_id: string;
    created_date: string;
    owner_id: string;
    title: string;
    description: string;
    isPublished: boolean;
    isOwner: boolean;
    authors: string[];
    samples: extendedSamples[];
    pending: boolean;
    collaborators: ColloboratorType[] | null;
    audit: AuditType[] | null;
};

export type UpdateStudyType = {
    updated_study: {
        title: string;
        description: string;
        authors: string[];
        samples: Samples[];
    }
    audit: { description: string };
};

export type UploadSampleType = {
    accession_id: string;
    sample_id: string;
    file: File;
};

export type loadingUploadType = {
    index: number;
    fileSize: number;
};

export type ColloboratorType = {
    name: string;
    email: string;
    position: string;
};

export type AuditType = {
    name: string;
    created_date: string;
    action: string;
    description: string;
};

export type AddCollaboratorType = {
    accession_id: string;
    email: string;
    position: string;
};
