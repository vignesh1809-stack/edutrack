import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddTransportStaff = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-surface text-on-surface antialiased min-h-screen">
            {/* TopAppBar */}
            <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-[0px_20px_40px_rgba(42,52,57,0.06)] flex justify-between items-center px-6 py-4">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate(-1)}
                        className="material-symbols-outlined text-primary hover:bg-slate-100 p-2 rounded-full transition-colors active:scale-95 duration-200"
                    >
                        arrow_back
                    </button>
                    <h1 className="text-lg font-extrabold tracking-tight text-on-surface font-headline">Add Staff</h1>
                </div>
                <div className="flex items-center gap-3">
                    <span className="hidden md:block text-sm font-medium text-on-surface-variant">Admin Portal</span>
                    <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold border-2 border-white">
                        JD
                    </div>
                </div>
            </header>

            <main className="pt-24 pb-32 px-6 max-w-2xl mx-auto min-h-screen">
                {/* Content Focus Plate */}
                <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-[0px_20px_40px_rgba(42,52,57,0.06)] border-none">
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold font-headline tracking-tight text-on-surface">Staff Registration</h2>
                        <p className="text-on-surface-variant mt-2 text-sm">Onboard new personnel to the EduTrack fleet and campus management system.</p>
                    </div>
                    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                        {/* Section 1: Identity */}
                        <div className="space-y-6">
                            <div className="group">
                                <label className="block text-[12px] font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Full Name</label>
                                <div className="relative">
                                    <input 
                                        className="w-full bg-surface-container-high border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all outline-none text-on-surface placeholder:text-outline" 
                                        placeholder="e.g. Robert Stevenson" 
                                        type="text"
                                    />
                                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant">person</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="group">
                                    <label className="block text-[12px] font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Role</label>
                                    <div className="relative">
                                        <select className="w-full bg-surface-container-high border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest appearance-none transition-all outline-none text-on-surface">
                                            <option disabled selected value="">Select Role</option>
                                            <option>Driver</option>
                                            <option>Cleaner</option>
                                            <option>Maintenance</option>
                                            <option>Security</option>
                                            <option>Administrator</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none">expand_more</span>
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="block text-[12px] font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Bus Number</label>
                                    <div className="relative">
                                        <input 
                                            className="w-full bg-surface-container-high border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all outline-none text-on-surface placeholder:text-outline" 
                                            placeholder="e.g. BUS-402" 
                                            type="text"
                                        />
                                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant">directions_bus</span>
                                    </div>
                                </div>
                            </div>
                            <div className="group">
                                <label className="block text-[12px] font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Contact Number</label>
                                <div className="relative">
                                    <input 
                                        className="w-full bg-surface-container-high border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all outline-none text-on-surface placeholder:text-outline" 
                                        placeholder="+1 (555) 000-0000" 
                                        type="tel"
                                    />
                                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant">call</span>
                                </div>
                            </div>
                        </div>
                        {/* Section 2: Photo Upload */}
                        <div className="pt-4">
                            <label className="block text-[12px] font-bold uppercase tracking-widest text-on-surface-variant mb-4 ml-1">Profile Identification</label>
                            <div className="flex items-center gap-6 p-6 rounded-2xl bg-surface-container-low border-2 border-dashed border-outline-variant/30">
                                <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center border-4 border-white shadow-sm overflow-hidden">
                                    <img 
                                        className="w-full h-full object-cover opacity-50" 
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbiazxEnVSYO3BnDcByJGhKK3n_dwFobJKJLrhBcVwrp_tCJiwCg3dgWajeL6OINszk42jqxmdenk-u-lpA9784L_38z9h-R1ql266CD9u2Ii-1dZ93PlDFmPOVnEynjIgIsHYBmlaRude87YJq7yeW_QiVz29Q4nsW1hsZyfOqFhGijLsQmkzirj0bNo22t0t1p0irAKIpW4pqqBIwnNL63XyCkyMWJOE3NAEz5qc7LA3UrlXgu3NoZ-P5xjcQEz2g5acjscjSI4"
                                        alt="Staff placeholder"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-on-surface">Upload staff photo</p>
                                    <p className="text-xs text-on-surface-variant">PNG or JPG, max 5MB</p>
                                    <button className="mt-2 text-primary text-xs font-bold hover:underline" type="button">Choose file</button>
                                </div>
                            </div>
                        </div>
                        {/* Submit Action */}
                        <div className="pt-6">
                            <button className="w-full bg-gradient-to-br from-primary to-primary-dim text-on-primary py-5 rounded-2xl font-bold font-headline shadow-lg shadow-primary/20 active:scale-[0.98] transition-all hover:shadow-xl hover:shadow-primary/30 flex items-center justify-center gap-2" type="submit">
                                <span>Save Staff Member</span>
                                <span className="material-symbols-outlined text-lg">check_circle</span>
                            </button>
                            <p className="text-center text-xs text-on-surface-variant mt-4 px-8">By adding this member, you confirm they have been vetted according to EduTrack safety protocols.</p>
                        </div>
                    </form>
                </div>
                {/* Secondary Visual Accent */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-primary-container/30 p-6 rounded-2xl flex items-start gap-4">
                        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                        <div>
                            <h4 className="text-sm font-bold text-on-primary-container">Auto-Scheduling</h4>
                            <p className="text-xs text-on-primary-container/80 mt-1">Role assignments will automatically update the daily route schedule.</p>
                        </div>
                    </div>
                    <div className="bg-tertiary-container/30 p-6 rounded-2xl flex items-start gap-4">
                        <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                        <div>
                            <h4 className="text-sm font-bold text-on-tertiary-container">Security Access</h4>
                            <p className="text-xs text-on-tertiary-container/80 mt-1">Credentials will be generated and sent to the contact number.</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* BottomNavBar */}
            <nav className="fixed bottom-0 w-full rounded-t-3xl z-50 bg-white border-t border-slate-100 shadow-[0px_-4px_20px_rgba(0,0,0,0.03)] flex justify-around items-center px-2 pb-6 pt-2">
                <Link className="flex flex-col items-center gap-1 text-slate-400 px-4 py-2 hover:text-blue-500 transition-all active:scale-90 duration-150" to="/transport/dashboard">
                    <span className="material-symbols-outlined">grid_view</span>
                    <span className="font-['Inter'] text-[11px] font-medium">Dashboard</span>
                </Link>
                <Link className="flex flex-col items-center gap-1 text-blue-600 bg-blue-50/50 rounded-xl px-4 py-2 hover:text-blue-500 transition-all active:scale-90 duration-150" to="/transport/staff">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>badge</span>
                    <span className="font-['Inter'] text-[11px] font-medium">Staff</span>
                </Link>
                <Link className="flex flex-col items-center gap-1 text-slate-400 px-4 py-2 hover:text-blue-500 transition-all active:scale-90 duration-150" to="/transport/dashboard">
                    <span className="material-symbols-outlined">directions_bus</span>
                    <span className="font-['Inter'] text-[11px] font-medium">Fleet</span>
                </Link>
                <Link className="flex flex-col items-center gap-1 text-slate-400 px-4 py-2 hover:text-blue-500 transition-all active:scale-90 duration-150" to="#">
                    <span className="material-symbols-outlined">event_note</span>
                    <span className="font-['Inter'] text-[11px] font-medium">Schedule</span>
                </Link>
                <Link className="flex flex-col items-center gap-1 text-slate-400 px-4 py-2 hover:text-blue-500 transition-all active:scale-90 duration-150" to="#">
                    <span className="material-symbols-outlined">settings</span>
                    <span className="font-['Inter'] text-[11px] font-medium">Settings</span>
                </Link>
            </nav>
        </div>
    );
};

export default AddTransportStaff;
