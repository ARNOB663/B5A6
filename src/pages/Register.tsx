import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../features/auth/authApi';
import { useAppDispatch } from '../hooks/redux';
import { setCredentials } from '../features/auth/authSlice';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import toast from 'react-hot-toast';
import { Car, Lock, Mail, User, Phone } from 'lucide-react';
import { isDemoMode } from '../config/env';
import { mockAuthService } from '../services/mockAuth';
import { handleApiError } from '../utils/errorHandler';

const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['rider', 'driver']),
    phone: z.string().optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [registerUser, { isLoading }] = useRegisterMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            role: 'rider',
        },
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            let result;

            // Use mock service in demo mode
            if (isDemoMode) {
                result = await mockAuthService.register(data);
            } else {
                result = await registerUser(data).unwrap();
            }

            const { user, token } = result.data;

            dispatch(setCredentials({ user, token }));
            toast.success('Registration successful!');

            // Redirect
            if (user.role === 'admin') navigate('/admin');
            else if (user.role === 'driver') navigate('/driver');
            else navigate('/rider');

        } catch (err) {
            const errorMessage = handleApiError(err, 'Register', 'Registration failed. Please try again.');
            toast.error(errorMessage);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
            <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-8">
                    <div className="flex justify-center mb-6">
                        <div className="bg-indigo-600 p-3 rounded-full">
                            <Car className="text-white h-8 w-8" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-2">Create Account</h2>
                    <p className="text-center text-gray-600 mb-8">Join us and start your journey</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                placeholder="Full Name"
                                className="pl-10"
                                {...register('name')}
                                error={errors.name?.message}
                                fullWidth
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                type="email"
                                placeholder="Email Address"
                                className="pl-10"
                                {...register('email')}
                                error={errors.email?.message}
                                fullWidth
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Phone className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                placeholder="Phone Number (Optional)"
                                className="pl-10"
                                {...register('phone')}
                                error={errors.phone?.message}
                                fullWidth
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                type="password"
                                placeholder="Password"
                                className="pl-10"
                                {...register('password')}
                                error={errors.password?.message}
                                fullWidth
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">I am a...</label>
                            <div className="flex space-x-4">
                                <label className="flex-1">
                                    <input
                                        type="radio"
                                        value="rider"
                                        className="peer sr-only"
                                        {...register('role')}
                                    />
                                    <div className="rounded-lg border border-gray-300 p-3 text-center cursor-pointer hover:bg-gray-50 peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-checked:text-indigo-700 transition-all">
                                        Rider
                                    </div>
                                </label>
                                <label className="flex-1">
                                    <input
                                        type="radio"
                                        value="driver"
                                        className="peer sr-only"
                                        {...register('role')}
                                    />
                                    <div className="rounded-lg border border-gray-300 p-3 text-center cursor-pointer hover:bg-gray-50 peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-checked:text-indigo-700 transition-all">
                                        Driver
                                    </div>
                                </label>
                            </div>
                            {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>}
                        </div>

                        <Button
                            type="submit"
                            fullWidth
                            isLoading={isLoading}
                            size="lg"
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg mt-6"
                        >
                            Sign Up
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
