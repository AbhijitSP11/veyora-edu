import axios from 'axios';
import type { ApiResponse } from '@/types/api';

const apiClient = axios.create({
  baseURL: '/api/v1',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const schoolSlug = localStorage.getItem('school_slug');
  if (schoolSlug) {
    config.headers['X-School-Slug'] = schoolSlug;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const { data } = await axios.post('/api/v1/auth/refresh', { refreshToken });
        localStorage.setItem('access_token', data.data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
        return apiClient(originalRequest);
      } catch {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

export async function get<T>(url: string, params?: unknown): Promise<ApiResponse<T>> {
  const { data } = await apiClient.get<ApiResponse<T>>(url, { params });
  return data;
}

export async function post<T>(url: string, body?: unknown): Promise<ApiResponse<T>> {
  const { data } = await apiClient.post<ApiResponse<T>>(url, body);
  return data;
}

export async function put<T>(url: string, body?: unknown): Promise<ApiResponse<T>> {
  const { data } = await apiClient.put<ApiResponse<T>>(url, body);
  return data;
}

export async function del<T>(url: string): Promise<ApiResponse<T>> {
  const { data } = await apiClient.delete<ApiResponse<T>>(url);
  return data;
}

export default apiClient;
