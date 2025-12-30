import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { ArrowRight, ShieldCheck, Clock, CreditCard, Star, MapPin, Car } from 'lucide-react';

const Home = () => {
    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-indigo-900 to-purple-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                            Your Ride, Your Way.<br />
                            <span className="text-indigo-400">Safe. Reliable. Fast.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8">
                            Experience the best ride-sharing service in the city. Whether you need a quick bike ride or a comfortable car, we've got you covered.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/register">
                                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4 bg-indigo-500 hover:bg-indigo-600 border-none shadow-xl transform hover:scale-105 transition-all">
                                    Get Started
                                </Button>
                            </Link>
                            <Link to="/about">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-4 text-white border-white hover:bg-white/10">
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits / Features */}
            <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose RideShare?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">We prioritize your safety and comfort above all else. Here is what makes us stand out.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: ShieldCheck, title: 'Safe & Secure', desc: 'Verified drivers and real-time tracking for your peace of mind.' },
                        { icon: Clock, title: 'Always On Time', desc: 'Our advanced algorithm ensures the fastest pickup and drop-off times.' },
                        { icon: CreditCard, title: 'Affordable Pricing', desc: 'Transparent pricing with no hidden fees. Pay your way.' }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow text-center">
                            <div className="inline-flex items-center justify-center p-4 bg-indigo-50 rounded-full mb-6">
                                <item.icon className="h-8 w-8 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                            <p className="text-gray-600">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How it Works */}
            <section className="bg-white py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-gray-600">Getting a ride is easier than ever.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative">
                        <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gray-200 -z-10"></div>
                        {[
                            { step: '01', title: 'Book a Ride', desc: 'Set your pickup and drop-off on the app.', icon: MapPin },
                            { step: '02', title: 'Get Matched', desc: 'We connect you with the nearest driver.', icon: Car },
                            { step: '03', title: 'Arrive Safely', desc: 'Enjoy your ride and rate your driver.', icon: Star }
                        ].map((item, idx) => (
                            <div key={idx} className="relative z-10 bg-white inline-block">
                                <div className="w-16 h-16 mx-auto bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-6 shadow-lg">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-indigo-600 py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to get started?</h2>
                    <p className="text-indigo-100 text-lg mb-8">Join thousands of happy riders and drivers today.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/register">
                            <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50 w-full sm:w-auto">
                                Sign Up Now
                            </Button>
                        </Link>
                        <Link to="/contact">
                            <Button size="lg" variant="outline" className="text-white border-white hover:bg-indigo-700 w-full sm:w-auto">
                                Contact Sales
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
