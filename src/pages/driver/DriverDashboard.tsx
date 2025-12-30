import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import Button from '../../components/ui/Button';
import Card, { StatCard } from '../../components/ui/Card';
import Map from '../../components/map/Map';
import { useUpdateStatusMutation, useGetIncomingRequestsQuery } from '../../features/driver/driverApi';
import { Loader2, Power, DollarSign, Clock, MapPin, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { handleApiError } from '../../utils/errorHandler';
import { isDemoMode } from '../../config/env';
import { mockDriverService } from '../../services/mockAuth';

const DriverDashboard = () => {
    const { user } = useAppSelector((state) => state.auth);
    const [isOnline, setIsOnline] = useState(user?.status === 'active');
    const [updateStatus, { isLoading: isUpdating }] = useUpdateStatusMutation();

    const { data: requests, isLoading: isLoadingRequests } = useGetIncomingRequestsQuery(undefined, {
        skip: !isOnline
    });

    // Mock driver location (Dhaka)
    const driverLocation: [number, number] = [23.8103, 90.4125];

    const toggleAvailability = async () => {
        try {
            const newStatus = isOnline ? 'offline' : 'online';

            // Use mock service in demo mode
            if (isDemoMode) {
                await mockDriverService.updateStatus(newStatus, {
                    latitude: driverLocation[0],
                    longitude: driverLocation[1]
                });
            } else {
                await updateStatus({
                    status: newStatus,
                    location: { latitude: driverLocation[0], longitude: driverLocation[1] }
                }).unwrap();
            }

            setIsOnline(!isOnline);
            toast.success(`You are now ${newStatus}`);
        } catch (err) {
            const errorMessage = handleApiError(err, 'DriverDashboard', 'Failed to update status');
            toast.error(errorMessage);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Driver Dashboard</h1>
                <div className="flex items-center gap-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isOnline
                        ? 'bg-green-100 text-green-800 shadow-sm'
                        : 'bg-gray-100 text-gray-800'
                        }`}>
                        {isOnline ? '🟢 Online' : '⚫ Offline'}
                    </span>
                    <Button
                        onClick={toggleAvailability}
                        variant={isOnline ? 'danger' : 'primary'}
                        isLoading={isUpdating}
                        size="sm"
                        className="ripple"
                    >
                        <Power className="h-4 w-4 mr-2" />
                        {isOnline ? 'Go Offline' : 'Go Online'}
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatCard
                    label="Today's Earnings"
                    value="৳450"
                    icon={<DollarSign className="h-6 w-6" />}
                    color="bg-green-500"
                    trend={{ value: 12, isPositive: true }}
                />
                <StatCard
                    label="Completed Rides"
                    value="8"
                    icon={<MapPin className="h-6 w-6" />}
                    color="bg-indigo-500"
                    trend={{ value: 5, isPositive: true }}
                />
                <StatCard
                    label="Online Time"
                    value="6.5h"
                    icon={<Clock className="h-6 w-6" />}
                    color="bg-blue-500"
                />
                <StatCard
                    label="Rating"
                    value="4.8"
                    icon={<TrendingUp className="h-6 w-6" />}
                    color="bg-yellow-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Map and Requests Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Driver Location Map */}
                    <Card>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <MapPin className="text-indigo-600" />
                            Your Location
                        </h3>
                        <div className="h-[350px] rounded-lg overflow-hidden">
                            <Map
                                center={driverLocation}
                                zoom={14}
                                markers={[
                                    {
                                        position: driverLocation,
                                        popup: 'Your current location'
                                    }
                                ]}
                            />
                        </div>
                    </Card>

                    {/* Incoming Requests */}
                    <Card>
                        <h3 className="text-xl font-bold mb-4">Incoming Requests</h3>
                        {!isOnline ? (
                            <div className="flex flex-col items-center justify-center py-12 text-gray-500 bg-gray-50 rounded-lg">
                                <Power className="h-12 w-12 mb-3 opacity-50" />
                                <p className="font-medium">You are offline</p>
                                <p className="text-sm mt-1">Go online to receive ride requests</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {isLoadingRequests ? (
                                    <div className="flex justify-center py-8">
                                        <Loader2 className="animate-spin h-8 w-8 text-indigo-600" />
                                    </div>
                                ) : requests && requests.length > 0 ? (
                                    requests.map((req: any) => (
                                        <div
                                            key={req.id || req._id}
                                            className="border border-gray-200 p-4 rounded-lg hover:border-indigo-300 transition-all hover:shadow-md"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-semibold text-gray-900">New Ride Request</p>
                                                    <p className="text-sm text-gray-500 mt-1">Request ID: {req.id || req._id}</p>
                                                </div>
                                                <Button size="sm" variant="primary">Accept</Button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-3 shadow-sm">
                                            <MapPin className="h-8 w-8 text-gray-400" />
                                        </div>
                                        <p className="font-medium">No active requests</p>
                                        <p className="text-sm mt-1">Scanning for nearby riders...</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </Card>
                </div>

                {/* Stats and Activity Column */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Weekly Summary */}
                    <Card>
                        <h3 className="text-lg font-bold mb-4">Weekly Summary</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b">
                                <span className="text-sm text-gray-600">Total Earnings</span>
                                <span className="font-bold text-gray-900">৳2,850</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b">
                                <span className="text-sm text-gray-600">Total Rides</span>
                                <span className="font-bold text-gray-900">42</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b">
                                <span className="text-sm text-gray-600">Avg. Rating</span>
                                <span className="font-bold text-gray-900">4.8 ⭐</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Online Hours</span>
                                <span className="font-bold text-gray-900">38.5h</span>
                            </div>
                        </div>
                    </Card>

                    {/* Recent Activity */}
                    <Card>
                        <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-b-0">
                                    <div className="p-2 bg-indigo-100 rounded-lg">
                                        <MapPin className="h-4 w-4 text-indigo-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">Completed ride</p>
                                        <p className="text-xs text-gray-500">Gulshan to Dhanmondi</p>
                                        <p className="text-xs text-gray-400 mt-1">{i}h ago</p>
                                    </div>
                                    <span className="text-sm font-semibold text-green-600">৳{120 + i * 10}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DriverDashboard;
