import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentRemarksRequest } from '../../store/actions/studentDashboardActions';
import StudentNavBar from '../../components/StudentNavBar';
import StudentSidebar from '../../components/StudentSidebar';

const StudentRemarks = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, data: remarks, error } = useSelector(state => state.studentDashboard.remarks);

    useEffect(() => {
        dispatch(fetchStudentRemarksRequest());
    }, [dispatch]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="bg-surface text-on-surface antialiased mb-24 md:mb-0 font-body min-h-screen">
            <StudentSidebar />
            <div className="md:pl-64">
                <header className="sticky top-0 w-full z-40 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] flex items-center justify-between px-6 py-4 md:w-[calc(100%-16rem)]">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden md:hidden">
                            <img alt="student profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpsvuMcvBD_soJ9wlesX-Epemify8XgF9QGCIeTJSD3Pe6X_GG22KZFtIQ6lQffzBg2e_Hga-ZW2Azig4iAhU-GhNJqHz72DOzVfFouhhM33165N2IAyBP4VdWmR5N2Y6NIDkOXfEhtgDznuNuu5kJeTaZyv-DmfXRUuZGRDWN2lo2RJov4LRxl5hipAI9j9SvgegsyvBL_xdKM9dxk-64h-Y-07aBHWKgWrcd9axVXk5VaFgepUisY0EZxkPpqlwMRmR6uGDEUA0" />
                        </div>
                        <span className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight font-manrope">Pending Remarks</span>
                    </div>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 md:bg-transparent md:hover:bg-slate-200/50 transition-colors scale-95 active:transition-transform">
                        <span className="material-symbols-outlined text-slate-500">notifications</span>
                    </button>
                </header>

                <main className="px-6 w-full max-w-7xl mx-auto space-y-8 pt-6 md:pt-10 pb-12">
                    <section className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-[2px] bg-primary"></div>
                            <p className="text-primary font-bold text-[10px] tracking-widest uppercase">Progress Journals</p>
                        </div>
                        <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface leading-tight">Pending <br className="md:hidden" />Remarks</h1>
                        <p className="text-on-surface-variant text-sm md:text-base font-medium leading-relaxed max-w-2xl pt-2">
                            A curated view of feedback from your dedicated circle of educators and guardians. Every note is a step toward mastery.
                        </p>
                    </section>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-slate-500 font-medium animate-pulse">Gathering insights...</p>
                        </div>
                    ) : error ? (
                        <div className="bg-rose-50 border border-rose-100 rounded-3xl p-8 text-center space-y-4">
                            <span className="material-symbols-outlined text-rose-500 text-5xl">error</span>
                            <h3 className="text-xl font-bold text-slate-900">Unable to load remarks</h3>
                            <p className="text-slate-600 max-w-md mx-auto">{error}</p>
                            <button 
                                onClick={() => dispatch(fetchStudentRemarksRequest())}
                                className="px-6 py-2 bg-rose-500 text-white rounded-xl font-bold hover:bg-rose-600 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : remarks && remarks.length > 0 ? (
                        <div className="space-y-6">
                            {remarks.map((remark) => (
                                <div 
                                    key={remark.id}
                                    className={`bg-surface-container-lowest rounded-3xl p-6 shadow-[0px_10px_20px_rgba(0,0,0,0.02)] relative overflow-hidden border border-white/40 ${remark.isLatest ? 'border-l-4 border-l-purple-500' : ''}`}
                                >
                                    {remark.isLatest && (
                                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full pointer-events-none"></div>
                                    )}

                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex flex-col gap-2">
                                            {remark.isLatest && (
                                                <div className="inline-block w-fit px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-[9px] font-bold tracking-widest uppercase mb-2">
                                                    Latest Remark
                                                </div>
                                            )}
                                            <h2 className="text-xl font-bold text-on-surface">{remark.title}</h2>
                                            <p className="text-xs text-on-surface-variant mt-1">{formatDate(remark.date)}</p>
                                        </div>
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Archive #{remark.id.substring(0, 4)}</span>
                                    </div>

                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center border border-white shadow-sm">
                                            {remark.author.avatarUrl ? (
                                                <img src={remark.author.avatarUrl} alt={remark.author.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="material-symbols-outlined text-slate-400">person</span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-on-surface">{remark.author.name}</p>
                                            <p className="text-[10px] text-on-surface-variant font-medium">{remark.author.role}</p>
                                        </div>
                                    </div>

                                    <p className="text-sm italic text-on-surface-variant mb-6 leading-relaxed">
                                        "{remark.content}"
                                    </p>

                                    {remark.aiSuggestion && (
                                        <div className="bg-surface-container-low rounded-2xl p-4 border border-white/60">
                                            <div className={`flex items-center gap-2 mb-2 ${remark.aiSuggestion.type === 'IMPROVEMENT' ? 'text-rose-500' : 'text-primary'}`}>
                                                <span className="material-symbols-outlined text-sm">
                                                    {remark.aiSuggestion.type === 'IMPROVEMENT' ? 'tips_and_updates' : 'trending_up'}
                                                </span>
                                                <span className="text-[11px] font-bold uppercase tracking-wider">
                                                    {remark.aiSuggestion.type === 'IMPROVEMENT' ? 'Improvement Notes' : 'Next Steps'}
                                                </span>
                                            </div>
                                            <p className="text-xs text-on-surface-variant leading-relaxed">
                                                {remark.aiSuggestion.text}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-surface-container-lowest rounded-3xl p-12 text-center border border-dashed border-slate-200">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-slate-300 text-4xl">history_edu</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No pending remarks</h3>
                            <p className="text-slate-500 max-w-sm mx-auto">Your journal is currently up to date. New insights from your educators will appear here.</p>
                        </div>
                    )}
                </main>
                <StudentNavBar />
            </div>
        </div>
    );
};

export default StudentRemarks;
