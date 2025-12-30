import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../features/auth/authApi';
import { setCredentials } from '../features/auth/authSlice';
import { useAppDispatch } from '../hooks/redux';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import toast from 'react-hot-toast';
import { Car, Lock, Mail, Info } from 'lucide-react';
import { isDemoMode } from '../config/env';
import { mockAuthService } from '../services/mockAuth';
import { handleApiError } from '../utils/errorHandler';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [login, { isLoading }] = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            let result;

            // Use mock service in demo mode
            if (isDemoMode) {
                result = await mockAuthService.login(data.email, data.password);
            } else {
                result = await login(data).unwrap();
            }

            const { user, token } = result.data;

            dispatch(setCredentials({ user, token }));
            toast.success(`Welcome back, ${user.name}!`);

            if (user.role === 'admin') navigate('/admin');
            else if (user.role === 'driver') navigate('/driver');
            else navigate('/rider');
        } catch (err) {
            const errorMessage = handleApiError(err, 'Login', 'Login failed. Please check your credentials.');
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
                    <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-2">Welcome Back</h2>
                    <p className="text-center text-gray-600 mb-8">Sign in to manage your rides</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

                        <Button
                            type="submit"
                            fullWidth
                            isLoading={isLoading}
                            size="lg"
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg"
                        >
                            Sign In
                        </Button>
                    </form>

                    {isDemoMode && (
                        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-start gap-2">
                                <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-blue-900 mb-2">
                                        🎭 Demo Mode - Test Credentials:
                                    </p>
                                    <div className="space-y-1 text-xs text-blue-700">
                                        <p><strong>Rider:</strong> test@rider.com / password</p>
                                        <p><strong>Driver:</strong> test@driver.com / password</p>
                                        <p><strong>Admin:</strong> test@admin.com / password</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
