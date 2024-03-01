import { createStore } from 'vuex';
import homeStore from '@/features/home/store';
import authenticationStore from '@/features/authentication/store';
import searchStore from '@/features/search/store';
import studyStore from '@/features/study/store';
import uploadStore from '@/features/upload/store';
import dashboardStore from '@/features/dashboard/store';

export const store = createStore({
    modules: {
        home: homeStore,
        auth: authenticationStore,
        search: searchStore,
        study: studyStore,
        upload: uploadStore,
        dashboard: dashboardStore,
    },
});
