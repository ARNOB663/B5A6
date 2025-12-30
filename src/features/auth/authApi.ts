import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse, AuthResponseData, User } from '../../types';
import { env } from '../../config/env';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${env.VITE_API_BASE_URL}/auth`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<ApiResponse<AuthResponseData>, any>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation<ApiResponse<AuthResponseData>, any>({
            query: (userData) => ({
                url: 'register',
                method: 'POST',
                body: userData,
            }),
        }),
        getProfile: builder.query<ApiResponse<any>, void>({ // Returns user profile?
            query: () => 'profile',
        })
    }),
});

export const { useLoginMutation, useRegisterMutation, useGetProfileQuery } = authApi;
