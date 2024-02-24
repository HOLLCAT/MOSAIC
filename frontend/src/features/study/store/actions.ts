import { get } from "@/utils/axiosWrapper";
import type { StudyType } from "../utils/type";

const isDev = import.meta.env.MODE === "development";

const fetchStudy = async ({ commit }: any, accession: string) => {
    try {
        const url = import.meta.env.VITE_STUDY_URL + accession;
        const response = await get<StudyType>(url);
        if (response.error) throw response.error;

        commit("setStudy", response.data);
        commit("setSamples", response.data?.samples);

        return true;
    } catch (error) {
        if (isDev) console.log(error);
        window.location.href = "/";
    }
}

export default { fetchStudy };