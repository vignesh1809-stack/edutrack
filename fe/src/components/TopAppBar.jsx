import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopAppBar = ({ title, showBack = false, actions }) => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center px-6 h-16 w-full bg-slate-50/70 dark:bg-slate-900/70 backdrop-blur-xl sticky top-0 z-40 shadow-[0px_20px_40px_rgba(42,52,57,0.06)] md:pl-0">
      <div className="flex items-center gap-4">
        {showBack && (
          <button 
            onClick={() => navigate(-1)}
            className="text-blue-600 dark:text-blue-400 hover:bg-slate-200/50 p-2 rounded-full transition-colors active:scale-90"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        )}
        <h1 className="font-headline font-bold text-lg tracking-tight text-on-surface">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        {actions}
      </div>
    </header>
  );
};

export default TopAppBar;

