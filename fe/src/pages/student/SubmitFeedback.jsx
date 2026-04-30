import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubmitFeedback = () => {
    const navigate = useNavigate();
    const [feedbackTarget, setFeedbackTarget] = useState('teacher'); // 'teacher' or 'campus'

    return (
        <div className="bg-surface text-on-surface min-h-screen">
            {/* TopAppBar */}
            <header className="bg-[#f7f9fb] dark:bg-slate-950 docked full-width top-0 z-50 sticky shadow-none">
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

            <main className="max-w-xl mx-auto px-5 py-6 pb-12">
                {/* Editorial Header Section */}
                <div className="mb-8">
                    <h2 className="text-3xl font-extrabold text-on-surface tracking-tight mb-2">Academic Atelier</h2>
                    <p className="text-body-sm text-on-surface-variant max-w-[85%]">
                        Your insights help us refine the learning environment. Share your thoughts directly with the {feedbackTarget === 'teacher' ? 'faculty' : 'campus management'}.
                    </p>
                </div>

                {/* Feedback Form Container (Focus Plate) */}
                <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0_20px_40px_rgba(42,52,57,0.06)] border border-outline-variant/10">
                    {/* Feedback Type Toggle */}
                    <div className="mb-8">
                        <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4 px-1">Feedback Target</label>
                        <div className="bg-surface-container-low p-1 rounded-xl flex gap-1">
                            <button 
                                onClick={() => setFeedbackTarget('teacher')}
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

                    {/* Recipient Selection */}
                    <div className="mb-6 space-y-2">
                        <label className="block text-sm font-semibold text-on-surface px-1" htmlFor="recipient">
                            {feedbackTarget === 'teacher' ? 'Select Faculty Member' : 'Campus Department/Facility'}
                        </label>
                        <div className="relative">
                            <select 
                                className="w-full h-14 bg-surface-container-high border-none rounded-xl px-4 text-on-surface appearance-none focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all" 
                                id="recipient"
                            >
                                {feedbackTarget === 'teacher' ? (
                                    <>
                                        <option value="dr-thorne">Dr. Aris Thorne (Advanced Physics)</option>
                                        <option value="ms-bell">Ms. Clara Bell (Modern Literature)</option>
                                        <option value="prof-chen">Prof. Julian Chen (Digital Ethics)</option>
                                        <option value="dr-marcus">Dr. Elena Marcus (Organic Chemistry)</option>
                                    </>
                                ) : (
                                    <>
                                        <option value="it-network">IT & Network</option>
                                        <option value="electricity">Electricity</option>
                                        <option value="maintenance">Maintenance</option>
                                        <option value="library">Library</option>
                                        <option value="cafeteria">Cafeteria</option>
                                        <option value="sports">Sports</option>
                                    </>
                                )}
                            </select>
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline">keyboard_arrow_down</span>
                        </div>
                    </div>

                    {/* Issue Category (Campus Mode only) */}
                    {feedbackTarget === 'campus' && (
                        <div className="mb-6 space-y-3">
                            <label className="block text-sm font-semibold text-on-surface px-1">Issue Category</label>
                            <div className="flex flex-wrap gap-2">
                                <button className="px-4 py-2 rounded-full border border-outline-variant/30 text-xs font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors">Network Outage</button>
                                <button className="px-4 py-2 rounded-full border border-outline-variant/30 text-xs font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors">Power Failure</button>
                                <button className="px-4 py-2 rounded-full border border-outline-variant/30 text-xs font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors">General Repair</button>
                            </div>
                        </div>
                    )}

                    {/* Subject Input */}
                    <div className="mb-6 space-y-2">
                        <label className="block text-sm font-semibold text-on-surface px-1" htmlFor="subject">Subject</label>
                        <input 
                            className="w-full h-14 bg-surface-container-high border-none rounded-xl px-4 text-on-surface placeholder:text-outline-variant/60 focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all" 
                            id="subject" 
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
                            placeholder={feedbackTarget === 'teacher' ? "Type your feedback here..." : "Describe the maintenance issue or facility concern in detail..."} 
                            rows="6"
                        ></textarea>
                    </div>

                    {/* Attachment Option */}
                    <div className="mb-8">
                        <button className="flex items-center gap-2 text-primary text-sm font-semibold hover:underline group">
                            <span className="material-symbols-outlined text-lg">attach_file</span>
                            Attach photo or document
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button className="w-full h-14 bg-gradient-to-br from-primary to-primary-dim text-on-primary rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform duration-200">
                        Send Feedback
                    </button>
                </div>

                {/* Footer / Context Note */}
                <p className="mt-8 text-center text-xs text-outline-variant/70 px-8 leading-relaxed">
                    All remarks are processed through the EduTrack Quality Assurance pipeline to ensure meaningful academic improvement.
                </p>
            </main>

            {/* Decorative Elements */}
            <div className="fixed top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
            <div className="fixed bottom-40 -left-20 w-48 h-48 bg-tertiary-container/10 rounded-full blur-3xl -z-10"></div>
        </div>
    );
};

export default SubmitFeedback;
