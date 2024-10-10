import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

const baseUrl: string = '/api';

class HttpRequest {
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    getInsideConfig(): AxiosRequestConfig {
        const config: AxiosRequestConfig = {
            baseURL: this.baseUrl,
            headers: {}
        };
        return config;
    }

    interceptors(instance: AxiosInstance) {

        // Request Interceptor
        instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                // You can modify the config here, e.g., add headers
                return config;
            },
            (error) => {
                // Handle request error
                return Promise.reject(error);
            }
        );

        // Response Interceptor
        instance.interceptors.response.use(
            (response: AxiosResponse) => {
                // You can modify the response here if needed
                return response;
            },
            (error) => {
                // Handle response error
                console.log(error, 'error');
                return Promise.reject(error);
            }
        );
    }

    request<T>(options: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        const instance = axios.create();
        // Merge the default config with options provided
        options = { ...this.getInsideConfig(), ...options };
        // Set up interceptors
        this.interceptors(instance);
        // Return the Axios instance with the request options
        return instance(options);
    }
}

export default new HttpRequest(baseUrl);
