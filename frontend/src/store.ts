import { createStore } from 'vuex'
import homeStore from '@/features/home/store';
import authenticationStore from '@/features/authentication/store';
import aboutStore from '@/features/about/store';
import searchStore from '@/features/search/store';

export const store = createStore({
  modules: {
    home: homeStore,
    auth: authenticationStore,
    about: aboutStore,
    search: searchStore,
  }
})