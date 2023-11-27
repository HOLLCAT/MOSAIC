import { createStore } from 'vuex'
import homeStore from '@/features/home/store';
import authenticationStore from '@/features/authentication/store';
import searchStore from '@/features/search/store';
import studyStore from '@/features/study/store';

export const store = createStore({
  modules: {
    home: homeStore,
    auth: authenticationStore,
    search: searchStore,
    study: studyStore,
  }
})