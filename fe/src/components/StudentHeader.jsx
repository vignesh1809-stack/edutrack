import React from 'react';

const StudentHeader = () => {
  return (
    <header className="fixed top-0 w-full z-50 flex items-center px-6 h-20 bg-slate-50/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl shadow-slate-200/20 dark:shadow-none tonal-transition">
      <div className="flex items-center gap-4 w-full">
        <button className="material-symbols-outlined text-slate-500 hover:bg-white/50 p-2 rounded-full transition-colors" data-icon="menu">menu</button>
        <h1 className="font-manrope font-extrabold text-blue-700 dark:text-blue-400 text-2xl tracking-tight flex-1">Atelier Students</h1>
        <button className="material-symbols-outlined text-slate-500 hover:bg-white/50 p-2 rounded-full transition-colors" data-icon="search">search</button>
      </div>
    </header>
  );
};

export default StudentHeader;
