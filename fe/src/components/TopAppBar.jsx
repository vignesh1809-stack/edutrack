import React from 'react';

const TopAppBar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-50/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-[0px_20px_40px_rgba(42,52,57,0.06)] flex justify-between items-center px-6 h-16">
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
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200/50 transition-colors">
          <span className="material-symbols-outlined text-on-surface-variant">search</span>
        </button>
      </div>
    </nav>
  );
};

export default TopAppBar;
