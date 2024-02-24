import type { AuthStateType } from "../utils/types"

const state = (): AuthStateType => ({
    user: null,
    isRefreshingToken: true,
})

export default state