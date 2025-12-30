export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface Location {
    address: string;
    latitude: number;
    longitude: number;
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in kilometers
 */
export const calculateDistance = (
    point1: Coordinates,
    point2: Coordinates
): number => {
    const R = 6371; // Earth's radius in km
    const dLat = toRad(point2.latitude - point1.latitude);
    const dLon = toRad(point2.longitude - point1.longitude);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(point1.latitude)) *
        Math.cos(toRad(point2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Math.round(distance * 100) / 100; // Round to 2 decimal places
};

const toRad = (degrees: number): number => {
    return degrees * (Math.PI / 180);
};

/**
 * Estimate fare based on distance and vehicle type
 */
export const estimateFare = (
    distance: number,
    vehicleType: 'bike' | 'car' | 'premium'
): number => {
    const baseRates = {
        bike: { base: 50, perKm: 15 },
        car: { base: 100, perKm: 25 },
        premium: { base: 200, perKm: 40 }
    };

    const rate = baseRates[vehicleType];
    const fare = rate.base + (distance * rate.perKm);

    return Math.round(fare);
};

/**
 * Generate a simple route path between two points
 * In a real app, this would call a routing API
 */
export const generateRoutePath = (
    start: Coordinates,
    end: Coordinates
): [number, number][] => {
    // Simple straight line with slight curve for visual appeal
    const points: [number, number][] = [];
    const steps = 20;

    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const lat = start.latitude + (end.latitude - start.latitude) * t;
        const lng = start.longitude + (end.longitude - start.longitude) * t;

        // Add slight curve
        const curvature = Math.sin(t * Math.PI) * 0.002;
        points.push([lat + curvature, lng + curvature]);
    }

    return points;
};

/**
 * Mock location search - simulates geocoding API
 */
export const searchLocations = async (query: string): Promise<Location[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Mock locations in Dhaka, Bangladesh
    const mockLocations: Location[] = [
        { address: 'Gulshan 1, Dhaka', latitude: 23.7808, longitude: 90.4152 },
        { address: 'Dhanmondi 27, Dhaka', latitude: 23.7461, longitude: 90.3742 },
        { address: 'Banani, Dhaka', latitude: 23.7937, longitude: 90.4066 },
        { address: 'Uttara, Dhaka', latitude: 23.8759, longitude: 90.3795 },
        { address: 'Mirpur 10, Dhaka', latitude: 23.8069, longitude: 90.3687 },
        { address: 'Mohakhali, Dhaka', latitude: 23.7808, longitude: 90.4028 },
        { address: 'Farmgate, Dhaka', latitude: 23.7577, longitude: 90.3897 },
        { address: 'Motijheel, Dhaka', latitude: 23.7334, longitude: 90.4176 },
        { address: 'Shahbag, Dhaka', latitude: 23.7389, longitude: 90.3952 },
        { address: 'New Market, Dhaka', latitude: 23.7345, longitude: 90.3866 }
    ];

    if (!query || query.length < 2) {
        return [];
    }

    // Filter locations based on query
    return mockLocations.filter(loc =>
        loc.address.toLowerCase().includes(query.toLowerCase())
    );
};

/**
 * Format address for display
 */
export const formatAddress = (address: string): string => {
    return address.trim();
};

/**
 * Get default map center (Dhaka, Bangladesh)
 */
export const getDefaultCenter = (): [number, number] => {
    return [23.8103, 90.4125];
};

/**
 * Calculate estimated time based on distance (assuming average speed)
 */
export const estimateTime = (distance: number): number => {
    const averageSpeed = 30; // km/h in city traffic
    const timeInHours = distance / averageSpeed;
    const timeInMinutes = Math.round(timeInHours * 60);
    return timeInMinutes;
};
