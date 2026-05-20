import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLecturerDashboardRequest, setDashboardFilter } from '../../store/actions/dashboardActions';
import LecturerNavBar from '../../components/LecturerNavBar';
import LecturerSidebar from '../../components/LecturerSidebar';
import TopAppBar from '../../components/TopAppBar';
import ProfessionalDropdown from '../../components/ProfessionalDropdown';

const StudentAvatar = ({ gender = 'MALE', name = '' }) => {
    const isFemale = gender && gender.toUpperCase() === 'FEMALE';
    const avatarSrc = isFemale ? '/avatars/female.png' : '/avatars/male.jpg';
    return (
        <img 
            src={avatarSrc} 
            alt={name} 
            className="w-full h-full object-cover" 
            onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=150`;
            }}
        />
    );
};

const RankBadge = ({ rank }) => {
    if (rank !== 1 && rank !== 2 && rank !== 3) return null;

    // Rosette color configuration matching the uploaded badge shape and color scheme
    const config = {
        1: { primary: '#1e1b4b', secondary: '#ffffff', text: '#1e1b4b' }, // 1st Place - Deep Navy Rosette, White Inner Ring, Navy Number
        2: { primary: '#475569', secondary: '#ffffff', text: '#475569' }, // 2nd Place - Silver Slate Rosette, White Inner Ring, Slate Number
        3: { primary: '#7c2d12', secondary: '#ffffff', text: '#7c2d12' }  // 3rd Place - Bronze Terracotta Rosette, White Inner Ring, Terracotta Number
    };

    const { primary, secondary, text } = config[rank];

    return (
        <svg className="w-14 h-14 ml-3 select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:scale-110 transition-transform duration-200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Ribbons at the bottom */}
            <path d="M35 55 L20 85 L35 80 L42 65 Z" fill={primary} />
            <path d="M65 55 L80 85 L65 80 L58 65 Z" fill={primary} />
            <path d="M38 58 L28 85 L38 82 L44 68 Z" fill={secondary} opacity="0.7" />
            <path d="M62 58 L72 85 L62 82 L56 68 Z" fill={secondary} opacity="0.7" />

            {/* Crinkled Rosette outer ring (scalloped rosette path matching the uploaded image shape) */}
            <path d="M50 15 C52.5 15, 54 18, 56.5 18.5 C59 19, 61.5 17.5, 63.5 18.5 C65.5 19.5, 66.5 22.5, 68 24 C69.5 25.5, 72.5 25.5, 73.5 27.5 C74.5 29.5, 73.5 32.5, 74 35 C74.5 37.5, 77.5 39, 77.5 41.5 C77.5 44, 75 46, 74.5 48.5 C74 51, 74.5 54, 73 56 C71.5 58, 68.5 58, 67 60 C65.5 62, 64 65, 62 66.5 C60 68, 57 67.5, 55 69 C53 70.5, 51.5 73.5, 49 73.5 C46.5 73.5, 45 70.5, 43 69 C41 67.5, 38 68, 36 66.5 C34 65, 32.5 62, 31 60 C29.5 58, 26.5 58, 25 56 C23.5 54, 24 51, 23.5 48.5 C23 46, 20.5 44, 20.5 41.5 C20.5 39, 23.5 37.5, 24 35 C24.5 32.5, 23.5 29.5, 24.5 27.5 C25.5 25.5, 28.5 25.5, 30 24 C31.5 22.5, 32.5 19.5, 34.5 18.5 C36.5 17.5, 39 19, 41.5 18.5 C44 18, 45.5 15, 48 15 Z" fill={primary} />
            
            {/* Inner White Rings */}
            <circle cx="49" cy="44.5" r="22.5" fill={secondary} />
            <circle cx="49" cy="44.5" r="18" fill={primary} />
            <circle cx="49" cy="44.5" r="14" fill={secondary} />

            {/* Rank Number Text */}
            <text x="49" y="52" fill={text} fontSize="21" fontWeight="900" fontFamily="system-ui, sans-serif" textAnchor="middle">{rank}</text>
        </svg>
    );
};

const LecturerDashboard = () => {
    const dispatch = useDispatch();
    const { data, loading, error, filters } = useSelector((state) => state.dashboard);
    const { user } = useSelector((state) => state.auth);

    const selectedCourseId = filters?.selectedCourseId || 'ALL';
    const [showAllPerformers, setShowAllPerformers] = useState(false);

    useEffect(() => {
        dispatch(fetchLecturerDashboardRequest(selectedCourseId));
    }, [dispatch, selectedCourseId]);

    // Extracted dynamic fields with default fallbacks
    const classLabel = data?.classLabel || "No Class Assigned";
    const totalStudents = data?.totalStudents !== undefined ? data.totalStudents : 0;
    const classAttendance = data?.classAttendance !== undefined ? `${data.classAttendance}%` : "0%";
    const classAvgMarks = data?.classAvgMarks !== undefined ? `${data.classAvgMarks}%` : "0%";
    const pendingRemarks = data?.pendingRemarks !== undefined ? String(data.pendingRemarks).padStart(2, '0') : "00";

    const avgStudentMarks = data?.avgStudentMarks !== undefined ? `${data.avgStudentMarks}%` : "0%";
    const attendanceRate = data?.attendanceRate !== undefined ? `${data.attendanceRate}%` : "0%";

    const performers = data?.performers || [];

    const StatCard = ({ icon, label, value, subValue, context, color = 'blue', customGraphic }) => (
        <div className="relative overflow-hidden group flex flex-col gap-3 rounded-2xl p-6 bg-white border border-transparent hover:border-blue-600/10 shadow-sm transition-all">
            {/* Background Graphic Icon */}
            {customGraphic ? customGraphic : (
                <div className="absolute right-[-10px] bottom-[-15px] opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-300 pointer-events-none select-none">
                    <span className="material-symbols-outlined text-[100px]">{icon}</span>
                </div>
            )}
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

    const courses = data?.courses || [];
    
    // Find selected course stats
    const activeCourse = courses.find(c => c.courseId === selectedCourseId);
    const displayAvgStudentMarks = activeCourse 
        ? `${activeCourse.avgStudentMarks}%` 
        : avgStudentMarks;
    const displayAttendanceRate = activeCourse 
        ? `${activeCourse.attendanceRate}%` 
        : attendanceRate;

    return (
        <div className="bg-[#f8fafc] text-on-surface antialiased mb-24 md:mb-0 font-body min-h-screen">
            <LecturerSidebar />
            <div className="md:pl-64">
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
                    {loading ? (
                        <div className="flex items-center justify-center py-24">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                        </div>
                    ) : (
                        <>
                            {/* Subject Overview Section */}
                            <div className="space-y-4">
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-8 bg-slate-300 rounded-full"></span>
                                        <h3 className="text-xl font-bold text-slate-900 tracking-tight">Lecturer Stats</h3>
                                    </div>
                                    <div className="flex justify-end">
                                        <ProfessionalDropdown
                                            value={selectedCourseId}
                                            onChange={(val) => dispatch(setDashboardFilter({ selectedCourseId: val }))}
                                            options={courses.map(course => ({ id: course.courseId, name: course.courseName }))}
                                            defaultValue="ALL"
                                            defaultLabel="All Subjects"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <StatCard
                                        icon="trending_up"
                                        label="Avg Student Marks"
                                        value={displayAvgStudentMarks}
                                        subValue="+5%"
                                        context="vs. previous semester"
                                        color="blue"
                                        customGraphic={
                                            <div className="absolute bottom-0 right-0 left-0 h-16 overflow-hidden z-0 pointer-events-none opacity-[0.08] group-hover:opacity-[0.16] transition-opacity duration-300">
                                                <svg className="w-full h-full text-blue-600" fill="currentColor" preserveAspectRatio="none" viewBox="0 0 400 100">
                                                    <path d="M0,80 C50,75 80,40 120,45 C160,50 200,20 250,25 C300,30 350,10 400,15 L400,100 L0,100 Z" fillOpacity="0.15"></path>
                                                    <path d="M0,80 C50,75 80,40 120,45 C160,50 200,20 250,25 C300,30 350,10 400,15" fill="none" stroke="currentColor" strokeWidth="3" vectorEffect="non-scaling-stroke"></path>
                                                </svg>
                                            </div>
                                        }
                                    />
                                    <StatCard
                                        icon="event_busy"
                                        label="Attendance Rate"
                                        value={displayAttendanceRate}
                                        subValue="-2%"
                                        context="Based on active modules"
                                        color="red"
                                        customGraphic={
                                            <div className="absolute right-4 bottom-2 h-16 w-28 overflow-hidden z-0 pointer-events-none opacity-[0.08] group-hover:opacity-[0.16] transition-opacity duration-300 flex items-end gap-1.5 justify-end select-none">
                                                <div className="w-2.5 h-[30%] bg-red-600 rounded-t-sm"></div>
                                                <div className="w-2.5 h-[55%] bg-red-600 rounded-t-sm"></div>
                                                <div className="w-2.5 h-[45%] bg-red-600 rounded-t-sm"></div>
                                                <div className="w-2.5 h-[75%] bg-red-600 rounded-t-sm"></div>
                                                <div className="w-2.5 h-[60%] bg-red-600 rounded-t-sm"></div>
                                                <div className="w-2.5 h-[90%] bg-red-600 rounded-t-sm"></div>
                                            </div>
                                        }
                                    />
                                </div>
                            </div>

                            <div className="h-px bg-slate-100 w-full"></div>

                            {/* Associated Class Dashboard */}
                            <div className="space-y-4">
                                <div className="flex flex-col gap-1.5">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                                        <h3 className="text-xl font-bold text-slate-900 tracking-tight">Class Overview</h3>
                                    </div>
                                    <div className="text-slate-400 font-bold text-sm tracking-wide pl-4">
                                        ({classLabel})
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <OverviewCard
                                        icon="groups"
                                        label="Total Students"
                                        value={totalStudents}
                                        subValue="Assigned"
                                    />
                                    <OverviewCard
                                        icon="how_to_reg"
                                        label="Class Attendance"
                                        value={classAttendance}
                                        subValue="+1.2%"
                                        color="amber"
                                    />
                                    <OverviewCard
                                        icon="analytics"
                                        label="Class Avg Marks"
                                        value={classAvgMarks}
                                        subValue="Steady"
                                        color="blue"
                                    />
                                    <OverviewCard
                                        icon="feedback"
                                        label="Pending Remarks"
                                        value={pendingRemarks}
                                        subValue="Action"
                                        color="purple"
                                    />
                                </div>
                            </div>

                            {/* Student Performance Review */}
                            {performers.length > 0 && (
                                <section className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-slate-50">
                                    <div className="flex items-center justify-between px-6 py-5">
                                        <h3 className="text-slate-900 font-headline text-xl font-bold">Student Performance Review</h3>
                                        {performers.length > 3 && (
                                            <button 
                                                onClick={() => setShowAllPerformers(!showAllPerformers)}
                                                className="text-blue-600 text-sm font-semibold hover:underline"
                                            >
                                                {showAllPerformers ? 'Show Less' : 'View All'}
                                            </button>
                                        )}
                                    </div>

                                    <div className="flex flex-col">
                                        {(showAllPerformers ? performers : performers.slice(0, 3)).map((student, idx) => (
                                            <div key={idx} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors group cursor-pointer border-t border-slate-50 first:border-t-0">
                                                <div className="h-14 w-14 rounded-full overflow-hidden ring-2 ring-slate-100 group-hover:ring-blue-600/20 transition-all flex-shrink-0">
                                                    <StudentAvatar gender={student.gender} name={student.name} />
                                                </div>
                                                <div className="flex flex-1 flex-col justify-center">
                                                    <p className="text-slate-900 text-base font-semibold font-headline">{student.name}</p>
                                                    <p className={`${student.statusColor} font-medium text-[10px] uppercase tracking-widest`}>{student.status}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex flex-col items-end">
                                                        <p className="text-slate-900 text-lg font-bold font-headline">{student.marks}</p>
                                                        <p className="text-slate-400 text-xs">Avg Marks</p>
                                                    </div>
                                                    <RankBadge rank={idx + 1} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </>
                    )}
                </main>

                <LecturerNavBar />
            </div>
        </div>
    );
};

export default LecturerDashboard;
