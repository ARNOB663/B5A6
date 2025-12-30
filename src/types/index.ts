export type UserRole = 'rider' | 'driver' | 'admin';

export interface User {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
    phone?: string;
    avatar?: string;
    isVerified?: boolean;
    status?: 'active' | 'blocked';
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

// Wrapper for all API responses
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface AuthResponseData {
    user: User;
    token: string;
}

export interface Pagination {
    currentPage: number;
    totalPages: number;
    totalUsers: number;
}

export interface UsersResponseData {
    users: User[];
    pagination: Pagination;
}

export interface Coordinate {
    latitude: number;
    longitude: number;
}

export interface Location {
    address?: string; // Optional in some cases? No, let's assume always there or optional
    latitude: number;
    longitude: number;
}

export interface Ride {
    _id: string;
    riderId: User | string; // API returns riderId object or ID
    driverId?: User | string;
    pickupLocation: Location;
    destination: Location;
    vehicleType?: string; // Type of vehicle (bike, car, premium)
    fare: number;
    distance: number;
    status: 'requested' | 'accepted' | 'in_transit' | 'completed' | 'cancelled';
    requestedAt: string;
    distanceFromDriver?: number;
}
