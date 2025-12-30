import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Phone, MapPin, Camera, Save, Lock, Calendar } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAppSelector } from '../hooks/redux';
import toast from 'react-hot-toast';

const profileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    address: z.string().optional(),
    dateOfBirth: z.string().optional()
});

type ProfileFormData = z.infer<typeof profileSchema>;

const Profile = () => {
    const { user } = useAppSelector((state) => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            address: '',
            dateOfBirth: ''
        }
    });

    const onSubmit = async (data: ProfileFormData) => {
        setIsSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Profile updated:', data);
        toast.success('Profile updated successfully!');
        setIsEditing(false);
        setIsSaving(false);
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePhoto(reader.result as string);
                toast.success('Profile photo updated!');
            };
            reader.readAsDataURL(file);
        }
    };

    const stats = user?.role === 'driver'
        ? [
            { label: 'Total Rides', value: '128' },
            { label: 'Rating', value: '4.9★' },
            { label: 'Total Earnings', value: '৳12,450' },
            { label: 'Member Since', value: 'Jan 2024' }
        ]
        : [
            { label: 'Total Rides', value: '45' },
            { label: 'Rating', value: '4.8★' },
            { label: 'Total Spent', value: '৳3,250' },
            { label: 'Member Since', value: 'Mar 2024' }
        ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8 animate-slide-up">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
                    <p className="text-gray-600">Manage your personal information and preferences</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <Card className="text-center animate-slide-up">
                            <div className="relative inline-block mb-4">
                                <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
                                    {profilePhoto ? (
                                        <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        user?.name?.charAt(0).toUpperCase() || 'U'
                                    )}
                                </div>
                                <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-colors shadow-lg">
                                    <Camera className="h-4 w-4" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">{user?.name}</h2>
                            <p className="text-gray-600 mb-4">{user?.email}</p>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                                <User className="h-4 w-4" />
                                {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User'}
                            </div>
                        </Card>

                        {/* Stats */}
                        <Card className="mt-6 animate-slide-up" style={{ animationDelay: '100ms' } as React.CSSProperties}>
                            <h3 className="font-bold text-gray-900 mb-4">Account Stats</h3>
                            <div className="space-y-3">
                                {stats.map((stat, index) => (
                                    <div key={index} className="flex justify-between items-center pb-3 border-b last:border-b-0">
                                        <span className="text-sm text-gray-600">{stat.label}</span>
                                        <span className="font-semibold text-gray-900">{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Profile Form */}
                    <div className="lg:col-span-2">
                        <Card className="animate-slide-up" style={{ animationDelay: '200ms' } as React.CSSProperties}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                                {!isEditing && (
                                    <Button
                                        onClick={() => setIsEditing(true)}
                                        variant="secondary"
                                        size="sm"
                                    >
                                        Edit Profile
                                    </Button>
                                )}
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <User className="inline h-4 w-4 mr-1" />
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            {...register('name')}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Mail className="inline h-4 w-4 mr-1" />
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            {...register('email')}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Phone className="inline h-4 w-4 mr-1" />
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            {...register('phone')}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                        />
                                        {errors.phone && (
                                            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Calendar className="inline h-4 w-4 mr-1" />
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            {...register('dateOfBirth')}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <MapPin className="inline h-4 w-4 mr-1" />
                                        Address
                                    </label>
                                    <textarea
                                        {...register('address')}
                                        disabled={!isEditing}
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none disabled:bg-gray-50 disabled:text-gray-500"
                                        placeholder="Enter your address"
                                    />
                                </div>

                                {isEditing && (
                                    <div className="flex gap-3">
                                        <Button
                                            type="submit"
                                            isLoading={isSaving}
                                            className="ripple"
                                        >
                                            <Save className="h-4 w-4 mr-2" />
                                            Save Changes
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            onClick={() => setIsEditing(false)}
                                            disabled={isSaving}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                )}
                            </form>
                        </Card>

                        {/* Security Section */}
                        <Card className="mt-6 animate-slide-up" style={{ animationDelay: '300ms' } as React.CSSProperties}>
                            <div className="flex items-center gap-3 mb-4">
                                <Lock className="h-6 w-6 text-indigo-600" />
                                <h3 className="text-xl font-bold text-gray-900">Security</h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center pb-3 border-b">
                                    <div>
                                        <p className="font-medium text-gray-900">Password</p>
                                        <p className="text-sm text-gray-500">Last changed 30 days ago</p>
                                    </div>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => toast('Password change feature coming soon!')}
                                    >
                                        Change
                                    </Button>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                                        <p className="text-sm text-gray-500">Add an extra layer of security</p>
                                    </div>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => toast('2FA setup coming soon!')}
                                    >
                                        Enable
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
