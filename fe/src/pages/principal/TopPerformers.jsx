import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopPerformers = () => {
    const navigate = useNavigate();

    const performers = [
        {
            rank: 1,
            name: "Elena Rodriguez",
            branch: "CSE",
            score: "98.4",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuABD46mTrl2O0QftdyHZzJkbrfrDm9DjjiBv8735pirsjt2NXhBj4K-orYBzdRMUJRZA0vvFPwOgjoYsZxwLRtvyyMdLGEn9aNi-JmSQxebSacPryemwEYMpe0TmCWL6MPmAvUpT79G4wTazr-wtAacj1HFrtOO3G0_5ISWUxbdddGwl1qUwd7pMcQ029DhjAYJKIU1752coxFxzl3yGF7RPl7T8d2fssYnsB-wwLwiAOBmZeS5uE2bXng7cr3Vf-1topi1d6S-kcg"
        },
        {
            rank: 2,
            name: "Marcus Chen",
            branch: "ECE",
            year: "Sophomore",
            score: "97.8",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZhUvb1_TmRadNhqBKHfnGiANndeVS3FIdUANOFbJvyqqgeT8AixdraH40tPMQKmMqBXAP5sXi42CRNQ3umt2YHYJ6i_2WJakERsGI_uFunJMCc6GCP1gIh1boxcmwxdV6-IdRIIqnRHh9VAkUsBC77VR2dU2pDNhg32_8gyQJgh_yptPaj9ZPaLof7mez26V85OW1HzzipgP3qV28uvVx2P1IXbCl7oFPdOInA-fL22ipRftD4gfsr14n5CnIcs1YyO71SIHO5YE"
        },
        {
            rank: 3,
            name: "Sarah Jenkins",
            branch: "ME",
            year: "Junior",
            score: "96.5",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWOfqj96RtiQtB5SwtbQM_VhZyuucdbuQptEjrfJ-I8ryEIPv50b_Fl6YnepdwbQCFJOWvNfiaTDbgAqUwTe91Bbm38kU23vLyL9FTbUq446HwvO0xQL6ZGjAX3eTYaX7jJm8QuxNhCEHLGeMQhp81jMXiwfg4uJZNlNtDvs7p8UznUGhi6c7MssS_q43onrinVFQOW2hKKf7pC5fS13TbTgPR28p28YftJWanVAzcOmpaR-r4xRA-GkNqoMq9gmCeSsFaJFduIxo"
        },
        {
            rank: 4,
            name: "Maya Patel",
            branch: "CSE",
            year: "Senior",
            score: "95.9",
            img: "/female_student_1.png"
        },
        {
            rank: 5,
            name: "Isabella Rossi",
            branch: "ME",
            year: "Freshman",
            score: "94.2",
            img: "/female_student_2.png"
        }
    ];

    return (
        <div className="bg-surface min-h-screen pb-24 text-on-background">
            {/* Header with Back Arrow */}
            <header className="bg-slate-50/70 dark:bg-slate-900/70 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between px-6 py-4 w-full h-16 shadow-[0px_20px_40px_rgba(42,52,57,0.06)]">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate('/principal/reports')}
                        className="material-symbols-outlined p-2 hover:bg-slate-200/50 rounded-full transition-colors text-on-surface-variant"
                    >
                        arrow_back
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-primary-container flex items-center justify-center">
                            <img 
                                alt="Institution Logo" 
                                className="w-full h-full object-cover" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzOKfoiJeIteQ7cOjIODaeuHg_ek2saTxyV2Rlnfv7p8e1zRxX0386yXXaRyWRX7WOIsTA0UknTledegZEE6HuLARXyyVaKuvQ0ozzmbUxMwLO-S7lMGm0mBNZv2M-qgbGmaGN11z2lKIFCLRnl1PK8r3_RO2IoWGM5nqqhPQhRHUKs5483KnkA2y6Y8TgYM6BAno_m5Jsfu51XP2xbBKKgummu-JIWIcT6KQfpW7APcwMdX2Jd-yO_Xf0LQVOccSxAV-AVgkK9G8"
                            />
                        </div>
                        <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-headline">EduTrack</span>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 pt-8">
                {/* Screen Title Section */}
                <div className="mb-8 max-w-2xl">
                    <h1 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">All Top Performers</h1>
                    <p className="text-on-surface-variant text-sm font-medium leading-relaxed">Showcasing the highest academic excellence within the current semester.</p>
                </div>

                {/* Filter & Sort Bar */}
                <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2 hide-scrollbar">
                    <div className="relative group min-w-[120px]">
                        <select className="appearance-none w-full bg-surface-container-high text-on-surface text-sm font-semibold py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary transition-all cursor-pointer">
                            <option>All Branches</option>
                            <option>CSE</option>
                            <option>ECE</option>
                            <option>ME</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-lg">filter_list</span>
                    </div>
                    <div className="relative group min-w-[140px]">
                        <select className="appearance-none w-full bg-surface-container-high text-on-surface text-sm font-semibold py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary transition-all cursor-pointer">
                            <option>Sort by Rank</option>
                            <option>Sort by Score</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-lg">swap_vert</span>
                    </div>
                </div>

                {/* Performer Sections */}
                <div className="space-y-10">
                    {/* Rank #1 - Hero Section */}
                    <div className="max-w-3xl">
                        <div className="bg-surface-container-lowest p-8 rounded-[32px] shadow-[0_20px_40px_rgba(42,52,57,0.06)] relative overflow-hidden group border border-slate-100">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 transition-transform duration-500 group-hover:scale-110"></div>
                            <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full border-8 border-primary-container overflow-hidden shadow-xl">
                                        <img className="w-full h-full object-cover" src={performers[0].img} alt={performers[0].name}/>
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-primary text-on-primary w-12 h-12 rounded-full flex items-center justify-center text-xl font-black shadow-2xl ring-4 ring-white">#1</div>
                                </div>
                                <div className="text-center sm:text-left">
                                    <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-3 inline-block">Top Performer</span>
                                    <h2 className="text-3xl font-black text-on-surface tracking-tighter">{performers[0].name}</h2>
                                    <div className="flex items-center justify-center sm:justify-start gap-4 mt-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold uppercase tracking-widest text-outline">Branch</span>
                                            <span className="bg-surface-container-high text-on-surface text-[10px] font-extrabold px-3 py-1 rounded-full">{performers[0].branch}</span>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex items-baseline gap-2">
                                        <span className="text-5xl font-black text-primary tracking-tighter">{performers[0].score}</span>
                                        <span className="text-xl font-bold text-primary/60">%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ranks #2 and onwards - Grid Section */}
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-outline-variant mb-6 ml-1">Academic Leaderboard</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {performers.slice(1).map((performer) => (
                                <div key={performer.rank} className="bg-surface-container-lowest p-6 rounded-[24px] flex items-center justify-between group hover:bg-white hover:shadow-[0_20px_40px_rgba(42,52,57,0.08)] transition-all duration-300 border border-slate-50">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                                            <img className="w-full h-full object-cover" src={performer.img} alt={performer.name}/>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-on-surface group-hover:text-primary transition-colors">{performer.name}</h3>
                                            <p className="text-xs text-outline-variant font-semibold mt-1">{performer.branch} • {performer.year}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-black text-on-surface-variant tracking-tighter">{performer.score}%</div>
                                        <div className="text-[10px] font-black text-primary uppercase tracking-wider mt-1 opacity-60 group-hover:opacity-100 transition-opacity">Rank #{performer.rank}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TopPerformers;
