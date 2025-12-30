import { User } from '../types';

// Mock users for demo mode
export const mockUsers = {
    rider: {
        _id: 'mock-rider-1',
        name: 'Demo Rider',
        email: 'test@rider.com',
        role: 'rider' as const,
        phone: '+1234567890',
        isVerified: true,
        status: 'active' as const,
    },
    driver: {
        _id: 'mock-driver-1',
        name: 'Demo Driver',
        email: 'test@driver.com',
        role: 'driver' as const,
        phone: '+1234567891',
        isVerified: true,
        status: 'active' as const,
    },
    admin: {
        _id: 'mock-admin-1',
        name: 'Demo Admin',
        email: 'test@admin.com',
        role: 'admin' as const,
        phone: '+1234567892',
        isVerified: true,
        status: 'active' as const,
    },
};

// Mock authentication service
export const mockAuthService = {
    login: async (email: string, password: string) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Check credentials
        if (password !== 'password') {
            throw {
                status: 401,
                data: { message: 'Invalid password. Use "password" for demo accounts.' }
            };
        }

        // Find user by email
        const user = Object.values(mockUsers).find(u => u.email === email);

        if (!user) {
            throw {
                status: 401,
                data: { message: 'User not found. Try test@rider.com, test@driver.com, or test@admin.com' }
            };
        }

        // Return mock response matching API structure
        return {
            success: true,
            message: 'Login successful',
            data: {
                user,
                token: `mock-jwt-token-${user._id}-${Date.now()}`,
            },
        };
    },

    register: async (userData: {
        name: string;
        email: string;
        password: string;
        role: 'rider' | 'driver';
        phone?: string;
    }) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Check if email already exists
        const existingUser = Object.values(mockUsers).find(u => u.email === userData.email);
        if (existingUser) {
            throw {
                status: 400,
                data: { message: 'Email already registered. Try logging in instead.' }
            };
        }

        // Create new mock user
        const newUser: User = {
            _id: `mock-${userData.role}-${Date.now()}`,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            phone: userData.phone,
            isVerified: true,
            status: 'active',
        };

        // Return mock response
        return {
            success: true,
            message: 'Registration successful',
            data: {
                user: newUser,
                token: `mock-jwt-token-${newUser._id}-${Date.now()}`,
            },
        };
    },
};

// Mock driver service
export const mockDriverService = {
    updateStatus: async (status: 'online' | 'offline', location: { latitude: number; longitude: number }) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));

        return {
            success: true,
            message: `Status updated to ${status}`,
            data: {
                driver: {
                    ...mockUsers.driver,
                    status: status === 'online' ? 'active' : 'inactive',
                    location,
                },
            },
        };
    },

    getIncomingRequests: async () => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));

        // Return empty array (no requests in demo mode)
        return [];
    },
};
