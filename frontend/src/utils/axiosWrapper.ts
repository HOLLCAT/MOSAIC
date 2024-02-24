import { AxiosError, type AxiosResponse, type RawAxiosRequestHeaders } from "axios";
import api from "./api";

interface ApiResponse<T> {
    data: T | null;
    error: AxiosError | null;
}

export async function get<T>(url: string): Promise<ApiResponse<T>> {
    try {
        const response: AxiosResponse<T> = await api.get(url);

        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error as AxiosError };
    }
}

export async function post<T>(
    url: string,
    data: FormData | Record<string, unknown> | undefined = undefined,
    isFormData: boolean = false
): Promise<ApiResponse<T>> {
    try {
        let headers: RawAxiosRequestHeaders = {};

        const config = { headers };

        if (isFormData) {
            config.headers["Content-Type"] = "multipart/form-data";
        } else {
            config.headers["Content-Type"] = "application/json";
        }

        const response: AxiosResponse<T> = await api.post(url, data, config);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error as AxiosError };
    }
}

export async function deleteResource<T>(url: string): Promise<ApiResponse<T>> {
    try {
        const response: AxiosResponse<T> = await api.delete(url);

        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error as AxiosError };
    }
}