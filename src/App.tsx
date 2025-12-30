import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import MainLayout from './components/layout/MainLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Features from './pages/Features'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import ProtectedRoute from './components/auth/ProtectedRoute'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingSpinner from './components/ui/LoadingSpinner'
import 'react-hot-toast'

// Lazy load dashboard components for code splitting
const RiderDashboard = lazy(() => import('./pages/rider/RiderDashboard'))
const RideHistory = lazy(() => import('./pages/rider/RideHistory'))
const DriverDashboard = lazy(() => import('./pages/driver/DriverDashboard'))
const DriverEarnings = lazy(() => import('./pages/driver/DriverEarnings'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))

function App() {
    return (
        <ErrorBoundary>
            <Router>
                <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center">
                        <LoadingSpinner size="lg" />
                    </div>
                }>
                    <Routes>
                        {/* Public Routes with Layout */}
                        <Route element={<MainLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/features" element={<Features />} />
                        </Route>

                        {/* Auth Routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Protected Routes */}
                        <Route
                            path="/rider/*"
                            element={
                                <ProtectedRoute allowedRoles={['rider']}>
                                    <MainLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<RiderDashboard />} />
                            <Route path="history" element={<RideHistory />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="settings" element={<Settings />} />
                        </Route>

                        <Route
                            path="/driver/*"
                            element={
                                <ProtectedRoute allowedRoles={['driver']}>
                                    <MainLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<DriverDashboard />} />
                            <Route path="earnings" element={<DriverEarnings />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="settings" element={<Settings />} />
                        </Route>

                        <Route
                            path="/admin/*"
                            element={
                                <ProtectedRoute allowedRoles={['admin']}>
                                    <MainLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<AdminDashboard />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="settings" element={<Settings />} />
                        </Route>
                    </Routes>
                </Suspense>
            </Router>
        </ErrorBoundary>
    )
}

export default App
