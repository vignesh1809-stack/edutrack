import React from 'react';
import { useNavigate } from 'react-router-dom';
import GuardianSidebar from '../../components/GuardianSidebar';

const GuardianChat = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-surface font-body text-on-surface flex flex-col h-screen overflow-hidden">
            <GuardianSidebar />
            <div className="md:pl-64 flex flex-col h-full overflow-hidden relative">
                {/* TopAppBar */}
                <header className="fixed top-0 left-0 md:left-64 right-0 z-50 bg-[#f7f9fb]/70 backdrop-blur-md shadow-[0px_20px_40px_rgba(42,52,57,0.06)]">
                    <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto transition-all duration-300 ease-in-out">
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => navigate('/guardian/faculty-directory')}
                                className="hover:bg-slate-100/50 p-2 rounded-full transition-all active:scale-95"
                            >
                                <span className="material-symbols-outlined text-blue-600">arrow_back</span>
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <img 
                                        alt="Dr. Aris Thorne" 
                                        className="w-10 h-10 rounded-full object-cover" 
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW19eJr8iEW8kNg2iYODpYq3MpheYLfzmHkuAlLEyiDczMpECZS9lCBF2gqWNqxqRmRYKnI8I5wx31_0URpw1D0Ogh8JZGgSCKI2rv8v7FOh2WK4OnehVGVOtqqzn6UuFPw9z_2gSSIr_B_RC3Row7csdb9De74fHFZysw-UACu6_QxFjPP1krPfRHSaarrFmHil4PqGkK6KNNqiZaXF4XDgrE6tJzKYzA5pE6OFfUWxT23qWKKHPL5LRby7i44KjPBZIWQC-rRK8"
                                    />
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="font-manrope font-bold text-lg tracking-tight text-on-surface leading-tight">Dr. Aris Thorne</h1>
                                    <span className="text-xs text-slate-500 font-medium">Online</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="hover:bg-slate-100/50 p-2 rounded-full transition-all text-slate-500">
                                <span className="material-symbols-outlined">videocam</span>
                            </button>
                            <button className="hover:bg-slate-100/50 p-2 rounded-full transition-all text-slate-500">
                                <span className="material-symbols-outlined">info</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Message Area */}
                <main className="flex-1 overflow-y-auto pt-24 pb-32 px-6 no-scrollbar">
                    <div className="max-w-3xl mx-auto flex flex-col gap-8">
                        {/* Date Indicator */}
                        <div className="flex justify-center">
                            <span className="bg-surface-container-low text-on-surface-variant px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold">Today, Oct 24</span>
                        </div>

                        {/* Message Inbound */}
                        <div className="flex items-end gap-3 max-w-[85%]">
                            <img 
                                alt="Dr. Aris Thorne" 
                                className="w-8 h-8 rounded-full object-cover" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQg1bur03CStF3auMc2FPV7lUvsMgzgP03F1n6nJAeru5c9LDnmeW5Jz71l5HMRYfg7s0kaaRKrv8-R8FPhJLWWvqxAR2aYhaMIQOK6VuKyxeA2EDImgKkuEX7rhc6z81Ben3n0Oz20fNnR0NvpZQVSBZ4uKYiroPw5iO33xGAJBZ4sIjjAZcv7XdGoQcEU7TW76YA-bh6tIVDJMz4pDCud5V65V32pYO5jR_R7M82AC2OF7DaMPZ4ODXOODm5-Fc6qc3_k9swsHE"
                            />
                            <div className="flex flex-col gap-1">
                                <div className="chat-bubble-in bg-surface-container-lowest p-4 text-on-surface text-sm shadow-sm rounded-[1.5rem_1.5rem_1.5rem_0.25rem]">
                                    Good morning! I wanted to reach out regarding Leo's progress on the Science Fair project. He's shown exceptional initiative this week.
                                </div>
                                <span className="text-[10px] text-on-surface-variant ml-2 font-medium">09:15 AM</span>
                            </div>
                        </div>

                        {/* Message Outbound */}
                        <div className="flex flex-col items-end gap-1 ml-auto max-w-[85%]">
                            <div className="chat-bubble-out p-4 text-on-primary text-sm shadow-md rounded-[1.5rem_1.5rem_0.25rem_1.5rem] bg-gradient-to-br from-primary to-primary-dim">
                                That is wonderful to hear! We've been seeing him work quite late on his plant growth observations at home.
                            </div>
                            <div className="flex items-center gap-1 mr-2">
                                <span className="text-[10px] text-on-surface-variant font-medium">09:18 AM</span>
                                <span className="material-symbols-outlined text-[12px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>done_all</span>
                            </div>
                        </div>

                        {/* Message Inbound with Attachment Preview */}
                        <div className="flex items-end gap-3 max-w-[85%]">
                            <img 
                                alt="Dr. Aris Thorne" 
                                className="w-8 h-8 rounded-full object-cover" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQg1bur03CStF3auMc2FPV7lUvsMgzgP03F1n6nJAeru5c9LDnmeW5Jz71l5HMRYfg7s0kaaRKrv8-R8FPhJLWWvqxAR2aYhaMIQOK6VuKyxeA2EDImgKkuEX7rhc6z81Ben3n0Oz20fNnR0NvpZQVSBZ4uKYiroPw5iO33xGAJBZ4sIjjAZcv7XdGoQcEU7TW76YA-bh6tIVDJMz4pDCud5V65V32pYO5jR_R7M82AC2OF7DaMPZ4ODXOODm5-Fc6qc3_k9swsHE"
                            />
                            <div className="flex flex-col gap-1">
                                <div className="chat-bubble-in bg-surface-container-lowest p-4 text-on-surface text-sm shadow-sm flex flex-col gap-3 rounded-[1.5rem_1.5rem_1.5rem_0.25rem]">
                                    <span>I’ve attached a draft of his hypothesis section. It’s very well articulated. Take a look when you have a moment.</span>
                                    <div className="bg-surface-container-low rounded-xl p-3 flex items-center gap-3 border border-outline-variant/10">
                                        <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined">description</span>
                                        </div>
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="text-xs font-semibold truncate">Leo_Project_Draft_v2.pdf</span>
                                            <span className="text-[10px] text-on-surface-variant uppercase">1.4 MB • PDF Document</span>
                                        </div>
                                    </div>
                                </div>
                                <span className="text-[10px] text-on-surface-variant ml-2 font-medium">09:22 AM</span>
                            </div>
                        </div>

                        {/* Message Outbound */}
                        <div className="flex flex-col items-end gap-1 ml-auto max-w-[85%]">
                            <div className="chat-bubble-out p-4 text-on-primary text-sm shadow-md rounded-[1.5rem_1.5rem_0.25rem_1.5rem] bg-gradient-to-br from-primary to-primary-dim">
                                Thank you, Dr. Thorne. Does he need any specific materials for the final presentation next Tuesday?
                            </div>
                            <div className="flex items-center gap-1 mr-2">
                                <span className="text-[10px] text-on-surface-variant font-medium">09:25 AM</span>
                                <span className="material-symbols-outlined text-[12px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>done_all</span>
                            </div>
                        </div>

                        {/* Typing Indicator */}
                        <div className="flex items-end gap-3 opacity-60 mb-4">
                            <img 
                                alt="Dr. Aris Thorne" 
                                className="w-8 h-8 rounded-full object-cover" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQg1bur03CStF3auMc2FPV7lUvsMgzgP03F1n6nJAeru5c9LDnmeW5Jz71l5HMRYfg7s0kaaRKrv8-R8FPhJLWWvqxAR2aYhaMIQOK6VuKyxeA2EDImgKkuEX7rhc6z81Ben3n0Oz20fNnR0NvpZQVSBZ4uKYiroPw5iO33xGAJBZ4sIjjAZcv7XdGoQcEU7TW76YA-bh6tIVDJMz4pDCud5V65V32pYO5jR_R7M82AC2OF7DaMPZ4ODXOODm5-Fc6qc3_k9swsHE"
                            />
                            <div className="bg-surface-container-high rounded-full px-4 py-3 flex gap-1 items-center">
                                <div className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-pulse"></div>
                                <div className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                <div className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-pulse [animation-delay:0.4s]"></div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Bottom Input Bar */}
                <div className="fixed bottom-0 left-0 md:left-64 right-0 bg-white/80 backdrop-blur-lg pt-4 pb-8 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-surface-container-high rounded-[28px] p-2 flex items-center gap-2 shadow-sm">
                            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-highest transition-colors text-on-surface-variant">
                                <span className="material-symbols-outlined">add</span>
                            </button>
                            <input 
                                className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-on-surface placeholder:text-slate-400 font-medium px-2 outline-none" 
                                placeholder="Type your message..." 
                                type="text"
                            />
                            <div className="flex items-center gap-1">
                                <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-highest transition-colors text-on-surface-variant">
                                    <span className="material-symbols-outlined">mood</span>
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-on-primary shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuardianChat;
