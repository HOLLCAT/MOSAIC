import { get, post } from '@/utils/axiosWrapper'
import type { SearchResultType } from '@/features/dashboard/utils/types';

const isDev = import.meta.env.MODE === 'development';
const getStudies = async ({ commit }: any) => {
    try {
        const url = import.meta.env.VITE_DASHBOARD_STUDIES_URL;
        const response = await get<SearchResultType[]>(url);

        commit('setStudies', response.data);
    } catch (error) {
        commit('setStudies', []);
        if (isDev) console.log(error);
    }
};

const getPendingStudies = async ({ commit }: any) => {
    try {
        const url = import.meta.env.VITE_DASHBOARD_PENDING_STUDIES_URL;
        const response = await get<SearchResultType[]>(url);

        commit('setPendingStudies', response.data);
    } catch (error) {
        commit('setPendingStudies', []);
        if (isDev) console.log(error);
    }
};


const uploadFile = async ({ commit, getters }: any, data: { token: any; accession_id: any; sample_id: any; file: File }) => {
    try {
        let url = import.meta.env.VITE_STUDY_UPLOAD_SAMPLE_URL + `/${data.accession_id}/${data.sample_id}/`;

        const formData = new FormData();
        formData.append('file', data.file);
        const response = await post(url, formData, true)

        const isUploaded = getters.isSamplesUploaded(data.accession_id);
        if (isUploaded) commit('removePendingStudy', data.accession_id);
        
        return response.data;
    } catch (error) {
        if (isDev) console.log(error);
    }
};

export default { getStudies, getPendingStudies, uploadFile };
