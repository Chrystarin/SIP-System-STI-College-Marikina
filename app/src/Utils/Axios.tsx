// import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

import axios from 'axios';

// // Define a custom API response type
// interface ApiResponse<T> {
//   success: boolean;
//   data: T;
//   message?: string;
// }

// Create an Axios instance with custom configuration
export default axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Replace with your API base URL
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
    },
});

// // Request interceptor
// api.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     // You can modify the request config here (e.g., add headers, tokens, etc.)
//     return config;
//   },
//   (error: AxiosError) => {
//     // Handle request errors
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response: AxiosResponse) => {
//     // You can modify the response data here (e.g., extract data, handle errors, etc.)
//     return response.data;
//   },
//   (error: AxiosError) => {
//     // Handle response errors
//     return Promise.reject(error);
//   }
// );

// // Export your API methods
// export const apiGet = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
//   return api.get<ApiResponse<T>>(url, config).then((response) => response.data.data);
// };

// export const apiPost = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
//   return api.post<ApiResponse<T>>(url, data, config).then((response) => response.data.data);
// };

// // Add other HTTP methods as needed (e.g., PUT, PATCH, DELETE)

// // Usage example
// apiGet<User[]>('/users').then((users) => {
//   console.log(users);
// }).catch((error) => {
//   console.error('Error:', error);
// });