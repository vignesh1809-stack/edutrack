import React, { useState } from 'react';

const SearchPlate = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <section className="bg-surface-container-lowest rounded-2xl p-6 mb-8 shadow-[0px_20px_40px_rgba(42,52,57,0.04)] transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Search Bar */}
        <div className="relative flex-grow flex items-center">
          <span className="material-symbols-outlined absolute left-4 text-slate-400">search</span>
          <input 
            className="w-full pl-12 pr-4 py-3.5 bg-surface-container-high rounded-xl border-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-on-surface font-medium placeholder-slate-400" 
            placeholder="Search by Student Name or ID" 
            type="text"
          />
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="bg-primary text-on-primary px-5 py-3 rounded-xl font-semibold text-sm flex justify-center items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[18px]" data-icon="tune">tune</span>
          Filter
        </button>
      </div>

      {/* Filter Cluster (Toggleable) */}
      <div className={`transition-all duration-300 overflow-hidden ${showFilters ? 'mt-6 max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">Branch:</span>
            <button className="px-4 py-1.5 rounded-full bg-primary text-white text-sm font-semibold whitespace-nowrap">CSE</button>
            <button className="px-4 py-1.5 rounded-full bg-surface-container-high text-slate-600 text-sm font-medium whitespace-nowrap hover:bg-slate-200">ECE</button>
            <button className="px-4 py-1.5 rounded-full bg-surface-container-high text-slate-600 text-sm font-medium whitespace-nowrap hover:bg-slate-200">ME</button>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">Year:</span>
            <button className="px-4 py-1.5 rounded-full bg-surface-container-high text-slate-600 text-sm font-medium whitespace-nowrap hover:bg-slate-200">1st</button>
            <button className="px-4 py-1.5 rounded-full bg-surface-container-high text-slate-600 text-sm font-medium whitespace-nowrap hover:bg-slate-200">2nd</button>
            <button className="px-4 py-1.5 rounded-full bg-primary-container text-primary text-sm font-bold whitespace-nowrap">3rd</button>
            <button className="px-4 py-1.5 rounded-full bg-surface-container-high text-slate-600 text-sm font-medium whitespace-nowrap hover:bg-slate-200">4th</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchPlate;
