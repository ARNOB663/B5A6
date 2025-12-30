import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../../components/ui/Button';
import LocationPicker from '../../components/map/LocationPicker';
import { useCreateRideMutation } from '../rides/ridesApi';
import toast from 'react-hot-toast';
import { Navigation, DollarSign, Bike, Car, Crown } from 'lucide-react';
import { Location, calculateDistance, estimateFare } from '../../utils/mapUtils';
import { handleApiError } from '../../utils/errorHandler';

const rideSchema = z.object({
    vehicleType: z.enum(['bike', 'car', 'premium']),
});

type RideFormData = z.infer<typeof rideSchema>;

interface RideRequestFormProps {
    pickupLocation: Location | null;
    setPickupLocation: (location: Location | null) => void;
    dropoffLocation: Location | null;
    setDropoffLocation: (location: Location | null) => void;
}

const RideRequestForm: React.FC<RideRequestFormProps> = ({
    pickupLocation,
    setPickupLocation,
    dropoffLocation,
    setDropoffLocation
}) => {
    const [createRide, { isLoading }] = useCreateRideMutation();
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<RideFormData>({
        resolver: zodResolver(rideSchema),
        defaultValues: {
            vehicleType: 'bike'
        }
    });

    const [estimatedFare, setEstimatedFare] = useState<number | null>(null);
    const [distance, setDistance] = useState<number | null>(null);

    const vehicleType = watch('vehicleType');

    // Calculate fare when locations or vehicle type changes
    useEffect(() => {
        if (pickupLocation && dropoffLocation) {
            const dist = calculateDistance(
                { latitude: pickupLocation.latitude, longitude: pickupLocation.longitude },
                { latitude: dropoffLocation.latitude, longitude: dropoffLocation.longitude }
            );
            setDistance(dist);

            const fare = estimateFare(dist, vehicleType);
            setEstimatedFare(fare);
        } else {
            setDistance(null);
            setEstimatedFare(null);
        }
    }, [pickupLocation, dropoffLocation, vehicleType]);

    const onSubmit = async (data: RideFormData) => {
        if (!pickupLocation || !dropoffLocation) {
            toast.error('Please select both pickup and dropoff locations');
            return;
        }

        try {
            const apiPayload = {
                pickupLocation: {
                    address: pickupLocation.address,
                    latitude: pickupLocation.latitude,
                    longitude: pickupLocation.longitude
                },
                destination: {
                    address: dropoffLocation.address,
                    latitude: dropoffLocation.latitude,
                    longitude: dropoffLocation.longitude
                }
            };

            await createRide(apiPayload).unwrap();
            toast.success('Ride requested successfully! Waiting for a driver...');

            // Reset form
            setPickupLocation(null);
            setDropoffLocation(null);
            setValue('vehicleType', 'bike');
        } catch (err) {
            const errorMessage = handleApiError(err, 'RideRequestForm', 'Failed to request ride.');
            toast.error(errorMessage);
        }
    };

    const vehicleOptions = [
        {
            type: 'bike' as const,
            label: 'Bike',
            icon: Bike,
            description: 'Quick & Affordable',
            baseRate: '৳50'
        },
        {
            type: 'car' as const,
            label: 'Car',
            icon: Car,
            description: 'Comfortable Ride',
            baseRate: '৳100'
        },
        {
            type: 'premium' as const,
            label: 'Premium',
            icon: Crown,
            description: 'Luxury Experience',
            baseRate: '৳200'
        }
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-md animate-slide-up">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Navigation className="text-indigo-600" />
                Request a Ride
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <LocationPicker
                    value={pickupLocation?.address || ''}
                    onChange={setPickupLocation}
                    placeholder="Enter pickup location"
                    label="Pickup Location"
                    icon="pickup"
                />

                <LocationPicker
                    value={dropoffLocation?.address || ''}
                    onChange={setDropoffLocation}
                    placeholder="Enter dropoff location"
                    label="Dropoff Location"
                    icon="dropoff"
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Vehicle Type</label>
                    <div className="grid grid-cols-3 gap-3">
                        {vehicleOptions.map((option) => {
                            const Icon = option.icon;
                            const isSelected = vehicleType === option.type;

                            return (
                                <label key={option.type} className="cursor-pointer">
                                    <input
                                        type="radio"
                                        value={option.type}
                                        className="sr-only peer"
                                        {...register('vehicleType')}
                                    />
                                    <div className={`rounded-lg border-2 p-3 text-center transition-all hover:shadow-md ${isSelected
                                        ? 'border-indigo-600 bg-indigo-50 shadow-md'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}>
                                        <Icon className={`h-6 w-6 mx-auto mb-1 ${isSelected ? 'text-indigo-600' : 'text-gray-400'
                                            }`} />
                                        <div className={`font-semibold text-sm ${isSelected ? 'text-indigo-700' : 'text-gray-700'
                                            }`}>
                                            {option.label}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {option.description}
                                        </div>
                                    </div>
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* Fare Estimation */}
                {estimatedFare !== null && distance !== null && (
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100 animate-slide-up">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Estimated Fare</p>
                                <p className="text-2xl font-bold text-indigo-600 flex items-center gap-1">
                                    <DollarSign className="h-5 w-5" />
                                    ৳{estimatedFare}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-600">Distance</p>
                                <p className="text-lg font-semibold text-gray-900">{distance.toFixed(2)} km</p>
                            </div>
                        </div>
                    </div>
                )}

                <Button
                    type="submit"
                    isLoading={isLoading}
                    fullWidth
                    size="lg"
                    className="ripple"
                >
                    Find Driver
                </Button>
            </form>
        </div>
    );
};

export default RideRequestForm;
