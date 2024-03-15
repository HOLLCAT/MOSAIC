export const downloadFile = async (studyId: string, sampleId: string) => {
    const url = import.meta.env.VITE_STUDY_DOWNLOAD_SAMPLE_URL + `/${studyId}/${sampleId}`;

    const link = document.createElement('a');
    link.href = url
    link.setAttribute('download', 'download');

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}