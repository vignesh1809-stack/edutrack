import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GuardianNavBar from '../../components/GuardianNavBar';
import GuardianSidebar from '../../components/GuardianSidebar';

const GuardianDashboard = () => {
    const navigate = useNavigate();
    const children = [
        {
            name: "Alexander Sterling",
            grade: "11",
            section: "A",
            active: true,
            photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2bopnHO7oORueQ2YPMsSxcVzUlH08KF-uAafiabFwa9WWmNsNRbfvaF2mOr010R3KXrzsWboWiYLxNoucbQ37jD_Q0eaT-Q8GV4TQ759_BqYPkfEdMC3em94iPDOqOLgKY0ba8rIOulXu-tJVfbR6i1Jc_nal4XWs5Gij6Rrcp7IOhmePoNCjDVX9lzOyW3ytwpkQA-v4vi7pAPyPrDqKGKKgLz3IW23ZSM9OMkPiM0R8drNH5-oA5DUsa9NL0bByxw1iuAsqbok"
        },
        {
            name: "Emma Sterling",
            grade: "8",
            section: "C",
            active: false,
            photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhF25SHSPn6511CLmyp3acRZF5_ZW1brhp9oxFvWLdJt408wC2xkgHFYmPn0aD6JrXdkAE6l7ymqMccuhp9RPHK8PzivKHA37eDNGkQStOF84YfhqNegk_o-hDPg3gZy-VzBATSC3QwteCWoeUvCz9miInFfKt3YZgo6xvUePiODzmxjb2X6tdhyRWDNNATg7fTMDfBjX8Bikdrm7Eg9cyCsVJYCgxrcBzHupAXSHOnakS8xEPshKTV-KjO9K_UvhlJjcyyAUWoa0"
        }
    ];

    const subjects = [
        { name: "Math", score: 85 },
        { name: "Physics", score: 92 },
        { name: "History", score: 78 },
        { name: "English", score: 88 }
    ];

    const remarks = [
        {
            author: "Dr. Aris Thorne",
            subject: "Physics",
            text: "Alexander is showing exceptional depth in electromagnetic theory. Highly participative.",
            dotOpacity: 1
        },
        {
            author: "Ms. Clara Bell",
            subject: "Homeroom",
            text: "Excellent leadership during the inter-school science fair last Thursday.",
            dotOpacity: 0.5
        }
    ];

    const attendanceDays = [
        { day: 'Mon', status: 'present', opacity: 0.9 },
        { day: 'Tue', status: 'present', opacity: 1.0 },
        { day: 'Wed', status: 'present', opacity: 0.85 },
        { day: 'Thu', status: 'absent' },
        { day: 'Fri', status: 'present', opacity: 0.95 },
        { day: 'Sat', status: 'empty', opacity: 0.2 },
        { day: 'Sun', status: 'empty', opacity: 0.2 }
    ];

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

            <main className="max-w-7xl mx-auto px-6 pt-24 pb-12">
                {/* Welcome Header */}
                <section className="mb-8">
                    <h2 className="font-headline font-extrabold text-[2rem] leading-[2.5rem] tracking-tight text-on-surface">Welcome back, Sarah Sterling</h2>
                    <p className="text-on-surface-variant mt-1">Review your children's progress and upcoming activities.</p>
                </section>

                {/* Child Switcher */}
                <section className="mb-10 overflow-x-auto no-scrollbar pb-4">
                    <div className="flex gap-4 min-w-max">
                        {children.map((child, i) => (
                            <div 
                                key={i}
                                className={`flex items-center gap-4 p-4 pr-8 rounded-2xl shadow-[0px_10px_25px_rgba(42,52,57,0.04)] transition-colors cursor-pointer ${
                                    child.active 
                                    ? 'bg-surface-container-lowest border-2 border-primary/10' 
                                    : 'bg-surface-container-low hover:bg-surface-container-high'
                                }`}
                            >
                                <div className={`w-14 h-14 rounded-xl overflow-hidden ${child.active ? 'ring-4 ring-primary-container' : 'grayscale'}`}>
                                    <img alt={child.name} className="w-full h-full object-cover" src={child.photo} />
                                </div>
                                <div>
                                    <p className={`font-headline font-bold text-lg ${child.active ? 'text-primary' : 'text-on-surface-variant'}`}>{child.name}</p>
                                    <p className={`text-xs font-medium uppercase tracking-widest ${child.active ? 'text-on-surface-variant' : 'text-outline'}`}>
                                        Grade {child.grade} • Section {child.section}
                                    </p>
                                </div>
                                {child.active && (
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
                                <span className="text-xs font-bold text-on-primary-container bg-primary-container px-2 py-1 rounded-full">+2% vs last month</span>
                            </div>
                            <div>
                                <p className="text-on-surface-variant text-sm font-medium">Attendance</p>
                                <h3 className="font-headline font-extrabold text-3xl text-on-surface">92%</h3>
                            </div>
                        </div>
                        {/* Grade */}
                        <div className="bg-surface-container-lowest p-6 rounded-[24px] flex flex-col justify-between h-40 shadow-[0px_10px_25px_rgba(42,52,57,0.04)]">
                            <div className="flex justify-between items-start">
                                <span className="p-2 bg-tertiary-container/30 rounded-lg text-tertiary">
                                    <span className="material-symbols-outlined">grade</span>
                                </span>
                                <div className="flex -space-x-2">
                                    <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-200"></div>
                                    <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-300"></div>
                                </div>
                            </div>
                            <div>
                                <p className="text-on-surface-variant text-sm font-medium">Latest Average</p>
                                <h3 className="font-headline font-extrabold text-3xl text-on-surface">B+</h3>
                            </div>
                        </div>
                        {/* Fees */}
                        <div className="bg-surface-container-lowest p-6 rounded-[24px] flex flex-col justify-between h-40 shadow-[0px_10px_25px_rgba(42,52,57,0.04)]">
                            <div className="flex justify-between items-start">
                                <span className="p-2 bg-error-container/20 rounded-lg text-error">
                                    <span className="material-symbols-outlined">payments</span>
                                </span>
                                <button className="text-xs font-bold text-primary underline">Pay Now</button>
                            </div>
                            <div>
                                <p className="text-on-surface-variant text-sm font-medium">Pending Fees</p>
                                <h3 className="font-headline font-extrabold text-3xl text-on-surface">$1,200</h3>
                            </div>
                        </div>
                    </div>

                    {/* Performance Chart */}
                    <div className="md:col-span-8 bg-surface-container-lowest p-8 rounded-[32px] shadow-[0px_10px_25px_rgba(42,52,57,0.04)]">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="font-headline font-bold text-xl">Academic Performance</h3>
                                <p className="text-sm text-on-surface-variant">Core Subjects Semester 2</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <span className="w-3 h-3 rounded-full bg-primary"></span>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-outline">Scores</span>
                            </div>
                        </div>
                        <div className="flex items-end justify-between h-64 gap-4 px-2">
                            {subjects.map((sub, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-3">
                                    <div className="w-full bg-primary/10 rounded-t-xl relative group h-48">
                                        <div 
                                            className="absolute bottom-0 w-full bg-primary rounded-t-xl transition-all duration-500" 
                                            style={{ height: `${sub.score}%` }}
                                        ></div>
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-on-surface text-white text-[10px] py-1 px-2 rounded">
                                            {sub.score}%
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">{sub.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Staff Remarks */}
                    <div className="md:col-span-4 flex flex-col gap-6">
                        <div className="bg-tertiary-container/30 p-6 rounded-[32px] flex-1 shadow-[0px_10px_25px_rgba(42,52,57,0.04)]">
                            <h3 className="font-headline font-bold text-xl mb-6 text-on-surface">Staff Remarks</h3>
                            <div className="space-y-6">
                                {remarks.map((remark, i) => (
                                    <div key={i} className={`relative pl-6 border-l-2 border-tertiary/20`}>
                                        <div 
                                            className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-tertiary"
                                            style={{ opacity: remark.dotOpacity }}
                                        ></div>
                                        <p className="text-xs font-bold text-tertiary-dim uppercase tracking-wider mb-1">
                                            {remark.author} • {remark.subject}
                                        </p>
                                        <p className="text-sm leading-relaxed text-on-tertiary-container">{remark.text}</p>
                                    </div>
                                ))}
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
                                <p className="text-sm text-on-surface-variant">Last 7 School Days</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                                    <span className="text-xs font-medium text-on-surface-variant">Present</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-error"></span>
                                    <span className="text-xs font-medium text-on-surface-variant">Absent</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-2 md:gap-4 h-24 items-end">
                            {attendanceDays.map((date, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full">
                                    <div 
                                        className={`w-full rounded-lg transition-all duration-300 ${
                                            date.status === 'present' ? 'bg-primary' : 
                                            date.status === 'absent' ? 'bg-error h-4 mt-auto' : 
                                            'bg-primary-container opacity-20'
                                        } ${date.status === 'present' ? 'flex-1' : ''}`}
                                        style={{ opacity: date.opacity }}
                                    ></div>
                                    <span className="text-[10px] font-bold text-outline uppercase">{date.day}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <GuardianNavBar />
        </div>
    </div>
    );
};

export default GuardianDashboard;
