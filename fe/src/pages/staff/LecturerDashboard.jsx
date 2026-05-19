import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrincipalDashboardRequest } from '../../store/actions/dashboardActions';
import LecturerNavBar from '../../components/LecturerNavBar';
import TopAppBar from '../../components/TopAppBar';

const LecturerDashboard = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.dashboard);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        // Initially using the principal dashboard request, but this will be 
        // lecturer-specific as the backend evolves to filter by lecturer ID.
        dispatch(fetchPrincipalDashboardRequest());
    }, [dispatch]);

    // Mock data for the performance review list as seen in the image
    const performers = [
        { name: 'Marcus Reeves', status: 'TOP PERFORMER', marks: '92%', statusColor: 'text-blue-600', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150' },
        { name: 'Sarah Miller', status: 'STEADY PROGRESS', marks: '85%', statusColor: 'text-slate-600', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' },
        { name: 'David Thompson', status: 'NEEDS REVIEW', marks: '74%', statusColor: 'text-slate-400', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150' }
    ];

    const StatCard = ({ icon, label, value, subValue, context, color = 'blue' }) => (
        <div className="group flex flex-col gap-3 rounded-2xl p-6 bg-white border border-transparent hover:border-blue-600/10 shadow-sm transition-all">
            <div className="flex items-center justify-between">
                <p className="text-slate-500 text-sm font-medium">{label}</p>
                <div className={`text-${color}-600/20 group-hover:text-${color}-600 transition-colors`}>
                    <span className="material-symbols-outlined">{icon}</span>
                </div>
            </div>
            <div className="flex items-baseline gap-2">
                <p className="text-slate-900 font-headline text-4xl font-bold tracking-tight">{value}</p>
                {subValue && (
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${subValue.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        {subValue}
                    </span>
                )}
            </div>
            {context && <p className="text-slate-400 text-xs">{context}</p>}
        </div>
    );

    const OverviewCard = ({ icon, label, value, subValue, color = 'blue' }) => (
        <div className="bg-white p-5 rounded-[24px] shadow-sm border border-slate-50 transition-all hover:shadow-md group">
            <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-${color}-50 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <span className={`material-symbols-outlined text-${color}-600 text-3xl`}>{icon}</span>
                </div>
                {subValue && (
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${subValue.startsWith('+') || subValue === 'Assigned' || subValue === 'Steady' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        {subValue}
                    </span>
                )}
            </div>
            <div className="space-y-1">
                <div className="text-3xl font-black text-slate-900 font-headline tracking-tighter">{value}</div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-slate-400 font-bold">{label}</div>
            </div>
        </div>
    );

    const [selectedSubject, setSelectedSubject] = React.useState('Mathematics');
    const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Advanced Biology'];

    return (
        <div className="bg-[#f8fafc] min-h-screen pb-32">
            <TopAppBar
                title="Lecturer Dashboard"
                actions={
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95 transition-all">
                        <span className="material-symbols-outlined text-sm">add</span>
                        New Report
                    </button>
                }
            />

            <main className="p-6 space-y-8 max-w-7xl mx-auto">

                {/* Associated Class Dashboard */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight">Class Overview <span className="text-slate-400 font-medium text-sm ml-2">(Grade 12-A)</span></h3>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <OverviewCard
                            icon="groups"
                            label="Total Students"
                            value="42"
                            subValue="Assigned"
                        />
                        <OverviewCard
                            icon="how_to_reg"
                            label="Class Attendance"
                            value="94%"
                            subValue="+1.2%"
                            color="amber"
                        />
                        <OverviewCard
                            icon="analytics"
                            label="Class Avg Marks"
                            value="78%"
                            subValue="Steady"
                            color="blue"
                        />
                        <OverviewCard
                            icon="feedback"
                            label="Pending Remarks"
                            value="08"
                            subValue="Action"
                            color="purple"
                        />
                    </div>
                </div>

                <div className="h-px bg-slate-100 w-full"></div>

                {/* Subject Overview Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-8 bg-slate-300 rounded-full"></span>
                            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Lecturer Stats</h3>
                        </div>
                        <div className="relative group">
                            <select
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                                className="appearance-none bg-white border border-slate-200 text-slate-700 py-2 sm:py-2.5 pl-3 sm:pl-4 pr-8 sm:pr-10 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm cursor-pointer hover:bg-slate-50 transition-all"
                            >
                                {subjects.map(sub => (
                                    <option key={sub} value={sub}>{sub}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 sm:px-3 text-slate-400">
                                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">expand_more</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <StatCard
                            icon="trending_up"
                            label="Avg Student Marks"
                            value="88%"
                            subValue="+5%"
                            context="vs. previous semester"
                            color="blue"
                        />
                        <StatCard
                            icon="event_busy"
                            label="Attendance Rate"
                            value="76%"
                            subValue="-2%"
                            context="Based on 12 active modules"
                            color="red"
                        />
                    </div>
                </div>

                {/* Student Performance Review */}
                <section className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-slate-50">
                    <div className="flex items-center justify-between px-6 py-5">
                        <h3 className="text-slate-900 font-headline text-xl font-bold">Student Performance Review</h3>
                        <button className="text-blue-600 text-sm font-semibold hover:underline">View All</button>
                    </div>

                    <div className="flex flex-col">
                        {performers.map((student, idx) => (
                            <div key={idx} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors group cursor-pointer border-t border-slate-50 first:border-t-0">
                                <div className="h-14 w-14 rounded-full overflow-hidden ring-2 ring-slate-100 group-hover:ring-blue-600/20 transition-all flex-shrink-0">
                                    <img src={student.image} alt={student.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex flex-1 flex-col justify-center">
                                    <p className="text-slate-900 text-base font-semibold font-headline">{student.name}</p>
                                    <p className={`${student.statusColor} font-medium text-[10px] uppercase tracking-widest`}>{student.status}</p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <p className="text-slate-900 text-lg font-bold font-headline">{student.marks}</p>
                                    <p className="text-slate-400 text-xs">Avg Marks</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <LecturerNavBar />
        </div>
    );
};

export default LecturerDashboard;
