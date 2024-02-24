import type { AuthStateType } from "../utils/types";

const getUser = (state: AuthStateType) => state.user;

const isLoggedIn = (state: AuthStateType) => state.user !== null;

const isRefreshingToken = (state: AuthStateType) => state.isRefreshingToken;

export default { getUser, isLoggedIn, isRefreshingToken };