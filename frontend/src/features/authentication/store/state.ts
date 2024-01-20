import type { AuthStateType } from "../utils/types"

const state = (): AuthStateType => ({
    user: null,
})

export default state