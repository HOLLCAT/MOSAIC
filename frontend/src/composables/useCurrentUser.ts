import { computed } from "vue";
import { useStore } from 'vuex';
import type { ApplicationUser } from "@/features/authentication/utils/types";

export const useCurrentUser = () => {
    const store = useStore();
    const user = computed<ApplicationUser | null>(() => store.getters['auth/getUser']);
    return { user, store };
};