import { createStore } from 'vuex'
import homeStore from '@/features/home/store';
import authenticationStore from '@/features/authentication/store';
import searchStore from '@/features/search/store';

export const store = createStore({
  modules: {
    home: homeStore,
    auth: authenticationStore,
    search: searchStore,
  }
})