import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic helper for requests
export async function restClient<T>(endpoint: string, options?: AxiosRequestConfig): Promise<T> {
  const response = await api.request<T>({
    url: endpoint,
    ...options,
  });
  return response.data;
}

export async function restClientPost<T>(endpoint: string, options?: AxiosRequestConfig): Promise<T> {
  const response = await api.request<T>({
    url: endpoint,
    ...options,
  });
  return response.data;
}

export default api;
