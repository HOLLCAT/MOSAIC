import type { ApplicationUser, AuthStateType } from "../utils/types";

const setUser = (state: AuthStateType, user: ApplicationUser | null) => {
    state.user = user;
}

export default { setUser };