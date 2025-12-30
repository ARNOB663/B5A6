import React from 'react';
import { MapPin, Calendar, DollarSign, Star, User } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

interface Ride {
    id: string;
    date: string;
    pickup: string;
    dropoff: string;
    fare: number;
    driver: string;
    vehicleType: string;
    status: 'completed' | 'cancelled';
    rating?: number;
}

const RideHistory = () => {
    // Mock ride history data
    const rides: Ride[] = [
        {
            id: '1',
            date: '2024-12-25 10:30 AM',
            pickup: 'Gulshan 2, Dhaka',
            dropoff: 'Dhanmondi 27, Dhaka',
            fare: 250,
            driver: 'Ahmed Khan',
            vehicleType: 'Car',
            status: 'completed',
            rating: 5
        },
        {
            id: '2',
            date: '2024-12-24 3:15 PM',
            pickup: 'Banani, Dhaka',
            dropoff: 'Mirpur 10, Dhaka',
            fare: 180,
            driver: 'Rahim Uddin',
            vehicleType: 'Bike',
            status: 'completed',
            rating: 4
        },
        {
            id: '3',
            date: '2024-12-23 8:00 PM',
            pickup: 'Uttara Sector 7',
            dropoff: 'Mohakhali DOHS',
            fare: 320,
            driver: 'Karim Ahmed',
            vehicleType: 'Premium',
            status: 'completed',
            rating: 5
        },
        {
            id: '4',
            date: '2024-12-22 11:45 AM',
            pickup: 'Bashundhara R/A',
            dropoff: 'Farmgate',
            fare: 200,
            driver: 'Salam Mia',
            vehicleType: 'Car',
            status: 'cancelled'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8 animate-slide-up">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Ride History</h1>
                <p className="text-gray-600">View all your past rides and receipts</p>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="text-center animate-slide-up">
                    <div className="text-3xl font-bold text-indigo-600 mb-1">
                        {rides.filter(r => r.status === 'completed').length}
                    </div>
                    <div className="text-sm text-gray-600">Total Rides</div>
                </Card>
                <Card className="text-center animate-slide-up" style={{ animationDelay: '100ms' } as React.CSSProperties}>
                    <div className="text-3xl font-bold text-green-600 mb-1">
                        ৳{rides.filter(r => r.status === 'completed').reduce((sum, r) => sum + r.fare, 0)}
                    </div>
                    <div className="text-sm text-gray-600">Total Spent</div>
                </Card>
                <Card className="text-center animate-slide-up" style={{ animationDelay: '200ms' } as React.CSSProperties}>
                    <div className="text-3xl font-bold text-yellow-600 mb-1">
                        {(rides.filter(r => r.rating).reduce((sum, r) => sum + (r.rating || 0), 0) / rides.filter(r => r.rating).length).toFixed(1)}★
                    </div>
                    <div className="text-sm text-gray-600">Avg. Rating</div>
                </Card>
                <Card className="text-center animate-slide-up" style={{ animationDelay: '300ms' } as React.CSSProperties}>
                    <div className="text-3xl font-bold text-red-600 mb-1">
                        {rides.filter(r => r.status === 'cancelled').length}
                    </div>
                    <div className="text-sm text-gray-600">Cancelled</div>
                </Card>
            </div>

            {/* Ride List */}
            <div className="space-y-4">
                {rides.map((ride, index) => (
                    <Card
                        key={ride.id}
                        className="hover:shadow-lg transition-all duration-300 animate-slide-up"
                        style={{ animationDelay: `${index * 50}ms` } as React.CSSProperties}
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            {/* Ride Info */}
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${ride.status === 'completed'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                        }`}>
                                        {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                                    </span>
                                    <span className="text-sm text-gray-500 flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        {ride.date}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Pickup</p>
                                            <p className="font-medium text-gray-900">{ride.pickup}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-1">
                                            <MapPin className="h-4 w-4 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Dropoff</p>
                                            <p className="font-medium text-gray-900">{ride.dropoff}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                                    <span className="flex items-center gap-1">
                                        <User className="h-4 w-4" />
                                        {ride.driver}
                                    </span>
                                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                                        {ride.vehicleType}
                                    </span>
                                </div>
                            </div>

                            {/* Fare & Actions */}
                            <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-3">
                                <div className="text-center md:text-right">
                                    <p className="text-sm text-gray-500 mb-1">Fare</p>
                                    <p className="text-2xl font-bold text-indigo-600 flex items-center gap-1">
                                        <DollarSign className="h-5 w-5" />
                                        ৳{ride.fare}
                                    </p>
                                </div>

                                {ride.status === 'completed' && (
                                    <div className="flex flex-col gap-2">
                                        {ride.rating && (
                                            <div className="flex items-center gap-1 text-yellow-500">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-4 w-4 ${i < ride.rating! ? 'fill-current' : ''
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                        <Button variant="secondary" size="sm">
                                            View Receipt
                                        </Button>
                                        <Button variant="primary" size="sm">
                                            Rebook
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Empty State (if no rides) */}
            {rides.length === 0 && (
                <Card className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                        <MapPin className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">No rides yet</p>
                    <p className="text-sm text-gray-400 mt-1">Your ride history will appear here</p>
                </Card>
            )}
        </div>
    );
};

export default RideHistory;
