import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import StudentSidebar from '../../components/StudentSidebar';
import { fetchStaffListRequest, submitRemarkRequest } from '../../store/actions/studentDashboardActions';

const SubmitFeedback = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { staffList, submission } = useSelector(state => state.studentDashboard);
    
    const [feedbackTarget, setFeedbackTarget] = useState('teacher'); // 'teacher' or 'campus'
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [formData, setFormData] = useState({
        targetId: '',
        targetName: '',
        category: 'GENERAL',
        priority: 'LOW',
        subject: '',
        content: ''
    });

    useEffect(() => {
        dispatch(fetchStaffListRequest());
    }, [dispatch]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id === 'message' ? 'content' : id]: value
        }));
    };

    const handleCategoryClick = (category) => {
        setFormData(prev => ({ ...prev, category }));
    };

    const handlePriorityClick = (priority) => {
        setFormData(prev => ({ ...prev, priority }));
    };

    const selectStaff = (staff) => {
        setFormData(prev => ({
            ...prev,
            targetId: staff.id,
            targetName: staff.fullName
        }));
        setIsDropdownOpen(false);
        setSearchTerm('');
    };

    const filteredStaff = staffList.data.filter(staff => 
        staff.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = () => {
        const payload = {
            targetType: feedbackTarget === 'teacher' ? 'STAFF' : 'CAMPUS',
            targetId: feedbackTarget === 'teacher' ? formData.targetId : null,
            category: feedbackTarget === 'teacher' ? 'ACADEMIC' : formData.category,
            priority: formData.priority,
            subject: formData.subject,
            content: formData.content
        };

        if (!payload.subject || !payload.content) {
            alert('Please fill in both subject and content.');
            return;
        }

        if (feedbackTarget === 'teacher' && !payload.targetId) {
            alert('Please select a faculty member.');
            return;
        }

        dispatch(submitRemarkRequest(payload, () => {
            setShowSuccessModal(true);
            setTimeout(() => {
                navigate('/student/dashboard');
            }, 2500);
        }));
    };

    return (
        <div className="bg-surface text-on-surface min-h-screen">
            <StudentSidebar />
            <div className="md:pl-64">
                {/* TopAppBar */}
                <header className="bg-[#f7f9fb]/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100 dark:border-slate-800 md:w-[calc(100%-16rem)]">
                    <div className="flex items-center justify-between px-6 h-16 w-full">
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => navigate('/student/dashboard')}
                                className="transition-all duration-200 ease-in-out active:scale-95 text-blue-700 dark:text-blue-400"
                            >
                                <span className="material-symbols-outlined">arrow_back</span>
                            </button>
                            <h1 className="font-manrope font-bold text-lg tracking-tight text-slate-900 dark:text-slate-50">Submit Feedback</h1>
                        </div>
                        <div className="flex items-center">
                            <span className="material-symbols-outlined text-slate-500">more_vert</span>
                        </div>
                    </div>
                </header>

                <main className="max-w-xl mx-auto px-5 py-8 pb-12">
                    {/* Editorial Header Section */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-extrabold text-on-surface tracking-tight mb-2">Academic Atelier</h2>
                        <p className="text-body-sm text-on-surface-variant max-w-[85%]">
                            Your insights help us refine the learning environment. Share your thoughts directly with the {feedbackTarget === 'teacher' ? 'faculty' : 'campus management'}.
                        </p>
                    </div>

                    {/* Feedback Form Container */}
                    <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0_20px_40px_rgba(42,52,57,0.06)] border border-outline-variant/10">
                        {/* Feedback Type Toggle */}
                        <div className="mb-8">
                            <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4 px-1">Feedback Target</label>
                            <div className="bg-surface-container-low p-1 rounded-xl flex gap-1">
                                <button 
                                    onClick={() => { setFeedbackTarget('teacher'); setFormData(p => ({...p, targetId: '', targetName: ''})); }}
                                    className={`flex-1 py-2.5 px-4 rounded-lg text-sm transition-all duration-200 ${
                                        feedbackTarget === 'teacher' 
                                        ? 'bg-surface-container-lowest text-primary font-bold shadow-sm' 
                                        : 'text-on-surface-variant font-medium hover:bg-surface-container-high'
                                    }`}
                                >
                                    Teacher
                                </button>
                                <button 
                                    onClick={() => setFeedbackTarget('campus')}
                                    className={`flex-1 py-2.5 px-4 rounded-lg text-sm transition-all duration-200 ${
                                        feedbackTarget === 'campus' 
                                        ? 'bg-surface-container-lowest text-primary font-bold shadow-sm' 
                                        : 'text-on-surface-variant font-medium hover:bg-surface-container-high'
                                    }`}
                                >
                                    Campus
                                </button>
                            </div>
                        </div>

                        {/* Recipient Selection (Searchable Dropdown for Teacher Only) */}
                        {feedbackTarget === 'teacher' && (
                            <div className="mb-6 space-y-2">
                                <label className="block text-sm font-semibold text-on-surface px-1">
                                    Select Faculty Member
                                </label>
                                
                                <div className="relative" ref={dropdownRef}>
                                    <div 
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="w-full h-14 bg-surface-container-high rounded-xl px-4 flex items-center justify-between cursor-pointer hover:bg-surface-container-highest transition-all border border-transparent focus-within:border-primary/30"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`material-symbols-outlined text-[20px] ${formData.targetName ? 'text-primary' : 'text-outline'}`}>
                                                {formData.targetName ? 'person_check' : 'person_search'}
                                            </span>
                                            <span className={`text-sm ${formData.targetName ? 'text-on-surface font-semibold' : 'text-outline-variant/60'}`}>
                                                {formData.targetName || "Find faculty by name..."}
                                            </span>
                                        </div>
                                        <span className={`material-symbols-outlined text-outline transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}>expand_more</span>
                                    </div>

                                    {isDropdownOpen && (
                                        <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] z-50 overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-4 duration-300">
                                            <div className="p-3 bg-surface-container-low/50 border-b border-outline-variant/10">
                                                <div className="relative group">
                                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary/60 text-[18px] group-focus-within:text-primary transition-colors">search</span>
                                                    <input 
                                                        autoFocus
                                                        type="text" 
                                                        className="w-full h-11 bg-surface-container-lowest border border-outline-variant/20 rounded-xl pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-outline/50"
                                                        placeholder="Search name, role, or department..."
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="max-h-60 overflow-y-auto py-2 custom-scrollbar">
                                                {filteredStaff.length > 0 ? (
                                                    filteredStaff.map(staff => (
                                                        <div 
                                                            key={staff.id}
                                                            onClick={() => selectStaff(staff)}
                                                            className={`px-4 py-3 mx-2 rounded-xl cursor-pointer flex flex-col gap-0.5 transition-all duration-200 group ${
                                                                formData.targetId === staff.id ? 'bg-primary/10' : 'hover:bg-surface-container-high'
                                                            }`}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <span className={`text-sm font-bold ${formData.targetId === staff.id ? 'text-primary' : 'text-on-surface'}`}>
                                                                    {staff.fullName}
                                                                </span>
                                                                {formData.targetId === staff.id && (
                                                                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-2 text-[10px] text-on-surface-variant font-bold uppercase tracking-wider opacity-60">
                                                                <span className={formData.targetId === staff.id ? 'text-primary/70' : ''}>{staff.role}</span>
                                                                <span className="w-1 h-1 bg-outline-variant/40 rounded-full"></span>
                                                                <span>{staff.departmentName}</span>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="px-4 py-12 text-center flex flex-col items-center gap-2">
                                                        <span className="material-symbols-outlined text-outline/30 text-3xl">person_off</span>
                                                        <p className="text-sm text-on-surface-variant/60 font-medium italic">
                                                            No faculty found matching "{searchTerm}"
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Issue Category (Campus Mode only) */}
                        {feedbackTarget === 'campus' && (
                            <div className="mb-6 space-y-3">
                                <label className="block text-sm font-semibold text-on-surface px-1">Issue Category</label>
                                <div className="flex flex-wrap gap-2">
                                    {['MAINTENANCE', 'IT', 'TRANSPORT', 'GENERAL', 'OTHERS'].map(cat => (
                                        <button 
                                            key={cat}
                                            onClick={() => handleCategoryClick(cat)}
                                            className={`px-4 py-2 rounded-full border transition-all duration-200 text-xs font-medium uppercase tracking-wide ${
                                                formData.category === cat 
                                                ? 'bg-primary text-on-primary border-primary shadow-md scale-105' 
                                                : 'border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high'
                                            }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Remark Priority */}
                        <div className="mb-6 space-y-3">
                            <label className="block text-sm font-semibold text-on-surface px-1">Priority Level</label>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { id: 'LOW', label: 'Low' },
                                    { id: 'MEDIUM', label: 'Medium' },
                                    { id: 'HIGH', label: 'High' }
                                ].map(prio => (
                                    <button 
                                        key={prio.id}
                                        onClick={() => handlePriorityClick(prio.id)}
                                        className={`px-5 py-2.5 rounded-full border transition-all duration-200 text-xs font-bold uppercase tracking-wider ${
                                            formData.priority === prio.id 
                                            ? 'bg-primary/10 text-primary border-primary/50 shadow-sm scale-105' 
                                            : 'border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high'
                                        }`}
                                    >
                                        {prio.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Subject Input */}
                        <div className="mb-6 space-y-2">
                            <label className="block text-sm font-semibold text-on-surface px-1" htmlFor="subject">Subject</label>
                            <input 
                                className="w-full h-14 bg-surface-container-high border-none rounded-xl px-4 text-on-surface placeholder:text-outline-variant/60 focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all" 
                                id="subject" 
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder={feedbackTarget === 'teacher' ? "What is this regarding?" : "e.g., WiFi connection issue in Hall B"} 
                                type="text"
                            />
                        </div>

                        {/* Message Field */}
                        <div className="mb-6 space-y-2">
                            <label className="block text-sm font-semibold text-on-surface px-1" htmlFor="message">Detailed Remarks</label>
                            <textarea 
                                className="w-full bg-surface-container-high border-none rounded-xl p-4 text-on-surface placeholder:text-outline-variant/60 focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all resize-none" 
                                id="message" 
                                value={formData.content}
                                onChange={handleChange}
                                placeholder={feedbackTarget === 'teacher' ? "Type your feedback here..." : "Describe the maintenance issue or facility concern in detail..."} 
                                rows="6"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button 
                            onClick={handleSubmit}
                            disabled={submission.loading}
                            className="w-full h-14 bg-gradient-to-br from-primary to-primary-dim text-on-primary rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform duration-200 disabled:opacity-50"
                        >
                            {submission.loading ? 'Sending...' : 'Send Feedback'}
                        </button>
                        {submission.error && <p className="text-error text-center mt-2 text-sm">{submission.error}</p>}
                    </div>

                    {/* Footer / Context Note */}
                    <p className="mt-8 text-center text-xs text-outline-variant/70 px-8 leading-relaxed">
                        All remarks are processed through the EduTrack Quality Assurance pipeline to ensure meaningful academic improvement.
                    </p>
                </main>

                {/* Success Modal */}
                {showSuccessModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
                        <div className="bg-surface-container-lowest rounded-3xl p-8 max-w-sm w-full shadow-[0_32px_64px_rgba(0,0,0,0.2)] border border-outline-variant/20 flex flex-col items-center text-center animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
                            <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
                                <span className="material-symbols-outlined text-green-600 dark:text-green-400 !text-[48px] font-bold">check</span>
                            </div>
                            <h3 className="text-2xl font-extrabold text-on-surface mb-2">Remark Submitted</h3>
                            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                                Your feedback has been securely transmitted. Redirecting you to the dashboard...
                            </p>
                            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 animate-[progress_2.5s_linear_forwards]"></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Decorative Elements */}
                <div className="fixed top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
                <div className="fixed bottom-40 -left-20 w-48 h-48 bg-tertiary-container/10 rounded-full blur-3xl -z-10"></div>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes progress {
                    from { width: 0%; }
                    to { width: 100%; }
                }
            `}} />
        </div>
    );
};

export default SubmitFeedback;
