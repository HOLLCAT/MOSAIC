import { data } from "@/utils/dummyDataNew"
const fetchStudy = ({ commit }: any, accession: string) => {
    const study = data.find((item) => item.accession === accession);
    commit("setStudy", study);
    commit("setSamples", study?.samples);
}

export default { fetchStudy };