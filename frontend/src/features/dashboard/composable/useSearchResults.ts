import { useStore } from 'vuex';

export const useSearchResults = (token: String | undefined) => {
    const store = useStore();

    store.dispatch('dashboard/getStudies', token);
    store.dispatch('dashboard/getPendingStudies', token);
};

export default useSearchResults;
