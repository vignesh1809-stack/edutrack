import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, clearAuthError } from '../store/actions/authActions';

const LoginPage = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { loading, user, error } = useSelector(state => state.auth);
    const institution = location.state?.institution;
    const institutionName = institution?.name || "EduTrack Horizon";

    // Role-based redirection
    useEffect(() => {
        if (user && user.role) {
            const role = user.role.toUpperCase();
            if (role === 'GUARDIAN') {
                navigate('/guardian/dashboard');
            } else if (role === 'STAFF' || role === 'PRINCIPAL' || role === 'ADMINISTRATOR') {
                navigate('/principal/dashboard');
            }
        }
    }, [user, navigate]);

    // Clear errors on unmount
    useEffect(() => {
        return () => dispatch(clearAuthError());
    }, [dispatch]);

    const handleLogin = (e) => {
        e.preventDefault();

        if (!institution?.id) {
            alert("Institution context missing. Please go back and select your institution.");
            return;
        }

        dispatch(loginRequest({
            institutionId: institution.id,
            phone: phoneNumber,
            password: password
        }));
    };

    return (
        <div className="bg-surface font-body text-on-surface flex flex-col min-h-screen">
            {/* Back Button and Step Info */}
            <div className="absolute top-8 left-8 z-20 flex items-center gap-4">
                <button
                    onClick={() => navigate('/')}
                    className="p-3 bg-surface-container-lowest rounded-full shadow-lg text-primary hover:bg-primary hover:text-white transition-all active:scale-95 duration-300"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <div>
                    <p className="text-[10px] font-black tracking-[0.2em] text-on-surface-variant uppercase opacity-40">Step 2 of 2</p>
                    <p className="text-sm font-bold text-on-surface">Credentials</p>
                </div>
            </div>

            {/* Main Content Canvas */}
            <main className="flex-grow flex flex-col justify-center items-center px-6 pb-12 w-full max-w-md mx-auto pt-24">
                {/* Hero Identity Section */}
                <div className="w-full mb-10 text-center">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-[10px] font-bold uppercase tracking-widest mb-4">
                        Institutional Access
                    </div>
                    <h1 className="font-headline font-extrabold text-3xl text-on-surface leading-tight tracking-tight mb-3">
                        Welcome to <span className="text-primary">{institutionName}</span>
                    </h1>
                    <p className="text-on-surface-variant text-sm font-medium leading-relaxed px-4">
                        Securely access your academic dashboard, track progress, and stay connected with your institution.
                    </p>
                </div>

                {/* Login/Sign Up Toggle */}
                <div className="flex justify-center mb-8 w-full">
                    <div className="flex p-1 bg-surface-container-high rounded-full w-full max-w-[280px]">
                        <button
                            className="flex-1 py-2 px-6 rounded-full text-sm font-bold bg-primary text-on-primary shadow-sm transition-all whitespace-nowrap"
                            type="button"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate('/signup')}
                            className="flex-1 py-2 px-6 rounded-full text-sm font-bold text-on-surface-variant hover:text-on-surface transition-all whitespace-nowrap"
                            type="button"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>

                {/* Login Card */}
                <div className="w-full bg-surface-container-lowest rounded-3xl p-8 shadow-[0px_20px_40px_rgba(42,52,57,0.06)] border border-outline-variant/10">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Phone Number Field */}
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-on-surface-variant tracking-wide uppercase px-1" htmlFor="phone">Phone Number</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">call</span>
                                </div>
                                <input
                                    className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-4 text-sm font-medium transition-all placeholder:text-outline/50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none"
                                    id="phone"
                                    placeholder="eg : +91 9123456789"
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="block text-xs font-bold text-on-surface-variant tracking-wide uppercase" htmlFor="password">
                                    Password
                                </label>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">lock</span>
                                </div>
                                <input
                                    className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-12 text-sm font-medium transition-all placeholder:text-outline/50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none"
                                    id="password"
                                    placeholder="Enter your password"
                                    type={showPassword ? "text" : "password"}
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
                            <div className="flex justify-end pt-1">
                                <button type="button" className="text-xs font-semibold text-primary hover:text-primary-dim transition-colors">Forgot Password?</button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mx-1 p-3 rounded-xl bg-error-container text-on-error-container text-xs font-semibold flex items-center gap-2 animate-shake">
                                <span className="material-symbols-outlined text-[18px]">error</span>
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                disabled={loading}
                                className={`w-full bg-gradient-to-br from-primary to-primary-dim text-on-primary py-4 rounded-xl font-headline font-bold text-base shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
                                type="submit"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        Sign In to {institution?.name || "Dashboard"}
                                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Feedback Area */}
                <div className="mt-6 flex items-center gap-2 px-4 opacity-60">
                    <span className="material-symbols-outlined text-sm text-outline">info</span>
                    <p className="text-[11px] font-medium text-outline">
                        Use your multi-factor authentication device for secondary verification after this step.
                    </p>
                </div>

                {/* Footer */}
                <footer className="w-full py-8 mt-12 bg-surface text-center px-6">
                    <div className="flex flex-col gap-6 items-center">
                        <div className="flex gap-6">
                            <button className="text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors">Privacy Policy</button>
                            <button className="text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors">Terms of Service</button>
                            <button className="text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors">Help Center</button>
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium font-label uppercase tracking-widest">
                            © 2024 Edutrack Limited. All rights reserved.
                        </p>
                    </div>
                </footer>
            </main>

            {/* Decorative Atmosphere */}
            <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[40%] bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none animate-pulse"></div>
            <div className="fixed bottom-[-5%] left-[-5%] w-[40%] h-[30%] bg-primary/5 blur-[100px] rounded-full -z-10 pointer-events-none animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>
    );
};

export default LoginPage;
