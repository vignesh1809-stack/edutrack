import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Remarks = () => {
    const navigate = useNavigate();
    const [activeContext, setActiveContext] = useState('campus');

    const toggleContext = (type) => {
        setActiveContext(type);
    };

    return (
        <div className="bg-surface-bright text-on-surface min-h-screen soft-gradient-bg selection:bg-primary/10">
            <style>
                {`
                .font-headline { font-family: 'Manrope', sans-serif; }
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
                }
                .premium-card-shadow {
                    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.05), 0 5px 15px -5px rgba(0, 0, 0, 0.02);
                }
                .soft-gradient-bg {
                    background: radial-gradient(circle at top right, rgba(55, 85, 195, 0.03), transparent 40%),
                                radial-gradient(circle at bottom left, rgba(98, 91, 119, 0.03), transparent 40%);
                }
                .glass-effect {
                    background: rgba(255, 255, 255, 0.8);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                }
                `}
            </style>
            
            {/* Refined Header */}
            <header className="sticky top-0 w-full z-50 glass-effect border-b border-surface-container-high/50">
                <div className="flex items-center justify-between px-6 py-5 max-w-3xl mx-auto">
                    <div className="flex items-center gap-5">
                        <button 
                            onClick={() => navigate(-1)}
                            className="w-10 h-10 rounded-full flex items-center justify-center border border-surface-container hover:bg-white transition-all active:scale-95 text-on-surface-variant"
                        >
                            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                        </button>
                        <div>
                            <h1 className="font-headline text-xl font-extrabold tracking-tight text-on-surface">Remarks</h1>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-primary/40"></span>
                                <p className="text-[10px] font-bold text-outline uppercase tracking-[0.15em]">Management Suite</p>
                            </div>
                        </div>
                    </div>
                    <button className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low text-on-surface-variant hover:bg-white border border-transparent hover:border-surface-container transition-all">
                        <span className="material-symbols-outlined text-[20px]">tune</span>
                    </button>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-10">
                {/* Hero Analytics Section */}
                <section className="grid grid-cols-12 gap-6 mb-12">
                    <div className="col-span-12 bg-white rounded-4xl p-8 premium-card-shadow relative overflow-hidden group">
                        <div className="relative z-10 flex justify-between items-end">
                            <div>
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-[11px] font-bold uppercase tracking-wider mb-4 border border-primary/10">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> Performance Metrics
                                </span>
                                <p className="text-on-surface-variant text-sm font-medium mb-1">Total Resolution Rate</p>
                                <h3 className="text-on-surface font-headline text-5xl font-extrabold tracking-tighter">88.4<span className="text-primary-dim opacity-50">%</span></h3>
                                <div className="flex items-center gap-2 mt-4 text-green-600 text-xs font-bold px-0 py-1">
                                    <span className="material-symbols-outlined text-[14px] font-bold">trending_up</span>
                                    <span>+2.4% increase from previous month</span>
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0 left-0 h-24 overflow-hidden z-0 pointer-events-none opacity-20">
                                <svg className="w-full h-full text-primary-dim" fill="currentColor" preserveAspectRatio="none" viewBox="0 0 400 100">
                                    <path d="M0,80 C50,75 80,40 120,45 C160,50 200,20 250,25 C300,30 350,10 400,15 L400,100 L0,100 Z" fillOpacity="0.3"></path>
                                    <path d="M0,80 C50,75 80,40 120,45 C160,50 200,20 250,25 C300,30 350,10 400,15" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
                                </svg>
                            </div>
                        </div>
                        {/* Decorative Subtle Accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                    </div>
                    
                    <div className="col-span-6 bg-white border border-surface-container/60 rounded-3xl p-6 premium-card-shadow hover:translate-y-[-2px] transition-transform duration-300 relative overflow-hidden">
                        <div className="w-12 h-12 rounded-2xl bg-secondary-container/30 flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-secondary text-[24px]">group</span>
                        </div>
                        <p className="text-on-surface font-headline text-3xl font-extrabold tracking-tight">142</p>
                        <p className="text-outline text-[11px] font-bold uppercase tracking-widest mt-1">Total Academic Staff</p>
                        <div className="absolute -bottom-4 -right-4 text-secondary/5 pointer-events-none select-none">
                            <span className="material-symbols-outlined text-[100px] leading-none">school</span>
                        </div>
                    </div>

                    <div className="col-span-6 bg-white border border-surface-container/60 rounded-3xl p-6 premium-card-shadow hover:translate-y-[-2px] transition-transform duration-300 relative overflow-hidden">
                        <div className="w-12 h-12 rounded-2xl bg-tertiary-container/30 flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-tertiary text-[24px]">school</span>
                        </div>
                        <p className="text-on-surface font-headline text-3xl font-extrabold tracking-tight">04</p>
                        <p className="text-outline text-[11px] font-bold uppercase tracking-widest mt-1">Campus Remarks</p>
                        <div className="absolute -bottom-4 -right-4 text-tertiary/5 pointer-events-none select-none">
                            <span className="material-symbols-outlined text-[100px] leading-none">school</span>
                        </div>
                    </div>
                </section>

                {/* Refined Segmented Toggle */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6 px-2">
                        <h2 className="font-headline text-sm font-extrabold text-on-surface uppercase tracking-[0.2em]">Active Inquiries</h2>
                        <div className="h-[1px] flex-1 bg-surface-container-high mx-6"></div>
                    </div>
                    <div className="bg-surface-container-low/50 p-1.5 rounded-2xl flex w-full border border-surface-container-high/50">
                        <button 
                            className={`flex-1 py-3.5 rounded-xl font-label text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-2.5 ${activeContext === 'campus' ? 'bg-white text-primary shadow-md' : 'text-on-surface-variant hover:text-on-surface'}`}
                            onClick={() => toggleContext('campus')}
                        >
                            <span className="material-symbols-outlined text-[18px]">domain</span>
                            Campus Scope
                        </button>
                        <button 
                            className={`flex-1 py-3.5 rounded-xl font-label text-xs font-semibold transition-all active:scale-95 flex items-center justify-center gap-2.5 ${activeContext === 'staff' ? 'bg-white text-primary shadow-md' : 'text-on-surface-variant hover:text-on-surface'}`}
                            onClick={() => toggleContext('staff')}
                        >
                            <span className="material-symbols-outlined text-[18px]">badge</span>
                            Staff Directory
                        </button>
                    </div>
                </div>

                {/* Elegant Remarks List */}
                <div className="space-y-10" id="remarks-container">
                    {/* Alex Thompson */}
                    <article className="bg-white rounded-3xl p-6 border border-surface-container/60 premium-card-shadow group hover:border-primary/30 transition-all duration-300">
                        <div className="flex items-start justify-between mb-5">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-[24px]">person</span>
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center border-2 border-white">
                                        <span className="material-symbols-outlined text-white text-[10px] font-bold">check</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-headline font-extrabold text-on-surface text-base">Alex Thompson</h3>
                                    <p className="text-[10px] font-bold text-outline tracking-wider uppercase">ID: 2024-8812 • Year 2</p>
                                </div>
                            </div>
                            <span className="bg-error-container/10 text-error text-[10px] px-2.5 py-1 rounded-lg font-bold uppercase tracking-widest border border-error/10">Urgent</span>
                        </div>
                        <div className="mb-6 px-1">
                            <p className="text-on-surface-variant text-[14px] leading-relaxed font-medium italic">
                                "The library AC isn't working on the second floor. It's becoming very difficult to focus on research during the afternoon peaks."
                            </p>
                        </div>
                        <div className="flex items-center justify-between pt-5 border-t border-surface-container-low">
                            <div className="flex items-center gap-2 text-outline/60">
                                <span className="material-symbols-outlined text-[16px]">schedule</span>
                                <span className="text-[11px] font-semibold">Today, 10:45 AM</span>
                            </div>
                            <button className="bg-primary text-white px-6 py-2.5 rounded-xl text-[12px] font-bold shadow-lg shadow-primary/20 hover:bg-primary-dim hover:shadow-xl active:scale-95 transition-all">
                                Resolve Inquiry
                            </button>
                        </div>
                    </article>

                    {/* Sarah Jenkins */}
                    <article className="bg-white rounded-3xl p-6 border border-surface-container/60 premium-card-shadow group hover:border-primary/20 transition-all duration-300">
                        <div className="flex items-start justify-between mb-5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-outline">
                                    <span className="material-symbols-outlined text-[24px]">person</span>
                                </div>
                                <div>
                                    <h3 className="font-headline font-extrabold text-on-surface text-base">Sarah Jenkins</h3>
                                    <p className="text-[10px] font-bold text-outline tracking-wider uppercase">ID: 2023-4509 • Year 3</p>
                                </div>
                            </div>
                            <span className="bg-surface-container-highest text-outline text-[10px] px-2.5 py-1 rounded-lg font-bold uppercase tracking-widest border border-outline/10">General</span>
                        </div>
                        <div className="mb-6 px-1">
                            <p className="text-on-surface-variant text-[14px] leading-relaxed font-medium italic">
                                The cafeteria Wi-Fi signal is extremely weak near the north entrance. Many students use this area for group work between lectures.
                            </p>
                        </div>
                        <div className="flex items-center justify-between pt-5 border-t border-surface-container-low">
                            <div className="flex items-center gap-2 text-outline/60">
                                <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                                <span className="text-[11px] font-semibold">Yesterday, 04:20 PM</span>
                            </div>
                            <button className="bg-on-surface text-white px-6 py-2.5 rounded-xl text-[12px] font-bold shadow-lg shadow-on-surface/10 hover:bg-on-surface/90 hover:shadow-xl active:scale-95 transition-all">
                                Resolve Inquiry
                            </button>
                        </div>
                    </article>

                    {/* Mark Zuckerberg */}
                    <article className="bg-white rounded-3xl p-6 border border-surface-container/60 premium-card-shadow group hover:border-error/30 transition-all duration-300">
                        <div className="flex items-start justify-between mb-5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-error/5 flex items-center justify-center text-error border border-error/10">
                                    <span className="material-symbols-outlined text-[24px]">person</span>
                                </div>
                                <div>
                                    <h3 className="font-headline font-extrabold text-on-surface text-base">Mark Zuckerberg</h3>
                                    <p className="text-[10px] font-bold text-outline tracking-wider uppercase">ID: 2022-1100 • Year 4</p>
                                </div>
                            </div>
                            <span className="bg-error/10 text-error text-[10px] px-2.5 py-1 rounded-lg font-extrabold uppercase tracking-widest border border-error/20">Critical</span>
                        </div>
                        <div className="bg-error/5 rounded-2xl p-4 mb-6 border border-error/10 border-dashed">
                            <p className="text-on-surface-variant text-[14px] leading-relaxed font-medium italic">
                                The gym equipment in the west wing has several broken cables. It's a safety hazard for students working out without supervision.
                            </p>
                        </div>
                        <div className="flex items-center justify-between pt-5 border-t border-surface-container-low">
                            <div className="flex items-center gap-2 text-error/70">
                                <span className="material-symbols-outlined text-[18px] font-bold">warning</span>
                                <span className="text-[11px] font-bold uppercase tracking-wider">High Priority</span>
                            </div>
                            <button className="bg-error text-white px-6 py-2.5 rounded-xl text-[12px] font-bold shadow-lg shadow-error/20 hover:bg-error-dim hover:shadow-xl active:scale-95 transition-all">
                                Resolve Priority
                            </button>
                        </div>
                    </article>
                </div>

                {/* Page Footer / Bottom Spacing */}
                <div className="mt-20 flex flex-col items-center justify-center pb-10 text-outline/40">
                    <span className="material-symbols-outlined text-[20px] mb-2">verified</span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em]">End of Active Feed</p>
                </div>
            </main>
        </div>
    );
};

export default Remarks;
