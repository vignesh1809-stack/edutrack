import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, clearAuthError } from '../store/actions/authActions';

const roleConfig = {
    STAFF: {
        label: 'Staff',
        icon: 'supervisor_account',
        color: 'text-blue-600',
        bg: 'bg-primary-container',
        placeholder: 'Staff phone number',
    },
    STUDENT: {
        label: 'Student',
        icon: 'person',
        color: 'text-purple-600',
        bg: 'bg-tertiary-container',
        placeholder: 'Student phone number',
    },
    GUARDIAN: {
        label: 'Guardian',
        icon: 'family_restroom',
        color: 'text-slate-600',
        bg: 'bg-surface-container-high',
        placeholder: 'Guardian phone number',
    },
    TRANSPORT: {
        label: 'Transport Incharge',
        icon: 'directions_bus',
        color: 'text-blue-700',
        bg: 'bg-blue-100',
        placeholder: 'Transport phone number',
    },
};

const LoginPage = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { loading, user, error } = useSelector((state) => state.auth);
    const institution = location.state?.institution;
    const role = location.state?.role || 'STUDENT';
    const institutionName = institution?.name || 'EduTrack Horizon';
    const cfg = roleConfig[role] || roleConfig['STUDENT'];

    // Only redirect after the user explicitly submits the login form.
    // Prevents stale Redux session from auto-redirecting before form submit.
    const loginSubmitted = useRef(false);

    useEffect(() => {
        if (!loginSubmitted.current) return;
        if (user && user.role) {
            const r = user.role.toUpperCase();
            if (r === 'STUDENT') navigate('/student/dashboard');
            else if (r === 'GUARDIAN') navigate('/guardian/dashboard');
            else if (r === 'TRANSPORT_INCHARGE' || r === 'TRANSPORT') navigate('/transport/dashboard');
            else if (r === 'LECTURER' || r === 'CLASS_TEACHER') navigate('/staff/dashboard');
            else navigate('/principal/dashboard');
        }
    }, [user, navigate]);

    // Clear errors on unmount
    useEffect(() => {
        return () => dispatch(clearAuthError());
    }, [dispatch]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (!institution?.id) {
            alert('Institution context missing. Please go back and select your institution.');
            return;
        }
        loginSubmitted.current = true;
        dispatch(
            loginRequest({
                institutionId: institution.id,
                phone: phoneNumber,
                password: password,
                role: role,
            })
        );
    };

    return (
        <div
            className="bg-background font-body text-on-background flex flex-col overflow-hidden"
            style={{ minHeight: 'max(884px, 100dvh)' }}
        >
            {/* Ambient blobs */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 -right-24 w-72 h-72 bg-tertiary/5 rounded-full blur-3xl"></div>
            </div>

            {/* Dotted background pattern */}
            <div
                className="fixed inset-0 -z-10"
                style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, #e8eff3 1px, transparent 0)',
                    backgroundSize: '24px 24px',
                }}
            ></div>

            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm flex items-center justify-between px-6 py-4 w-full">
                <div className="flex items-center gap-2">
                    <span
                        className="material-symbols-outlined text-blue-700"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                        school
                    </span>
                    <span className="font-headline font-extrabold text-blue-700 tracking-tighter text-xl">
                        EduTrack
                    </span>
                </div>
                <button
                    onClick={() =>
                        navigate('/select-role', { state: { institution } })
                    }
                    className="p-2 rounded-full hover:bg-slate-50 transition-colors active:scale-95 duration-200"
                >
                    <span className="material-symbols-outlined text-blue-600">arrow_back</span>
                </button>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
                <div className="w-full max-w-sm">
                    {/* Role pill */}
                    <div className="flex justify-center mb-6">
                        <div
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${cfg.bg} text-xs font-bold uppercase tracking-widest`}
                        >
                            <span
                                className={`material-symbols-outlined text-base ${cfg.color}`}
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                {cfg.icon}
                            </span>
                            <span className={cfg.color}>{cfg.label} Portal</span>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="font-headline font-extrabold text-3xl tracking-tight text-on-background mb-2">
                            Welcome back
                        </h1>
                        <p className="text-on-surface-variant text-sm">
                            Sign in to{' '}
                            <span className="font-bold text-primary">{institutionName}</span>
                        </p>
                    </div>

                    {/* Login card */}
                    <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-container-high">
                        <form onSubmit={handleLogin} className="space-y-5">
                            {/* Phone */}
                            <div className="space-y-1.5">
                                <label
                                    className="block text-[11px] font-bold text-on-surface-variant tracking-wider uppercase px-1"
                                    htmlFor="phone"
                                >
                                    Phone Number
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">call</span>
                                    </div>
                                    <input
                                        className="w-full bg-surface-container-low border-none rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium transition-all placeholder:text-outline/50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none"
                                        id="phone"
                                        placeholder={cfg.placeholder}
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <label
                                    className="block text-[11px] font-bold text-on-surface-variant tracking-wider uppercase px-1"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">lock</span>
                                    </div>
                                    <input
                                        className="w-full bg-surface-container-low border-none rounded-xl py-3.5 pl-12 pr-12 text-sm font-medium transition-all placeholder:text-outline/50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none"
                                        id="password"
                                        placeholder="Enter your password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-primary transition-colors focus:outline-none"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                                <div className="flex justify-end pt-0.5">
                                    <button
                                        type="button"
                                        className="text-xs font-semibold text-primary hover:underline transition-colors"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="p-3 rounded-xl bg-error-container text-on-error-container text-xs font-semibold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">error</span>
                                    {error}
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                disabled={loading}
                                className={`w-full bg-primary text-on-primary py-4 rounded-xl font-headline font-bold text-sm shadow-md shadow-primary/20 hover:bg-primary-dim active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
                                    loading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                                type="submit"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        Sign In
                                        <span className="material-symbols-outlined text-[20px]">
                                            arrow_forward
                                        </span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Sign up link */}
                    <p className="text-center text-xs text-on-surface-variant mt-6 font-medium">
                        Don't have an account?{' '}
                        <button
                            onClick={() =>
                                navigate('/signup', {
                                    state: { institution, role, from: 'login' },
                                })
                            }
                            className="text-primary font-bold hover:underline"
                        >
                            Sign Up
                        </button>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;
