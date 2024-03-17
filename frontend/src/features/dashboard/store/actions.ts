import axios from 'axios';

const getStudies = async ({ commit }: any, token: string) => {
    try {
        const url = import.meta.env.VITE_DASHBOARD_STUDIES_URL;
        console.log(url);
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        commit('setStudies', response.data);
    } catch (error) {
        commit('setStudies', []);
        console.log(error);
    }
};

const getPendingStudies = async ({ commit }: any, token: string) => {
    try {
        const url = import.meta.env.VITE_DASHBOARD_PENDING_STUDIES_URL;
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        commit('setPendingStudies', response.data);
    } catch (error) {
        commit('setPendingStudies', []);
        console.log(error);
    }
};

const updateStudy = async ({ commit }: any, data: { token: any; accession_id: any }) => {
    try {
        const url = import.meta.env.VITE_STUDY_URL + data.accession_id;
        const response = await axios.put(url, data, {
            headers: {
                Authorization: `Bearer ${data.token}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

const uploadFile = async ({ commit }: any, data: { token: any; accession_id: any; sample_id: any; file: File }) => {
    try {
        const url = import.meta.env.VITE_STUDY_UPLOAD_SAMPLE_URL + `/${data.accession_id}/${data.sample_id}/`;

        const formData = new FormData();
        formData.append('file', data.file);
        const response = await axios.post(url, formData, {
            headers: {
                Authorization: `Bearer ${data.token}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export default { getStudies, getPendingStudies, updateStudy, uploadFile };
