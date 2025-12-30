import React from 'react';
import { MapPin, Shield, DollarSign, Clock, Star, Smartphone, Users, Zap, Bell, CreditCard } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const Features = () => {
    const navigate = useNavigate();

    const mainFeatures = [
        {
            icon: MapPin,
            title: 'Real-Time Tracking',
            description: 'Track your driver\'s location in real-time and get accurate ETAs for every ride.',
            color: 'bg-blue-500'
        },
        {
            icon: Shield,
            title: 'Safety First',
            description: 'Verified drivers, background checks, and 24/7 support ensure your safety.',
            color: 'bg-green-500'
        },
        {
            icon: DollarSign,
            title: 'Transparent Pricing',
            description: 'Know your fare upfront with no hidden charges. Pay with cash or card.',
            color: 'bg-yellow-500'
        },
        {
            icon: Clock,
            title: 'Quick Pickups',
            description: 'Get matched with nearby drivers in seconds for fast and efficient rides.',
            color: 'bg-purple-500'
        },
        {
            icon: Star,
            title: 'Quality Drivers',
            description: 'Professional, highly-rated drivers committed to excellent service.',
            color: 'bg-orange-500'
        },
        {
            icon: Smartphone,
            title: 'Easy to Use',
            description: 'Intuitive app interface makes booking rides simple and hassle-free.',
            color: 'bg-indigo-500'
        }
    ];

    const riderFeatures = [
        'Multiple vehicle options (Bike, Car, Premium)',
        'Fare estimation before booking',
        'Ride scheduling for future trips',
        'Ride history and receipts',
        'In-app SOS emergency button',
        'Share trip details with contacts',
        'Rate and review drivers',
        'Multiple payment methods'
    ];

    const driverFeatures = [
        'Flexible working hours',
        'Real-time earnings tracking',
        'Navigation assistance',
        'Accept/reject ride requests',
        'Performance analytics',
        'Weekly earnings summary',
        'In-app support',
        'Bonus and incentive programs'
    ];

    const pricingTiers = [
        {
            type: 'Bike',
            baseRate: '৳50',
            perKm: '৳15/km',
            description: 'Quick and affordable for solo riders',
            features: ['Fast pickup', 'Affordable rates', 'Perfect for short trips']
        },
        {
            type: 'Car',
            baseRate: '৳100',
            perKm: '৳25/km',
            description: 'Comfortable ride for individuals or groups',
            features: ['AC comfort', 'More space', 'Suitable for 3-4 people'],
            popular: true
        },
        {
            type: 'Premium',
            baseRate: '৳200',
            perKm: '৳40/km',
            description: 'Luxury experience with premium vehicles',
            features: ['Luxury cars', 'Top-rated drivers', 'Premium service']
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="text-center mb-16 animate-slide-up">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Amazing <span className="text-indigo-600">Features</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover what makes RideShare the best choice for your transportation needs.
                        We've built features that prioritize your safety, convenience, and satisfaction.
                    </p>
                </div>

                {/* Main Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {mainFeatures.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <Card
                                key={index}
                                className="text-center hover:shadow-xl transition-all animate-slide-up"
                                style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
                            >
                                <div className={`inline-flex items-center justify-center w-14 h-14 ${feature.color} rounded-lg mb-4`}>
                                    <Icon className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </Card>
                        );
                    })}
                </div>

                {/* For Riders & Drivers */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                    {/* Rider Features */}
                    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 animate-slide-up">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                                <Users className="h-6 w-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">For Riders</h2>
                        </div>
                        <div className="space-y-3">
                            {riderFeatures.map((feature, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center mt-0.5">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-700">{feature}</p>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Driver Features */}
                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 animate-slide-up" style={{ animationDelay: '100ms' } as React.CSSProperties}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                                <Zap className="h-6 w-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">For Drivers</h2>
                        </div>
                        <div className="space-y-3">
                            {driverFeatures.map((feature, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mt-0.5">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-700">{feature}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Pricing Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
                        Transparent Pricing
                    </h2>
                    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                        Choose the ride that fits your needs and budget. All prices are upfront with no hidden fees.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pricingTiers.map((tier, index) => (
                            <Card
                                key={index}
                                className={`text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up ${tier.popular ? 'ring-2 ring-indigo-600' : ''
                                    }`}
                                style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
                            >
                                {tier.popular && (
                                    <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                                        POPULAR
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.type}</h3>
                                <div className="text-3xl font-bold text-indigo-600 mb-1">{tier.baseRate}</div>
                                <div className="text-sm text-gray-500 mb-4">{tier.perKm}</div>
                                <p className="text-gray-600 mb-6">{tier.description}</p>
                                <div className="space-y-2">
                                    {tier.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center justify-center gap-2 text-sm text-gray-700">
                                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center animate-slide-up">
                    <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-lg mb-6 opacity-95">
                        Join thousands of satisfied riders and drivers. Experience the future of transportation today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={() => navigate('/register')}
                            variant="secondary"
                            size="lg"
                            className="bg-white text-indigo-600 hover:bg-gray-100"
                        >
                            Sign Up Now
                        </Button>
                        <Button
                            onClick={() => navigate('/login')}
                            size="lg"
                            className="bg-indigo-700 hover:bg-indigo-800 border-2 border-white"
                        >
                            Login
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Features;
