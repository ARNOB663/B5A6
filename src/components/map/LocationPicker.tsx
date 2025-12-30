import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Loader2 } from 'lucide-react';
import { searchLocations, Location } from '../../utils/mapUtils';
import { getCurrentLocation } from '../../utils/geolocation';
import toast from 'react-hot-toast';

interface LocationPickerProps {
    value: string;
    onChange: (location: Location) => void;
    placeholder?: string;
    label?: string;
    error?: string;
    icon?: 'pickup' | 'dropoff';
}

const LocationPicker: React.FC<LocationPickerProps> = ({
    value,
    onChange,
    placeholder = 'Enter location',
    label,
    error,
    icon = 'pickup'
}) => {
    const [inputValue, setInputValue] = useState(value);
    const [suggestions, setSuggestions] = useState<Location[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isGettingLocation, setIsGettingLocation] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Search locations when input changes
    useEffect(() => {
        const searchTimeout = setTimeout(async () => {
            if (inputValue.length >= 2) {
                setIsLoading(true);
                try {
                    const results = await searchLocations(inputValue);
                    setSuggestions(results);
                    setShowSuggestions(true);
                } catch (error) {
                    // Error is already logged by the utility function if needed
                    setSuggestions([]);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 300);

        return () => clearTimeout(searchTimeout);
    }, [inputValue]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSelectLocation = (location: Location) => {
        setInputValue(location.address);
        onChange(location);
        setShowSuggestions(false);
    };

    const handleUseCurrentLocation = async () => {
        setIsGettingLocation(true);
        try {
            const result = await getCurrentLocation();

            if (result.success && result.coordinates) {
                // In a real app, we'd reverse geocode to get the address
                const mockAddress = `Current Location (${result.coordinates.latitude.toFixed(4)}, ${result.coordinates.longitude.toFixed(4)})`;
                const location: Location = {
                    address: mockAddress,
                    latitude: result.coordinates.latitude,
                    longitude: result.coordinates.longitude
                };

                setInputValue(mockAddress);
                onChange(location);
                toast.success('Current location set');
            } else {
                toast.error(result.error || 'Unable to get location');

                // Use fallback location
                if (result.coordinates) {
                    const fallbackAddress = 'Dhaka, Bangladesh (Default)';
                    const location: Location = {
                        address: fallbackAddress,
                        latitude: result.coordinates.latitude,
                        longitude: result.coordinates.longitude
                    };
                    setInputValue(fallbackAddress);
                    onChange(location);
                }
            }
        } catch (error) {
            toast.error('Failed to get current location');
        } finally {
            setIsGettingLocation(false);
        }
    };

    const iconColor = icon === 'pickup' ? 'text-green-500' : 'text-red-500';

    return (
        <div className="relative" ref={wrapperRef}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}

            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className={`h-5 w-5 ${iconColor}`} />
                </div>

                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                    placeholder={placeholder}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${error ? 'border-red-500' : 'border-gray-300'
                        }`}
                />

                <button
                    type="button"
                    onClick={handleUseCurrentLocation}
                    disabled={isGettingLocation}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-indigo-600 hover:text-indigo-700 transition-colors"
                    title="Use current location"
                >
                    {isGettingLocation ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <Navigation className="h-5 w-5" />
                    )}
                </button>
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}

            {/* Suggestions Dropdown */}
            {showSuggestions && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto animate-slide-up">
                    {isLoading ? (
                        <div className="p-4 text-center text-gray-500">
                            <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                        </div>
                    ) : suggestions.length > 0 ? (
                        suggestions.map((location, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => handleSelectLocation(location)}
                                className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                            >
                                <MapPin className={`h-4 w-4 ${iconColor} flex-shrink-0`} />
                                <span className="text-gray-900">{location.address}</span>
                            </button>
                        ))
                    ) : (
                        <div className="p-4 text-center text-gray-500">
                            No locations found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default LocationPicker;
