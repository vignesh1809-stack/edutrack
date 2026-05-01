import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentNavBar from '../../components/StudentNavBar';
import StudentSidebar from '../../components/StudentSidebar';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [isSemesterModalOpen, setIsSemesterModalOpen] = useState(false);

    return (
        <div className="bg-surface text-on-surface antialiased mb-24 md:mb-0 font-body min-h-screen">
            <StudentSidebar />
            <div className="md:pl-64">
                {/* TopAppBar */}
                <header className="sticky top-0 w-full z-40 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] flex items-center justify-between px-6 py-4 md:w-[calc(100%-16rem)]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container md:hidden">
                            <img alt="student profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpsvuMcvBD_soJ9wlesX-Epemify8XgF9QGCIeTJSD3Pe6X_GG22KZFtIQ6lQffzBg2e_Hga-ZW2Azig4iAhU-GhNJqHz72DOzVfFouhhM33165N2IAyBP4VdWmR5N2Y6NIDkOXfEhtgDznuNuu5kJeTaZyv-DmfXRUuZGRDWN2lo2RJov4LRxl5hipAI9j9SvgegsyvBL_xdKM9dxk-64h-Y-07aBHWKgWrcd9axVXk5VaFgepUisY0EZxkPpqlwMRmR6uGDEUA0"/>
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
                        </button>
                    </div>
                </header>
                
                <main className="px-6 w-full max-w-7xl mx-auto space-y-8 pt-8 md:pt-12 pb-12">
                    {/* Welcome Header */}
                    <section className="space-y-1">
                        <p className="text-on-surface-variant font-medium text-sm">Dashboard Overview</p>
                        <h1 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface">Welcome back, Alexander</h1>
                    </section>
                    
                    {/* Main Content Area */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Academic Summary */}
                        <section className="lg:col-span-2 bg-surface-container-lowest rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-[0px_20px_40px_rgba(42,52,57,0.04)] h-full">
                            <div className="flex justify-between items-center mb-6 md:mb-8">
                                <div>
                                    <h2 className="font-headline font-bold text-lg md:text-xl text-on-surface">Academic Summary</h2>
                                    <div 
                                        className="flex items-center gap-1 text-primary text-sm font-semibold mt-1 cursor-pointer"
                                        onClick={() => setIsSemesterModalOpen(true)}
                                    >
                                        <span>Fall 2023 Semester</span>
                                        <span className="material-symbols-outlined text-sm">expand_more</span>
                                    </div>
                                </div>
                                <div className="bg-primary-container text-on-primary-container px-4 py-2 md:px-6 md:py-3 rounded-2xl flex flex-col items-center">
                                    <span className="text-[10px] font-bold uppercase tracking-wider">GPA</span>
                                    <span className="text-xl md:text-2xl font-extrabold">3.88</span>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="flex md:flex-col items-center md:items-start md:justify-between p-3 md:p-5 rounded-xl md:rounded-2xl bg-surface-container-low md:min-h-[140px]">
                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mr-3 md:mr-0 md:mb-4">
                                        <span className="material-symbols-outlined text-primary">calculate</span>
                                    </div>
                                    <div className="flex-1 md:flex-none">
                                        <span className="font-medium text-sm md:text-xs text-on-surface md:text-on-surface-variant block md:mb-1">Advanced Mathematics</span>
                                        <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-lg text-xs font-bold md:hidden sm:inline-block">Grade A</span>
                                    </div>
                                    <span className="hidden md:inline-block bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-lg text-xs font-bold">Grade A</span>
                                </div>
                                <div className="flex md:flex-col items-center md:items-start md:justify-between p-3 md:p-5 rounded-xl md:rounded-2xl bg-surface-container-low md:min-h-[140px]">
                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mr-3 md:mr-0 md:mb-4">
                                        <span className="material-symbols-outlined text-primary">science</span>
                                    </div>
                                    <div className="flex-1 md:flex-none">
                                        <span className="font-medium text-sm md:text-xs text-on-surface md:text-on-surface-variant block md:mb-1">Quantum Physics</span>
                                        <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-lg text-xs font-bold md:hidden sm:inline-block">Grade A-</span>
                                    </div>
                                    <span className="hidden md:inline-block bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-lg text-xs font-bold">Grade A-</span>
                                </div>
                                <div className="flex md:flex-col items-center md:items-start md:justify-between p-3 md:p-5 rounded-xl md:rounded-2xl bg-surface-container-low md:min-h-[140px]">
                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mr-3 md:mr-0 md:mb-4">
                                        <span className="material-symbols-outlined text-primary">history_edu</span>
                                    </div>
                                    <div className="flex-1 md:flex-none">
                                        <span className="font-medium text-sm md:text-xs text-on-surface md:text-on-surface-variant block md:mb-1">English Literature</span>
                                        <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-lg text-xs font-bold md:hidden sm:inline-block">Grade B+</span>
                                    </div>
                                    <span className="hidden md:inline-block bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-lg text-xs font-bold">Grade B+</span>
                                </div>
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
                                    <div className="text-3xl md:text-4xl font-extrabold text-primary">92%</div>
                                    <div className="text-[10px] uppercase font-bold text-on-surface-variant mt-1">+2% from last month</div>
                                </div>
                            </div>
                            <div className="flex items-end justify-between h-20 md:h-32 gap-2 md:gap-3 mb-2">
                                <div className="flex-1 bg-primary/20 rounded-full h-full relative overflow-hidden group">
                                    <div className="absolute bottom-0 w-full bg-primary h-[85%] rounded-full transition-all group-hover:h-[90%]"></div>
                                    <span className="absolute -bottom-5 md:-bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-on-surface-variant">M</span>
                                </div>
                                <div className="flex-1 bg-primary/20 rounded-full h-full relative overflow-hidden group">
                                    <div className="absolute bottom-0 w-full bg-primary h-[95%] rounded-full transition-all"></div>
                                    <span className="absolute -bottom-5 md:-bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-on-surface-variant">T</span>
                                </div>
                                <div className="flex-1 bg-primary/20 rounded-full h-full relative overflow-hidden group">
                                    <div className="absolute bottom-0 w-full bg-primary h-[70%] rounded-full transition-all"></div>
                                    <span className="absolute -bottom-5 md:-bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-on-surface-variant">W</span>
                                </div>
                                <div className="flex-1 bg-primary/20 rounded-full h-full relative overflow-hidden group">
                                    <div className="absolute bottom-0 w-full bg-primary h-[92%] rounded-full transition-all"></div>
                                    <span className="absolute -bottom-5 md:-bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-on-surface-variant">T</span>
                                </div>
                                <div className="flex-1 bg-primary/20 rounded-full h-full relative overflow-hidden group">
                                    <div className="absolute bottom-0 w-full bg-primary h-[80%] rounded-full transition-all"></div>
                                    <span className="absolute -bottom-5 md:-bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-on-surface-variant">F</span>
                                </div>
                                <div className="md:hidden flex-1 bg-primary/20 rounded-full h-full relative overflow-hidden group">
                                    <div className="absolute bottom-0 w-full bg-primary h-[40%] rounded-full transition-all"></div>
                                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-on-surface-variant">S</span>
                                </div>
                            </div>
                        </section>
                        
                        {/* Quick Links / Ranks */}
                        <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6 lg:row-span-2">
                            <div className="bg-surface-container-lowest p-5 md:p-6 rounded-3xl shadow-[0px_10px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[140px] md:min-h-[160px]">
                                <div className="w-10 md:w-12 h-10 md:h-12 rounded-2xl bg-secondary-container flex items-center justify-center">
                                    <span className="material-symbols-outlined text-on-secondary-container">leaderboard</span>
                                </div>
                                <div>
                                    <p className="font-bold text-on-surface text-sm md:text-base">Class Rank (Marks)</p>
                                    <p className="text-xs md:text-sm text-on-surface-variant">Position: <span className="font-extrabold text-base md:text-lg text-primary ml-1">#4</span></p>
                                </div>
                            </div>
                            <div className="bg-surface-container-lowest p-5 md:p-6 rounded-3xl shadow-[0px_10px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[140px] md:min-h-[160px]">
                                <div className="w-10 md:w-12 h-10 md:h-12 rounded-2xl bg-primary-container flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">how_to_reg</span>
                                </div>
                                <div>
                                    <p className="font-bold text-on-surface text-sm md:text-base">Class Rank (Attendance)</p>
                                    <p className="text-xs md:text-sm text-on-surface-variant">Position: <span className="font-extrabold text-base md:text-lg text-primary ml-1">#2</span></p>
                                </div>
                            </div>
                            
                            {/* Submit Remarks Button */}
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
                                        <span className="text-[10px] md:text-xs opacity-80 font-medium">Teacher &amp; Campus Feedback</span>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined">chevron_right</span>
                            </button>
                        </section>
                        
                        {/* Exams Card */}
                        <section className="md:col-span-2 bg-surface-container-lowest p-6 md:p-8 rounded-[24px] md:rounded-[32px] shadow-[0px_10px_20px_rgba(0,0,0,0.02)] flex items-center justify-between border border-surface-container">
                            <div className="flex items-center gap-4 md:gap-6">
                                <div className="w-12 md:w-16 h-12 md:h-16 rounded-2xl bg-tertiary-container flex items-center justify-center">
                                    <span className="material-symbols-outlined text-on-tertiary-container text-2xl md:text-3xl">event_note</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-on-surface text-lg md:text-xl">Upcoming Exams</h4>
                                    <p className="text-on-surface-variant font-medium text-xs md:text-base">Mathematics Midterm • <span className="text-primary font-bold">Dec 12, 2023</span></p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="hidden sm:block text-right">
                                    <p className="text-[10px] font-bold uppercase text-on-surface-variant">Time Remaining</p>
                                    <p className="text-sm font-bold text-on-surface">14 Days</p>
                                </div>
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
                                {/* Fall 2023 (Current) */}
                                <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-primary-container text-on-primary-container group transition-colors">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary">check_circle</span>
                                        <span className="font-semibold">Fall 2023 (Current)</span>
                                    </div>
                                </button>
                                
                                {/* Spring 2023 */}
                                <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-surface-container transition-colors text-on-surface group">
                                    <div className="flex items-center gap-3 text-on-surface-variant group-hover:text-on-surface">
                                        <span className="material-symbols-outlined">history</span>
                                        <span className="font-medium">Spring 2023</span>
                                    </div>
                                </button>
                                
                                {/* Fall 2022 */}
                                <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-surface-container transition-colors text-on-surface group">
                                    <div className="flex items-center gap-3 text-on-surface-variant group-hover:text-on-surface">
                                        <span className="material-symbols-outlined">history</span>
                                        <span className="font-medium">Fall 2022</span>
                                    </div>
                                </button>
                                
                                {/* Spring 2022 */}
                                <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-surface-container transition-colors text-on-surface group">
                                    <div className="flex items-center gap-3 text-on-surface-variant group-hover:text-on-surface">
                                        <span className="material-symbols-outlined">history</span>
                                        <span className="font-medium">Spring 2022</span>
                                    </div>
                                </button>
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
