import type { ApplicationUser, AuthStateType } from "../utils/types";

const setUser = (state: AuthStateType, user: ApplicationUser | null) => {
    state.user = user;
}
const setTokenRefreshStatus = (state: AuthStateType) => {
    state.isRefreshingToken = false;
}
export default { setUser, setTokenRefreshStatus };