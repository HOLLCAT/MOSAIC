import type { SearchResultType, UploadSampleType } from "@/features/dashboard/utils/types";
import { get, post } from "@/utils/axiosWrapper";
import { defineStore } from "pinia";
import { inject, ref, computed } from "vue";

export const useDashboardStore = defineStore("dashboard", () => {
    const isDev = inject<boolean>("isDev")!;

    // State
    const studies = ref<SearchResultType[] | null>(null);
    const pendingStudies = ref<SearchResultType[] | null>(null);


    // Getters
    const hasResults = computed(() => studies.value !== null);
    const isSamplesUploaded = (id: string) => computed(() => {
        if (!pendingStudies.value) return null;
        const study = pendingStudies.value.find((study) => study.accession_id === id);
        if (!study) return null;
        return study.samples.every((sample) => sample.File == true);
    });


    // Actions
    function removePendingStudy(id: string) {
        if (!pendingStudies.value) return;
        pendingStudies.value = pendingStudies.value.filter((study) => study.accession_id !== id);
    }
    async function getStudies() {
        try {
            const url = import.meta.env.VITE_DASHBOARD_STUDIES_URL;
            const response = await get<SearchResultType[]>(url);

            studies.value = response.data;
        } catch (error) {
            studies.value = [];
            if (isDev) console.log(error);
        }
    }
    const getPendingStudies = async () => {
        try {
            const url = import.meta.env.VITE_DASHBOARD_PENDING_STUDIES_URL;
            const response = await get<SearchResultType[]>(url);

            pendingStudies.value = response.data;
        } catch (error) {
            pendingStudies.value = [];
            if (isDev) console.log(error);
        }
    };
    const uploadFile = async (data: UploadSampleType) => {
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

    return {
        studies,
        pendingStudies,
        hasResults,
        isSamplesUploaded,
        getStudies,
        getPendingStudies,
        uploadFile,
    };
});