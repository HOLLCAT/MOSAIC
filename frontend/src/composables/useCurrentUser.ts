import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore";

export const useCurrentUser = () => {
    const { user } = storeToRefs(useAuthStore());
    return { user };
};