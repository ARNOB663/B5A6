import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse, Ride } from '../../types';
import { env, isDemoMode } from '../../config/env';
import { mockRideService } from '../../services/mockRides';

export interface CreateRideRequest {
    pickupLocation: {
        address: string;
        latitude: number;
        longitude: number;
    };
    destination: {
        address: string;
        latitude: number;
        longitude: number;
    };
    vehicleType?: string;
}

export const ridesApi = createApi({
    reducerPath: 'ridesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${env.VITE_API_BASE_URL}/rides`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Ride'],
    endpoints: (builder) => ({
        createRide: builder.mutation<ApiResponse<{ ride: Ride }>, CreateRideRequest>({
            queryFn: async (args, _api, _extraOptions, baseQuery) => {
                if (isDemoMode) {
                    return { data: await mockRideService.createRide(args) };
                }
                return baseQuery({
                    url: 'request',
                    method: 'POST',
                    body: args,
                }) as any;
            },
            invalidatesTags: ['Ride'],
        }),
        getRiderHistory: builder.query<ApiResponse<{ rides: Ride[] }>, void>({
            queryFn: async (_args, _api, _extraOptions, baseQuery) => {
                if (isDemoMode) {
                    return { data: await mockRideService.getRiderHistory() };
                }
                return baseQuery('me') as any;
            },
            providesTags: ['Ride'],
        }),
        getAvailableRides: builder.query<ApiResponse<{ rides: Ride[] }>, void>({
            queryFn: async (_args, _api, _extraOptions, baseQuery) => {
                if (isDemoMode) {
                    return { data: await mockRideService.getAvailableRides() };
                }
                return baseQuery('available') as any;
            },
            providesTags: ['Ride'],
        }),
        acceptRide: builder.mutation<ApiResponse<any>, string>({
            query: (rideId) => ({
                url: `${rideId}/accept`,
                method: 'PUT',
            }),
            invalidatesTags: ['Ride'],
        }),
    }),
});

export const {
    useCreateRideMutation,
    useGetRiderHistoryQuery,
    useGetAvailableRidesQuery,
    useAcceptRideMutation
} = ridesApi;
