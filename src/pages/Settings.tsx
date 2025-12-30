import React, { useState } from 'react';
import { Bell, Lock, Globe, CreditCard, Trash2, Moon, Sun, Volume2, Shield } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import toast from 'react-hot-toast';

const Settings = () => {
    const [notifications, setNotifications] = useState({
        rideUpdates: true,
        promotions: false,
        newsletter: true,
        sms: false
    });

    const [privacy, setPrivacy] = useState({
        shareLocation: true,
        showProfile: true,
        allowMessages: true
    });

    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('en');
    const [soundEnabled, setSoundEnabled] = useState(true);

    const handleNotificationChange = (key: keyof typeof notifications) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
        toast.success('Notification settings updated');
    };

    const handlePrivacyChange = (key: keyof typeof privacy) => {
        setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
        toast.success('Privacy settings updated');
    };

    const handleDeleteAccount = () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            toast.error('Account deletion feature coming soon');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8 animate-slide-up">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
                    <p className="text-gray-600">Manage your account preferences and settings</p>
                </div>

                <div className="space-y-6">
                    {/* Notifications */}
                    <Card className="animate-slide-up">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                <Bell className="h-5 w-5 text-indigo-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                        </div>
                        <div className="space-y-4">
                            {[
                                { key: 'rideUpdates', label: 'Ride Updates', description: 'Get notified about ride status changes' },
                                { key: 'promotions', label: 'Promotions & Offers', description: 'Receive special deals and discounts' },
                                { key: 'newsletter', label: 'Newsletter', description: 'Stay updated with our latest news' },
                                { key: 'sms', label: 'SMS Notifications', description: 'Receive text messages for important updates' }
                            ].map((item) => (
                                <div key={item.key} className="flex items-center justify-between pb-4 border-b last:border-b-0">
                                    <div>
                                        <p className="font-medium text-gray-900">{item.label}</p>
                                        <p className="text-sm text-gray-500">{item.description}</p>
                                    </div>
                                    <button
                                        onClick={() => handleNotificationChange(item.key as keyof typeof notifications)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications[item.key as keyof typeof notifications]
                                            ? 'bg-indigo-600'
                                            : 'bg-gray-300'
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications[item.key as keyof typeof notifications]
                                                ? 'translate-x-6'
                                                : 'translate-x-1'
                                                }`}
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Privacy */}
                    <Card className="animate-slide-up" style={{ animationDelay: '100ms' } as React.CSSProperties}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Shield className="h-5 w-5 text-green-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Privacy</h2>
                        </div>
                        <div className="space-y-4">
                            {[
                                { key: 'shareLocation', label: 'Share Location', description: 'Allow drivers to see your location' },
                                { key: 'showProfile', label: 'Show Profile', description: 'Make your profile visible to others' },
                                { key: 'allowMessages', label: 'Allow Messages', description: 'Receive messages from drivers' }
                            ].map((item) => (
                                <div key={item.key} className="flex items-center justify-between pb-4 border-b last:border-b-0">
                                    <div>
                                        <p className="font-medium text-gray-900">{item.label}</p>
                                        <p className="text-sm text-gray-500">{item.description}</p>
                                    </div>
                                    <button
                                        onClick={() => handlePrivacyChange(item.key as keyof typeof privacy)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${privacy[item.key as keyof typeof privacy]
                                            ? 'bg-green-600'
                                            : 'bg-gray-300'
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${privacy[item.key as keyof typeof privacy]
                                                ? 'translate-x-6'
                                                : 'translate-x-1'
                                                }`}
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Appearance & Preferences */}
                    <Card className="animate-slide-up" style={{ animationDelay: '200ms' } as React.CSSProperties}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Globe className="h-5 w-5 text-purple-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Appearance & Preferences</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between pb-4 border-b">
                                <div className="flex items-center gap-3">
                                    {darkMode ? <Moon className="h-5 w-5 text-gray-600" /> : <Sun className="h-5 w-5 text-gray-600" />}
                                    <div>
                                        <p className="font-medium text-gray-900">Dark Mode</p>
                                        <p className="text-sm text-gray-500">Switch to dark theme</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setDarkMode(!darkMode);
                                        toast('Dark mode coming soon!');
                                    }}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? 'bg-purple-600' : 'bg-gray-300'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>

                            <div className="flex items-center justify-between pb-4 border-b">
                                <div className="flex items-center gap-3">
                                    <Volume2 className="h-5 w-5 text-gray-600" />
                                    <div>
                                        <p className="font-medium text-gray-900">Sound Effects</p>
                                        <p className="text-sm text-gray-500">Enable notification sounds</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setSoundEnabled(!soundEnabled);
                                        toast.success(soundEnabled ? 'Sounds disabled' : 'Sounds enabled');
                                    }}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${soundEnabled ? 'bg-purple-600' : 'bg-gray-300'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${soundEnabled ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Globe className="h-5 w-5 text-gray-600" />
                                    <div>
                                        <p className="font-medium text-gray-900">Language</p>
                                        <p className="text-sm text-gray-500">Select your preferred language</p>
                                    </div>
                                </div>
                                <select
                                    value={language}
                                    onChange={(e) => {
                                        setLanguage(e.target.value);
                                        toast.success('Language updated');
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                >
                                    <option value="en">English</option>
                                    <option value="bn">বাংলা (Bengali)</option>
                                    <option value="hi">हिन्दी (Hindi)</option>
                                </select>
                            </div>
                        </div>
                    </Card>

                    {/* Payment Methods */}
                    <Card className="animate-slide-up" style={{ animationDelay: '300ms' } as React.CSSProperties}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <CreditCard className="h-5 w-5 text-yellow-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Payment Methods</h2>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <CreditCard className="h-5 w-5 text-gray-600" />
                                    <div>
                                        <p className="font-medium text-gray-900">Cash</p>
                                        <p className="text-sm text-gray-500">Pay with cash</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                    Default
                                </span>
                            </div>
                            <Button
                                variant="secondary"
                                fullWidth
                                onClick={() => toast('Add payment method coming soon!')}
                            >
                                Add Payment Method
                            </Button>
                        </div>
                    </Card>

                    {/* Danger Zone */}
                    <Card className="border-2 border-red-200 animate-slide-up" style={{ animationDelay: '400ms' } as React.CSSProperties}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <Trash2 className="h-5 w-5 text-red-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Danger Zone</h2>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-700 mb-4">
                                Once you delete your account, there is no going back. Please be certain.
                            </p>
                            <Button
                                variant="danger"
                                onClick={handleDeleteAccount}
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Account
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Settings;
