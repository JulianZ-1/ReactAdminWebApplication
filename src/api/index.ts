import type { AxiosResponse } from 'axios';
import http from './axios'; // Assuming `http` is the axios instance

// Interface for user-related data
interface User {
    id?: string; // Optional when adding a user
    name: string;
    addr: string;
    age: number;
    birth: string;
    sex: number;
}

// Interface for the response when getting the user list
interface UserListResponse {
    code: number;
    count: number;
    list: User[];
}

// Generic interface for add/edit/delete responses
interface GenericResponse {
    code: number;
    message: string;
}

// Function to get general data from '/home/getData'
export const getData = (): Promise<any> => {
    return http.request<any>({
        url: '/home/getData',
        method: 'get',
    });
};

// Get user list based on optional filters in params
export const getUser = (params: Partial<User>): Promise<UserListResponse> => {
    return http.request<UserListResponse>({
        url: '/user/getUser',
        method: 'get',
        params,
    }).then((response: AxiosResponse<UserListResponse>) => response.data);
};

// Add a new user, omitting the ID field as it’s not required
export const addUser = (data: Omit<User, 'id'>): Promise<GenericResponse> => {
    return http.request<GenericResponse>({
        url: '/user/addUser',
        method: 'post',
        data,
    }).then((response: AxiosResponse<GenericResponse>) => response.data);
};

// Edit an existing user, passing in the full user object including the ID
export const editUser = (data: User): Promise<GenericResponse> => {
    return http.request<GenericResponse>({
        url: '/user/editUser',
        method: 'post',
        data,
    }).then((response: AxiosResponse<GenericResponse>) => response.data);
};

// Delete a user by ID, passing it in as part of the request body
export const deleteUser = (id: string): Promise<GenericResponse> => {
    return http.request<GenericResponse>({
        url: '/user/deleteUser',
        method: 'post',
        data: { id },  // Wrap the ID in an object
    }).then((response: AxiosResponse<GenericResponse>) => response.data);
};