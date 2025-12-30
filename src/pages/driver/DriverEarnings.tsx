import React, { useState } from 'react';
import { DollarSign, TrendingUp, Calendar, Download, Filter } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

interface Transaction {
    id: string;
    date: string;
    type: 'ride' | 'bonus' | 'tip';
    description: string;
    amount: number;
    status: 'completed' | 'pending';
}

const DriverEarnings = () => {
    const [period, setPeriod] = useState<'today' | 'week' | 'month'>('week');

    const transactions: Transaction[] = [
        { id: '1', date: '2024-12-26 10:30 AM', type: 'ride', description: 'Gulshan to Dhanmondi', amount: 250, status: 'completed' },
        { id: '2', date: '2024-12-26 9:15 AM', type: 'tip', description: 'Tip from rider', amount: 50, status: 'completed' },
        { id: '3', date: '2024-12-25 8:00 PM', type: 'ride', description: 'Banani to Mirpur', amount: 180, status: 'completed' },
        { id: '4', date: '2024-12-25 3:30 PM', type: 'bonus', description: 'Peak hour bonus', amount: 100, status: 'completed' },
        { id: '5', date: '2024-12-25 11:00 AM', type: 'ride', description: 'Uttara to Mohakhali', amount: 320, status: 'completed' },
        { id: '6', date: '2024-12-24 6:45 PM', type: 'ride', description: 'Bashundhara to Farmgate', amount: 200, status: 'completed' },
        { id: '7', date: '2024-12-24 2:00 PM', type: 'ride', description: 'Dhanmondi to Gulshan', amount: 220, status: 'pending' }
    ];

    const stats = {
        today: { total: 450, rides: 8, tips: 50, bonus: 100 },
        week: { total: 2850, rides: 42, tips: 250, bonus: 400 },
        month: { total: 12450, rides: 180, tips: 1100, bonus: 1800 }
    };

    const currentStats = stats[period];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 animate-slide-up">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Earnings</h1>
                    <p className="text-gray-600">Track your income and transaction history</p>
                </div>
                <Button variant="secondary">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                </Button>
            </div>

            {/* Period Selector */}
            <div className="flex gap-3 mb-8 animate-slide-up" style={{ animationDelay: '100ms' } as React.CSSProperties}>
                {(['today', 'week', 'month'] as const).map((p) => (
                    <button
                        key={p}
                        onClick={() => setPeriod(p)}
                        className={`px-6 py-2 rounded-lg font-medium transition-all ${period === p
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                            }`}
                    >
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="text-center animate-slide-up" style={{ animationDelay: '200ms' } as React.CSSProperties}>
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-3">
                        <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">৳{currentStats.total}</div>
                    <div className="text-sm text-gray-600">Total Earnings</div>
                </Card>
                <Card className="text-center animate-slide-up" style={{ animationDelay: '250ms' } as React.CSSProperties}>
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-3">
                        <TrendingUp className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">৳{currentStats.rides}</div>
                    <div className="text-sm text-gray-600">From Rides</div>
                </Card>
                <Card className="text-center animate-slide-up" style={{ animationDelay: '300ms' } as React.CSSProperties}>
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mb-3">
                        <DollarSign className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">৳{currentStats.tips}</div>
                    <div className="text-sm text-gray-600">Tips</div>
                </Card>
                <Card className="text-center animate-slide-up" style={{ animationDelay: '350ms' } as React.CSSProperties}>
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-3">
                        <TrendingUp className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">৳{currentStats.bonus}</div>
                    <div className="text-sm text-gray-600">Bonuses</div>
                </Card>
            </div>

            {/* Earnings Chart Placeholder */}
            <Card className="mb-8 animate-slide-up" style={{ animationDelay: '400ms' } as React.CSSProperties}>
                <h3 className="text-xl font-bold mb-4">Earnings Trend</h3>
                <div className="h-64 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                        <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Chart visualization coming soon</p>
                    </div>
                </div>
            </Card>

            {/* Transaction History */}
            <Card className="animate-slide-up" style={{ animationDelay: '450ms' } as React.CSSProperties}>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Transaction History</h3>
                    <Button variant="secondary" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                    </Button>
                </div>
                <div className="space-y-3">
                    {transactions.map((transaction, index) => (
                        <div
                            key={transaction.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${transaction.type === 'ride' ? 'bg-indigo-100' :
                                    transaction.type === 'tip' ? 'bg-yellow-100' :
                                        'bg-purple-100'
                                    }`}>
                                    <DollarSign className={`h-5 w-5 ${transaction.type === 'ride' ? 'text-indigo-600' :
                                        transaction.type === 'tip' ? 'text-yellow-600' :
                                            'text-purple-600'
                                        }`} />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{transaction.description}</p>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-sm text-gray-500 flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {transaction.date}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${transaction.type === 'ride' ? 'bg-indigo-100 text-indigo-700' :
                                            transaction.type === 'tip' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-purple-100 text-purple-700'
                                            }`}>
                                            {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-green-600">+৳{transaction.amount}</p>
                                <span className={`text-xs ${transaction.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                                    }`}>
                                    {transaction.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Payout Info */}
            <Card className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 animate-slide-up" style={{ animationDelay: '500ms' } as React.CSSProperties}>
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 mb-1">Next Payout</h3>
                        <p className="text-sm text-gray-600 mb-2">
                            Your earnings will be transferred to your account on <strong>Friday, Dec 29</strong>
                        </p>
                        <p className="text-2xl font-bold text-indigo-600">৳{currentStats.total}</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default DriverEarnings;
