import axios from "axios";
import type { StudyType } from "../utils/type";

const fetchStudy = async ({ commit }: any, accession: string) => {
    try {
        const url = import.meta.env.VITE_STUDY_URL + accession;
        const response = await axios.get<StudyType>(url);
        commit("setStudy", response.data);
        commit("setSamples", response.data.samples);
    } catch (error) {
        console.log(error);
    }
}

export default { fetchStudy };