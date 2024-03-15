export type AuthStateType = {
    user: ApplicationUser | null,
    isRefreshingToken: boolean,
}

export type LoginRequestType = {
    email: string,
    password: string,
}

export type RegisterRequestType = {
    name: string,
    email: string,
    password: string,
    confirm_password: string,
}
export type ApplicationUser = {
    name: string,
    email: string,
    access_token: string,
}