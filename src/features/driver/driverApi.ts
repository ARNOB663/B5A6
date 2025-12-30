import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse, User } from '../../types';
import { env, isDemoMode } from '../../config/env';
import { mockDriverService } from '../../services/mockAuth';

export const driverApi = createApi({
    reducerPath: 'driverApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${env.VITE_API_BASE_URL}/drivers`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Driver'],
    endpoints: (builder) => ({
        updateStatus: builder.mutation<ApiResponse<{ driver: any }>, { status: 'online' | 'offline', location: { latitude: number, longitude: number } }>({
            queryFn: async (args, _api, _extraOptions, baseQuery) => {
                if (isDemoMode) {
                    return { data: await mockDriverService.updateStatus(args.status, args.location) };
                }
                return baseQuery({
                    url: 'availability',
                    method: 'PATCH',
                    body: args,
                }) as any;
            },
            invalidatesTags: ['Driver'],
        }),
        getIncomingRequests: builder.query<any[], void>({
            queryFn: async (_args, _api, _extraOptions, baseQuery) => {
                if (isDemoMode) {
                    // In demo mode, return the list from mockDriverService.
                    // Note: mockDriverService.getIncomingRequests returns a promise that resolves to an array.
                    // We need to wrap it in an object if the query expects { data: ... } or match the return type.
                    // The query defined below returns any[]. The mock returns [].
                    // Let's assume ApiResponse wrapper isn't strictly enforced for this mock or wrap it.
                    // Actually, the original query returns `any[]`.
                    const data = await mockDriverService.getIncomingRequests();
                    return { data };
                }
                return baseQuery('requests') as any;
            },
            providesTags: ['Driver'],
        }),
    }),
});

export const { useUpdateStatusMutation, useGetIncomingRequestsQuery } = driverApi;
