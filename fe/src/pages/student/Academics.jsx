import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StudentSidebar from '../../components/StudentSidebar';
import StudentNavBar from '../../components/StudentNavBar';
import { fetchStudentDashboardRequest } from '../../store/actions/studentDashboardActions';

const Academics = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, loading, selectedSemester } = useSelector(state => state.studentDashboard);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        dispatch(fetchStudentDashboardRequest(selectedSemester));
    }, [dispatch, selectedSemester]);

    const academic = data?.academicSummary || {};
    const subjects = academic.topSubjects || [
        { courseName: 'Quantum Physics', grade: '94%', subTitle: 'Advanced Mechanics & Wavefunctions', icon: 'science', color: 'bg-tertiary-container', textColor: 'text-on-tertiary-container' },
        { courseName: 'Mathematics', grade: '88%', subTitle: 'Multivariate Calculus & Linear Algebra', icon: 'functions', color: 'bg-primary-container', textColor: 'text-on-primary-container' },
        { courseName: 'English Literature', grade: '91%', subTitle: 'Post-Modern Narratives & Theory', icon: 'menu_book', color: 'bg-surface-container-high', textColor: 'text-on-surface' },
        { courseName: 'Computer Science', grade: '96%', subTitle: 'Distributed Systems & AI Architecture', icon: 'terminal', color: 'bg-secondary-container', textColor: 'text-on-secondary-container' },
        { courseName: 'Macroeconomics', grade: '82%', subTitle: 'Global Trade & Monetary Policy', icon: 'insights', color: 'bg-tertiary-container', textColor: 'text-on-tertiary-container' }
    ];

    const gpa = academic.gpa || 9.02;
    const gpaPercent = (gpa / 10) * 100;

    return (
        <div className="bg-surface text-on-surface antialiased mb-24 md:mb-0 font-body min-h-screen">
            <StudentSidebar />
            <div className="md:pl-64">
                {/* TopAppBar */}
                <header className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-md flex items-center justify-between px-6 h-16 shadow-sm md:w-[calc(100%-16rem)]">
                    <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-primary cursor-pointer active:scale-95 duration-200 md:hidden">menu</span>
                        <h1 className="font-headline font-extrabold text-on-surface text-xl tracking-tight">Academic Insights</h1>
                    </div>
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high border-2 border-primary-container">
                        <img 
                            alt="User profile" 
                            className="w-full h-full object-cover" 
                            src={user?.profileImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuB47q6KHETczIKOIo9ukrjTOs2DRegMtZu1dgMq1EzM_H3e4OJVe4aRAeH7ZWfyqZyuqTU6rSo3cS9Qs1fLBXhmyqg3qiNOONXbMmcPf3mH2SghQHroFduIXJiPrAFnmceA2s61ufta60P7L1eD6PHQ7Woudn_sKHf5hXciZyztZSA2hbFeUqQZoBOyxQnbtYylxLtBzsg12RsYyZc9ATTTNTrdH9CFQya5BusBtdjJLPUkIBZYhQ3mmzP9_4cwk39lC4g1fAwySC4"}
                        />
                    </div>
                </header>

                <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto space-y-10">
                    {/* Header Section */}
                    <section>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <span className="text-primary font-bold tracking-widest text-[10px] uppercase block mb-1">DASHBOARD</span>
                                <h2 className="text-4xl font-extrabold font-headline tracking-tight text-on-surface">My Subjects</h2>
                                <p className="text-on-surface-variant mt-2 max-w-md">Track your academic progress across all enrolled courses and deep-dive into performance analytics.</p>
                            </div>
                            <div className="hidden md:flex gap-2">
                                <button className="bg-surface-container-high text-on-surface px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-surface-container-highest transition-all active:scale-95 duration-200">
                                    Export Report
                                </button>
                                <button className="bg-gradient-to-br from-primary to-primary-dim text-on-primary px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-95 duration-200">
                                    Add Subject
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Subjects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {subjects.map((subject, idx) => (
                            <div key={idx} className="group bg-surface-container-lowest p-6 rounded-2xl border-none transition-all duration-300 hover:shadow-[0px_20px_40px_rgba(42,52,57,0.06)] flex flex-col justify-between min-h-[220px]">
                                <div className="flex justify-between items-start">
                                    <div className={`p-3 ${subject.color || 'bg-primary-container'} rounded-xl`}>
                                        <span className={`material-symbols-outlined ${subject.textColor || 'text-on-primary-container'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                                            {subject.icon || 'school'}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase">Grade</span>
                                        <div className={`${subject.color || 'bg-primary-container'} ${subject.textColor || 'text-on-primary-container'} font-headline font-bold px-3 py-1 rounded-full text-lg`}>
                                            {subject.grade || (subject.scorePercent ? `${subject.scorePercent}%` : 'N/A')}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold font-headline mt-4 text-on-surface">{subject.courseName}</h3>
                                    <p className="text-sm text-on-surface-variant mt-1">{subject.subTitle || 'Current Semester Course'}</p>
                                </div>
                                <div className="mt-6 flex items-center justify-between border-t border-transparent pt-4">
                                    <div className="flex -space-x-2">
                                        <div className="w-8 h-8 rounded-full border-2 border-surface-container-lowest overflow-hidden bg-slate-200">
                                            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyaBXBJpiAQaCNt1P80SRrYjwHyjBzwN3FRk_j1DlqgPZGrrU-AkMJ3o9Do0dFtr7L2CwSxzrjzc8DuZBZCev2vw8bVw2QwYnwe30Gx4KK5UY-ageX8PzWThJ6y6jSEYdj0bLyc26r6Z8hc6uWXsMadC_oE9S-iCZUlkm5Vb7kGTF-vSdTiXztx53ucJNbiiKoBMvBVU-MEv71IIeDNr57o7WOXeqjVMCgNVpEi_lMwpIPAFH5N-iiBAjFx-AX8WpAD2HG0sAaF_Q" alt="Professor" />
                                        </div>
                                        <div className="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-surface-container-high flex items-center justify-center text-[10px] font-bold">+12</div>
                                    </div>
                                    <button 
                                        onClick={() => navigate('/student/subject-analysis')}
                                        className="flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all"
                                    >
                                        View Analysis
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Enroll Card */}
                        <div className="group border-2 border-dashed border-outline-variant/30 p-6 rounded-2xl flex flex-col items-center justify-center min-h-[220px] hover:border-primary/50 transition-all cursor-pointer">
                            <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center mb-3 group-hover:bg-primary-container transition-colors">
                                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">add</span>
                            </div>
                            <p className="font-headline font-bold text-on-surface-variant group-hover:text-primary">Enroll in New Subject</p>
                            <p className="text-[10px] text-on-surface-variant/60 font-medium mt-1">Fall Semester 2024</p>
                        </div>
                    </div>

                    {/* Performance Summary */}
                    <section className="bg-surface-container-lowest rounded-3xl p-8 shadow-[0px_20px_40px_rgba(42,52,57,0.04)] border border-surface-container/50">
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className="relative w-48 h-48 flex items-center justify-center">
                                {/* GPA Progress Circle */}
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle className="text-surface-container-high" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="12"></circle>
                                    <circle 
                                        className="text-primary transition-all duration-1000 ease-out" 
                                        cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeDasharray="552.92" 
                                        strokeDashoffset={552.92 - (552.92 * gpaPercent) / 100} 
                                        strokeWidth="12"
                                        strokeLinecap="round"
                                    ></circle>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-extrabold font-headline text-on-surface">{gpa?.toFixed(2) || '9.02'}</span>
                                    <span className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">OVERALL GPA</span>
                                </div>
                            </div>
                            <div className="flex-1 space-y-6 text-center md:text-left">
                                <h3 className="text-2xl font-extrabold font-headline tracking-tight text-on-surface">Academic Spotlight</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-surface p-4 rounded-2xl border border-surface-container/50">
                                        <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase block mb-1">Strongest Area</span>
                                        <p className="font-bold text-on-surface">Scientific Analysis</p>
                                        <p className="text-xs text-on-surface-variant mt-1">You are in the top 5% for Physics.</p>
                                    </div>
                                    <div className="bg-surface p-4 rounded-2xl border border-surface-container/50">
                                        <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase block mb-1">Upcoming Milestone</span>
                                        <p className="font-bold text-on-surface">Mid-term Evaluation</p>
                                        <p className="text-xs text-on-surface-variant mt-1">Starting in 12 days.</p>
                                    </div>
                                </div>
                                <p className="text-sm text-on-surface-variant leading-relaxed">
                                    Your academic performance has shown a <span className="text-primary font-bold">4.2% upward trend</span> compared to last month. Focus on Macroeconomics to maintain your Dean's List eligibility.
                                </p>
                            </div>
                        </div>
                    </section>
                </main>
                <StudentNavBar />
            </div>
        </div>
    );
};

export default Academics;
