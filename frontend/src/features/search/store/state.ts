import { data } from '@/utils/dummyData';
import { sortYears } from '@/utils/sortYesrs';
const state = () => ({
    fileredData: data,
    data: {
        results: data,
        years: sortYears(data),
    } 
})
export default state;