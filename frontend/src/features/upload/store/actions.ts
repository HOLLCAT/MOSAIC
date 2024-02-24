import type { Samples, UploadMetadataType } from "../utils/types";
import { post } from "@/utils/axiosWrapper";

const isDev = import.meta.env.MODE === "development";

const uploadMetadata = async ({ commit }: any, data: UploadMetadataType) => {
    try {
        const url = import.meta.env.VITE_UPLOAD_METADATA_URL;
        const form = new FormData();
        form.append("metadata", data.metadata);
        form.append("metadata_file_type", data.metadata_type);
        const response = await post<Samples[]>(url, form, true);
        if (response.error) throw response.error;

        commit("setStudySamples", response.data)
        commit("setIsLoading", false);
    } catch (err) {
        if (isDev) console.log(err);
    }
}

const uploadStudy = async ({}, data: any) => {
    try {
        console.log(data);
        const url = import.meta.env.VITE_STUDY_URL;
        const response = await post(url, data);
        if (response.error) throw response.error;

        return response.data;
    } catch (err) {
        if (isDev) console.log(err);
    }
}
export default { uploadMetadata, uploadStudy };