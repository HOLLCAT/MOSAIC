import type { Samples, UploadMetadataType } from "../utils/types";
import axios from "axios";

const uploadMetadata = async ({ commit }: any, data: UploadMetadataType) => {
    try {
        const url = import.meta.env.VITE_UPLOAD_METADATA_URL;
        const form = new FormData();
        form.append("metadata", data.metadata);
        form.append("metadata_file_type", data.metadata_type);
        const response = await axios.post<Samples[]>(url, form, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${data.token}`
            }
        });
        commit("setStudySamples", response.data)
        commit("setIsLoading", false);
    } catch (err) {
        console.log(err);
    }
}

const uploadStudy = async ({ commit }: any, data: { token: any; }) => {
    try {
        const url = import.meta.env.VITE_STUDY_URL;
        const response = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${data.token}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}
export default { uploadMetadata, uploadStudy };