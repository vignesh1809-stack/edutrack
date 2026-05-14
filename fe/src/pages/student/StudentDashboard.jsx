import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import StudentNavBar from '../../components/StudentNavBar';
import StudentSidebar from '../../components/StudentSidebar';
import { fetchStudentDashboardRequest, setStudentDashboardSemester } from '../../store/actions/studentDashboardActions';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSemesterModalOpen, setIsSemesterModalOpen] = useState(false);

    const { data, loading, error, selectedSemester } = useSelector(state => state.studentDashboard);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        dispatch(fetchStudentDashboardRequest(selectedSemester));
    }, [dispatch, selectedSemester]);

    const handleSemesterSelect = (sem) => {
        dispatch(setStudentDashboardSemester(sem));
        setIsSemesterModalOpen(false);
    };

    if (loading && !data) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-surface">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-on-surface-variant font-medium animate-pulse">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-surface px-6 text-center">
                <div className="max-w-md space-y-6">
                    <div className="w-20 h-20 bg-error-container/10 rounded-full flex items-center justify-center mx-auto">
                        <span className="material-symbols-outlined text-error text-4xl">error</span>
                    </div>
                    <h2 className="text-2xl font-bold text-on-surface">Something went wrong</h2>
                    <p className="text-on-surface-variant">{error}</p>
                    <button 
                        onClick={() => dispatch(fetchStudentDashboardRequest(selectedSemester))}
                        className="bg-primary text-on-primary px-8 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20"
                    >
                        Retry Connection
                    </button>
                </div>
            </div>
        );
    }

    const dashboard = data || {};
    const student = dashboard.student || {};
    const academic = dashboard.academicSummary || {};
    const attendance = dashboard.attendance || {};
    const ranks = dashboard.ranks || {};
    const exam = dashboard.upcomingExam || {};

    return (
        <div className="bg-surface text-on-surface antialiased mb-24 md:mb-0 font-body min-h-screen">
            <StudentSidebar />
            <div className="md:pl-64">
                {/* TopAppBar */}
                <header className="sticky top-0 w-full z-40 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] flex items-center justify-between px-6 py-4 md:w-[calc(100%-16rem)]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container md:hidden">
                            <img alt="student profile" className="w-full h-full object-cover" src={user?.profileImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuDpsvuMcvBD_soJ9wlesX-Epemify8XgF9QGCIeTJSD3Pe6X_GG22KZFtIQ6lQffzBg2e_Hga-ZW2Azig4iAhU-GhNJqHz72DOzVfFouhhM33165N2IAyBP4VdWmR5N2Y6NIDkOXfEhtgDznuNuu5kJeTaZyv-DmfXRUuZGRDWN2lo2RJov4LRxl5hipAI9j9SvgegsyvBL_xdKM9dxk-64h-Y-07aBHWKgWrcd9axVXk5VaFgepUisY0EZxkPpqlwMRmR6uGDEUA0"}/>
                        </div>
                        <span className="text-xl font-extrabold text-blue-700 md:text-slate-900 tracking-tighter font-manrope">EduTrack Horizon</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-on-surface-variant hover:bg-slate-200/50 rounded-xl transition-colors">
                            <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                            Schedule
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 md:bg-transparent md:hover:bg-slate-200/50 transition-colors scale-95 active:transition-transform">
                            <span className="material-symbols-outlined text-slate-500">notifications</span>
                            {dashboard.remarksSummary?.pendingCount > 0 && (
                                <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full ring-2 ring-white"></span>
                            )}
                        </button>
                    </div>
                </header>
                
                <main className="px-6 w-full max-w-7xl mx-auto space-y-8 pt-8 md:pt-12 pb-12">
                    {/* Welcome Header */}
                    <section className="space-y-1">
                        <p className="text-on-surface-variant font-medium text-sm">Dashboard Overview</p>
                        <h1 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface">
                            {dashboard.welcome?.title || `Welcome back, ${student.name || user?.name || 'Student'}`}
                        </h1>
                    </section>
                    
                    {/* Main Content Area */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Academic Summary */}
                        <section className="lg:col-span-2 bg-surface-container-lowest rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-[0px_20px_40px_rgba(42,52,57,0.04)] h-full">
                            <div className="flex justify-between items-center mb-6 md:mb-8">
                                <div>
                                    <h2 className="font-headline font-bold text-lg md:text-xl text-on-surface">Academic Summary</h2>
                                    <div 
                                        className="flex items-center gap-1 text-primary text-sm font-semibold mt-1 cursor-pointer hover:opacity-80 transition-opacity"
                                        onClick={() => setIsSemesterModalOpen(true)}
                                    >
                                        <span>{academic.semesterLabel || `Semester ${selectedSemester || student.currentSemester || '?'}`}</span>
                                        <span className="material-symbols-outlined text-sm">expand_more</span>
                                    </div>
                                </div>
                                <div className="bg-primary-container text-on-primary-container px-4 py-2 md:px-6 md:py-3 rounded-2xl flex flex-col items-center">
                                    <span className="text-[10px] font-bold uppercase tracking-wider">GPA</span>
                                    <span className="text-xl md:text-2xl font-extrabold">{academic.gpa?.toFixed(2) || '0.00'}</span>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {academic.topSubjects?.length > 0 ? (
                                    academic.topSubjects.map((subject, idx) => (
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
                                    <div className="col-span-3 py-8 text-center text-on-surface-variant opacity-60">
                                        <p className="text-sm font-medium">No subject data available for this semester</p>
                                    </div>
                                )}
                            </div>
                        </section>
                        
                        {/* Attendance Report */}
                        <section className="bg-surface-container-low rounded-[24px] md:rounded-[32px] p-6 md:p-8 flex flex-col justify-between h-full">
                            <div className="flex justify-between items-start mb-6 md:mb-10">
                                <div>
                                    <h3 className="font-headline font-bold text-on-surface text-lg">Attendance</h3>
                                    <p className="text-xs text-on-surface-variant">Active semester tracking</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl md:text-4xl font-extrabold text-primary">{attendance.semesterPercent || 0}%</div>
                                    <div className={`text-[10px] uppercase font-bold mt-1 ${attendance.trendPercentVsLastMonth >= 0 ? 'text-green-600' : 'text-error'}`}>
                                        {attendance.trendPercentVsLastMonth >= 0 ? '+' : ''}{attendance.trendPercentVsLastMonth || 0}% from last month
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-end justify-between h-20 md:h-32 gap-2 md:gap-3 mb-2">
                                {attendance.weeklyBars?.map((bar, idx) => (
                                    <div key={idx} className="flex-1 bg-primary/20 rounded-full h-full relative overflow-hidden group">
                                        <div 
                                            className="absolute bottom-0 w-full bg-primary rounded-full transition-all duration-700"
                                            style={{ height: `${bar.percent}%` }}
                                        ></div>
                                        <span className="absolute -bottom-5 md:-bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-on-surface-variant">{bar.day}</span>
                                    </div>
                                ))}
                                {(!attendance.weeklyBars || attendance.weeklyBars.length === 0) && (
                                    <div className="flex-1 text-center text-[10px] text-outline opacity-50 py-4">No data</div>
                                )}
                            </div>
                        </section>
                        
                        {/* Quick Links / Ranks */}
                        <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6 lg:row-span-2">
                            <div className="bg-surface-container-lowest p-5 md:p-6 rounded-3xl shadow-[0px_10px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[140px] md:min-h-[160px] border border-surface-container/30">
                                <div className="w-10 md:w-12 h-10 md:h-12 rounded-2xl bg-secondary-container flex items-center justify-center">
                                    <span className="material-symbols-outlined text-on-secondary-container">leaderboard</span>
                                </div>
                                <div>
                                    <p className="font-bold text-on-surface text-sm md:text-base">Class Rank (Marks)</p>
                                    <p className="text-xs md:text-sm text-on-surface-variant">Position: <span className="font-extrabold text-base md:text-lg text-primary ml-1">#{ranks.marksRank || '-'}</span> <span className="text-[10px] ml-1 opacity-60">of {ranks.cohortSize || '-'}</span></p>
                                </div>
                            </div>
                            <div className="bg-surface-container-lowest p-5 md:p-6 rounded-3xl shadow-[0px_10px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[140px] md:min-h-[160px] border border-surface-container/30">
                                <div className="w-10 md:w-12 h-10 md:h-12 rounded-2xl bg-primary-container flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">how_to_reg</span>
                                </div>
                                <div>
                                    <p className="font-bold text-on-surface text-sm md:text-base">Class Rank (Attendance)</p>
                                    <p className="text-xs md:text-sm text-on-surface-variant">Position: <span className="font-extrabold text-base md:text-lg text-primary ml-1">#{ranks.attendanceRank || '-'}</span> <span className="text-[10px] ml-1 opacity-60">of {ranks.cohortSize || '-'}</span></p>
                                </div>
                            </div>
                            
                            {/* Remarks Quick Actions */}
                            <button 
                                onClick={() => navigate('/student/remarks')}
                                className="col-span-2 lg:col-span-1 w-full bg-gradient-to-br from-primary to-primary-dim text-on-primary py-5 md:py-8 px-6 rounded-2xl md:rounded-3xl flex items-center justify-between shadow-lg md:shadow-xl shadow-primary/20 active:scale-[0.98] transition-transform"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="bg-white/20 p-2 md:p-3 rounded-xl md:rounded-2xl">
                                        <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
                                    </div>
                                    <div className="text-left">
                                        <span className="block font-bold text-base md:text-lg leading-tight">Pending Remarks</span>
                                        <span className="text-[10px] md:text-xs opacity-80 font-medium">History & Timeline</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {dashboard.remarksSummary?.pendingCount > 0 && (
                                        <span className="bg-error text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{dashboard.remarksSummary.pendingCount}</span>
                                    )}
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </div>
                            </button>

                            <button 
                                onClick={() => navigate('/student/submit-feedback')}
                                className="col-span-2 lg:col-span-1 w-full bg-gradient-to-br from-primary to-primary-dim text-on-primary py-5 md:py-8 px-6 rounded-2xl md:rounded-3xl flex items-center justify-between shadow-lg md:shadow-xl shadow-primary/20 active:scale-[0.98] transition-transform"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="bg-white/20 p-2 md:p-3 rounded-xl md:rounded-2xl">
                                        <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>rate_review</span>
                                    </div>
                                    <div className="text-left">
                                        <span className="block font-bold text-base md:text-lg leading-tight">Submit Remarks</span>
                                        <span className="text-[10px] md:text-xs opacity-80 font-medium">Campus & Staff Feedback</span>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined">chevron_right</span>
                            </button>
                        </section>
                        
                        {/* Exams Card */}
                        <section className="md:col-span-2 bg-surface-container-lowest p-6 md:p-8 rounded-[24px] md:rounded-[32px] shadow-[0px_10px_20px_rgba(42,52,57,0.04)] flex items-center justify-between border border-surface-container">
                            <div className="flex items-center gap-4 md:gap-6">
                                <div className="w-12 md:w-16 h-12 md:h-16 rounded-2xl bg-tertiary-container flex items-center justify-center">
                                    <span className="material-symbols-outlined text-on-tertiary-container text-2xl md:text-3xl">event_note</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-on-surface text-lg md:text-xl">Upcoming Exams</h4>
                                    {exam.title ? (
                                        <p className="text-on-surface-variant font-medium text-xs md:text-base">{exam.title} • <span className="text-primary font-bold">{new Date(exam.examDate).toLocaleDateString()}</span></p>
                                    ) : (
                                        <p className="text-on-surface-variant font-medium text-xs md:text-base opacity-60">No upcoming exams scheduled</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                {exam.daysRemaining !== null && (
                                    <div className="hidden sm:block text-right">
                                        <p className="text-[10px] font-bold uppercase text-on-surface-variant">Time Remaining</p>
                                        <p className="text-sm font-bold text-on-surface">{exam.daysRemaining} Days</p>
                                    </div>
                                )}
                                <div className="w-10 h-10 rounded-full border-2 border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors cursor-pointer">
                                    <span className="material-symbols-outlined text-sm md:text-base">arrow_forward_ios</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
                <StudentNavBar />
                
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
                                {[...Array(student.currentSemester || 8)].map((_, i) => {
                                    const sem = i + 1;
                                    const isSelected = selectedSemester === sem || (!selectedSemester && sem === student.currentSemester);
                                    return (
                                        <button 
                                            key={sem}
                                            onClick={() => handleSemesterSelect(sem)}
                                            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-colors group ${isSelected ? 'bg-primary-container text-on-primary-container' : 'hover:bg-surface-container text-on-surface'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="material-symbols-outlined">{isSelected ? 'check_circle' : 'history'}</span>
                                                <span className={isSelected ? 'font-semibold' : 'font-medium'}>Semester {sem} {sem === student.currentSemester ? '(Current)' : ''}</span>
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
            </div>
        </div>
    );
};

export default StudentDashboard;
