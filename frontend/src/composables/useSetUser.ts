import { useStore } from 'vuex';

export const useSetUser = () => {
    const store = useStore();
    const setUser = () => store.dispatch('auth/setUser');
    return { setUser, store };
};