import axios from "axios";
import type { ApplicationUser } from "@/features/authentication/utils/types";
const isDev = import.meta.env.MODE === "development";

const api = axios.create({
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

let store: any;
export const injectStore = (_store: any) => {
    store = _store;
};
const getUser = () => {
    return store.user;
};

api.interceptors.request.use(
    (config) => {
        const user = getUser();
        if (user) {
            config.headers.Authorization = `Bearer ${user.access_token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const user = getUser();

        const isLoginOrRegister = [import.meta.env.VITE_LOGIN_URL, import.meta.env.VITE_REGISTER_URL].includes(originalRequest.url);
        if (error.response.status === 401 && !originalRequest._retry && !user && !isLoginOrRegister) {
            try {
                const response = await api.post<ApplicationUser>(import.meta.env.VITE_REFRESH_URL);
                const user = response.data;
                store.user = user;

                originalRequest.headers.Authorization = `Bearer ${user.access_token}`;

                try {
                    const retryResponse = await api(originalRequest);
                    return retryResponse;
                } catch (retryError) {
                    console.log(retryError);
                }
            } catch (err) {
                if (isDev) console.log(err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;