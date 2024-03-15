import { post } from "@/utils/axiosWrapper";
import { defineStore } from "pinia";
import { computed, inject, ref } from "vue";
import { useRouter } from 'vue-router';
import type { StudyDetailsType, SamplesDetailsType } from "@/features/upload/utils/types";
import type { Samples } from "@/utils/types";
import { isAxiosError } from "axios";


export const useUploadStudyStore = defineStore("upload-study", () => {
    const isDev = inject<boolean>("isDev")!;
    const router = useRouter();

    // State
    const studyDetails = ref<StudyDetailsType | null>(null);
    const samples = ref<SamplesDetailsType | null>(null);

    // Getters
    const getStudyMetadata = computed(() => {
        if (!studyDetails.value) return;
        return {
            metadata: studyDetails.value.content.metadata,
            file_type: studyDetails.value.content.metadata_type,
        };
    });
    const getStudyDetails = computed(() => {
        const data = {
            title: studyDetails.value?.content.title,
            description: studyDetails.value?.content.description,
            authors: studyDetails.value?.content.authors,
        };
        return data;
    });

    // Actions
    function setStudyDetails(data: StudyDetailsType["content"]) {
        if (!studyDetails.value) studyDetails.value = { content: data, error: "" };
        else studyDetails.value.content = data;
    }
    async function uploadMetadata() {
        try {
            const url = import.meta.env.VITE_UPLOAD_METADATA_URL;
            const form = new FormData();

            form.append("metadata", getStudyMetadata.value!.metadata);
            form.append("metadata_file_type", getStudyMetadata.value!.file_type);

            const response = await post<Samples[]>(url, form, true);

            if (response.error) throw response.error;
            if (!response.data) return;

            samples.value = {
                content: response.data,
                loading: false,
                error: "",
            };

            return true
        } catch (err) {
            if (isAxiosError(err)) {
                isDev && console.log(err.response);
                samples.value = {
                    content: [],
                    loading: false,
                    error: err.response?.data.message || "An error occurred while uploading metadata",
                }
            }
            if (isDev) console.log(err);

            return false;
        }
    }
    async function uploadStudy(samples: Samples[]) {
        try {
            const url = import.meta.env.VITE_STUDY_URL;
            const data = {
                ...getStudyDetails.value,
                samples,
            };
            const response = await post(url, data);
            if (response.error) throw response.error;

            router.push({ name: "dashboard", query: { tab: "PendingStudies" } });
        } catch (err) {
            if (isDev) console.log(err);
            return false
        }
    }

    return {
        studyDetails,
        setStudyDetails,
        samples,
        uploadMetadata,
        uploadStudy,
    };
});