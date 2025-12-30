import { Coordinates } from './mapUtils';

export interface GeolocationResult {
    success: boolean;
    coordinates?: Coordinates;
    error?: string;
}

/**
 * Get user's current location using Geolocation API
 */
export const getCurrentLocation = (): Promise<GeolocationResult> => {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            resolve({
                success: false,
                error: 'Geolocation is not supported by your browser'
            });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    success: true,
                    coordinates: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                });
            },
            (error) => {
                let errorMessage = 'Unable to retrieve your location';

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Location permission denied';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information unavailable';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Location request timed out';
                        break;
                }

                // Fallback to default location (Dhaka)
                resolve({
                    success: false,
                    error: errorMessage,
                    coordinates: {
                        latitude: 23.8103,
                        longitude: 90.4125
                    }
                });
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    });
};

/**
 * Watch user's location for real-time updates
 */
export const watchLocation = (
    onUpdate: (coordinates: Coordinates) => void,
    onError?: (error: string) => void
): number => {
    if (!navigator.geolocation) {
        onError?.('Geolocation is not supported');
        return -1;
    }

    const watchId = navigator.geolocation.watchPosition(
        (position) => {
            onUpdate({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        },
        (error) => {
            let errorMessage = 'Unable to watch location';

            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'Location permission denied';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'Location information unavailable';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'Location request timed out';
                    break;
            }

            onError?.(errorMessage);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );

    return watchId;
};

/**
 * Stop watching user's location
 */
export const stopWatchingLocation = (watchId: number): void => {
    if (navigator.geolocation && watchId !== -1) {
        navigator.geolocation.clearWatch(watchId);
    }
};

/**
 * Check if geolocation is available
 */
export const isGeolocationAvailable = (): boolean => {
    return 'geolocation' in navigator;
};
