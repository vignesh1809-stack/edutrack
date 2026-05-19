import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LecturerNavBar from '../../components/LecturerNavBar';
import TopAppBar from '../../components/TopAppBar';

const LecturerPapers = () => {
    const { user } = useSelector((state) => state.auth);
    const [academicYear, setAcademicYear] = useState('2023 - 2024');
    const [section, setSection] = useState('Section A');
    const [branch, setBranch] = useState('Computer Science');
    const [studentId, setStudentId] = useState('Select Student ID');
    const [examType, setExamType] = useState('Mid-Semester Examination');

    const FileUpload = ({ label }) => (
        <div className="space-y-3 pt-2">
            <label className="font-headline text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">{label}</label>
            <div className="border-2 border-dashed border-slate-200 bg-slate-50 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50/50 hover:border-blue-200 transition-all duration-300 group">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-blue-600 text-3xl">cloud_upload</span>
                </div>
                <p className="text-slate-900 font-bold text-sm">Drag & drop your files here</p>
                <p className="text-slate-400 text-[10px] mt-1">or click to browse from device</p>
                <span className="mt-4 px-3 py-1 bg-white text-slate-400 text-[8px] rounded-full uppercase tracking-widest font-bold border border-slate-100 shadow-sm">
                    PDF, JPG up to 10MB
                </span>
            </div>
        </div>
    );

    return (
        <div className="bg-[#f8fafc] min-h-screen pb-40">
            <TopAppBar title="Lecturer Dashboard" />
            
            <main className="max-w-xl mx-auto px-6 pt-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="font-headline text-3xl font-bold tracking-tight text-slate-900 leading-tight">Paper Submission</h1>
                    <p className="text-slate-500 text-sm mt-1 font-body">Upload and manage student scripts, question papers, and official keys.</p>
                </div>

                {/* Submission Form - Focus Plate */}
                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-50 space-y-6">
                    {/* Dropdowns Group */}
                    <div className="grid grid-cols-1 gap-5">
                        {/* Academic Year */}
                        <div className="space-y-1.5">
                            <label className="font-headline text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Academic Year</label>
                            <div className="relative">
                                <select 
                                    value={academicYear}
                                    onChange={(e) => setAcademicYear(e.target.value)}
                                    className="w-full bg-slate-50 border-none rounded-xl py-3.5 px-4 text-slate-900 appearance-none focus:ring-2 focus:ring-blue-600/20 transition-all cursor-pointer"
                                >
                                    <option>2023 - 2024</option>
                                    <option>2024 - 2025</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
                            </div>
                        </div>

                        {/* Section & Branch Row */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="font-headline text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Section</label>
                                <div className="relative">
                                    <select 
                                        value={section}
                                        onChange={(e) => setSection(e.target.value)}
                                        className="w-full bg-slate-50 border-none rounded-xl py-3.5 px-4 text-slate-900 appearance-none focus:ring-2 focus:ring-blue-600/20 transition-all cursor-pointer"
                                    >
                                        <option>Section A</option>
                                        <option>Section B</option>
                                        <option>Section C</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-sm">unfold_more</span>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-headline text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Branch</label>
                                <div className="relative">
                                    <select 
                                        value={branch}
                                        onChange={(e) => setBranch(e.target.value)}
                                        className="w-full bg-slate-50 border-none rounded-xl py-3.5 px-4 text-slate-900 appearance-none focus:ring-2 focus:ring-blue-600/20 transition-all cursor-pointer"
                                    >
                                        <option>Computer Science</option>
                                        <option>Mechanical Eng.</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-sm">unfold_more</span>
                                </div>
                            </div>
                        </div>

                        {/* Student ID */}
                        <div className="space-y-1.5">
                            <label className="font-headline text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Student ID</label>
                            <div className="relative">
                                <select 
                                    value={studentId}
                                    onChange={(e) => setStudentId(e.target.value)}
                                    className="w-full bg-slate-50 border-none rounded-xl py-3.5 px-4 text-slate-900 appearance-none focus:ring-2 focus:ring-blue-600/20 transition-all cursor-pointer"
                                >
                                    <option>Select Student ID</option>
                                    <option>CS-2023-001</option>
                                    <option>CS-2023-002</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">search</span>
                            </div>
                        </div>

                        {/* Exam Type */}
                        <div className="space-y-1.5">
                            <label className="font-headline text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Exam Type</label>
                            <div className="relative">
                                <select 
                                    value={examType}
                                    onChange={(e) => setExamType(e.target.value)}
                                    className="w-full bg-slate-50 border-none rounded-xl py-3.5 px-4 text-slate-900 appearance-none focus:ring-2 focus:ring-blue-600/20 transition-all cursor-pointer"
                                >
                                    <option>Mid-Semester Examination</option>
                                    <option>Final Examination</option>
                                    <option>Supplementary</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">edit_note</span>
                            </div>
                        </div>
                    </div>

                    {/* Upload Paper Section */}
                    <div className="space-y-6">
                        <FileUpload label="Upload Paper" />
                        <FileUpload label="Upload Question Paper" />
                        <FileUpload label="Upload Answer Key" />
                    </div>
                </div>

                {/* Large Primary Action Button */}
                <div className="mt-10 mb-20">
                    <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-headline text-lg font-bold shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 active:scale-95 transition-all">
                        Submit Paper
                        <span className="material-symbols-outlined">send</span>
                    </button>
                </div>
            </main>

            <LecturerNavBar />
        </div>
    );
};

export default LecturerPapers;
