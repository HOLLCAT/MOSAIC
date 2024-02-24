/// <reference types="vite/client" />

interface ImportMetaEnv {

    // Auth
    readonly VITE_REGISTER_URL: string
    readonly VITE_LOGIN_URL: string
    readonly VITE_REFRESH_URL: string
    readonly VITE_LOGOUT_URL: string

    // Study
    readonly VITE_STUDY_URL: string
    readonly VITE_UPLOAD_METADATA_URL: string
    readonly VITE_STUDY_SEARCH_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}