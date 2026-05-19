import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LecturerNavBar from '../../components/LecturerNavBar';
import LecturerSidebar from '../../components/LecturerSidebar';
import TopAppBar from '../../components/TopAppBar';

const LecturerAttendance = () => {
    const { user } = useSelector((state) => state.auth);
    const [selectedYear, setSelectedYear] = useState('Final Year (2024)');
    const [selectedSection, setSelectedSection] = useState('A-102');
    const [selectedBranch, setSelectedBranch] = useState('Architecture');

    // Mock student data
    const [students, setStudents] = useState([
        { id: 'ARC-24-001', name: 'Julian Thorne', status: 'Present', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150' },
        { id: 'ARC-24-005', name: 'Elara Vance', status: 'Absent', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' },
        { id: 'ARC-24-012', name: 'Marcus Solari', status: 'Present', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150' },
        { id: 'ARC-24-028', name: 'Leila Haddad', status: 'Present', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150' }
    ]);

    const toggleStatus = (index, status) => {
        const newStudents = [...students];
        newStudents[index].status = status;
        setStudents(newStudents);
    };

    return (
        <div className="bg-[#f8fafc] text-on-surface antialiased mb-24 md:mb-0 font-body min-h-screen">
            <LecturerSidebar />
            <div className="md:pl-64">
                <TopAppBar title="Lecturer Dashboard" />
                
                <main className="max-w-xl mx-auto px-6 pt-8 pb-40">
                    {/* Header & Context */}
                    <div className="mb-10">
                        <h2 className="font-headline text-3xl font-bold tracking-tight text-slate-900 mb-2">Student Attendance</h2>
                        <p className="font-body text-slate-500 text-sm">Review and log attendance for your active sessions.</p>
                    </div>

                    {/* Filter Focus Plate */}
                    <section className="bg-white rounded-2xl p-6 mb-12 shadow-sm border border-slate-50">
                        <div className="grid grid-cols-1 gap-5">
                            <div className="space-y-2">
                                <label className="font-headline text-[10px] font-bold uppercase tracking-widest text-slate-400">Year</label>
                                <div className="relative">
                                    <select 
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(e.target.value)}
                                        className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 appearance-none font-body text-slate-900 focus:ring-2 focus:ring-blue-600/20 transition-all cursor-pointer"
                                    >
                                        <option>Final Year (2024)</option>
                                        <option>Junior Year (2025)</option>
                                        <option>Sophomore Year (2026)</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="font-headline text-[10px] font-bold uppercase tracking-widest text-slate-400">Section</label>
                                    <div className="relative">
                                        <select 
                                            value={selectedSection}
                                            onChange={(e) => setSelectedSection(e.target.value)}
                                            className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 appearance-none font-body text-slate-900 focus:ring-2 focus:ring-blue-600/20 transition-all cursor-pointer"
                                        >
                                            <option>A-102</option>
                                            <option>B-204</option>
                                            <option>C-101</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="font-headline text-[10px] font-bold uppercase tracking-widest text-slate-400">Branch</label>
                                    <div className="relative">
                                        <select 
                                            value={selectedBranch}
                                            onChange={(e) => setSelectedBranch(e.target.value)}
                                            className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 appearance-none font-body text-slate-900 focus:ring-2 focus:ring-blue-600/20 transition-all cursor-pointer"
                                        >
                                            <option>Architecture</option>
                                            <option>Design</option>
                                            <option>Fine Arts</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full bg-blue-600 text-white font-headline font-bold py-4 rounded-xl mt-4 shadow-lg shadow-blue-600/20 hover:brightness-110 transition-all flex justify-center items-center gap-2 active:scale-95">
                                <span className="material-symbols-outlined text-xl">filter_list</span>
                                Apply Filters
                            </button>
                        </div>
                    </section>

                    {/* Student List */}
                    <div className="flex justify-between items-end mb-6">
                        <h3 className="font-headline text-xl font-bold text-slate-900 tracking-tight">Student List</h3>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">{students.length} Students</span>
                    </div>

                    <div className="space-y-4">
                        {students.map((student, index) => (
                            <div key={student.id} className="bg-white p-4 rounded-2xl flex items-center justify-between border border-slate-50 shadow-sm transition-all hover:shadow-md">
                                <div className="flex items-center gap-4">
                                    <img src={student.image} alt={student.name} className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-50" />
                                    <div>
                                        <p className="font-headline font-bold text-slate-900 leading-tight">{student.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">ID: {student.id}</p>
                                    </div>
                                </div>
                                <div className="flex bg-slate-50 p-1 rounded-xl">
                                    <button 
                                        onClick={() => toggleStatus(index, 'Present')}
                                        className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${student.status === 'Present' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        Present
                                    </button>
                                    <button 
                                        onClick={() => toggleStatus(index, 'Absent')}
                                        className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${student.status === 'Absent' ? 'bg-red-50 text-red-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        Absent
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Fixed Action Bar */}
                <footer className="fixed bottom-24 md:bottom-6 left-0 md:left-64 right-0 p-6 z-40">
                    <div className="max-w-xl mx-auto">
                        <button className="w-full bg-blue-600 text-white font-headline font-bold py-4 rounded-2xl flex justify-center items-center gap-3 shadow-xl shadow-blue-600/30 transition-transform active:scale-95">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                            Submit Attendance
                        </button>
                    </div>
                </footer>

                <LecturerNavBar />
            </div>
        </div>
    );
};

export default LecturerAttendance;
