import axios from "axios";
import { post } from "@/utils/axiosWrapper";
import { defineStore } from "pinia";
import { inject, ref } from "vue";
import type { ApplicationUser, LoginRequestType, RegisterRequestType } from "@/features/authentication/utils/types";
import { useRouter } from "vue-router";
import { isAxiosError } from "axios";

export const useAuthStore = defineStore("auth", () => {
    const isDev = inject<boolean>("isDev")!;
    const router = useRouter();

    // State
    const user = ref<ApplicationUser | null>(null);
    const isRefreshingToken = ref(true);


    // Actions
    async function login(request: LoginRequestType) {
        try {
            const url = import.meta.env.VITE_LOGIN_URL;
            const response = await post<ApplicationUser>(url, request);
            if (response.error) throw response.error;

            user.value = response.data;

            router.push("/");
        } catch (error) {
            if (isAxiosError(error)) {
                if (isDev) console.log(error.response?.data);
                return error.response?.data.detail;
            }
        }
    }
    async function register(request: RegisterRequestType) {
        try {
            const url = import.meta.env.VITE_REGISTER_URL;
            const response = await post<ApplicationUser>(url, request);
            if (response.error) throw response.error;

            user.value = response.data;

            router.push("/");
        } catch (error) {
            if (isAxiosError(error)) {
                if (isDev) console.log(error.response?.data);
                return error.response?.data.detail;
            }
        }
    }
    async function logout() {
        try {
            const url = import.meta.env.VITE_LOGOUT_URL;
            const response = await post(url);
            if (response.error) throw response.error;

            user.value = null;
        } catch (error) {
            if (isDev) console.log(error);
        }
    }
    async function refreshToken() {
        try {
            const url = import.meta.env.VITE_REFRESH_URL;
            const response = await axios.post<ApplicationUser>(url, null, { withCredentials: true });

            user.value = response.data;
            return response.data;
        } catch (error) {
            if (isDev) console.log(error);
        } finally {
            isRefreshingToken.value = false;
        }
    }

    return {
        user,
        isRefreshingToken,
        login,
        register,
        logout,
        refreshToken,
    };
});