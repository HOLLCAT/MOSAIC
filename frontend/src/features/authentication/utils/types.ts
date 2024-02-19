export type AuthStateType = {
    user: ApplicationUser | null,
}

export type LoginRequestType = {
    email: string,
    password: string,
}

export type RegisterRequestType = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: string,
}
export type ApplicationUser = {
    name: string,
    email: string,
    access_token: string,
}