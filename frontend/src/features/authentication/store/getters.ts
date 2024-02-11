import type { AuthStateType } from "../utils/types";

const getUser = (state: AuthStateType) => state.user;

const isLoggedIn = (state: AuthStateType) => state.user !== null;

export default { getUser, isLoggedIn };