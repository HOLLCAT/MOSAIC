import { data } from '@/utils/dummyDataNew';
import { sortYears } from '@/utils/sortYesrs';
const state = () => ({
    fileredData: data,
    data: {
        results: data,
        years: sortYears(data),
    } 
})
export default state;