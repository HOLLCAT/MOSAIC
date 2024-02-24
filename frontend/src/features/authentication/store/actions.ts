import axios from "axios";
import { post } from "@/utils/axiosWrapper";
import type { LoginRequestType, RegisterRequestType, ApplicationUser } from "../utils/types";

const isDev = import.meta.env.MODE === "development";

const login = async ({ commit }: any, user: LoginRequestType) => {
    try {
        const url = import.meta.env.VITE_LOGIN_URL;
        const response = await post<ApplicationUser>(url, user);
        if (response.error) throw response.error;

        commit("setUser", response.data);

        return true;
    } catch (error) {
        if (isDev) console.log(error);
    }
}
const register = async ({ commit }: any, user: RegisterRequestType) => {
    try {
        const url = import.meta.env.VITE_REGISTER_URL;
        const response = await post<ApplicationUser>(url, user);
        if (response.error) throw response.error;

        commit("setUser", response.data);

        return true;
    } catch (error) {
        if (isDev) console.log(error);
    }
}
const logout = async ({ commit }: any) => {
    try {
        const url = import.meta.env.VITE_LOGOUT_URL;
        const response = await post(url);
        if (response.error) throw response.error;

        commit("setUser", null);
    } catch (error) {
        if (isDev) console.log(error);
    }
}

const refreshToken = async ({ commit }: any) => {
    try {
        const url = import.meta.env.VITE_REFRESH_URL;
        const response = await axios.post<ApplicationUser>(url, null, { withCredentials: true });

        commit("setUser", response.data);
        return response.data;
    } catch (error) {
        if (isDev) console.log(error);
    } finally {
        commit("setTokenRefreshStatus");
    }

}
export default { login, logout, register, refreshToken };