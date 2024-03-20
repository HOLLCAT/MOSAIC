import type { AuditType, ColloboratorType, DashboardStudyType, UploadSampleType, AddCollaboratorType } from "@/features/dashboard/utils/types";
import { deleteResource, get, post } from "@/utils/axiosWrapper";
import { defineStore } from "pinia";
import { inject, ref, computed } from "vue";

export const useDashboardStore = defineStore("dashboard", () => {
    const isDev = inject<boolean>("isDev")!;

    // State
    const studies = ref<DashboardStudyType[] | null>(null);
    const pendingStudies = ref<DashboardStudyType[] | null>(null);


    // Getters
    const hasResults = computed(() => studies.value !== null);
    const isSamplesUploaded = (id: string) => computed(() => {
        if (!pendingStudies.value) return null;
        const study = pendingStudies.value.find((study) => study.accession_id === id);
        if (!study) return null;
        return study.samples.every((sample) => sample.File == true);
    });
    const getStudyCollaborators = (accession_id: string, isPending = false) => computed(() => {
        if (isPending) return pendingStudies.value?.find((study) => study.accession_id === accession_id)?.collaborators;

        return studies.value?.find((study) => study.accession_id === accession_id)?.collaborators;
    });
    const getStudyAudits = (accession_id: string, isPending = false) => computed(() => {
        if (isPending) return pendingStudies.value?.find((study) => study.accession_id === accession_id)?.audit;

        return studies.value?.find((study) => study.accession_id === accession_id)?.audit;
    });


    // Actions
    function removePendingStudy(accession_id: string) {
        if (!pendingStudies.value) return;
        pendingStudies.value = pendingStudies.value.filter((study) => study.accession_id !== accession_id);
    }
    async function getStudies() {
        try {
            const url = import.meta.env.VITE_DASHBOARD_STUDIES_URL;
            const response = await get<DashboardStudyType[]>(url);

            studies.value = response.data;
        } catch (error) {
            studies.value = [];
            if (isDev) console.log(error);
        }
    }
    async function getPendingStudies() {
        try {
            const url = import.meta.env.VITE_DASHBOARD_PENDING_STUDIES_URL;
            const response = await get<DashboardStudyType[]>(url);

            pendingStudies.value = response.data;
        } catch (error) {
            pendingStudies.value = [];
            if (isDev) console.log(error);
        }
    };
    async function uploadFile(data: UploadSampleType) {
        try {
            let url = import.meta.env.VITE_STUDY_UPLOAD_SAMPLE_URL + `/${data.accession_id}/${data.sample_id}/`;

            const formData = new FormData();
            formData.append('file', data.file);
            const response = await post(url, formData, true)

            const isUploaded = isSamplesUploaded(data.accession_id).value;
            if (isUploaded) removePendingStudy(data.accession_id);

            return response.data;
        } catch (error) {
            if (isDev) console.log(error);
        }
    }
    async function fetchColloborators(accession_id: string, isPending: boolean = false) {
        try {
            const url = import.meta.env.VITE_DASHBOARD_URL + `/${accession_id}/collaborators/`;
            const response = await get<ColloboratorType[]>(url);
            if (response.error) throw response.error;

            if (isPending && pendingStudies.value) {
                pendingStudies.value = pendingStudies.value.map((study) => {
                    if (study.accession_id === accession_id) {
                        study.collaborators = response.data;
                    }
                    return study;
                });
            }
            else if (studies.value) {
                studies.value = studies.value.map((study) => {
                    if (study.accession_id === accession_id) {
                        study.collaborators = response.data;
                    }
                    return study;
                });
            }
        } catch (error) {
            if (isDev) console.log(error);
        }
    }
    async function fetchAudits(accession_id: string, isPending: boolean = false) {
        try {
            const url = import.meta.env.VITE_DASHBOARD_URL + `/${accession_id}/audit-messages/`;
            const response = await get<AuditType[]>(url);
            if (response.error) throw response.error;

            if (isPending && pendingStudies.value) {
                pendingStudies.value = pendingStudies.value.map((study) => {
                    if (study.accession_id === accession_id) {
                        study.audit = response.data;
                    }
                    return study;
                });
            }
            else if (studies.value) {
                studies.value = studies.value.map((study) => {
                    if (study.accession_id === accession_id) {
                        study.audit = response.data;
                    }
                    return study;
                });
            }
        } catch (error) {
            if (isDev) console.log(error);
        }
    }
    async function addCollaborator(data: AddCollaboratorType, isPending = false) {
        try {
            const url = import.meta.env.VITE_DASHBOARD_URL + `/${data.accession_id}/add-collaborator/`;
            const x = {
                email: data.email,
                position: data.position
            }
            const response = await post<ColloboratorType>(url, x);
            if (response.error) throw response.error;
            if (!response.data) return;

            if (isPending && pendingStudies.value) {
                pendingStudies.value = pendingStudies.value.map((study) => {
                    if (study.accession_id === data.accession_id) {
                        if (study.collaborators) study.collaborators.push(response.data!);
                        else study.collaborators = [response.data!];
                    }
                    return study;
                });
            } else if (studies.value) {
                studies.value = studies.value.map((study) => {
                    if (study.accession_id === data.accession_id) {
                        if (study.collaborators) study.collaborators.push(response.data!);
                        else study.collaborators = [response.data!];
                    }
                    return study;
                });
            }

            return true;
        } catch (error) {
            if (isDev) console.log(error);
            // @ts-ignore
            return error.response.data.detail;
        }
    }
    async function removeCollaborator(accession_id: string, email: string, isPending = false) {
        try {
            const url = import.meta.env.VITE_DASHBOARD_URL + `/${accession_id}/remove-collaborator/`;
            console.log(url);
            const response = await deleteResource(url, email);
            if (response.error) throw response.error;

            if (isPending && pendingStudies.value) {
                pendingStudies.value = pendingStudies.value.map((study) => {
                    if (study.accession_id === accession_id) {
                        if (study.collaborators) study.collaborators = study.collaborators.filter((collaborator) => collaborator.email !== email);
                    }
                    return study;
                });
            } else if (studies.value) {
                studies.value = studies.value.map((study) => {
                    if (study.accession_id === accession_id) {
                        if (study.collaborators) study.collaborators = study.collaborators.filter((collaborator) => collaborator.email !== email);
                    }
                    return study;
                });
            }
            return true;
        } catch (error) {
            if (isDev) console.log(error);
        }
    }
    async function publishStudy(accession_id: string) {
        try {
            const url = import.meta.env.VITE_DASHBOARD_URL + `/publish/${accession_id}`;
            const response = await post(url, {});
            if (response.error) throw response.error;

            if (studies.value) {
                studies.value = studies.value?.map((study) => {
                    if (study.accession_id === accession_id) {
                        study.isPublished = true;
                    }
                    return study;
                });
            }
        } catch (error) {
            if (isDev) console.log(error);
        }
    }
    return {
        studies,
        pendingStudies,
        hasResults,
        getStudyCollaborators,
        getStudyAudits,
        isSamplesUploaded,
        getStudies,
        getPendingStudies,
        uploadFile,
        fetchColloborators,
        fetchAudits,
        addCollaborator,
        removeCollaborator,
        publishStudy,
    };
});