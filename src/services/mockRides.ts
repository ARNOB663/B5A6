import { ApiResponse, Ride, User } from '../types';
import { CreateRideRequest } from '../features/rides/ridesApi';
import { mockUsers } from './mockAuth';

// Mock in-memory storage for rides (persists only during session unless we use localStorage)
// For simplicity, we'll keep it in memory.
let mockRides: Ride[] = [];

export const mockRideService = {
    createRide: async (request: CreateRideRequest): Promise<ApiResponse<{ ride: Ride }>> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const newRide: Ride = {
            _id: `mock-ride-${Date.now()}`,
            riderId: mockUsers.rider, // Assume current user is the mock rider
            pickupLocation: request.pickupLocation,
            destination: request.destination,
            vehicleType: request.vehicleType || 'bike',
            fare: 150, // Mock fare
            distance: 5.2, // Mock distance
            status: 'requested',
            requestedAt: new Date().toISOString(),
        };

        mockRides.unshift(newRide);

        return {
            success: true,
            message: 'Ride requested successfully',
            data: {
                ride: newRide
            }
        };
    },

    getRiderHistory: async (): Promise<ApiResponse<{ rides: Ride[] }>> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            success: true,
            message: 'Ride history retrieved',
            data: {
                rides: mockRides
            }
        };
    },

    getAvailableRides: async (): Promise<ApiResponse<{ rides: Ride[] }>> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            success: true,
            message: 'Available rides retrieved',
            data: {
                // Return only requested rides that don't have a driver yet
                rides: mockRides.filter(r => r.status === 'requested')
            }
        };
    }
};
