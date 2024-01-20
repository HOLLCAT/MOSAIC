import axios from "axios";
import type { LoginRequestType, RegisterRequestType, AuthStateType, ApplicationUser } from "../utils/types";

const login = async ({ commit }: any, user: LoginRequestType) => {
    try {
        const url = import.meta.env.VITE_LOGIN_URL;
        console.log(url);
        const response = await axios.post<ApplicationUser>(url, user, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        addUserTolocalStorage(response.data);
        commit("setUser", response.data);
    } catch (error) {
        console.log(error);
    }
}
const register = async ({ commit }: any, user: RegisterRequestType) => {
    try {
        const url = import.meta.env.VITE_REGISTER_URL;
        const response = await axios.post<ApplicationUser>(url, user);
        addUserTolocalStorage(response.data);
        commit("setUser", response.data);
    } catch (error) {
        console.log(error);
    }
}
const logout = ({ commit }: any) => {
    localStorage.removeItem("user");
    commit("setUser", null);
}

const setUser = ({ commit }: any) => {
    const user = localStorage.getItem("user");
    if (user) {
        commit("setUser", JSON.parse(user));
    }
}

const addUserTolocalStorage = (user: ApplicationUser) => {
    localStorage.setItem("user", JSON.stringify(user));
}
export default { login, logout, register, setUser };