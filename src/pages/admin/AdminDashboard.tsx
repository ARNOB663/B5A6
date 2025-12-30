import React, { useState } from 'react';
import { Users, Car, DollarSign, Activity, Search, TrendingUp, MapPin } from 'lucide-react';
import Card, { StatCard } from '../../components/ui/Card';
import Map from '../../components/map/Map';

const AdminDashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Mock active rides for map
    const activeRideLocations: [number, number][] = [
        [23.8103, 90.4125],
        [23.7808, 90.4152],
        [23.7461, 90.3742]
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold mb-8 text-gray-900">Admin Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    label="Total Rides"
                    value="1,234"
                    icon={<Car className="h-6 w-6" />}
                    color="bg-indigo-500"
                    trend={{ value: 8, isPositive: true }}
                />
                <StatCard
                    label="Total Users"
                    value="5,678"
                    icon={<Users className="h-6 w-6" />}
                    color="bg-green-500"
                    trend={{ value: 12, isPositive: true }}
                />
                <StatCard
                    label="Total Revenue"
                    value="৳45,678"
                    icon={<DollarSign className="h-6 w-6" />}
                    color="bg-yellow-500"
                    trend={{ value: 15, isPositive: true }}
                />
                <StatCard
                    label="Active Drivers"
                    value="89"
                    icon={<Activity className="h-6 w-6" />}
                    color="bg-blue-500"
                    trend={{ value: 3, isPositive: false }}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Active Rides Map */}
                <div className="lg:col-span-2">
                    <Card>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <MapPin className="text-indigo-600" />
                            Active Rides Overview
                        </h3>
                        <div className="h-[400px] rounded-lg overflow-hidden">
                            <Map
                                center={[23.8103, 90.4125]}
                                zoom={12}
                                markers={activeRideLocations.map((pos, idx) => ({
                                    position: pos,
                                    popup: `Active Ride #${idx + 1}`
                                }))}
                            />
                        </div>
                    </Card>
                </div>

                {/* Quick Stats */}
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <h3 className="text-lg font-bold mb-4">Today's Overview</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b">
                                <span className="text-sm text-gray-600">Completed Rides</span>
                                <span className="font-bold text-gray-900">156</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b">
                                <span className="text-sm text-gray-600">Active Rides</span>
                                <span className="font-bold text-green-600">23</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b">
                                <span className="text-sm text-gray-600">Revenue</span>
                                <span className="font-bold text-gray-900">৳12,450</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Avg. Rating</span>
                                <span className="font-bold text-gray-900">4.7 ⭐</span>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <h3 className="text-lg font-bold mb-4">System Status</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Server Status</span>
                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                    Online
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">API Response</span>
                                <span className="text-sm font-semibold text-gray-900">45ms</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Uptime</span>
                                <span className="text-sm font-semibold text-gray-900">99.9%</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* User Management Section */}
            <Card>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h2 className="text-xl font-bold">User Management</h2>
                    <div className="w-full sm:w-64">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Name</th>
                                <th className="px-6 py-4 font-semibold">Role</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Rides</th>
                                <th className="px-6 py-4 font-semibold">Rating</th>
                                <th className="px-6 py-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { name: 'John Doe', role: 'Rider', status: 'Active', rides: 45, rating: 4.8 },
                                { name: 'Jane Smith', role: 'Driver', status: 'Active', rides: 128, rating: 4.9 },
                                { name: 'Mike Johnson', role: 'Rider', status: 'Inactive', rides: 12, rating: 4.5 }
                            ].map((user, i) => (
                                <tr key={i} className="border-b hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'Driver'
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-purple-100 text-purple-800'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'Active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">{user.rides}</td>
                                    <td className="px-6 py-4 text-gray-700">{user.rating} ⭐</td>
                                    <td className="px-6 py-4">
                                        <button className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline transition-colors">
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default AdminDashboard;
