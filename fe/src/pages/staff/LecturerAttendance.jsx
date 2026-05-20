import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LecturerNavBar from '../../components/LecturerNavBar';
import LecturerSidebar from '../../components/LecturerSidebar';
import TopAppBar from '../../components/TopAppBar';
import ProfessionalDropdown from '../../components/ProfessionalDropdown';
import axiosInstance from '../../api/axiosInstance';
import { 
    fetchStaffAttendanceClassRequest, 
    submitStaffAttendanceRequest,
    fetchYearsRequest,
    fetchSectionsRequest
} from '../../store/actions/dashboardActions';

const LecturerAttendance = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { 
        attendanceClassData, 
        loading, 
        error, 
        attendanceSubmitSuccess,
        availableYears,
        availableSections
    } = useSelector((state) => state.dashboard);

    const [selectedYear, setSelectedYear] = useState('2022');
    const [selectedSection, setSelectedSection] = useState('A');
    const [selectedBranch, setSelectedBranch] = useState('CSE');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [availableBranches, setAvailableBranches] = useState([]);
    const [localStatuses, setLocalStatuses] = useState({});
    const [notification, setNotification] = useState(null);

    // Fetch dropdown list options from backend on mount
    useEffect(() => {
        dispatch(fetchYearsRequest());
        dispatch(fetchSectionsRequest());
    }, [dispatch]);

    // Fetch department Names dynamically
    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const instId = user?.institutionId || 'b4d9f575-8bc0-43e7-9ba0-c30e9cf6b084';
                const response = await axiosInstance.get(`/api/departments/names?institutionId=${instId}`);
                // Strip "Department of " dynamically from department names
                const stripped = response.data.map(b => b.replace(/Department of\s+/i, ''));
                setAvailableBranches(stripped);
                if (stripped.length > 0 && !stripped.includes(selectedBranch)) {
                    setSelectedBranch(stripped[0]);
                }
            } catch (err) {
                console.error("Failed to fetch branches dynamically", err);
                setAvailableBranches(['CSE', 'CIVIL', 'EEE', 'ECE']);
            }
        };
        if (user) {
            fetchBranches();
        }
    }, [user]);

    // Fetch class attendance on mount or when the date changes
    useEffect(() => {
        dispatch(fetchStaffAttendanceClassRequest({ 
            date: selectedDate,
            year: selectedYear,
            section: selectedSection,
            branch: selectedBranch
        }));
    }, [dispatch, selectedDate]);

    // Update local state when backend data is loaded
    useEffect(() => {
        if (attendanceClassData?.students) {
            const initial = {};
            attendanceClassData.students.forEach(student => {
                initial[student.id] = student.status || 'PRESENT';
            });
            setLocalStatuses(initial);
        }
    }, [attendanceClassData]);

    // Handle success notification
    useEffect(() => {
        if (attendanceSubmitSuccess) {
            setNotification({
                type: 'success',
                message: 'Attendance submitted successfully!'
            });
            const timer = setTimeout(() => {
                setNotification(null);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [attendanceSubmitSuccess]);

    const toggleStatus = (studentId, status) => {
        setLocalStatuses(prev => ({
            ...prev,
            [studentId]: status
        }));
    };

    const handleApplyFilters = () => {
        dispatch(fetchStaffAttendanceClassRequest({ 
            date: selectedDate,
            year: selectedYear,
            section: selectedSection,
            branch: selectedBranch
        }));
    };

    const handleSubmit = () => {
        const records = Object.keys(localStatuses).map(id => ({
            studentId: id,
            status: localStatuses[id]
        }));
        dispatch(submitStaffAttendanceRequest({
            recordDate: selectedDate,
            semester: attendanceClassData?.semester || 1,
            records
        }));
    };

    const studentsList = attendanceClassData?.students || [];

    // Filter and normalize dynamic options with safe fallbacks
    const yearsOptions = (availableYears || [])
        .filter(y => y !== 'All Years')
        .map(y => y.toString());
    const finalYearsOptions = yearsOptions.length > 0 ? yearsOptions : ['2020', '2021', '2022', '2023', '2024'];

    const sectionsOptions = (availableSections || [])
        .filter(s => s !== 'All Sections');
    const finalSectionsOptions = sectionsOptions.length > 0 ? sectionsOptions : ['A', 'B', 'C', 'D'];

    const finalBranchesOptions = availableBranches.length > 0 
        ? availableBranches 
        : ['CSE', 'CIVIL', 'EEE', 'ECE'];

    return (
        <div className="bg-[#f8fafc] text-on-surface antialiased font-body min-h-screen md:h-screen md:overflow-hidden flex flex-col">
            {/* Custom Premium Scrollbar Styles */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
            `}</style>

            <div className="flex flex-1 min-h-0 md:overflow-hidden">
                <LecturerSidebar />
                <div className="flex-grow flex flex-col min-w-0 md:pl-64 md:h-full md:overflow-hidden">
                    <TopAppBar title="Lecturer Dashboard" />
                    
                    <main className="flex-grow px-4 md:px-6 pt-6 pb-32 md:pb-6 overflow-y-auto md:overflow-hidden flex flex-col min-h-0">
                        {/* Header & Context */}
                        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-4 flex-shrink-0">
                            <div>
                                <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-1 leading-tight">Student Attendance</h2>
                                <p className="font-body text-slate-500 text-xs md:text-sm">Review and log attendance for your active sessions.</p>
                            </div>
                            {/* Desktop / Tablet Submit Button */}
                            {studentsList.length > 0 && (
                                <button 
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="hidden md:flex bg-blue-600 hover:bg-blue-700 text-white font-headline font-bold py-3 px-6 rounded-xl items-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95 transition-all disabled:opacity-50 flex-shrink-0"
                                >
                                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                    Submit Attendance
                                </button>
                            )}
                        </div>

                        {/* Notification Toast */}
                        {notification && (
                            <div className="mb-4 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 flex-shrink-0">
                                <span className="material-symbols-outlined text-green-600">check_circle</span>
                                <span className="text-sm font-semibold">{notification.message}</span>
                            </div>
                        )}

                        {/* Responsive Grid Panel */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow min-h-0 pb-4 lg:pb-0">
                            
                            {/* Filters Column */}
                            <div className="lg:col-span-1 flex-shrink-0">
                                <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-50 flex flex-col">
                                    <h3 className="font-headline text-base font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-50 pb-3 flex-shrink-0">
                                        <span className="material-symbols-outlined text-blue-600 text-xl">tune</span>
                                        Session Filters
                                    </h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="space-y-1">
                                            <label className="font-headline text-[9px] font-bold uppercase tracking-widest text-slate-400">Record Date</label>
                                            <input 
                                                type="date"
                                                value={selectedDate}
                                                onChange={(e) => setSelectedDate(e.target.value)}
                                                className="w-full bg-slate-50 border-none rounded-xl py-2.5 px-4 font-body text-slate-900 focus:ring-2 focus:ring-blue-600/20 transition-all cursor-pointer text-sm"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="font-headline text-[9px] font-bold uppercase tracking-widest text-slate-400">Year</label>
                                            <ProfessionalDropdown 
                                                value={selectedYear}
                                                onChange={setSelectedYear}
                                                options={finalYearsOptions}
                                                defaultValue={selectedYear}
                                                defaultLabel={selectedYear}
                                                className="w-full"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="font-headline text-[9px] font-bold uppercase tracking-widest text-slate-400">Section</label>
                                                <ProfessionalDropdown 
                                                    value={selectedSection}
                                                    onChange={setSelectedSection}
                                                    options={finalSectionsOptions}
                                                    defaultValue={selectedSection}
                                                    defaultLabel={`Section ${selectedSection}`}
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="font-headline text-[9px] font-bold uppercase tracking-widest text-slate-400">Branch</label>
                                                <ProfessionalDropdown 
                                                    value={selectedBranch}
                                                    onChange={setSelectedBranch}
                                                    options={finalBranchesOptions}
                                                    defaultValue={selectedBranch}
                                                    defaultLabel={selectedBranch}
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>

                                        <button 
                                            onClick={handleApplyFilters}
                                            className="w-full bg-blue-600 text-white font-headline font-bold py-3.5 rounded-xl mt-2 shadow-lg shadow-blue-600/20 hover:brightness-110 transition-all flex justify-center items-center gap-2 active:scale-95 text-sm"
                                        >
                                            <span className="material-symbols-outlined text-lg">filter_list</span>
                                            Apply Filters
                                        </button>
                                    </div>
                                </section>
                            </div>

                            {/* Student Roster Column - Local inner scroll on BOTH desktop and mobile */}
                            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-50 shadow-sm flex flex-col h-[520px] lg:h-full lg:overflow-hidden min-h-0">
                                
                                {/* Card Header (Static) */}
                                <div className="flex justify-between items-center p-5 border-b border-slate-50 flex-shrink-0">
                                    <div className="min-w-0">
                                        <h3 className="font-headline text-base md:text-lg font-bold text-slate-900 tracking-tight">Student List</h3>
                                        {attendanceClassData?.classLabel && (
                                            <p className="text-xs text-slate-400 font-medium mt-0.5 truncate">{attendanceClassData.classLabel}</p>
                                        )}
                                    </div>
                                    <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider flex-shrink-0">{studentsList.length} Students</span>
                                </div>

                                {/* Card Body (Scrollable Roster) */}
                                <div className="p-5 overflow-y-auto flex-grow custom-scrollbar min-h-0">
                                    {loading ? (
                                        <div className="flex flex-col items-center justify-center py-20 gap-3">
                                            <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                                            <p className="text-xs text-slate-400 font-semibold animate-pulse">Loading class data...</p>
                                        </div>
                                    ) : studentsList.length === 0 ? (
                                        <div className="py-20 text-center">
                                            <span className="material-symbols-outlined text-5xl text-slate-300 mb-3">group_off</span>
                                            <p className="text-slate-500 font-headline font-bold text-sm">No students assigned to your class</p>
                                            <p className="text-slate-400 text-xs mt-1">Please contact your administrator for class assignments.</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-2">
                                            {studentsList.map((student) => (
                                                <div key={student.id} className="bg-[#f8fafc] p-3 rounded-2xl flex items-center justify-between border border-slate-100 shadow-sm transition-all hover:shadow-md hover:border-slate-200">
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-white bg-white flex-shrink-0 shadow-sm">
                                                            <img 
                                                                src={student.avatarUrl} 
                                                                alt={student.name} 
                                                                className="w-full h-full object-cover" 
                                                                onError={(e) => {
                                                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=random&color=fff&size=150`;
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="font-headline font-bold text-slate-900 text-sm leading-tight truncate">{student.name}</p>
                                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">ID: {student.studentId || student.id.substring(0, 8)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex bg-white p-0.5 rounded-lg flex-shrink-0 ml-2 shadow-sm border border-slate-100">
                                                        <button 
                                                            onClick={() => toggleStatus(student.id, 'PRESENT')}
                                                            className={`px-3 py-1.5 text-[11px] font-bold rounded-md transition-all ${localStatuses[student.id] === 'PRESENT' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                                        >
                                                            Present
                                                        </button>
                                                        <button 
                                                            onClick={() => toggleStatus(student.id, 'ABSENT')}
                                                            className={`px-3 py-1.5 text-[11px] font-bold rounded-md transition-all ${localStatuses[student.id] === 'ABSENT' ? 'bg-red-50 text-red-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                                        >
                                                            Absent
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    </main>

                    {/* Mobile Floating Action Footer */}
                    {studentsList.length > 0 && (
                        <footer className="fixed bottom-24 left-0 right-0 p-4 z-40 md:hidden bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/95 to-transparent">
                            <div className="max-w-xl mx-auto">
                                <button 
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="w-full bg-blue-600 text-white font-headline font-bold py-3.5 rounded-2xl flex justify-center items-center gap-3 shadow-xl shadow-blue-600/30 transition-transform active:scale-95 disabled:opacity-50 text-sm"
                                >
                                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                    Submit Attendance
                                </button>
                            </div>
                        </footer>
                    )}

                    <LecturerNavBar />
                </div>
            </div>
        </div>
    );
};

export default LecturerAttendance;
