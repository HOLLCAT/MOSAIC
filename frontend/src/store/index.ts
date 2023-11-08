import { createStore } from 'vuex'
import { data } from '@/utils/dummyData';
import type { SearchItemType } from '@/utils/dummyData';
import { sortYears } from '@/utils/sortYesrs';


export const store = createStore({
  state () {
    return {
      data: {
        results: data,
        years: sortYears(data),
      },
      fileredData: data,
    }
  },
  mutations: {
    clearFilteredResults(state: {fileredData: SearchItemType[], data: {results: SearchItemType[], years: number[]}}) {
      state.fileredData = [];
    },
    filterResults(state, years: number[]) {
      state.fileredData = state.data.results.filter(result => {
        const year = Number(result.releaseDate.split(" ")[2]);
        return years.includes(year);
      });
    },
  }
})