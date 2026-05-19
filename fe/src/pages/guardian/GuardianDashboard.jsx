import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/guardianDashboardActions';
import GuardianNavBar from '../../components/GuardianNavBar';
import GuardianSidebar from '../../components/GuardianSidebar';

const GuardianDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { 
        loading, 
        data: dashboardData, 
        selectedChildId, 
        selectedSemester,
        error 
    } = useSelector((state) => state.guardianDashboard);
    
    const [isSemesterModalOpen, setIsSemesterModalOpen] = React.useState(false);
    const [isFeeModalOpen, setIsFeeModalOpen] = React.useState(false);

    React.useEffect(() => {
        dispatch(actions.fetchGuardianDashboardRequest(selectedChildId, selectedSemester));
        dispatch(actions.fetchGuardianAttendanceRequest(selectedChildId, selectedSemester));
        dispatch(actions.fetchGuardianFeesRequest(selectedChildId));
    }, [dispatch, selectedChildId, selectedSemester]);

    // Initial setup of IDs if not present
    React.useEffect(() => {
        if (dashboardData?.children?.length > 0 && !selectedChildId) {
            const active = dashboardData.children.find(c => c.active);
            dispatch(actions.selectChild(active ? active.id : dashboardData.children[0].id));
        }
        if (dashboardData?.selectedChildData?.meta?.semester && !selectedSemester) {
            dispatch(actions.setSelectedSemester(dashboardData.selectedChildData.meta.semester));
        }
    }, [dashboardData, selectedChildId, selectedSemester, dispatch]);

    const handleChildSwitch = (studentId) => {
        dispatch(actions.selectChild(studentId));
    };

    const handleSemesterChange = (semester) => {
        dispatch(actions.setSelectedSemester(semester));
    };

    if (loading && !dashboardData?.selectedChildData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error && !dashboardData?.selectedChildData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
                <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">error</span>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Unable to load dashboard</h3>
                <p className="text-slate-500 mb-6">{error}</p>
                <button 
                    onClick={() => dispatch(actions.fetchGuardianDashboardRequest(selectedChildId, selectedSemester))} 
                    className="bg-primary text-white px-6 py-2 rounded-xl font-bold transition-all active:scale-95"
                >
                    Retry
                </button>
            </div>
        );
    }

    const children = dashboardData?.children || [];
    const childData = dashboardData?.selectedChildData?.data || {};
    const academic = childData.academicSummary || {};
    const subjects = academic.topSubjects || [];
    const attendance = childData.attendance || {};
    const financials = childData.financials || {};
    const remarksSummary = childData.remarksSummary || {};
    const attendanceTrend = attendance.weeklyBars || [];

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount || 0);
    };

    return (
        <div className="bg-surface font-body text-on-surface antialiased mb-24 md:mb-0 min-h-screen">
            <GuardianSidebar />
            <div className="md:pl-64">
                {/* TopAppBar */}
                <header className="fixed top-0 w-full z-50 bg-[#f7f9fb]/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-[0px_20px_40px_rgba(42,52,57,0.06)] md:w-[calc(100%-16rem)]">
                <div className="flex justify-between items-center px-6 h-16 w-full max-w-7xl mx-auto">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img 
                                alt="guardian_profile_photo" 
                                className="w-full h-full object-cover" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCm2VbmXPSNV84kwYAmnMX-4HKJ6exuRglteUk2GC0JYg7rFinUs3PyXIgxzAzD4rMaAfHuR-yexLzg7qyA9FFTvniN1036O4ScwNILlLtqO59REHnY4L8bjtWdJi0Qn_VP1ESNoApiOFAVJ4_Ae4_apTnoHwMziyvawDty3Ip2zynqB-Ot1wL78zYw6pVcrq9utgOnIEDKNj6C75XUZx0uyUOuVgBruApDMJH3w8alACqYoMLF1RfgFYp4RcPLOM72kdcniUvtQQ8"
                            />
                        </div>
                        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-headline tracking-tight">The Academic Atelier</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-full hover:bg-blue-50/50 transition-colors text-blue-600">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 pt-20 pb-12">
                {/* Welcome Header */}
                <section className="mb-6">
                    <h2 className="font-headline font-extrabold text-[2rem] leading-[2.5rem] tracking-tight text-on-surface">Welcome back, {user?.firstName || 'Guardian'}</h2>
                    <p className="text-on-surface-variant mt-1">Review your children's progress and upcoming activities.</p>
                </section>

                {/* Child Switcher */}
                <section className="mb-10 overflow-x-auto no-scrollbar pb-4">
                    <div className="flex gap-4 min-w-max">
                        {children.map((child, i) => (
                            <div 
                                key={i}
                                onClick={() => handleChildSwitch(child.id)}
                                className={`flex items-center gap-4 p-4 pr-8 rounded-2xl shadow-[0px_10px_25px_rgba(42,52,57,0.04)] transition-all cursor-pointer active:scale-95 ${
                                    child.id === selectedChildId 
                                    ? 'bg-white border-2 border-primary shadow-lg ring-4 ring-primary/5' 
                                    : 'bg-slate-50 border-2 border-transparent hover:border-slate-200'
                                }`}
                            >
                                <div className={`w-14 h-14 rounded-xl overflow-hidden ${child.id === selectedChildId ? 'ring-2 ring-primary-container' : 'grayscale'}`}>
                                    <img alt={child.name} className="w-full h-full object-cover" src={child.photo || "https://images.unsplash.com/photo-1597524490810-ac641729418e?auto=format&fit=crop&q=80&w=150"} />
                                </div>
                                <div>
                                    <p className={`font-headline font-bold text-lg ${child.id === selectedChildId ? 'text-primary' : 'text-slate-600'}`}>{child.name}</p>
                                    <p className={`text-[10px] font-bold uppercase tracking-widest ${child.id === selectedChildId ? 'text-primary/60' : 'text-slate-400'}`}>
                                        {child.grade} • {child.section}
                                    </p>
                                </div>
                                {child.id === selectedChildId && (
                                    <span className="material-symbols-outlined text-primary ml-4" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Quick Stats */}
                    <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {/* Attendance */}
                        <div className="bg-surface-container-lowest p-6 rounded-[24px] flex flex-col justify-between h-40 shadow-[0px_10px_25px_rgba(42,52,57,0.04)]">
                            <div className="flex justify-between items-start">
                                <span className="p-2 bg-primary-container/30 rounded-lg text-primary">
                                    <span className="material-symbols-outlined">calendar_today</span>
                                </span>
                                <span className="text-xs font-bold text-on-primary-container bg-primary-container px-2 py-1 rounded-full">{attendance.presents || 0}/{attendance.totalDays || 0} Days</span>
                            </div>
                            <div>
                                <p className="text-on-surface-variant text-sm font-medium">Attendance</p>
                                <h3 className="font-headline font-extrabold text-3xl text-on-surface">{attendance.semesterPercent || 0}%</h3>
                            </div>
                        </div>
                        {/* Grade */}
                        <div className="bg-surface-container-lowest p-6 rounded-[24px] flex flex-col justify-between h-40 shadow-[0px_10px_25px_rgba(42,52,57,0.04)]">
                            <div className="flex justify-between items-start">
                                <span className="p-2 bg-tertiary-container/30 rounded-lg text-tertiary">
                                    <span className="material-symbols-outlined">grade</span>
                                </span>
                                <span className="text-xs font-bold text-on-tertiary-container bg-tertiary-container px-2 py-1 rounded-full">Top 10%</span>
                            </div>
                            <div>
                                <p className="text-on-surface-variant text-sm font-medium">Latest GPA</p>
                                <h3 className="font-headline font-extrabold text-3xl text-on-surface">{academic.gpa?.toFixed(2) || '0.00'}</h3>
                            </div>
                        </div>
                        {/* Fees */}
                        <div 
                            onClick={() => setIsFeeModalOpen(true)}
                            className="bg-surface-container-lowest p-6 rounded-[24px] flex flex-col justify-between h-40 shadow-[0px_10px_25px_rgba(42,52,57,0.04)] cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all active:scale-[0.98]"
                        >
                            <div className="flex justify-between items-start">
                                <span className={`p-2 rounded-lg ${financials.status === 'PAID' ? 'bg-success-container/20 text-success' : 'bg-error-container/20 text-error'}`}>
                                    <span className="material-symbols-outlined">payments</span>
                                </span>
                                <span className="text-xs font-bold text-primary underline">View Details</span>
                            </div>
                            <div className="flex gap-6">
                                <div>
                                    <p className="text-on-surface-variant text-xs font-medium">Pending Fees</p>
                                    <h3 className="font-headline font-extrabold text-2xl text-error">{formatCurrency(financials.pendingAmount)}</h3>
                                </div>
                                <div className="border-l border-slate-100 pl-6">
                                    <p className="text-on-surface-variant text-xs font-medium">Paid Fees</p>
                                    <h3 className="font-headline font-extrabold text-2xl text-success">{formatCurrency(financials.paidAmount)}</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Academic Summary (Exact Student Dashboard Style) */}
                    <section className="lg:col-span-8 bg-surface-container-lowest rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-[0px_20px_40px_rgba(42,52,57,0.04)] h-full">
                        <div className="flex justify-between items-center mb-6 md:mb-8">
                            <div>
                                <h2 className="font-headline font-bold text-lg md:text-xl text-on-surface">Academic Summary</h2>
                                <div 
                                    className="flex items-center gap-1 text-primary text-sm font-semibold mt-1 cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={() => setIsSemesterModalOpen(true)}
                                >
                                    <span>Semester {selectedSemester || 1}</span>
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                </div>
                            </div>
                            <div className="bg-primary-container text-on-primary-container px-4 py-2 md:px-6 md:py-3 rounded-2xl flex flex-col items-center">
                                <span className="text-[10px] font-bold uppercase tracking-wider">GPA</span>
                                <span className="text-xl md:text-2xl font-extrabold">{academic.gpa?.toFixed(2) || '0.00'}</span>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {subjects.length > 0 ? (
                                subjects.map((subject, idx) => (
                                    <div key={idx} className="flex md:flex-col items-center md:items-start md:justify-between p-3 md:p-5 rounded-xl md:rounded-2xl bg-surface-container-low md:min-h-[140px]">
                                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mr-3 md:mr-0 md:mb-4">
                                            <span className="material-symbols-outlined text-primary">
                                                {idx === 0 ? 'calculate' : idx === 1 ? 'science' : 'history_edu'}
                                            </span>
                                        </div>
                                        <div className="flex-1 md:flex-none">
                                            <span className="font-medium text-sm md:text-xs text-on-surface md:text-on-surface-variant block md:mb-1 truncate max-w-[120px]">
                                                {subject.courseName}
                                            </span>
                                            <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-lg text-xs font-bold md:hidden sm:inline-block">
                                                Grade {subject.grade} | {(subject.scorePercent / 10).toFixed(1)}
                                            </span>
                                        </div>
                                        <span className="hidden md:inline-block bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-lg text-xs font-bold">
                                            Grade {subject.grade} | {(subject.scorePercent / 10).toFixed(1)}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-8 text-center text-on-surface-variant opacity-60">
                                    <p className="text-sm font-medium">No subject data available for this semester</p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Staff Remarks */}
                    <div className="md:col-span-4 flex flex-col gap-6">
                        <div className="bg-tertiary-container/30 p-6 rounded-[32px] flex-1 shadow-[0px_10px_25px_rgba(42,52,57,0.04)]">
                            <h3 className="font-headline font-bold text-xl mb-6 text-on-surface">Staff Remarks</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-[10px] font-bold text-tertiary uppercase tracking-widest">Pending Remarks</p>
                                        <span className="bg-tertiary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{remarksSummary.pendingCount || 0}</span>
                                    </div>
                                    {remarksSummary.pendingCount > 0 ? (
                                        <div className="relative pl-6 border-l-2 border-tertiary/20">
                                            <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-tertiary"></div>
                                            <p className="text-xs font-bold text-tertiary-dim uppercase tracking-wider mb-1">Latest Update</p>
                                            <p className="text-sm leading-relaxed text-on-tertiary-container">
                                                You have {remarksSummary.pendingCount} new remarks from faculty. Click below to review.
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-slate-500">No pending remarks at this time.</p>
                                    )}
                                </div>
                        </div>
                        <div className="bg-primary p-6 rounded-[32px] text-on-primary shadow-lg shadow-primary/20">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 opacity-80">Quick Actions</p>
                            <div className="space-y-3">
                                <button 
                                    onClick={() => navigate('/guardian/faculty-directory')}
                                    className="w-full bg-white/10 hover:bg-white/20 transition-colors py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm backdrop-blur-md"
                                >
                                    <span className="material-symbols-outlined text-[18px]">description</span>
                                    <span>View Full Report Card</span>
                                </button>
                                <button 
                                    onClick={() => navigate('/guardian/faculty-directory')}
                                    className="w-full bg-white text-primary py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm shadow-lg shadow-primary-dim/20"
                                >
                                    <span className="material-symbols-outlined text-[18px]">send</span>
                                    <span>Message Teacher</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Attendance Trends */}
                    <div className="md:col-span-12 bg-surface-container-low p-8 rounded-[32px] shadow-[0px_10px_25px_rgba(42,52,57,0.04)]">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <div>
                                <h3 className="font-headline font-bold text-xl text-on-surface">Attendance Trends</h3>
                                <p className="text-sm text-on-surface-variant">Last 7 Weeks</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                                    <span className="text-xs font-medium text-on-surface-variant">Attendance %</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-3 md:gap-6 h-32 items-end px-2">
                            {attendanceTrend.map((bar, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-3 h-full group relative">
                                    {/* Value Label - Always Visible */}
                                    <span className="text-[10px] font-black text-primary mb-1 whitespace-nowrap absolute -top-5">
                                        {bar.percent || 0}%
                                    </span>
                                    <div className="w-full flex flex-col items-center justify-end h-full">
                                        <div 
                                            className="w-full max-w-[40px] bg-primary rounded-lg transition-all duration-500 ease-out shadow-sm group-hover:shadow-md group-hover:scale-[1.02]"
                                            style={{ height: `${bar.percent || 0}%`, opacity: (bar.percent || 0) / 100 + 0.3 }}
                                        ></div>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{bar.day}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Semester Selection Modal Overlay */}
            {isSemesterModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 bg-inverse-surface/40 backdrop-blur-sm transition-opacity">
                    <div className="w-full max-w-md bg-surface-container-lowest rounded-t-[32px] md:rounded-[32px] shadow-2xl overflow-hidden transform transition-all animate-in slide-in-from-bottom duration-300">
                        {/* Modal Header */}
                        <div className="px-6 py-5 border-b border-surface-container flex items-center justify-between">
                            <h3 className="font-headline font-bold text-xl text-on-surface">Select Semester</h3>
                            <button 
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors" 
                                onClick={() => setIsSemesterModalOpen(false)}
                            >
                                <span className="material-symbols-outlined text-on-surface-variant">close</span>
                            </button>
                        </div>
                        
                        {/* Semester List */}
                        <div className="p-4 space-y-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => {
                                const isSelected = selectedSemester === sem;
                                return (
                                    <button 
                                        key={sem}
                                        onClick={() => {
                                            handleSemesterChange(sem);
                                            setIsSemesterModalOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-colors group ${isSelected ? 'bg-primary-container text-on-primary-container' : 'hover:bg-surface-container text-on-surface'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined">{isSelected ? 'check_circle' : 'history'}</span>
                                            <span className={isSelected ? 'font-semibold' : 'font-medium'}>Semester {sem}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                        
                        {/* Bottom Padding for Mobile Safe Area */}
                        <div className="h-6 md:hidden"></div>
                    </div>
                    
                    {/* Click-outside-to-dismiss backdrop */}
                    <div 
                        className="absolute inset-0 -z-10" 
                        onClick={() => setIsSemesterModalOpen(false)}
                    ></div>
                </div>
            )}

            {/* Fee Details Modal Overlay */}
            {isFeeModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 bg-inverse-surface/40 backdrop-blur-sm transition-opacity">
                    <div className="w-full max-w-xl bg-surface-container-lowest rounded-t-[32px] md:rounded-[32px] shadow-2xl overflow-hidden transform transition-all animate-in slide-in-from-bottom duration-300 max-h-[85vh] flex flex-col">
                        {/* Modal Header */}
                        <div className="px-6 py-5 border-b border-surface-container flex items-center justify-between">
                            <div>
                                <h3 className="font-headline font-bold text-xl text-on-surface">Pending Invoices</h3>
                                <p className="text-xs text-on-surface-variant">Total Outstanding: {formatCurrency(financials.pendingAmount)}</p>
                            </div>
                            <button 
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors" 
                                onClick={() => setIsFeeModalOpen(false)}
                            >
                                <span className="material-symbols-outlined text-on-surface-variant">close</span>
                            </button>
                        </div>
                        
                        {/* Fee List */}
                        <div className="p-6 overflow-y-auto space-y-4">
                            {financials.pendingItems?.length > 0 ? (
                                financials.pendingItems.map((item, idx) => (
                                    <div key={idx} className="bg-surface-container-low p-4 rounded-2xl border border-surface-container flex justify-between items-center">
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                                                <span className="material-symbols-outlined">description</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-on-surface">{item.feeType?.replace('_', ' ')}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.term || 'General Term'}</p>
                                                <p className="text-xs text-error font-medium mt-1 flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px]">event_busy</span>
                                                    Due: {item.dueDate || 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-headline font-extrabold text-lg text-on-surface">{formatCurrency(item.totalAmount)}</p>
                                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                                                item.status === 'DUE' ? 'bg-error-container text-error' : 
                                                item.status === 'PENDING' ? 'bg-warning-container text-warning' : 'bg-primary-container text-primary'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <span className="material-symbols-outlined text-4xl text-slate-200 mb-2">check_circle</span>
                                    <p className="text-slate-500 font-medium">All fees are cleared!</p>
                                </div>
                            )}
                        </div>

                        {/* Footer / Actions */}
                        <div className="p-6 bg-surface-container-lowest border-t border-surface-container">
                            <button 
                                onClick={() => navigate('/guardian/faculty-directory')}
                                className="w-full bg-primary text-on-primary py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-dim/20 active:scale-[0.98] transition-all"
                            >
                                <span className="material-symbols-outlined">payments</span>
                                <span>Proceed to Payment Gateway</span>
                            </button>
                            <p className="text-center text-[10px] text-on-surface-variant mt-4 opacity-60">
                                Powered by EduTrack Payments • Secure 256-bit SSL Encryption
                            </p>
                        </div>
                    </div>
                    
                    {/* Click-outside-to-dismiss backdrop */}
                    <div 
                        className="absolute inset-0 -z-10" 
                        onClick={() => setIsFeeModalOpen(false)}
                    ></div>
                </div>
            )}

            <GuardianNavBar />
            </div>
        </div>
    );
};

export default GuardianDashboard;
