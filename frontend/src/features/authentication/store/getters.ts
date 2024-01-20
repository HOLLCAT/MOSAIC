import type { AuthStateType } from "../utils/types";

const getUser = (state: AuthStateType) => state.user;

export default { getUser };