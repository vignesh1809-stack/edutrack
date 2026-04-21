import React from 'react';
import { useNavigate } from 'react-router-dom';

const FacultyProfile = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-surface-container-highest min-h-screen text-on-surface font-body">
            {/* TopAppBar */}
            <header className="bg-[#f7f9fb]/70 dark:bg-slate-900/70 backdrop-blur-xl docked full-width top-0 sticky no-border shadow-[0px_20px_40px_rgba(42,52,57,0.06)] flex items-center justify-between px-6 py-4 w-full z-50">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate('/guardian/faculty-directory')}
                        className="scale-95 active:scale-90 transition-transform duration-200 p-2 hover:bg-surface-container-low rounded-full"
                    >
                        <span className="material-symbols-outlined text-[#3755c3] dark:text-blue-400">arrow_back</span>
                    </button>
                    <h1 className="font-headline font-bold text-xl tracking-tight text-[#2a3439] dark:text-slate-100">Faculty Profile</h1>
                </div>
                <button className="scale-95 active:scale-90 transition-transform duration-200 p-2 hover:bg-surface-container-low rounded-full">
                    <span className="material-symbols-outlined text-[#3755c3] dark:text-blue-400">more_vert</span>
                </button>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Profile Header Section */}
                <section className="flex flex-col items-center mb-10 text-center">
                    <div className="relative mb-6">
                        <div className="w-40 h-40 rounded-full border-4 border-surface-container-lowest shadow-xl overflow-hidden">
                            <img 
                                alt="Dr. Aris Thorne" 
                                className="w-full h-full object-cover" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD__7MsTSkVSg-P9omQpn1uFK3Cs5lR9e9_uojSha2yt65UfQkhp4d2-tBQsd630h3QPvPbBxR5UCNSHk5a6L1HgsAVtr1yOHqVZYFe_9R2TOPTxyPuIH_R9puYyxma6-fYZPJ6Rl5R8BPRXhsV61X9gkwG2LZ1HuEYfR-obp4D_-F9mHtNa7W53WS6CIOxb3Ee_TaWKHibwCxHUmWWyey6MaTOzFNuqjKoHRnrRhOoG2T1H7CJU_B_YR083alEuwXJ-AP9F3Et9FM"
                            />
                        </div>
                        <div className="absolute bottom-1 right-1 bg-primary text-on-primary p-2 rounded-full shadow-lg">
                            <span className="material-symbols-outlined text-sm">verified</span>
                        </div>
                    </div>
                    <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-1 font-headline">Dr. Aris Thorne</h2>
                    <p className="text-on-surface-variant font-medium text-lg">Head of Physics Department</p>
                </section>

                {/* Bento Grid Layout for Details */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Bio Section: Wide Plate */}
                    <div className="md:col-span-12 bg-surface-container-lowest rounded-[24px] p-8 shadow-sm transition-all duration-300 hover:shadow-md">
                        <h3 className="text-primary font-bold text-xs uppercase tracking-widest mb-4">Professional Bio</h3>
                        <p className="text-on-surface-variant leading-relaxed text-lg">
                            Dr. Aris Thorne brings over 15 years of academic excellence to EduTrack. A renowned figure in the global physics community, his research in particle physics has been published in leading scientific journals. He is dedicated to transforming complex theoretical concepts into accessible, engaging learning experiences for the next generation of scientists.
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div className="md:col-span-5 bg-surface-container-lowest rounded-[24px] p-6 shadow-sm flex flex-col justify-between">
                        <div>
                            <h3 className="text-primary font-bold text-xs uppercase tracking-widest mb-6">Contact Information</h3>
                            <div className="space-y-5">
                                <div className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                                        <span className="material-symbols-outlined">mail</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tighter">Email</p>
                                        <p className="font-semibold text-on-surface">a.thorne@edutrack.edu</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                                        <span className="material-symbols-outlined">location_on</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tighter">Office</p>
                                        <p className="font-semibold text-on-surface">Science Building, Room 402</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Academic Background Section */}
                    <div className="md:col-span-7 bg-surface-container-lowest rounded-[24px] p-6 shadow-sm">
                        <h3 className="text-primary font-bold text-xs uppercase tracking-widest mb-6">Academic Background</h3>
                        <div className="space-y-6">
                            <div className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-surface-variant">
                                <div className="absolute left-[-4px] top-1 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-surface-container-lowest"></div>
                                <p className="font-bold text-on-surface">Ph.D. in Theoretical Physics</p>
                                <p className="text-sm text-on-surface-variant font-medium">Massachusetts Institute of Technology (MIT)</p>
                            </div>
                            <div className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-variant">
                                <div className="absolute left-[-4px] top-1 w-2.5 h-2.5 rounded-full bg-surface-dim ring-4 ring-surface-container-lowest"></div>
                                <p className="font-bold text-on-surface">M.Sc. in Physics</p>
                                <p className="text-sm text-on-surface-variant font-medium">Stanford University</p>
                            </div>
                        </div>
                    </div>

                    {/* Subjects Taught Section */}
                    <div className="md:col-span-12 bg-surface-container-lowest rounded-[24px] p-8 shadow-sm">
                        <h3 className="text-primary font-bold text-xs uppercase tracking-widest mb-6">Current Subjects</h3>
                        <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2 bg-tertiary-container text-on-tertiary-container px-5 py-2.5 rounded-full font-semibold text-sm shadow-sm hover:scale-105 transition-transform cursor-default">
                                <span className="material-symbols-outlined text-[18px]">science</span>
                                Quantum Mechanics
                            </div>
                            <div className="flex items-center gap-2 bg-tertiary-container text-on-tertiary-container px-5 py-2.5 rounded-full font-semibold text-sm shadow-sm hover:scale-105 transition-transform cursor-default">
                                <span className="material-symbols-outlined text-[18px]">bolt</span>
                                Electromagnetism
                            </div>
                            <div className="flex items-center gap-2 bg-tertiary-container text-on-tertiary-container px-5 py-2.5 rounded-full font-semibold text-sm shadow-sm hover:scale-105 transition-transform cursor-default">
                                <span className="material-symbols-outlined text-[18px]">speed</span>
                                Advanced Kinematics
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FacultyProfile;
