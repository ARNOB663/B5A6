import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../features/auth/authSlice';
import Button from '../ui/Button';
import { Car, Menu, X, User as UserIcon, LogOut } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Features', path: '/features' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <Car className="h-8 w-8 text-indigo-600" />
                            <span className="font-bold text-xl text-gray-900">RideShare</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-700">Hi, {user?.name}</span>
                                <Button variant="outline" size="sm" onClick={handleLogout}>
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Logout
                                </Button>
                                <Link to={user?.role ? `/${user.role}` : '/'}>
                                    <Button size="sm">Dashboard</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login">
                                    <Button variant="ghost" size="sm">Sign In</Button>
                                </Link>
                                <Link to="/register">
                                    <Button size="sm">Get Started</Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        {isAuthenticated ? (
                            <>
                                <Link to={user?.role ? `/${user.role}` : '/'} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50" onClick={() => setIsOpen(false)}>
                                    Dashboard
                                </Link>
                                <button className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50" onClick={() => { handleLogout(); setIsOpen(false); }}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="pt-4 flex flex-col gap-2 px-3">
                                <Link to="/login" onClick={() => setIsOpen(false)}>
                                    <Button variant="ghost" fullWidth>Sign In</Button>
                                </Link>
                                <Link to="/register" onClick={() => setIsOpen(false)}>
                                    <Button fullWidth>Get Started</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
