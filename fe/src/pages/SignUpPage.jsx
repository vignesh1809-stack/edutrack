import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('student');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="bg-surface font-body text-on-surface h-screen flex flex-col overflow-hidden relative">
            {/* Top Navigation Anchor - Changed to standard child to take space or absolute to float */}
            <header className="flex-shrink-0 bg-white/70 backdrop-blur-xl border-b border-surface-container-high z-50">
                <div className="flex items-center justify-between px-6 py-4 w-full max-w-7xl mx-auto">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-blue-600" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                        <span className="font-headline font-extrabold text-xl tracking-tight bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent">Academic Atelier</span>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <span className="text-xs font-label uppercase tracking-widest text-slate-400">EduTrack Suite</span>
                    </div>
                </div>
            </header>

            {/* Main Content Canvas */}
            <main className="flex-1 overflow-hidden flex flex-col px-4 pt-8 pb-8 relative">
                <div className="w-full max-w-2xl mx-auto h-full flex flex-col min-h-0">
                    {/* Back Button */}
                    <div className="mb-4 flex-shrink-0">
                        <button 
                            onClick={() => navigate('/login-credentials')}
                            className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors group"
                        >
                            <span className="material-symbols-outlined text-xl">arrow_back</span>
                            <span className="text-xs font-bold uppercase tracking-widest">Back</span>
                        </button>
                    </div>

                    {/* Form Card */}
                    <div className="w-full bg-surface-container-lowest rounded-[1.5rem] shadow-[0px_20px_40px_rgba(42,52,57,0.06)] overflow-hidden flex flex-col border border-outline-variant/10 min-h-0 mb-4">
                        <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar flex-1">
                            <div className="mb-8">
                                <h1 className="font-headline font-extrabold text-3xl tracking-tight text-on-surface mb-2">Request Institutional Access</h1>
                                <p className="text-on-surface-variant text-sm font-medium">Provide your details to initiate a verification request.</p>
                            </div>
                            
                            {/* Form starts here (rest is same) */}
                            <form className="space-y-6">
                                {/* ... existing form content ... */}
                                {/* Role Selection */}
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant opacity-70 px-1">Select Your Role</label>
                                    <div className="grid grid-cols-3 bg-surface-container-high p-1 rounded-xl">
                                        <button 
                                            type="button"
                                            onClick={() => setRole('student')}
                                            className={`py-2.5 px-2 text-xs font-semibold rounded-lg transition-all ${role === 'student' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                                        >
                                            Student
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={() => setRole('staff')}
                                            className={`py-2.5 px-2 text-xs font-semibold rounded-lg transition-all ${role === 'staff' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                                        >
                                            Staff
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={() => setRole('guardian')}
                                            className={`py-2.5 px-2 text-xs font-semibold rounded-lg transition-all ${role === 'guardian' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                                        >
                                            Guardian
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant opacity-70 px-1">Full Name</label>
                                        <input className="w-full bg-surface-container-high border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all font-medium" placeholder="Alex Rivers" type="text"/>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant opacity-70 px-1">Institutional ID</label>
                                        <input className="w-full bg-surface-container-high border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all font-medium" placeholder="e.g. ID# 4592" type="text"/>
                                    </div>
                                </div>

                                {role === 'student' && (
                                    <div className="space-y-6">
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant opacity-70 px-1">Department</label>
                                            <input className="w-full bg-surface-container-high border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all font-medium" placeholder="e.g. Computer Science" type="text"/>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant opacity-70 px-1">Batch</label>
                                                <input className="w-full bg-surface-container-high border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all font-medium" placeholder="e.g. 2024" type="text"/>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant opacity-70 px-1">Section</label>
                                                <input className="w-full bg-surface-container-high border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all font-medium" placeholder="e.g. Section A" type="text"/>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant opacity-70 px-1">Email Address</label>
                                    <input className="w-full bg-surface-container-high border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all font-medium" placeholder="alex@atelier.edu" type="email"/>
                                </div>

                                {(role === 'student' || role === 'guardian') && (
                                    <div className="space-y-5">
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant opacity-70 px-1">Student Phone Number</label>
                                            <div className="flex gap-2">
                                                <input className="flex-grow bg-surface-container-high border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all font-medium" placeholder="+1 (555) 000-0000" type="tel"/>
                                                <button className="px-3 bg-primary/10 text-primary text-[10px] font-bold rounded-lg hover:bg-primary/20 transition-colors whitespace-nowrap" type="button">SEND OTP</button>
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant opacity-70 px-1">Verification Code (Student)</label>
                                            <input className="w-full bg-surface-container-high border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all font-medium" maxlength="6" placeholder="6-digit code" type="text"/>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant opacity-70 px-1">Guardian Phone Number</label>
                                            <div className="flex gap-2">
                                                <input className="flex-grow bg-surface-container-high border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all font-medium" placeholder="+1 (555) 111-2222" type="tel"/>
                                                <button className="px-3 bg-primary/10 text-primary text-[10px] font-bold rounded-lg hover:bg-primary/20 transition-colors whitespace-nowrap" type="button">SEND OTP</button>
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant opacity-70 px-1">Verification Code (Guardian)</label>
                                            <input className="w-full bg-surface-container-high border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all font-medium" maxlength="6" placeholder="6-digit code" type="text"/>
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant opacity-70 px-1">Desired Password</label>
                                        <div className="relative">
                                            <input 
                                                className="w-full bg-surface-container-high border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all font-medium pr-10" 
                                                placeholder="••••••••" 
                                                type={showPassword ? "text" : "password"}
                                            />
                                            <button 
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant cursor-pointer text-[20px]"
                                            >
                                                <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant opacity-70 px-1">Confirm Password</label>
                                        <input className="w-full bg-surface-container-high border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all font-medium" placeholder="••••••••" type="password"/>
                                    </div>
                                </div>

                                {/* Info Note */}
                                <div className="flex gap-3 p-4 bg-surface-container-low rounded-xl border border-surface-container-high">
                                    <span className="material-symbols-outlined text-primary text-lg flex-shrink-0">info</span>
                                    <p className="text-[11px] leading-relaxed text-on-surface-variant font-medium">
                                        {(role === 'student' || role === 'guardian') && "For Students and Guardians, a two-factor verification process is required for safety. Both primary and secondary contacts must be verified. "}
                                        Account activation occurs after institutional staff review and identity verification.
                                    </p>
                                </div>

                                {/* Action Area */}
                                <div className="pt-2 flex flex-col gap-4">
                                    <button 
                                        type="submit"
                                        className="w-full bg-gradient-to-br from-blue-600 to-blue-800 text-on-primary font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 hover:scale-[1.02] active:scale-95 transition-all text-sm tracking-wide"
                                    >
                                        Request Access
                                    </button>
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-xs text-on-surface-variant font-medium">Already have an account?</span>
                                        <button 
                                            type="button"
                                            onClick={() => navigate('/login-credentials')}
                                            className="text-xs font-bold text-primary hover:underline transition-all"
                                        >
                                            Switch back to Login
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {/* Trust Badges */}
                            <div className="mt-12 pt-8 border-t border-surface-container-high flex flex-col items-center gap-4 text-center opacity-40">
                                <div className="flex items-center gap-3">
                                    <img alt="Trust Badge" className="w-6 h-6 object-contain grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrT9-Am6kaud2e28rdqFcTOSrh1A68Ptl0gkNG4AwErIG-SBoS2aKbA96QACVoLK-rAXDuVKa7KsUcvShREJ0iEpDPGgEKLuMV-Pztl7WuaD1W5CSnt2gUsXzhT6VTAmgjmtEGSts_Q1_GyVw5jWbdvkEiGhyNGKTj0j2enWyYo0SyFVmetlUdJj1-LGg_otV4PInDU6UURyFCWRREeKFCZux7STqBIuteY0wkmG5T0y3O7WzwaAwUL5G4hwGTkVNR2iXJsgd5x5w"/>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface">Trusted by Ivy League Institutes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Segment */}
            <footer className="w-full py-8 mt-auto bg-slate-50 border-t border-slate-200">
                <div className="flex flex-col md:flex-row justify-between items-center px-8 gap-4 w-full max-w-7xl mx-auto">
                    <span className="text-[10px] font-label text-slate-500 uppercase tracking-widest font-medium">© 2024 Edutrack Limited. All rights reserved.</span>
                    <div className="flex items-center gap-6">
                        <button className="text-[10px] font-label text-slate-400 uppercase tracking-widest hover:text-blue-500 transition-colors font-medium">Privacy Policy</button>
                        <button className="text-[10px] font-label text-slate-400 uppercase tracking-widest hover:text-blue-500 transition-colors font-medium">Terms of Service</button>
                        <button className="text-[10px] font-label text-slate-400 uppercase tracking-widest hover:text-blue-500 transition-colors font-medium">Support</button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default SignUpPage;
