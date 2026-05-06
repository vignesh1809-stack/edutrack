import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentsRequest, setStudentFilter, setStudentSort, setStudentPage } from '../../store/actions/studentActions';

const TopPerformers = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    
    const { data: performers, pagination, loading, error } = useSelector(state => state.students);
    const receivedFilters = location.state || {};

    useEffect(() => {
        // Apply filters from navigation state
        if (receivedFilters.branch && receivedFilters.branch !== 'All Branches') {
            dispatch(setStudentFilter('course', receivedFilters.branch));
        } else {
            dispatch(setStudentFilter('course', ''));
        }

        if (receivedFilters.year) {
            dispatch(setStudentFilter('year', receivedFilters.year));
        } else {
            dispatch(setStudentFilter('year', ''));
        }

        // Set sort to CGPA descending
        dispatch(setStudentSort('cgpa,desc'));
        
        // Fetch students
        dispatch(fetchStudentsRequest());
    }, [dispatch, receivedFilters.branch, receivedFilters.year]);

    const handlePrevPage = () => {
        if (!pagination.first) {
            dispatch(setStudentPage(pagination.page - 1));
        }
    };

    const handleNextPage = () => {
        if (!pagination.last) {
            dispatch(setStudentPage(pagination.page + 1));
        }
    };

    const topPerformer = performers[0];
    const otherPerformers = performers.slice(1);

    return (
        <div className="bg-surface min-h-screen pb-24 text-on-background">
            {/* Header with Back Arrow */}
            <header className="bg-slate-50/70 dark:bg-slate-900/70 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between px-6 py-4 w-full h-16 shadow-[0px_20px_40px_rgba(42,52,57,0.06)]">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate('/principal/reports')}
                        className="material-symbols-outlined p-2 hover:bg-slate-200/50 rounded-full transition-colors text-on-surface-variant"
                    >
                        arrow_back
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-primary-container flex items-center justify-center">
                            <img 
                                alt="Institution Logo" 
                                className="w-full h-full object-cover" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzOKfoiJeIteQ7cOjIODaeuHg_ek2saTxyV2Rlnfv7p8e1zRxX0386yXXaRyWRX7WOIsTA0UknTledegZEE6HuLARXyyVaKuvQ0ozzmbUxMwLO-S7lMGm0mBNZv2M-qgbGmaGN11z2lKIFCLRnl1PK8r3_RO2IoWGM5nqqhPQhRHUKs5483KnkA2y6Y8TgYM6BAno_m5Jsfu51XP2xbBKKgummu-JIWIcT6KQfpW7APcwMdX2Jd-yO_Xf0LQVOccSxAV-AVgkK9G8"
                            />
                        </div>
                        <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-headline">EduTrack</span>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 pt-8">
                {/* Screen Title Section */}
                <div className="mb-8 max-w-2xl">
                    <h1 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">All Top Performers</h1>
                    <p className="text-on-surface-variant text-sm font-medium leading-relaxed">
                        {receivedFilters.branch && receivedFilters.branch !== 'All Branches' ? `Showcasing excellence in ${receivedFilters.branch}` : 'Showcasing the highest academic excellence across all departments'}
                        {receivedFilters.year ? ` for batch ${receivedFilters.year}.` : '.'}
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <div className="bg-error-container/20 text-error p-8 rounded-3xl text-center">
                        <p className="font-bold">Error loading performers: {error}</p>
                    </div>
                ) : performers.length === 0 ? (
                    <div className="bg-surface-container-low p-20 rounded-3xl text-center border border-dashed border-outline-variant">
                        <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">school</span>
                        <p className="text-on-surface-variant font-bold">No performers found for the selected criteria.</p>
                    </div>
                ) : (
                    <div className="space-y-10">
                        {/* Rank #1 - Hero Section (Only on Page 1) */}
                        {pagination.page === 0 && topPerformer && (
                            <div className="max-w-3xl">
                                <div className="bg-surface-container-lowest p-8 rounded-[32px] shadow-[0_20px_40px_rgba(42,52,57,0.06)] relative overflow-hidden group border border-slate-100">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 transition-transform duration-500 group-hover:scale-110"></div>
                                    <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10">
                                        <div className="relative">
                                            <div className="w-32 h-32 rounded-full border-8 border-primary-container overflow-hidden shadow-xl bg-white">
                                                <img className="w-full h-full object-cover" src={topPerformer.image} alt={topPerformer.name}/>
                                            </div>
                                            <div className="absolute -bottom-2 -right-2 bg-primary text-on-primary w-12 h-12 rounded-full flex items-center justify-center text-xl font-black shadow-2xl ring-4 ring-white">#1</div>
                                        </div>
                                        <div className="text-center sm:text-left">
                                            <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-3 inline-block">Top Performer</span>
                                            <h2 className="text-3xl font-black text-on-surface tracking-tighter">{topPerformer.name}</h2>
                                            <div className="flex items-center justify-center sm:justify-start gap-4 mt-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-bold uppercase tracking-widest text-outline">Details</span>
                                                    <span className="bg-surface-container-high text-on-surface text-[10px] font-extrabold px-3 py-1 rounded-full">
                                                        {topPerformer.courseDetails?.join(' • ')}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-6 flex items-baseline gap-2">
                                                <span className="text-5xl font-black text-primary tracking-tighter">{topPerformer.avgMarks}</span>
                                                <span className="text-xl font-bold text-primary/60">CGPA</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Ranks #2 and onwards - Grid Section */}
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-outline-variant mb-6 ml-1">Academic Leaderboard</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {(pagination.page === 0 ? otherPerformers : performers).map((performer, idx) => {
                                    const rank = pagination.page * pagination.size + (pagination.page === 0 ? idx + 2 : idx + 1);
                                    return (
                                        <div key={performer.id} className="bg-surface-container-lowest p-6 rounded-[24px] flex items-center justify-between group hover:bg-white hover:shadow-[0_20px_40px_rgba(42,52,57,0.08)] transition-all duration-300 border border-slate-50">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                                                    <img className="w-full h-full object-cover" src={performer.image} alt={performer.name}/>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-on-surface group-hover:text-primary transition-colors">{performer.name}</h3>
                                                    <p className="text-[10px] text-outline-variant font-bold mt-1 uppercase tracking-tight">{performer.courseDetails?.[0]}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xl font-black text-on-surface-variant tracking-tighter">{performer.avgMarks}</div>
                                                <div className="text-[10px] font-black text-primary uppercase tracking-wider mt-1 opacity-60 group-hover:opacity-100 transition-opacity">Rank #{rank}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Pagination Controls */}
                        <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Page {pagination.page + 1} of {pagination.totalPages}
                            </span>
                            <div className="flex gap-4">
                                <button 
                                    onClick={handlePrevPage}
                                    disabled={pagination.first || loading}
                                    className={`p-3 rounded-xl material-symbols-outlined transition-all ${pagination.first ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-slate-100 text-slate-600 hover:bg-primary hover:text-on-primary shadow-sm active:scale-95'}`}
                                >
                                    arrow_back_ios
                                </button>
                                <button 
                                    onClick={handleNextPage}
                                    disabled={pagination.last || loading}
                                    className={`p-3 rounded-xl material-symbols-outlined transition-all ${pagination.last ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-primary text-on-primary shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-95'}`}
                                >
                                    arrow_forward_ios
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default TopPerformers;
