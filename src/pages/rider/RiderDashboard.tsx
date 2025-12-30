import React, { useState } from 'react';
import RideRequestForm from '../../features/rides/RideRequestForm';
import RouteMap from '../../components/map/RouteMap';
import SOSButton from '../../components/ui/SOSButton';
import Card from '../../components/ui/Card';
import { Clock, MapPin, User } from 'lucide-react';
import { Location } from '../../utils/mapUtils';

const RiderDashboard = () => {
    // Mock state for demonstration - in real app, this would come from Redux/API
    const [activeRide, setActiveRide] = useState<any>(null);

    // Lifted state for map synchronization
    const [pickupLocation, setPickupLocation] = useState<Location | null>(null);
    const [dropoffLocation, setDropoffLocation] = useState<Location | null>(null);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Ride Request Form */}
                <div className="lg:col-span-1">
                    <RideRequestForm
                        pickupLocation={pickupLocation}
                        setPickupLocation={setPickupLocation}
                        dropoffLocation={dropoffLocation}
                        setDropoffLocation={setDropoffLocation}
                    />
                </div>

                {/* Map Section */}
                <div className="lg:col-span-2">
                    <Card className="h-full min-h-[500px]">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <MapPin className="text-indigo-600" />
                            Live Map
                        </h3>
                        <div className="h-[450px] rounded-lg overflow-hidden">
                            <RouteMap
                                pickup={pickupLocation || undefined}
                                dropoff={dropoffLocation || undefined}
                                showRoute={!!(pickupLocation && dropoffLocation)}
                            />
                        </div>
                    </Card>
                </div>
            </div>

            {/* Ride Status Section */}
            {activeRide && (
                <div className="mt-8 animate-slide-up">
                    <Card>
                        <h3 className="text-xl font-bold mb-4">Current Ride Status</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-indigo-100 rounded-full">
                                    <User className="h-6 w-6 text-indigo-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Driver</p>
                                    <p className="font-semibold">John Doe</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-green-100 rounded-full">
                                    <MapPin className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <p className="font-semibold">On the way</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-yellow-100 rounded-full">
                                    <Clock className="h-6 w-6 text-yellow-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">ETA</p>
                                    <p className="font-semibold">5 minutes</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {/* Ride History */}
            <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Recent Rides</h3>
                    <button
                        onClick={() => window.location.href = '/rider/history'}
                        className="text-indigo-600 hover:text-indigo-700 font-medium text-sm hover:underline"
                    >
                        View All →
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        {
                            date: 'Today, 10:30 AM',
                            pickup: 'Gulshan 2',
                            dropoff: 'Dhanmondi 27',
                            fare: 250,
                            status: 'completed'
                        },
                        {
                            date: 'Yesterday, 3:15 PM',
                            pickup: 'Banani',
                            dropoff: 'Mirpur 10',
                            fare: 180,
                            status: 'completed'
                        }
                    ].map((ride, index) => (
                        <Card key={index} className="hover:shadow-md transition-all">
                            <div className="flex justify-between items-start mb-3">
                                <span className="text-sm text-gray-500">{ride.date}</span>
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                    {ride.status}
                                </span>
                            </div>
                            <div className="space-y-2 mb-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-gray-700">{ride.pickup}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="h-4 w-4 text-red-500" />
                                    <span className="text-gray-700">{ride.dropoff}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center pt-3 border-t">
                                <span className="text-lg font-bold text-indigo-600">৳{ride.fare}</span>
                                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                                    View Details
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <SOSButton />
        </div>
    );
};

export default RiderDashboard;
