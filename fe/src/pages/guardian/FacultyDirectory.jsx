import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GuardianNavBar from '../../components/GuardianNavBar';
import GuardianSidebar from '../../components/GuardianSidebar';

const FacultyDirectory = () => {
    const navigate = useNavigate();

    const faculty = [
        {
            name: "Dr. Sarah Jenkins",
            role: "Head of Mathematics",
            status: "Online",
            statusColor: "bg-green-500",
            statusBg: "bg-tertiary-container",
            photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvDBeQdvqS_WTq_XPScKVTO-YhIZMY5QT_n38MQRnF36SSjHWkMHYhBf9ylts3fyFyoqCyCnS4Wov6EL7Vj3J9STmuubQOjMPJvIed1jM4Fiog7bf8NFhumeVcuX4cSX3ORlKt55QFFkuBJrIZgvkKE62fJVD4uW8dBbL8c5hOtvlTa3ccPcAaSdyaR9GJzgUjP8llGzT2VwuQJdG3VaAHwz9o8EIpn1a3vqzte08Fl7B1G8XAHbrDp5NSFXbBdvEIRJs0qdUf6Vw"
        },
        {
            name: "Prof. Marcus Thorne",
            role: "Physics Department",
            status: "Away",
            statusColor: "bg-orange-400",
            statusBg: "bg-secondary-container",
            photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1V7QRbogiK7fILhjVIWyrfm2_eb0U1h0s4dwkqnyGs882TNXjllHwIRoIwrFWo0wwEYBdJjrA_8w4wI-onCDa_alF963KBV-qfL45ALx4ZwO_YNQ55hZHts4NN697HOP-mpIyBtu2UpcmjmxTKrp-w9Q6hTR1QmT6hUxfvcqCK7v8CtZZicBUzUaO2ibDc_N7EcW_HJbODb90opCdErzP58hynblCHOt4IKO2_Lu937AJcDM99MMdFGu6Ob9wKoebAUi3Io_jPl0"
        },
        {
            name: "Ms. Helena Vance",
            role: "English Literature",
            status: "Online",
            statusColor: "bg-green-500",
            statusBg: "bg-tertiary-container",
            photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKXtL9TeqD0n6-keP_0ADiWWXu7ANqGCeXmOnS4dX1mIgLgZiUYQOK8OdQoBBH3UcGSKVS4ogzigppRhDBZV_JWtN-5qr9F8_lKD0Lp_-7W6oBub_xkMbri1TGqSQeG5ar6F_7RjX3-GGzFTuyhOjPeAnODDJE2K1qEVsqccHZqU9EaEFeGHu5_Zbxa_87NPLQw-kWlRXApbxrGLKRTkMdpcqqhVy1guTeaf8nHhGWNYfcz1DZeZgq6ymNShTzycb40pXcwH33yfg"
        }
    ];

    return (
        <div className="bg-surface font-body text-on-surface antialiased mb-24 md:mb-0 min-h-screen">
            <GuardianSidebar />
            <div className="md:pl-64">
                {/* TopAppBar */}
                <header className="fixed top-0 w-full z-50 bg-[#ffffff]/70 backdrop-blur-md shadow-[0px_20px_40px_rgba(42,52,57,0.06)] md:w-[calc(100%-16rem)]">
                <div className="flex items-center justify-between px-6 h-16 w-full max-w-7xl mx-auto">
                    <button 
                        onClick={() => navigate('/guardian/dashboard')}
                        className="p-2 text-blue-600 hover:bg-slate-100 transition-colors rounded-full active:scale-95 duration-150"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h1 className="font-headline font-bold text-lg text-blue-700">Faculty Directory</h1>
                    <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary-container">
                        <img 
                            alt="Guardian Profile" 
                            className="w-full h-full object-cover" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCm2VbmXPSNV84kwYAmnMX-4HKJ6exuRglteUk2GC0JYg7rFinUs3PyXIgxzAzD4rMaAfHuR-yexLzg7qyA9FFTvniN1036O4ScwNILlLtqO59REHnY4L8bjtWdJi0Qn_VP1ESNoApiOFAVJ4_Ae4_apTnoHwMziyvawDty3Ip2zynqB-Ot1wL78zYw6pVcrq9utgOnIEDKNj6C75XUZx0uyUOuVgBruApDMJH3w8alACqYoMLF1RfgFYp4RcPLOM72kdcniUvtQQ8"
                        />
                    </div>
                </div>
            </header>

            <main className="mt-20 px-6 max-w-4xl mx-auto space-y-8 pb-32 md:pb-12 text-on-surface">
                {/* Search & Filter Section */}
                <div className="mb-8 mt-4">
                    <div className="flex gap-3">
                        <div className="relative flex-grow">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                            <input 
                                className="w-full bg-surface-container-high border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface placeholder:text-on-surface-variant/60 outline-none" 
                                placeholder="Search teachers or departments..." 
                                type="text"
                            />
                        </div>
                        <button className="bg-surface-container-high p-4 rounded-xl text-on-surface-variant hover:bg-surface-container-highest transition-colors active:scale-95">
                            <span className="material-symbols-outlined">filter_list</span>
                        </button>
                    </div>
                </div>

                {/* Faculty List */}
                <section className="space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant/70 px-1">Your Child's Learning Mentors</h2>
                    <div className="space-y-4">
                        {faculty.map((teacher, i) => (
                            <div 
                                key={i} 
                                onClick={() => navigate('/guardian/faculty-profile')}
                                className="bg-surface-container-lowest rounded-2xl flex items-center group hover:shadow-[0px_20px_40px_rgba(42,52,57,0.06)] transition-all duration-300 p-4 gap-4 cursor-pointer"
                            >
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm">
                                        <img alt={teacher.name} className="w-full h-full object-cover" src={teacher.photo} />
                                    </div>
                                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${teacher.statusColor} border-4 border-surface-container-lowest rounded-full`}></div>
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-lg font-bold text-on-surface leading-tight">{teacher.name}</h3>
                                    <p className="text-on-surface-variant text-sm font-medium">{teacher.role}</p>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <span className={`text-[10px] font-bold px-2 py-1 ${teacher.statusBg} text-on-tertiary-container rounded-full uppercase tracking-tighter`}>
                                        {teacher.status}
                                    </span>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate('/guardian/chat');
                                        }}
                                        className="bg-primary text-on-primary p-3 rounded-xl shadow-lg shadow-primary/20 active:scale-90 transition-transform"
                                    >
                                        <span className="material-symbols-outlined">chat_bubble</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bento Styled Feature */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="bg-primary-container/30 p-6 rounded-3xl flex flex-col justify-between aspect-square">
                            <span className="material-symbols-outlined text-primary text-4xl">auto_stories</span>
                            <div>
                                <h4 className="font-bold text-on-primary-container">Faculty Stats</h4>
                                <p className="text-xs text-on-primary-container/70">85% active within 24 hours</p>
                            </div>
                        </div>
                        <div className="bg-surface-container p-6 rounded-3xl flex flex-col justify-center gap-2">
                            <div className="flex -space-x-3 overflow-hidden">
                                {[1, 2, 3].map((_, i) => (
                                    <img 
                                        key={i}
                                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white" 
                                        src={`https://i.pravatar.cc/150?u=${i + 10}`} 
                                        alt="Staff" 
                                    />
                                ))}
                            </div>
                            <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mt-2">Staff Online Now</p>
                            <span className="text-2xl font-extrabold text-on-surface">12</span>
                        </div>
                    </div>
                </section>
            </main>

            <GuardianNavBar />
        </div>
    </div>
    );
};

export default FacultyDirectory;
