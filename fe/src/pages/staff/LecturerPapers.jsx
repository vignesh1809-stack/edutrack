import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LecturerNavBar from '../../components/LecturerNavBar';
import LecturerSidebar from '../../components/LecturerSidebar';
import TopAppBar from '../../components/TopAppBar';
import ProfessionalDropdown from '../../components/ProfessionalDropdown';
import {
    fetchPaperMasterDataRequest,
    fetchPaperSubmissionsRequest,
    submitPaperGradingRequest,
    updatePaperSubmission
} from '../../store/actions/paperActions';

const LecturerPapers = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    
    // Select paper evaluation state from Redux store
    const {
        students,
        courses,
        submissions,
        loading,
        submitLoading
    } = useSelector((state) => state.papers || { students: [], courses: [], submissions: [], loading: false, submitLoading: false });

    // Form & Cascade States
    const [selectedBatch, setSelectedBatch] = useState('');
    const [selectedDept, setSelectedDept] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [examType, setExamType] = useState('Mid-Semester Examination');
    
    // Upload files states
    const [scriptPages, setScriptPages] = useState([]); // List of image files
    const [questionPaper, setQuestionPaper] = useState(null);
    const [answerKey, setAnswerKey] = useState(null);
    
    // Detailed Report Modal
    const [selectedReport, setSelectedReport] = useState(null);
    const [activeReportTab, setActiveReportTab] = useState('scores'); // 'scores', 'ocr'
    const [selectedOcrPage, setSelectedOcrPage] = useState(0);

    // Fetch master data & history via Redux actions
    useEffect(() => {
        dispatch(fetchPaperMasterDataRequest());
        dispatch(fetchPaperSubmissionsRequest());
    }, [dispatch]);

    // ----------------------------------------------------
    // Dynamic Cascading Filters Derivation
    // ----------------------------------------------------
    
    // 1. Batch options (derived from students' batch years)
    const batches = [...new Set(students.map(s => s.batchYear).filter(Boolean))].sort((a, b) => b - a);

    // 2. Department options (filtered by selected batch)
    const departmentsMap = {};
    students.forEach(s => {
        if (s.batchYear === selectedBatch && s.departmentCode) {
            departmentsMap[s.departmentCode] = s.departmentName || s.departmentCode;
        }
    });
    const departments = Object.entries(departmentsMap).map(([code, name]) => ({
        id: code,
        name: name
    }));

    // 3. Semester options (filtered by batch & department)
    const semesters = [...new Set(
        students
            .filter(s => s.batchYear === selectedBatch && s.departmentCode === selectedDept)
            .map(s => s.currentSemester)
            .filter(Boolean)
    )].sort();

    // 4. Section options (filtered by batch, department & semester)
    const sections = [...new Set(
        students
            .filter(s => 
                s.batchYear === selectedBatch && 
                s.departmentCode === selectedDept && 
                s.currentSemester === selectedSemester
            )
            .map(s => s.section)
            .filter(Boolean)
    )].sort();

    // 5. Course options (associated with selected department & semester)
    const filteredCourses = courses.filter(c => 
        c.departmentCode === selectedDept && 
        c.semester === selectedSemester
    );

    // 6. Student options (associated with selected batch, department, semester & section)
    const filteredStudents = students.filter(s => 
        s.batchYear === selectedBatch && 
        s.departmentCode === selectedDept && 
        s.currentSemester === selectedSemester && 
        s.section === selectedSection
    );

    // Dynamic selection safety resets
    useEffect(() => {
        if (students.length === 0) return;

        // Reset batch
        if (batches.length > 0 && (!selectedBatch || !batches.includes(selectedBatch))) {
            setSelectedBatch(batches[0]);
            return;
        }

        // Reset department
        const deptKeys = departments.map(d => d.id);
        if (deptKeys.length > 0 && (!selectedDept || !deptKeys.includes(selectedDept))) {
            setSelectedDept(deptKeys[0]);
            return;
        }

        // Reset semester
        if (semesters.length > 0 && (!selectedSemester || !semesters.includes(selectedSemester))) {
            setSelectedSemester(semesters[0]);
            return;
        }

        // Reset section
        if (sections.length > 0 && (!selectedSection || !sections.includes(selectedSection))) {
            setSelectedSection(sections[0]);
            return;
        }

        // Reset course
        if (filteredCourses.length > 0) {
            const hasValidCourse = filteredCourses.some(c => c.id === selectedCourseId);
            if (!selectedCourseId || !hasValidCourse) {
                setSelectedCourseId(filteredCourses[0].id);
            }
        } else {
            setSelectedCourseId('');
        }

        // Reset student
        if (filteredStudents.length > 0) {
            const hasValidStudent = filteredStudents.some(s => s.id === selectedStudentId);
            if (!selectedStudentId || !hasValidStudent) {
                setSelectedStudentId(filteredStudents[0].id);
            }
        } else {
            setSelectedStudentId('');
        }

    }, [students, courses, selectedBatch, selectedDept, selectedSemester, selectedSection]);

    // Real-time AI evaluation updates via SSE stream
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) return;

        // Establish persistent connection to SSE endpoint
        const eventSource = new EventSource(`/api/staff/papers/submissions/events?token=${token}`);

        eventSource.onmessage = (event) => {
            try {
                const updatedSubmission = JSON.parse(event.data);
                dispatch(updatePaperSubmission(updatedSubmission));
            } catch (e) {
                console.error('Error parsing SSE event data:', e);
            }
        };

        eventSource.addEventListener('handshake', (event) => {
            console.log('SSE connection handshake:', event.data);
        });

        eventSource.onerror = (error) => {
            console.error('SSE connection error, closing event source:', error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [dispatch]);

    // Keep the currently viewed report in the modal reactive to polling updates
    useEffect(() => {
        if (!selectedReport) return;
        const updated = submissions.find(s => s.id === selectedReport.id);
        if (updated && (updated.status !== selectedReport.status || updated.marksObtained !== selectedReport.marksObtained)) {
            setSelectedReport(updated);
        }
    }, [submissions, selectedReport]);

    // Handle Script pages click/selection
    const handleScriptSelection = (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        // Create local preview URLs
        const newPages = files.map(file => ({
            file,
            previewUrl: URL.createObjectURL(file)
        }));

        setScriptPages(prev => [...prev, ...newPages]);
    };

    // Remove selected script page
    const removeScriptPage = (index) => {
        setScriptPages(prev => {
            const copy = [...prev];
            // Release memory of preview url
            URL.revokeObjectURL(copy[index].previewUrl);
            copy.splice(index, 1);
            return copy;
        });
    };

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (scriptPages.length === 0) {
            alert('Please select or capture at least 1 handwritten script page.');
            return;
        }

        const formData = new FormData();
        formData.append('studentId', selectedStudentId);
        if (selectedCourseId) {
            formData.append('courseId', selectedCourseId);
        }
        formData.append('examType', examType);
        formData.append('academicYear', selectedBatch ? `${selectedBatch} - ${parseInt(selectedBatch) + 1}` : '2023 - 2024');
        formData.append('section', selectedSection ? `Section ${selectedSection}` : 'Section A');
        
        // Append all script pages
        scriptPages.forEach(page => {
            formData.append('files', page.file);
        });

        if (questionPaper) {
            formData.append('questionPaper', questionPaper);
        }
        if (answerKey) {
            formData.append('answerKey', answerKey);
        }

        new Promise((resolve, reject) => {
            dispatch(submitPaperGradingRequest(formData, resolve, reject));
        }).then(() => {
            // Clear page inputs
            scriptPages.forEach(p => URL.revokeObjectURL(p.previewUrl));
            setScriptPages([]);
            setQuestionPaper(null);
            setAnswerKey(null);
        }).catch((error) => {
            console.error('Submission failed:', error);
            alert('Failed to submit evaluation. Check console for details.');
        });
    };

    // Status Badge Helpers
    const getStatusStyle = (status) => {
        switch (status) {
            case 'COMPLETED':
                return 'bg-green-50 text-green-700 border-green-200';
            case 'PROCESSING':
                return 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse';
            case 'PENDING':
                return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'FAILED':
                return 'bg-red-50 text-red-700 border-red-200';
            default:
                return 'bg-slate-50 text-slate-700 border-slate-200';
        }
    };

    return (
        <div className="bg-[#f8fafc] text-on-surface antialiased mb-24 md:mb-0 font-body min-h-screen">
            <LecturerSidebar />
            <div className="md:pl-64">
                <TopAppBar title="Lecturer Portal" />
                
                <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* LEFT PANEL: Submission form */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="mb-4">
                            <h1 className="font-headline text-3xl font-black tracking-tight text-slate-900 leading-tight">AI Exam Evaluation</h1>
                            <p className="text-slate-500 text-sm mt-1 font-body">Capture handwritten answer scripts and let AI perform instant grading.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
                            
                            {/* Class and Student Selection */}
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="font-headline text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Batch Year</label>
                                        <ProfessionalDropdown
                                            value={selectedBatch}
                                            onChange={setSelectedBatch}
                                            options={batches}
                                            placeholder="Select Batch"
                                            showDefault={false}
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="font-headline text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Department</label>
                                        <ProfessionalDropdown
                                            value={selectedDept}
                                            onChange={setSelectedDept}
                                            options={departments}
                                            placeholder="Select Dept"
                                            showDefault={false}
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="font-headline text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Semester</label>
                                        <ProfessionalDropdown
                                            value={selectedSemester}
                                            onChange={setSelectedSemester}
                                            options={semesters.map(s => ({ id: s, name: `Semester ${s}` }))}
                                            placeholder="Select Sem"
                                            showDefault={false}
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="font-headline text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Section</label>
                                        <ProfessionalDropdown
                                            value={selectedSection}
                                            onChange={setSelectedSection}
                                            options={sections.map(s => ({ id: s, name: `Section ${s}` }))}
                                            placeholder="Select Sec"
                                            showDefault={false}
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="font-headline text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Subject / Course</label>
                                    <ProfessionalDropdown
                                        value={selectedCourseId}
                                        onChange={setSelectedCourseId}
                                        options={filteredCourses.map(c => ({ id: c.id, name: c.courseName }))}
                                        placeholder="Select Subject / Course"
                                        showDefault={false}
                                        className="w-full"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="font-headline text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Student</label>
                                    <ProfessionalDropdown
                                        value={selectedStudentId}
                                        onChange={setSelectedStudentId}
                                        options={filteredStudents.map(s => ({ id: s.id, name: `${s.firstName} ${s.lastName} (${s.studentId})` }))}
                                        placeholder="Select Student"
                                        showSearch={true}
                                        searchPlaceholder="Search student by name or ID..."
                                        showDefault={false}
                                        className="w-full"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="font-headline text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Exam Type</label>
                                    <ProfessionalDropdown
                                        value={examType}
                                        onChange={setExamType}
                                        options={[
                                            { id: 'Mid-Semester Examination', name: 'Mid-Semester Examination' },
                                            { id: 'Final Examination', name: 'Final Examination' },
                                            { id: 'Class Test / Quiz', name: 'Class Test / Quiz' }
                                        ]}
                                        placeholder="Select Exam Type"
                                        showDefault={false}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            {/* Captured Script Upload */}
                            <div className="space-y-4 pt-2">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 flex justify-between">
                                    <span>2. Clicked Script Pages</span>
                                    <span className="text-[10px] font-normal text-slate-400">{scriptPages.length} pages added</span>
                                </h3>

                                {/* Grid of captured images */}
                                {scriptPages.length > 0 && (
                                    <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                        {scriptPages.map((page, index) => (
                                            <div key={index} className="relative aspect-[3/4] bg-slate-200 rounded-xl overflow-hidden group shadow-sm border border-slate-200">
                                                <img src={page.previewUrl} className="w-full h-full object-cover" alt={`Page ${index + 1}`} />
                                                <div className="absolute top-1 left-1 bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                                                    P{index + 1}
                                                </div>
                                                <button 
                                                    type="button"
                                                    onClick={() => removeScriptPage(index)}
                                                    className="absolute top-1 right-1 bg-red-600/90 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-700 transition-colors shadow"
                                                >
                                                    <span className="material-symbols-outlined text-xs">close</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Capture Button */}
                                <div>
                                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 bg-slate-50 rounded-2xl p-5 text-center cursor-pointer hover:bg-blue-50/30 hover:border-blue-300 transition-all group">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined text-blue-600 text-2xl">photo_camera</span>
                                        </div>
                                        <p className="text-slate-900 font-bold text-xs">Add Handwritten Pages</p>
                                        <p className="text-slate-400 text-[10px] mt-1">Tap to open Camera or Files</p>
                                        <input 
                                            type="file" 
                                            multiple 
                                            accept="image/*" 
                                            capture="environment"
                                            onChange={handleScriptSelection} 
                                            className="hidden" 
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Reference Papers */}
                            <div className="space-y-4 pt-2">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600">3. References (Optional)</h3>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Question Paper */}
                                    <div className="space-y-1">
                                        <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400">Question Paper</label>
                                        <label className={`block border border-slate-200 rounded-xl p-3 text-center cursor-pointer hover:bg-slate-50 transition-colors text-xs font-semibold ${questionPaper ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white text-slate-600'}`}>
                                            <span className="material-symbols-outlined text-sm align-middle mr-1">{questionPaper ? 'check_circle' : 'upload_file'}</span>
                                            {questionPaper ? 'Selected' : 'Choose File'}
                                            <input 
                                                type="file" 
                                                accept="image/*,application/pdf"
                                                onChange={(e) => setQuestionPaper(e.target.files[0] || null)} 
                                                className="hidden" 
                                            />
                                        </label>
                                    </div>

                                    {/* Answer Key */}
                                    <div className="space-y-1">
                                        <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400">Answer Key</label>
                                        <label className={`block border border-slate-200 rounded-xl p-3 text-center cursor-pointer hover:bg-slate-50 transition-colors text-xs font-semibold ${answerKey ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white text-slate-600'}`}>
                                            <span className="material-symbols-outlined text-sm align-middle mr-1">{answerKey ? 'check_circle' : 'upload_file'}</span>
                                            {answerKey ? 'Selected' : 'Choose File'}
                                            <input 
                                                type="file" 
                                                accept="image/*,application/pdf"
                                                onChange={(e) => setAnswerKey(e.target.files[0] || null)} 
                                                className="hidden" 
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button 
                                type="submit" 
                                disabled={submitLoading}
                                className="w-full bg-blue-600 text-white py-4 rounded-xl font-headline text-base font-bold shadow-xl shadow-blue-600/10 flex items-center justify-center gap-2 active:scale-[0.98] disabled:bg-slate-300 disabled:shadow-none transition-all"
                            >
                                {submitLoading ? (
                                    <>
                                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        Start AI Grading
                                        <span className="material-symbols-outlined text-base">psychology</span>
                                    </>
                                )}
                            </button>

                        </form>
                    </div>

                    {/* RIGHT PANEL: History & Status Tracker */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h2 className="font-headline text-2xl font-bold tracking-tight text-slate-900">Evaluation Pipeline</h2>
                                <p className="text-slate-400 text-xs mt-0.5">Real-time progress and history of submitted papers.</p>
                            </div>
                            <button 
                                onClick={() => {
                                    dispatch(fetchPaperMasterDataRequest());
                                    dispatch(fetchPaperSubmissionsRequest());
                                }} 
                                className="w-10 h-10 bg-white border border-slate-100 hover:bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 shadow-sm transition-all"
                            >
                                <span className="material-symbols-outlined text-xl">refresh</span>
                            </button>
                        </div>

                        {loading && submissions.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-20 bg-white rounded-3xl border border-slate-100 shadow-sm text-slate-400 space-y-3">
                                <span className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
                                <p className="text-xs">Loading grading records...</p>
                            </div>
                        ) : submissions.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-20 bg-white rounded-3xl border border-slate-100 shadow-sm text-center text-slate-400 space-y-4">
                                <span className="material-symbols-outlined text-5xl text-slate-300">history_edu</span>
                                <div>
                                    <h4 className="font-bold text-slate-700 text-sm">No submissions yet</h4>
                                    <p className="text-xs text-slate-400 mt-1 max-w-xs">Upload clicked pictures of handwritten papers on the left to trigger the AI evaluator.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {submissions.map(sub => (
                                    <div 
                                        key={sub.id} 
                                        onClick={() => setSelectedReport(sub)}
                                        className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all cursor-pointer flex items-center justify-between group"
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Status Badge Icon */}
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${
                                                sub.status === 'COMPLETED' ? 'bg-green-50 text-green-600' :
                                                sub.status === 'PROCESSING' || sub.status === 'PENDING' ? 'bg-amber-50 text-amber-600' :
                                                'bg-red-50 text-red-600'
                                            }`}>
                                                {sub.status === 'COMPLETED' ? (
                                                    <span className="text-lg font-headline font-black">
                                                        {sub.marksObtained ? Math.round(sub.marksObtained) : 0}
                                                    </span>
                                                ) : sub.status === 'FAILED' ? (
                                                    <span className="material-symbols-outlined text-xl">error</span>
                                                ) : (
                                                    <span className="w-5 h-5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></span>
                                                )}
                                            </div>

                                            <div>
                                                <h4 className="font-headline font-bold text-slate-900 text-base leading-tight group-hover:text-blue-600 transition-colors">
                                                    {sub.student?.firstName} {sub.student?.lastName}
                                                </h4>
                                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-400 text-[10px] font-semibold uppercase tracking-wider mt-1.5">
                                                    <span>{sub.course?.courseName || 'General'}</span>
                                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                                    <span>{sub.examType}</span>
                                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                                    <span>{new Date(sub.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {/* Status Indicator */}
                                            <span className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full border ${getStatusStyle(sub.status)}`}>
                                                {sub.status}
                                            </span>
                                            <span className="material-symbols-outlined text-slate-300 group-hover:text-slate-500 transition-colors">chevron_right</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>

                <LecturerNavBar />
            </div>

            {/* MODAL: Premium Grading Report Detail Overlay */}
            {selectedReport && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-end animate-fade-in">
                    <div className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col animate-slide-in relative">
                        
                        {/* Modal Header */}
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                            <div>
                                <span className={`px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-wider rounded-full border ${getStatusStyle(selectedReport.status)}`}>
                                    {selectedReport.status}
                                </span>
                                <h3 className="font-headline text-xl font-black text-slate-900 mt-1">
                                    {selectedReport.student?.firstName} {selectedReport.student?.lastName}
                                </h3>
                                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mt-0.5">
                                    {selectedReport.course?.courseName} &bull; {selectedReport.examType}
                                </p>
                            </div>
                            
                            <button 
                                onClick={() => setSelectedReport(null)}
                                className="w-10 h-10 bg-white border border-slate-200 hover:bg-slate-100 rounded-full flex items-center justify-center text-slate-600 transition-all"
                            >
                                <span className="material-symbols-outlined text-lg">close</span>
                            </button>
                        </div>

                        {/* Modal Tabs */}
                        {selectedReport.status === 'COMPLETED' && (
                            <div className="flex border-b border-slate-100 px-6">
                                <button 
                                    onClick={() => setActiveReportTab('scores')}
                                    className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${activeReportTab === 'scores' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                                >
                                    Score Sheet
                                </button>
                                <button 
                                    onClick={() => setActiveReportTab('ocr')}
                                    className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${activeReportTab === 'ocr' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                                >
                                    Scans & OCR Text
                                </button>
                            </div>
                        )}

                        {/* Modal Body */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            
                            {/* If still processing */}
                            {(selectedReport.status === 'PENDING' || selectedReport.status === 'PROCESSING') && (
                                <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                                    <div className="relative w-24 h-24 flex items-center justify-center">
                                        <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                                        <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                        <span className="material-symbols-outlined text-4xl text-blue-600 animate-pulse">psychology</span>
                                    </div>
                                    <div className="max-w-sm space-y-2">
                                        <h4 className="font-bold text-slate-800 text-base">Grading script in progress...</h4>
                                        <p className="text-xs text-slate-400">{selectedReport.overallFeedback}</p>
                                    </div>

                                    {/* Simulated Stepper */}
                                    <div className="w-full max-w-md pt-6 flex justify-between items-center text-[10px] font-bold text-slate-400">
                                        <div className="flex flex-col items-center gap-1.5 text-blue-600">
                                            <span className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-[10px]">1</span>
                                            <span>UPLOADING</span>
                                        </div>
                                        <div className="flex-1 h-0.5 bg-slate-100 mx-2 mb-4">
                                            <div className="h-full bg-blue-600 w-full"></div>
                                        </div>
                                        <div className={`flex flex-col items-center gap-1.5 ${selectedReport.status === 'PROCESSING' ? 'text-blue-600' : ''}`}>
                                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${selectedReport.status === 'PROCESSING' ? 'bg-blue-100' : 'bg-slate-100'}`}>2</span>
                                            <span>OCR SCANS</span>
                                        </div>
                                        <div className="flex-1 h-0.5 bg-slate-100 mx-2 mb-4">
                                            <div className={`h-full bg-blue-600 transition-all ${selectedReport.status === 'PROCESSING' ? 'w-1/2' : 'w-0'}`}></div>
                                        </div>
                                        <div className="flex flex-col items-center gap-1.5">
                                            <span className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center text-[10px]">3</span>
                                            <span>AI EVALUATION</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* If failed */}
                            {selectedReport.status === 'FAILED' && (
                                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                                    <span className="material-symbols-outlined text-5xl text-red-500">error_outline</span>
                                    <div className="max-w-sm">
                                        <h4 className="font-bold text-slate-800 text-base">Grading Process Failed</h4>
                                        <p className="text-xs text-red-500 mt-2 bg-red-50 p-4 rounded-xl border border-red-100">{selectedReport.overallFeedback}</p>
                                        <p className="text-[10px] text-slate-400 mt-3">Please try re-uploading the script images. Ensure they are clear and readable.</p>
                                    </div>
                                </div>
                            )}

                            {/* Completed report details */}
                            {selectedReport.status === 'COMPLETED' && activeReportTab === 'scores' && (
                                <div className="space-y-6">
                                    
                                    {/* Overall Dashboard Stat Card */}
                                    <div className="bg-slate-900 text-white rounded-3xl p-6 relative overflow-hidden shadow-lg flex items-center justify-between">
                                        <div className="space-y-2 z-10">
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Total Marks Awarded</span>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-5xl font-black font-headline tracking-tighter">
                                                    {selectedReport.marksObtained}
                                                </span>
                                                <span className="text-slate-400 text-lg">/ {selectedReport.maxScore}</span>
                                            </div>
                                            <p className="text-xs text-slate-300 font-medium max-w-md pt-2 leading-relaxed">
                                                {selectedReport.overallFeedback}
                                            </p>
                                        </div>
                                        <div className="w-24 h-24 rounded-full border-[10px] border-blue-500/20 border-t-blue-500 flex items-center justify-center text-lg font-black font-headline z-10">
                                            {Math.round((selectedReport.marksObtained / selectedReport.maxScore) * 100)}%
                                        </div>
                                        <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-blue-600/10 rounded-full blur-2xl"></div>
                                    </div>

                                    {/* Question Breakdown */}
                                    <div className="space-y-4">
                                        <h4 className="text-slate-900 font-headline text-base font-black">Question-by-Question Grading</h4>
                                        <div className="space-y-3">
                                            {selectedReport.questions?.map(q => (
                                                <div key={q.id} className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 transition-all space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <h5 className="font-headline font-bold text-slate-900 text-sm">
                                                            Question {q.questionNumber}
                                                        </h5>
                                                        <span className="text-xs font-bold text-blue-600 bg-blue-50/80 px-2.5 py-1 rounded-lg">
                                                            {q.marksObtained} / {q.maxScore}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-500 leading-relaxed font-body">
                                                        {q.feedback}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            )}

                            {/* Completed OCR Details tab */}
                            {selectedReport.status === 'COMPLETED' && activeReportTab === 'ocr' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[480px]">
                                    
                                    {/* Left: Thumbnail Selector + Scanned Image Preview */}
                                    <div className="space-y-3 flex flex-col">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Scanned Script Pages</label>
                                        
                                        {/* Image view */}
                                        <div className="flex-1 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 relative">
                                            {selectedReport.pages && selectedReport.pages[selectedOcrPage] && (
                                                <img 
                                                    src={selectedReport.pages[selectedOcrPage].imageUrl} 
                                                    alt="Page Script" 
                                                    className="w-full h-full object-contain" 
                                                />
                                            )}
                                        </div>

                                        {/* Pagination indicator */}
                                        <div className="flex gap-2 justify-center overflow-x-auto py-1">
                                            {selectedReport.pages?.map((p, idx) => (
                                                <button
                                                    key={p.id}
                                                    onClick={() => setSelectedOcrPage(idx)}
                                                    className={`w-8 h-8 rounded-lg text-xs font-bold border transition-all ${selectedOcrPage === idx ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-500 border-slate-200'}`}
                                                >
                                                    P{idx + 1}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right: AI OCR Extract Display */}
                                    <div className="flex flex-col space-y-3">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">AI Handwritten Text Extraction</label>
                                        <div className="flex-1 bg-slate-900 text-slate-200 rounded-2xl p-4 font-mono text-[11px] leading-relaxed overflow-y-auto border border-slate-800 shadow-inner">
                                            {selectedReport.pages && selectedReport.pages[selectedOcrPage] ? (
                                                <pre className="whitespace-pre-wrap font-body">
                                                    {selectedReport.pages[selectedOcrPage].ocrText}
                                                </pre>
                                            ) : (
                                                <p className="text-slate-500 text-center pt-20">No OCR text available</p>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            )}

                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50 rounded-b-2xl">
                            <button 
                                onClick={() => setSelectedReport(null)}
                                className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
                            >
                                Close Report
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};

export default LecturerPapers;
