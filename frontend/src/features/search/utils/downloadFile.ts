import axios from 'axios';

export const downloadFile = async (studyId: string, sampleId: string) => {
    const url = import.meta.env.VITE_STUDY_URL + `download/${studyId}/${sampleId}`;
    try {
        const response = await axios.get(url, { responseType: 'blob' });

        const contentDisposition = response.headers['content-disposition'];
        let filename = 'default-filename.fastq.gz';
        if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
            if (filenameMatch.length > 1) {

                filename = filenameMatch[1];
            }
        }

        const file = new Blob([response.data]);

        const fileURL = URL.createObjectURL(file);


        const link = document.createElement('a');
        link.href = fileURL;
        link.setAttribute('download', filename);


        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(fileURL);
    } catch (error) {
        console.log(error);
    }
}