/// <reference types="vite/client" />

interface ImportMetaEnv {
    // Auth
    readonly VITE_REGISTER_URL: string
    readonly VITE_LOGIN_URL: string
    readonly VITE_REFRESH_URL: string
    readonly VITE_LOGOUT_URL: string

    // Study
    readonly VITE_STUDY_URL: string;
    readonly VITE_UPLOAD_METADATA_URL: string;
    readonly VITE_STUDY_SEARCH_URL: string;
    readonly VITE_STUDY_UPLOAD_SAMPLE_URL: string;
    readonly VITE_STUDY_DOWNLOAD_SAMPLE_URL: string;

    // Dashboard
    readonly VITE_DASHBOARD_STUDIES_URL: string;
    readonly VITE_DASHBOARD_PENDING_STUDIES_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
