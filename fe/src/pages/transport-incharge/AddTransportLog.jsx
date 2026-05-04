import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTransportLog = () => {
    const navigate = useNavigate();
    const [logType, setLogType] = useState('Arrival');

    return (
        <div className="bg-surface text-on-surface antialiased min-h-[100dvh]">
            {/* Top AppBar */}
            <header className="bg-white/70 backdrop-blur-xl sticky top-0 z-50 px-6 py-4 w-full shadow-[0_20px_40px_rgba(42,52,57,0.06)]">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate(-1)}
                            className="active:scale-95 duration-200 p-2 -ml-2 rounded-full hover:bg-slate-100/50 text-blue-600"
                        >
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <h1 className="font-headline font-bold text-lg lg:text-xl tracking-tight text-on-surface">New Log Entry</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="hidden md:block px-3 py-1 bg-surface-container rounded-full text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Transport Logs</span>
                        <button className="text-blue-600 active:scale-95 duration-200 p-2 rounded-full hover:bg-slate-100/50">
                            <span className="material-symbols-outlined">more_vert</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-5 py-6 md:py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Context Info (Desktop Only Visual Enhancement) */}
                    <div className="hidden lg:flex lg:col-span-4 flex-col space-y-6">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-surface-container">
                            <div className="w-16 h-16 bg-primary-container text-primary rounded-2xl flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-3xl">directions_bus</span>
                            </div>
                            <h2 className="font-headline font-extrabold text-2xl text-on-surface mb-2">Transport Logistics</h2>
                            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                                Complete this log to record arrival or departure details for the school transport fleet. All entries are synced in real-time to the Horizon Central Dashboard.
                            </p>
                            <div className="space-y-4 pt-6 border-t border-surface-container">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-green-50 rounded-lg">
                                        <span className="material-symbols-outlined text-green-600 text-sm">verified_user</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-outline uppercase tracking-widest">Safety Standard</p>
                                        <p className="text-xs font-semibold text-on-surface">ISO 9001 Compliant</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <span className="material-symbols-outlined text-blue-600 text-sm">sync</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-outline uppercase tracking-widest">Update Frequency</p>
                                        <p className="text-xs font-semibold text-on-surface">Real-time Synchronization</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Status Cards (Visible on desktop sidebar) */}
                        <div className="bg-surface-container-lowest rounded-2xl p-6 grid grid-cols-2 gap-4 border border-surface-container">
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-tighter text-outline font-bold">Log Status</span>
                                <span className="font-headline font-bold text-primary">Pending</span>
                            </div>
                            <div className="flex flex-col text-right">
                                <span className="text-[10px] uppercase tracking-tighter text-outline font-bold">Safety Check</span>
                                <span className="font-headline font-bold text-on-surface">Verified</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form Fields */}
                    <div className="lg:col-span-8 w-full max-w-2xl mx-auto lg:max-w-none space-y-6">
                        <div className="bg-white md:p-8 lg:p-10 rounded-[2rem] md:shadow-sm md:border md:border-surface-container">
                            <div className="space-y-8">
                                {/* Transport Logistics Setup */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Log Type Toggle */}
                                    <div className="space-y-2">
                                        <label className="font-headline font-bold text-xs text-on-surface-variant ml-1 uppercase tracking-widest">Log Type</label>
                                        <div className="bg-surface-container-high p-1.5 rounded-xl flex">
                                            <button 
                                                onClick={() => setLogType('Arrival')}
                                                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${logType === 'Arrival' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                                            >
                                                Arrival
                                            </button>
                                            <button 
                                                onClick={() => setLogType('Departure')}
                                                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${logType === 'Departure' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                                            >
                                                Departure
                                            </button>
                                        </div>
                                    </div>

                                    {/* Bus Selection */}
                                    <div className="space-y-2">
                                        <label className="font-headline font-bold text-xs text-on-surface-variant ml-1 uppercase tracking-widest">Select Bus Number</label>
                                        <div className="relative group">
                                            <select className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-3.5 font-body text-sm font-semibold text-on-surface appearance-none focus:ring-2 focus:ring-primary/20 transition-all outline-none">
                                                <option>BUS-TRANS-042</option>
                                                <option>BUS-TRANS-018</option>
                                                <option>BUS-TRANS-055</option>
                                                <option>BUS-TRANS-102</option>
                                            </select>
                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-outline">
                                                <span className="material-symbols-outlined">expand_more</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Date & Time (Side-by-side Layout) */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="font-headline font-bold text-xs text-on-surface-variant ml-1 uppercase tracking-widest">Date</label>
                                        <div className="flex items-center gap-3 bg-surface-container-high rounded-xl px-5 py-3.5 active:bg-surface-container-highest transition-colors cursor-pointer">
                                            <span className="material-symbols-outlined text-primary">calendar_today</span>
                                            <span className="font-body text-sm font-semibold text-on-surface">Oct 24, 2023</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-headline font-bold text-xs text-on-surface-variant ml-1 uppercase tracking-widest">Time</label>
                                        <div className="flex items-center gap-3 bg-surface-container-high rounded-xl px-5 py-3.5 active:bg-surface-container-highest transition-colors cursor-pointer">
                                            <span className="material-symbols-outlined text-primary">schedule</span>
                                            <span className="font-body text-sm font-semibold text-on-surface">09:45 AM</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Personnel Selection */}
                                <div className="space-y-2">
                                    <label className="font-headline font-bold text-xs text-on-surface-variant ml-1 uppercase tracking-widest">Relevant Personnel</label>
                                    <div className="bg-surface-container-low rounded-2xl p-2 border border-surface-container/50">
                                        <div className="flex items-center gap-4 p-3 bg-surface-container-lowest rounded-xl shadow-sm cursor-pointer hover:bg-surface transition-colors">
                                            <div className="w-12 h-12 rounded-full overflow-hidden bg-primary-fixed flex items-center justify-center ring-2 ring-white">
                                                <img alt="Marcus Reeves" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVdzzQhftJ0plq-ADj5Q6y779JLGl0kAKvHJCaNAS5H1cXQSvI9VhNTzVScG8aw6sG2GA2eF_DH_6elCBpZVJGBAPWLu62az4FObkKRsg8ggx386ImHJNvGACa4eZOalsC4Ciu-FtG9rFnr7qke9dJFSCYcRvYVf20NZSkqT2jLcenhbMbkJCVYpYvWjNbbeLSJvPbYpsDFIlOcnEFgQp7UFICmMP0L6kwsBgm-zUTRwAAcW6F4I7M92Atr5iGYwHkCMFR6g7NqGA"/>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-body text-sm font-bold text-on-surface">Marcus Reeves</p>
                                                <p className="font-body text-[11px] text-on-surface-variant font-medium">Primary Driver • ID: #DR-4029</p>
                                            </div>
                                            <span className="material-symbols-outlined text-outline">expand_more</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Description Textarea */}
                                <div className="space-y-2">
                                    <label className="font-headline font-bold text-xs text-on-surface-variant ml-1 uppercase tracking-widest">Log Description</label>
                                    <textarea className="w-full min-h-[160px] bg-surface-container-low border-none rounded-2xl p-5 text-on-surface placeholder:text-outline/60 focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium leading-relaxed outline-none" placeholder="Enter details about the mileage, route status, or incident..."></textarea>
                                </div>
                            </div>

                            {/* Submission Card for Mobile/Tablet (Visible when not using desktop sidebar logic) */}
                            <div className="mt-8 lg:hidden bg-surface-container-low rounded-2xl p-6 flex items-center justify-between border border-surface-container">
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-tighter text-outline font-bold">Log Status</span>
                                    <span className="font-headline font-bold text-primary">Pending Submission</span>
                                </div>
                                <div className="h-8 w-px bg-surface-container-high mx-4"></div>
                                <div className="flex flex-col text-right">
                                    <span className="text-[10px] uppercase tracking-tighter text-outline font-bold">Safety Check</span>
                                    <span className="font-headline font-bold text-on-surface">Verified</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-8">
                                <button className="w-full py-4 bg-gradient-to-br from-primary to-primary-dim text-white rounded-2xl font-headline font-bold text-base shadow-[0_8px_30px_rgba(55,85,195,0.2)] hover:shadow-[0_12px_40px_rgba(55,85,195,0.3)] hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-3">
                                    <span className="material-symbols-outlined text-xl">cloud_upload</span>
                                    Submit Log Entry
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Spacer for fixed actions on mobile */}
            <div className="h-20 lg:hidden"></div>
        </div>
    );
};

export default AddTransportLog;
