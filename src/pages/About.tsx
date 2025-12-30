import React from 'react';
import { Users, Shield, Zap, Heart, Award, TrendingUp } from 'lucide-react';
import Card from '../components/ui/Card';

const About = () => {
    const values = [
        {
            icon: Shield,
            title: 'Safety First',
            description: 'Your safety is our top priority with 24/7 support and verified drivers.'
        },
        {
            icon: Zap,
            title: 'Fast & Reliable',
            description: 'Quick pickups and efficient routes to get you where you need to go.'
        },
        {
            icon: Heart,
            title: 'Customer Focused',
            description: 'We listen to feedback and continuously improve your experience.'
        },
        {
            icon: Award,
            title: 'Quality Service',
            description: 'Professional drivers and well-maintained vehicles for every ride.'
        }
    ];

    const stats = [
        { label: 'Active Users', value: '50K+' },
        { label: 'Rides Completed', value: '1M+' },
        { label: 'Cities Covered', value: '15+' },
        { label: 'Average Rating', value: '4.8★' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center animate-slide-up">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        About <span className="text-indigo-600">RideShare</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        We're revolutionizing urban transportation by connecting riders with reliable drivers,
                        making every journey safe, affordable, and convenient.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 mb-16">
                    {stats.map((stat, index) => (
                        <Card key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}>
                            <div className="text-3xl font-bold text-indigo-600 mb-2">{stat.value}</div>
                            <div className="text-sm text-gray-600">{stat.label}</div>
                        </Card>
                    ))}
                </div>

                {/* Mission Section */}
                <div className="mb-16 animate-slide-up">
                    <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <TrendingUp className="h-8 w-8" />
                            <h2 className="text-3xl font-bold">Our Mission</h2>
                        </div>
                        <p className="text-lg leading-relaxed opacity-95">
                            To provide accessible, safe, and efficient transportation solutions that empower
                            communities and create economic opportunities for drivers while delivering exceptional
                            experiences for riders. We believe in sustainable urban mobility that benefits everyone.
                        </p>
                    </Card>
                </div>

                {/* Values Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <Card
                                    key={index}
                                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all animate-slide-up"
                                    style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
                                >
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                                        <Icon className="h-8 w-8 text-indigo-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                                    <p className="text-gray-600">{value.description}</p>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* How It Works */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '1',
                                title: 'Request a Ride',
                                description: 'Enter your pickup and destination locations, choose your vehicle type.'
                            },
                            {
                                step: '2',
                                title: 'Get Matched',
                                description: 'We connect you with a nearby verified driver in seconds.'
                            },
                            {
                                step: '3',
                                title: 'Enjoy Your Ride',
                                description: 'Track your driver in real-time and enjoy a safe, comfortable journey.'
                            }
                        ].map((item, index) => (
                            <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 150}ms` } as React.CSSProperties}>
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full text-2xl font-bold mb-4">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Safety Features */}
                <Card className="bg-gray-50 animate-slide-up">
                    <div className="flex items-center gap-3 mb-6">
                        <Shield className="h-8 w-8 text-indigo-600" />
                        <h2 className="text-3xl font-bold text-gray-900">Safety Features</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            'Driver background checks and verification',
                            'Real-time GPS tracking for every ride',
                            '24/7 customer support and emergency assistance',
                            'In-app SOS button for immediate help',
                            'Share trip details with trusted contacts',
                            'Two-way rating system for accountability'
                        ].map((feature, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="text-gray-700">{feature}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default About;
