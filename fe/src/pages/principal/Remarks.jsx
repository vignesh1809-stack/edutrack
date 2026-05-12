import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchRemarksSummaryRequest,
    fetchRemarksFeedRequest,
    resolveRemarkRequest,
    setRemarksScope,
} from '../../store/actions/remarksActions';

const Remarks = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Redux state
    const { summary, summaryLoading, feed, feedLoading, scope, resolving } = useSelector(
        (state) => state.remarks
    );
    const dashboardFilters = useSelector((state) => state.dashboard.filters);

    // Local modal state only
    const [resolveModal, setResolveModal] = useState({ isOpen: false, remarkId: null });
    const [resolveForm, setResolveForm] = useState({ actionTaken: '', description: '' });

    // On mount: fetch summary + feed
    useEffect(() => {
        dispatch(fetchRemarksSummaryRequest({ filters: dashboardFilters }));
    }, [dispatch, dashboardFilters]);

    useEffect(() => {
        dispatch(fetchRemarksFeedRequest({ scope, filters: dashboardFilters }));
    }, [dispatch, scope, dashboardFilters]);

    const toggleContext = (type) => {
        dispatch(setRemarksScope(type));
    };

    const handleResolveClick = (id) => {
        setResolveModal({ isOpen: true, remarkId: id });
    };

    const handleResolve = () => {
        dispatch(resolveRemarkRequest(resolveModal.remarkId, resolveForm));
        setResolveModal({ isOpen: false, remarkId: null });
        setResolveForm({ actionTaken: '', description: '' });
    };

    return (
        <div className="bg-surface-bright text-on-surface min-h-screen soft-gradient-bg selection:bg-primary/10">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
                
                .font-headline { font-family: 'Plus Jakarta Sans', sans-serif; }
                .font-body { font-family: 'Inter', sans-serif; }
                
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

            {/* Header */}
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
                            <p className="font-body text-[10px] font-semibold text-outline tracking-wider uppercase">Inquiry Management</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col items-end">
                            <span className="font-headline text-2xl font-extrabold text-primary">
                                {summaryLoading ? '–' : `${Math.round(summary.resolutionRate)}%`}
                            </span>
                            <span className="font-body text-[9px] font-bold uppercase tracking-widest text-outline">Resolution Rate</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 pt-10 pb-32">

                {/* Summary Cards */}
                <section className="grid grid-cols-2 gap-4 mb-10">

                    {/* Resolution Rate — Premium Card (Reference Design) */}
                    <div className="col-span-2 bg-white rounded-4xl p-8 premium-card-shadow relative overflow-hidden group">
                        <div className="relative z-10 flex justify-between items-end">
                            <div>
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-[11px] font-bold uppercase tracking-wider mb-4 border border-primary/10">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> Performance Metrics
                                </span>
                                <p className="text-on-surface-variant text-sm font-medium mb-1">Total Resolution Rate</p>
                                <h3 className="text-on-surface font-headline text-5xl font-extrabold tracking-tighter">
                                    {summaryLoading ? '–' : `${(summary.resolutionRate || 0).toFixed(1)}`}
                                    <span className="text-primary-dim opacity-50">%</span>
                                </h3>
                                <div className="flex items-center gap-2 mt-4 text-green-600 text-xs font-bold">
                                    <span className="material-symbols-outlined text-[14px] font-bold">trending_up</span>
                                    <span>+{Math.round(summary.trendPercentage * 10) / 10 || 2.4}% increase from previous month</span>
                                </div>
                            </div>
                        </div>
                        {/* SVG Wave Chart */}
                        <div className="absolute bottom-0 right-0 left-0 h-24 overflow-hidden z-0 pointer-events-none opacity-20">
                            <svg className="w-full h-full text-primary-dim" fill="currentColor" preserveAspectRatio="none" viewBox="0 0 400 100">
                                <path d="M0,80 C50,75 80,40 120,45 C160,50 200,20 250,25 C300,30 350,10 400,15 L400,100 L0,100 Z" fillOpacity="0.3"></path>
                                <path d="M0,80 C50,75 80,40 120,45 C160,50 200,20 250,25 C300,30 350,10 400,15" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
                            </svg>
                        </div>
                        {/* Decorative Blur Accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                    </div>

                    {/* Staff Inquiries */}
                    <div className="bg-white rounded-3xl p-6 border border-surface-container/60 premium-card-shadow relative overflow-hidden">
                        <div className="w-10 h-10 rounded-xl bg-secondary-container/30 flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-secondary text-[20px]">badge</span>
                        </div>
                        <p className="font-headline text-3xl font-extrabold text-on-surface tracking-tight">
                            {summaryLoading ? '–' : summary.staffRemarksCount.toString().padStart(2, '0')}
                        </p>
                        <p className="font-body text-[10px] font-bold text-outline uppercase tracking-widest mt-1">Staff Inquiries</p>
                        <div className="absolute -bottom-4 -right-4 text-secondary/5 pointer-events-none">
                            <span className="material-symbols-outlined text-[80px] leading-none">school</span>
                        </div>
                    </div>

                    {/* Campus Remarks */}
                    <div className="bg-white rounded-3xl p-6 border border-surface-container/60 premium-card-shadow relative overflow-hidden">
                        <div className="w-10 h-10 rounded-xl bg-tertiary-container/30 flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-tertiary text-[20px]">domain</span>
                        </div>
                        <p className="font-headline text-3xl font-extrabold text-on-surface tracking-tight">
                            {summaryLoading ? '–' : summary.campusRemarksCount.toString().padStart(2, '0')}
                        </p>
                        <p className="font-body text-[10px] font-bold text-outline uppercase tracking-widest mt-1">Campus Remarks</p>
                        <div className="absolute -bottom-4 -right-4 text-tertiary/5 pointer-events-none">
                            <span className="material-symbols-outlined text-[80px] leading-none">corporate_fare</span>
                        </div>
                    </div>

                </section>

                {/* Scope Toggle */}
                <div className="mb-10">
                    <div className="flex items-center gap-4 mb-5 px-1">
                        <h2 className="font-headline text-xs font-extrabold text-on-surface uppercase tracking-[0.2em]">Active Inquiries</h2>
                        <div className="h-px flex-1 bg-surface-container-high"></div>
                    </div>
                    <div className="bg-surface-container-low/50 p-1.5 rounded-2xl flex w-full border border-surface-container-high/50">
                        <button
                            className={`flex-1 py-3 rounded-xl font-body text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-2 ${scope === 'campus' ? 'bg-white text-primary shadow-md' : 'text-on-surface-variant hover:text-on-surface'}`}
                            onClick={() => toggleContext('campus')}
                        >
                            <span className="material-symbols-outlined text-[16px]">domain</span>
                            Campus Scope
                        </button>
                        <button
                            className={`flex-1 py-3 rounded-xl font-body text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-2 ${scope === 'staff' ? 'bg-white text-primary shadow-md' : 'text-on-surface-variant hover:text-on-surface'}`}
                            onClick={() => toggleContext('staff')}
                        >
                            <span className="material-symbols-outlined text-[16px]">badge</span>
                            Staff Directory
                        </button>
                    </div>
                </div>

                {/* Feed */}
                <div className="space-y-4">
                    {feedLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 opacity-50">
                            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em]">Loading Inquiries...</p>
                        </div>
                    ) : feed.length > 0 ? (
                        feed.map((remark) => {
                            const isCritical = remark.urgency === 'CRITICAL';
                            const isHigh = remark.urgency === 'HIGH';
                            return (
                            <article key={remark.id} className={`rounded-3xl p-6 border premium-card-shadow transition-all duration-300 ${
                                isCritical
                                    ? 'bg-[#1a1a2e] border-red-900/40 hover:border-red-500/40'
                                    : isHigh
                                    ? 'bg-orange-50 border-orange-200/60 hover:border-orange-400/40'
                                    : 'bg-white border-surface-container/60 hover:border-primary/30'
                            }`}>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                                                isCritical ? 'bg-red-900/30 text-red-400' :
                                                isHigh ? 'bg-orange-100 text-orange-500' :
                                                'bg-primary/5 text-primary'
                                            }`}>
                                                <span className="material-symbols-outlined text-[22px]">person</span>
                                            </div>
                                            {remark.status === 'RESOLVED' && (
                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center border-2 border-white">
                                                    <span className="material-symbols-outlined text-white text-[9px]">check</span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className={`font-headline font-extrabold text-sm ${
                                                isCritical ? 'text-white' : 'text-on-surface'
                                            }`}>{remark.authorName}</h3>
                                            <p className={`font-body text-[10px] font-semibold tracking-wider uppercase ${
                                                isCritical ? 'text-slate-400' :
                                                isHigh ? 'text-orange-700/70' :
                                                'text-outline'
                                            }`}>
                                                ID: {remark.authorCode} • {remark.academicInfo}
                                                {remark.targetStaffName && (
                                                    <span className={`ml-1.5 font-bold ${
                                                        isCritical ? 'text-red-400' : 'text-secondary'
                                                    }`}>→ {remark.targetStaffName}</span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`font-body text-[9px] px-2.5 py-1 rounded-lg font-bold uppercase tracking-widest border ${
                                        isCritical ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                        isHigh ? 'bg-orange-100 text-orange-600 border-orange-300' :
                                        'bg-surface-container-highest text-outline border-outline/10'
                                    }`}>
                                        {remark.urgency || 'GENERAL'}
                                    </span>
                                </div>

                                <div className="mb-5 pl-1">
                                    <p className={`font-body text-[13px] leading-relaxed font-medium italic ${
                                        isCritical ? 'text-slate-300' :
                                        isHigh ? 'text-orange-900/80' :
                                        'text-on-surface-variant'
                                    }`}>
                                        "{remark.content}"
                                    </p>
                                </div>

                                <div className={`flex items-center justify-between pt-4 border-t ${
                                    isCritical ? 'border-white/10' :
                                    isHigh ? 'border-orange-200' :
                                    'border-surface-container-low'
                                }`}>
                                    <div className="flex items-center gap-1.5">
                                        {isCritical && (
                                            <div className="flex items-center gap-1.5 text-red-400">
                                                <span className="material-symbols-outlined text-[14px]">warning</span>
                                                <span className="font-body text-[10px] font-bold uppercase tracking-widest">High Priority</span>
                                            </div>
                                        )}
                                        {!isCritical && (
                                            <div className={`font-body flex items-center gap-1.5 ${
                                                isHigh ? 'text-orange-400' : 'text-outline/60'
                                            }`}>
                                                <span className="material-symbols-outlined text-[14px]">schedule</span>
                                                <span className="text-[11px] font-semibold">{new Date(remark.createdAt).toLocaleString()}</span>
                                            </div>
                                        )}
                                    </div>
                                    {remark.status !== 'RESOLVED' && (
                                        <button
                                            onClick={() => handleResolveClick(remark.id)}
                                            className={`font-body px-5 py-2 rounded-xl text-[11px] font-bold active:scale-95 transition-all ${
                                                isCritical
                                                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 hover:bg-red-600'
                                                    : isHigh
                                                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 hover:bg-orange-600'
                                                    : 'bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary-dim'
                                            }`}
                                        >
                                            {isCritical ? 'Resolve Priority' : 'Resolve Inquiry'}
                                        </button>
                                    )}
                                </div>
                            </article>
                            );
                        })
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 opacity-30">
                            <span className="material-symbols-outlined text-[48px] mb-4">inbox</span>
                            <p className="font-body text-[11px] font-bold uppercase tracking-[0.3em]">No Active Inquiries</p>
                        </div>
                    )}
                </div>

                <div className="mt-16 flex flex-col items-center justify-center pb-10 text-outline/30">
                    <span className="material-symbols-outlined text-[18px] mb-2">verified</span>
                    <p className="font-body text-[9px] font-bold uppercase tracking-[0.3em]">End of Active Feed</p>
                </div>
            </main>

            {/* Resolution Modal */}
            {resolveModal.isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-md rounded-[28px] p-8 shadow-2xl">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-[22px]">task_alt</span>
                            </div>
                            <div>
                                <h2 className="font-headline text-lg font-extrabold text-on-surface">Resolve Inquiry</h2>
                                <p className="font-body text-outline text-xs font-medium">Document the action taken to close this ticket</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="font-body block text-[10px] font-bold uppercase tracking-widest text-outline mb-2">Action Type</label>
                                <input
                                    type="text"
                                    className="font-body w-full bg-surface-container-low border border-surface-container-high rounded-2xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="e.g. Scheduled Maintenance, Staff Meeting..."
                                    value={resolveForm.actionTaken}
                                    onChange={(e) => setResolveForm({ ...resolveForm, actionTaken: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="font-body block text-[10px] font-bold uppercase tracking-widest text-outline mb-2">Resolution Description</label>
                                <textarea
                                    rows="4"
                                    className="font-body w-full bg-surface-container-low border border-surface-container-high rounded-2xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                    placeholder="Provide details about how this was addressed..."
                                    value={resolveForm.description}
                                    onChange={(e) => setResolveForm({ ...resolveForm, description: e.target.value })}
                                ></textarea>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8">
                            <button
                                onClick={() => setResolveModal({ isOpen: false, remarkId: null })}
                                className="font-body flex-1 py-3.5 rounded-2xl text-[12px] font-bold text-on-surface-variant hover:bg-surface-container transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleResolve}
                                disabled={!resolveForm.actionTaken || !resolveForm.description || resolving}
                                className="font-body flex-[2] bg-primary text-white py-3.5 rounded-2xl text-[12px] font-bold shadow-lg shadow-primary/20 hover:bg-primary-dim disabled:opacity-50 disabled:grayscale transition-all active:scale-95"
                            >
                                {resolving ? 'Confirming...' : 'Confirm Resolution'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Remarks;
