import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/authActions';
import StudentNavBar from '../../components/StudentNavBar';
import StudentSidebar from '../../components/StudentSidebar';

const StudentProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className="bg-surface font-body text-on-surface antialiased mb-24 md:mb-0 min-h-screen">
            <StudentSidebar />
            <div className="md:pl-64">
                {/* TopAppBar */}
                <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-[0px_20px_40px_rgba(42,52,57,0.06)] flex items-center justify-between px-6 h-20 md:w-[calc(100%-16rem)]">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate('/student/dashboard')}
                            className="p-2 text-blue-600 hover:bg-slate-100/50 transition-colors active:scale-95 duration-200 rounded-full"
                        >
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <h1 className="font-headline font-bold text-2xl tracking-tight text-blue-600">Student Profile</h1>
                    </div>
                    <button className="p-2 text-slate-500 hover:bg-slate-100/50 transition-colors active:scale-95 duration-200 rounded-full">
                        <span className="material-symbols-outlined">more_vert</span>
                    </button>
                </header>

                <main className="pt-24 pb-32 md:pb-8 px-4 md:px-8">
                    <div className="max-w-6xl mx-auto space-y-8">
                        {/* Section 1: Header (Focus Plate) */}
                        <section className="bg-surface-container-lowest p-8 rounded-[32px] flex flex-col md:flex-row items-center md:items-end gap-8 relative overflow-hidden shadow-[0px_10px_30px_rgba(42,52,57,0.04)]">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20"></div>
                            <div className="relative">
                                <div className="w-32 h-32 md:w-44 md:h-44 rounded-full p-1.5 bg-gradient-to-tr from-primary to-primary-container shadow-xl">
                                    <img 
                                        className="w-full h-full rounded-full object-cover border-4 border-white" 
                                        alt="Alexander Sterling" 
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpsvuMcvBD_soJ9wlesX-Epemify8XgF9QGCIeTJSD3Pe6X_GG22KZFtIQ6lQffzBg2e_Hga-ZW2Azig4iAhU-GhNJqHz72DOzVfFouhhM33165N2IAyBP4VdWmR5N2Y6NIDkOXfEhtgDznuNuu5kJeTaZyv-DmfXRUuZGRDWN2lo2RJov4LRxl5hipAI9j9SvgegsyvBL_xdKM9dxk-64h-Y-07aBHWKgWrcd9axVXk5VaFgepUisY0EZxkPpqlwMRmR6uGDEUA0"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 text-center md:text-left space-y-2 relative z-10">
                                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-tertiary-container text-on-tertiary-container font-bold text-xs tracking-wider uppercase">GRADE 11, SECTION A</span>
                                <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface tracking-tight">Alexander Sterling</h2>
                                <p className="text-on-surface-variant font-medium flex items-center justify-center md:justify-start gap-2">
                                    <span className="material-symbols-outlined text-sm">location_on</span> London, United Kingdom
                                </p>
                            </div>
                            {/* Quick Actions */}
                            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto relative z-10">
                                <button className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-br from-primary to-primary-dim text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-all">
                                    <span className="material-symbols-outlined">lock_reset</span>
                                    Reset Password
                                </button>
                            </div>
                        </section>

                        {/* Grid Layout for Details */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Personal & Contact Info (Asymmetric Bento) */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Personal Information */}
                                <div className="bg-surface-container-lowest p-8 rounded-[24px] shadow-[0px_10px_30px_rgba(42,52,57,0.04)]">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-10 h-10 rounded-xl bg-primary-container/30 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined">person</span>
                                        </div>
                                        <h3 className="text-xl font-headline font-bold text-on-surface">Personal Information</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">Date of Birth</p>
                                            <p className="text-on-surface font-semibold text-lg">May 14, 2007</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">Gender</p>
                                            <p className="text-on-surface font-semibold text-lg">Male</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">Blood Group</p>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-error"></span>
                                                <p className="text-on-surface font-semibold text-lg">A+ Positive</p>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">Nationality</p>
                                            <p className="text-on-surface font-semibold text-lg">British</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="bg-surface-container-low p-8 rounded-[24px]">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                                            <span className="material-symbols-outlined">call</span>
                                        </div>
                                        <h3 className="text-xl font-headline font-bold text-on-surface">Contact Information</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="p-6 bg-white rounded-2xl shadow-sm">
                                            <p className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase mb-2">Phone</p>
                                            <p className="text-on-surface font-bold text-base">+44 20 7946 0123</p>
                                        </div>
                                        <div className="p-6 bg-white rounded-2xl shadow-sm">
                                            <p className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase mb-2">Email</p>
                                            <p className="text-on-surface font-bold text-base">a.sterling@academy.edu</p>
                                        </div>
                                        <div className="md:col-span-2 p-6 bg-white rounded-2xl shadow-sm">
                                            <p className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase mb-2">Permanent Address</p>
                                            <p className="text-on-surface font-bold text-base">221B Baker Street, London NW1 6XE, United Kingdom</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Info (School & Guardian) */}
                            <div className="space-y-8">
                                {/* School Information */}
                                <div className="bg-primary text-white p-8 rounded-[24px] shadow-xl relative overflow-hidden">
                                    <div className="absolute bottom-0 right-0 opacity-10 -mr-10 -mb-10">
                                        <span className="material-symbols-outlined text-[160px]">school</span>
                                    </div>
                                    <div className="relative z-10">
                                        <h3 className="text-xl font-headline font-bold mb-8">School Information</h3>
                                        <div className="space-y-6">
                                            <div className="border-b border-white/20 pb-4">
                                                <p className="text-[10px] font-bold text-primary-container tracking-widest uppercase mb-1">Student ID</p>
                                                <p className="font-bold text-lg">STU-2021-0842</p>
                                            </div>
                                            <div className="border-b border-white/20 pb-4">
                                                <p className="text-[10px] font-bold text-primary-container tracking-widest uppercase mb-1">Branch</p>
                                                <p className="font-bold text-lg">Natural Sciences</p>
                                            </div>
                                            <div className="border-b border-white/20 pb-4">
                                                <p className="text-[10px] font-bold text-primary-container tracking-widest uppercase mb-1">Enrollment Year</p>
                                                <p className="font-bold text-lg">2021</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-primary-container tracking-widest uppercase mb-1">Current Semester</p>
                                                <p className="font-bold text-lg">Semester 2, Year 3</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Guardian Details */}
                                <div className="bg-surface-container-highest p-8 rounded-[24px]">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-600">
                                            <span className="material-symbols-outlined">family_restroom</span>
                                        </div>
                                        <h3 className="text-xl font-headline font-bold text-on-surface">Guardian Details</h3>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">ES</div>
                                            <div>
                                                <p className="text-on-surface font-bold">Elizabeth Sterling</p>
                                                <p className="text-xs text-on-surface-variant">Mother</p>
                                            </div>
                                        </div>
                                        <div className="pt-4 border-t border-slate-200">
                                            <p className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase mb-1">Contact Number</p>
                                            <p className="text-on-surface font-bold">+44 20 7946 0987</p>
                                        </div>
                                        <button className="w-full py-3 bg-white text-on-surface border border-slate-200 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-colors">
                                            View Full History
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Action: Logout */}
                        <div className="pt-8">
                            <button 
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-error-container/10 border-2 border-error-container text-error font-bold rounded-2xl hover:bg-error-container/20 active:scale-[0.98] transition-all"
                            >
                                <span className="material-symbols-outlined">logout</span>
                                Log Out
                            </button>
                        </div>
                    </div>
                </main>
                <StudentNavBar />
            </div>
        </div>
    );
};

export default StudentProfile;
