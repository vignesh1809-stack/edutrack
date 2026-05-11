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
                                <div className="bg-white p-8 rounded-[32px] shadow-[0px_20px_50px_rgba(42,52,57,0.04)] relative overflow-hidden border border-slate-100">
                                    <div className="absolute bottom-0 right-0 opacity-60 -mr-10 -mb-10 pointer-events-none">
                                        <span className="material-symbols-outlined text-[180px] text-blue-100/80">person</span>
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 mb-10">
                                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100">
                                                <span className="material-symbols-outlined text-blue-600">fingerprint</span>
                                            </div>
                                            <h3 className="text-2xl font-headline font-bold text-slate-900">Personal Information</h3>
                                        </div>
                                        
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="border-b border-slate-100 pb-4">
                                                    <p className="text-[10px] font-bold text-blue-600 tracking-widest uppercase mb-1">Date of Birth</p>
                                                    <p className="font-bold text-lg text-slate-800">May 14, 2007</p>
                                                </div>
                                                <div className="border-b border-slate-100 pb-4">
                                                    <p className="text-[10px] font-bold text-blue-600 tracking-widest uppercase mb-1">Gender</p>
                                                    <p className="font-bold text-lg text-slate-800">Male</p>
                                                </div>
                                                <div className="border-b border-slate-100 pb-4">
                                                    <p className="text-[10px] font-bold text-blue-600 tracking-widest uppercase mb-1">Blood Group</p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]"></span>
                                                        <p className="font-bold text-lg text-slate-800">A+ Positive</p>
                                                    </div>
                                                </div>
                                                <div className="border-b border-slate-100 pb-4">
                                                    <p className="text-[10px] font-bold text-blue-600 tracking-widest uppercase mb-1">Nationality</p>
                                                    <p className="font-bold text-lg text-slate-800">British</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="bg-blue-100/50 backdrop-blur-xl p-8 rounded-[32px] shadow-[0px_20px_50px_rgba(42,52,57,0.04)] relative overflow-hidden border border-white/60">
                                    <div className="absolute bottom-0 right-0 opacity-60 -mr-10 -mb-10 pointer-events-none">
                                        <span className="material-symbols-outlined text-[180px] text-blue-200/60">alternate_email</span>
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 mb-10">
                                            <div className="w-12 h-12 rounded-2xl bg-white/60 backdrop-blur-md flex items-center justify-center border border-white/80 shadow-sm">
                                                <span className="material-symbols-outlined text-blue-600">contact_support</span>
                                            </div>
                                            <h3 className="text-2xl font-headline font-bold text-slate-900">Contact Information</h3>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="border-b border-blue-100/50 pb-4">
                                                    <p className="text-[10px] font-bold text-blue-600 tracking-widest uppercase mb-1">Primary Phone</p>
                                                    <p className="font-bold text-lg text-slate-800">+44 20 7946 0123</p>
                                                </div>
                                                <div className="border-b border-blue-100/50 pb-4">
                                                    <p className="text-[10px] font-bold text-blue-600 tracking-widest uppercase mb-1">Email Address</p>
                                                    <p className="font-bold text-lg text-slate-800">a.sterling@academy.edu</p>
                                                </div>
                                            </div>
                                            <div className="pt-2">
                                                <p className="text-[10px] font-bold text-blue-600 tracking-widest uppercase mb-1">Residential Address</p>
                                                <p className="font-bold text-lg text-slate-800 leading-relaxed">221B Baker Street, London NW1 6XE, United Kingdom</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Info (School & Guardian) */}
                            <div className="space-y-8">
                                {/* School Information */}
                                <div className="bg-blue-700 text-white p-8 rounded-[32px] shadow-xl relative overflow-hidden">
                                    <div className="absolute bottom-0 right-0 opacity-10 -mr-10 -mb-10 pointer-events-none">
                                        <span className="material-symbols-outlined text-[180px] text-white">school</span>
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 mb-10">
                                            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                                <span className="material-symbols-outlined text-white">account_balance</span>
                                            </div>
                                            <h3 className="text-2xl font-headline font-bold tracking-tight">School Information</h3>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="border-b border-white/10 pb-4">
                                                <p className="text-[10px] font-bold text-blue-100 tracking-widest uppercase mb-1">Student ID</p>
                                                <p className="font-bold text-lg">STU-2021-0842</p>
                                            </div>
                                            <div className="border-b border-white/10 pb-4">
                                                <p className="text-[10px] font-bold text-blue-100 tracking-widest uppercase mb-1">Department / Branch</p>
                                                <p className="font-bold text-lg">Natural Sciences & Technology</p>
                                            </div>
                                            <div className="border-b border-white/10 pb-4">
                                                <p className="text-[10px] font-bold text-blue-100 tracking-widest uppercase mb-1">Enrollment Year</p>
                                                <p className="font-bold text-lg">2021 (Spring Intake)</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-blue-100 tracking-widest uppercase mb-1">Current Academic Level</p>
                                                <p className="font-bold text-lg">Semester 2, Year 3</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Guardian Details */}
                                <div className="bg-white p-8 rounded-[32px] shadow-[0px_20px_50px_rgba(42,52,57,0.04)] relative overflow-hidden border border-slate-100">
                                    <div className="absolute bottom-0 right-0 opacity-60 -mr-10 -mb-10 pointer-events-none">
                                        <span className="material-symbols-outlined text-[180px] text-blue-100/80">family_restroom</span>
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100">
                                                <span className="material-symbols-outlined text-blue-600">diversity_3</span>
                                            </div>
                                            <h3 className="text-2xl font-headline font-bold text-slate-900">Guardian Details</h3>
                                        </div>
                                        
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-5 p-4 bg-slate-50/80 backdrop-blur-sm rounded-2xl border border-blue-50">
                                                <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg">ES</div>
                                                <div>
                                                    <p className="text-xl font-bold text-slate-900">Elizabeth Sterling</p>
                                                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Mother • Primary Contact</p>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-4">
                                                <div className="border-b border-slate-100 pb-4">
                                                    <p className="text-[10px] font-bold text-blue-600 tracking-widest uppercase mb-1">Contact Number</p>
                                                    <p className="font-bold text-lg text-slate-800">+44 20 7946 0987</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-blue-600 tracking-widest uppercase mb-1">Occupation</p>
                                                    <p className="font-bold text-lg text-slate-800">Senior Software Architect</p>
                                                </div>
                                            </div>

                                            <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all active:scale-[0.98] shadow-lg shadow-blue-600/20">
                                                View Full History
                                            </button>
                                        </div>
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
