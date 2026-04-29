import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentRemarks = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-surface text-on-surface antialiased pb-24 md:pb-8 font-body min-h-screen" style={{ minHeight: 'max(884px, 100dvh)' }}>
            {/* TopAppBar */}
            <header className="sticky top-0 w-full z-50 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img alt="student profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpsvuMcvBD_soJ9wlesX-Epemify8XgF9QGCIeTJSD3Pe6X_GG22KZFtIQ6lQffzBg2e_Hga-ZW2Azig4iAhU-GhNJqHz72DOzVfFouhhM33165N2IAyBP4VdWmR5N2Y6NIDkOXfEhtgDznuNuu5kJeTaZyv-DmfXRUuZGRDWN2lo2RJov4LRxl5hipAI9j9SvgegsyvBL_xdKM9dxk-64h-Y-07aBHWKgWrcd9axVXk5VaFgepUisY0EZxkPpqlwMRmR6uGDEUA0" />
                    </div>
                    <span className="text-lg font-bold text-slate-900 tracking-tight font-manrope">Atelier</span>
                </div>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 md:bg-transparent md:hover:bg-slate-200/50 transition-colors scale-95 active:transition-transform">
                    <span className="material-symbols-outlined text-slate-500">notifications</span>
                </button>
            </header>

            <main className="px-6 w-full max-w-7xl mx-auto space-y-8 pt-6 md:pt-10">
                {/* Header Section */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-[2px] bg-primary"></div>
                        <p className="text-primary font-bold text-[10px] tracking-widest uppercase">Progress Journals</p>
                    </div>
                    <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface leading-tight">Remarks & <br className="md:hidden" />Guidance</h1>
                    <p className="text-on-surface-variant text-sm md:text-base font-medium leading-relaxed max-w-2xl pt-2">
                        A curated view of feedback from your dedicated circle of educators and guardians. Every note is a step toward mastery.
                    </p>
                </section>

                {/* Remarks List */}
                <div className="space-y-6">
                    {/* Latest Remark Card */}
                    <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-[0px_10px_20px_rgba(0,0,0,0.02)] relative overflow-hidden">
                        {/* Decorative background shape */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full pointer-events-none"></div>

                        <div className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-[9px] font-bold tracking-widest uppercase mb-4">
                            Latest Remark
                        </div>

                        <h2 className="text-xl font-bold text-on-surface">Staff Insight</h2>
                        <p className="text-xs text-on-surface-variant mt-1 mb-5">October 24, 2023</p>

                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center">
                                <span className="material-symbols-outlined text-slate-400">person</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-on-surface">Dr. Helene Vance</p>
                                <p className="text-[10px] text-on-surface-variant font-medium">Senior Faculty</p>
                            </div>
                        </div>

                        <p className="text-sm italic text-on-surface-variant mb-6 leading-relaxed">
                            "The analytical depth shown in the recent Capstone proposal exceeds the expected level for this term. Your ability to synthesize complex theories into actionable design principles is becoming a signature strength."
                        </p>

                        <div className="bg-surface-container-low rounded-2xl p-4">
                            <div className="flex items-center gap-2 mb-2 text-primary">
                                <span className="material-symbols-outlined text-sm">trending_up</span>
                                <span className="text-[11px] font-bold uppercase tracking-wider">Next Steps</span>
                            </div>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                                To further refine this, I suggest exploring the intersection of ergonomics and digital interfaces in Chapter 3. Schedule a review session for the high-fidelity prototypes by next Thursday.
                            </p>
                        </div>
                    </div>

                    {/* Guardian Note 1 */}
                    <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-[0px_10px_20px_rgba(0,0,0,0.02)]">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-slate-500">family_home</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-on-surface text-sm">Guardian Note</h3>
                                    <p className="text-[10px] text-on-surface-variant">October 20, 2023</p>
                                </div>
                            </div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Archive #042</span>
                        </div>

                        <p className="text-sm text-on-surface-variant mb-5 leading-relaxed">
                            We've noticed a significant increase in study hours at home. The dedication to the studio projects is evident in the late-night sketching sessions.
                        </p>

                        <div className="bg-surface-container-low rounded-2xl p-4">
                            <div className="mb-2 text-slate-500">
                                <span className="text-[10px] font-bold uppercase tracking-widest">Improvement Notes</span>
                            </div>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                                Maintaining a healthy sleep cycle is crucial. We suggest setting a "hard-stop" time for creative work to avoid burnout before the mid-term reviews.
                            </p>
                        </div>
                    </div>

                    {/* Academic Staff */}
                    <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-[0px_10px_20px_rgba(0,0,0,0.02)] border-l-4 border-l-blue-500 relative">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-blue-500">workspace_premium</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-on-surface text-sm">Academic Staff</h3>
                                    <p className="text-[10px] text-on-surface-variant">October 18, 2023</p>
                                </div>
                            </div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Review Cycle III</span>
                        </div>

                        <p className="text-sm text-on-surface-variant mb-5 leading-relaxed">
                            Excellent collaboration during the group workshop. Your peer feedback was constructive and demonstrated a high level of empathy and professional maturity.
                        </p>

                        <div className="bg-surface-container-low rounded-2xl p-4">
                            <div className="mb-2 text-blue-500">
                                <span className="text-[10px] font-bold uppercase tracking-widest">Next Steps</span>
                            </div>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                                Document these collaborative sessions for your leadership portfolio. Focus on how you mediated conflicting design directions within the team.
                            </p>
                        </div>
                    </div>

                    {/* Guardian Note 2 */}
                    <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-[0px_10px_20px_rgba(0,0,0,0.02)] relative">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                <span className="material-symbols-outlined text-slate-500">home</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-on-surface text-sm">Guardian Note</h3>
                                <p className="text-[10px] text-on-surface-variant">October 12, 2023</p>
                            </div>
                        </div>

                        <p className="text-sm text-on-surface-variant mb-5 leading-relaxed">
                            Really impressed with the grade in Advanced Materials. The extra tutoring sessions seem to be paying off well.
                        </p>

                        <div className="bg-surface-container-low rounded-2xl p-4">
                            <div className="mb-2 text-slate-500">
                                <span className="text-[10px] font-bold uppercase tracking-widest">Improvement Notes</span>
                            </div>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                                Continue the weekly summary sessions to ensure long-term retention of the material properties before the practical exam.
                            </p>
                        </div>
                    </div>

                    {/* Studio Mentor */}
                    <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-[0px_10px_20px_rgba(0,0,0,0.02)] border-l-4 border-l-purple-500 relative">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                                <span className="material-symbols-outlined text-purple-500">edit</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-on-surface text-sm">Studio Mentor</h3>
                                <p className="text-[10px] text-on-surface-variant">October 08, 2023</p>
                            </div>
                        </div>

                        <p className="text-sm text-on-surface-variant mb-5 leading-relaxed">
                            Technical precision in your drafting has improved significantly. However, there's a slight hesitation in the experimental phases of the design cycle.
                        </p>

                        <div className="bg-surface-container-low rounded-2xl p-4">
                            <div className="mb-2 text-slate-500">
                                <span className="text-[10px] font-bold uppercase tracking-widest">Next Steps</span>
                            </div>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                                Take more risks in the ideation phase. Dedicate one sketchbook solely to "failed" ideas to embrace the messy side of the creative process.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* BottomNavBar (Mobile only) */}
            <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 shadow-[0_-10px_40px_rgba(42,52,57,0.06)] z-50 rounded-t-[24px] md:hidden">
                <div
                    onClick={() => navigate('/student/dashboard')}
                    className="flex flex-col items-center justify-center text-slate-400 px-5 py-2 hover:text-blue-600 duration-300 ease-out transform active:scale-90 cursor-pointer"
                >
                    <span className="material-symbols-outlined mb-1">home</span>
                    <span className="font-manrope text-[10px] font-semibold uppercase tracking-widest">Home</span>
                </div>
                <div className="flex flex-col items-center justify-center text-slate-400 px-5 py-2 hover:text-blue-600 duration-300 ease-out transform active:scale-90 cursor-pointer">
                    <span className="material-symbols-outlined mb-1">school</span>
                    <span className="font-manrope text-[10px] font-semibold uppercase tracking-widest">Academics</span>
                </div>
                <div className="flex flex-col items-center justify-center text-blue-700 bg-blue-50 dark:bg-blue-900/30 rounded-2xl px-5 py-2 duration-300 ease-out transform scale-105 cursor-pointer">
                    <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>reviews</span>
                    <span className="font-manrope text-[10px] font-semibold uppercase tracking-widest">Remarks</span>
                </div>
                <div className="flex flex-col items-center justify-center text-slate-400 px-5 py-2 hover:text-blue-600 duration-300 ease-out transform active:scale-90 cursor-pointer">
                    <span className="material-symbols-outlined mb-1">person</span>
                    <span className="font-manrope text-[10px] font-semibold uppercase tracking-widest">Profile</span>
                </div>
            </nav>
        </div>
    );
};

export default StudentRemarks;
