import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStudentFilter } from '../store/actions/studentActions';

const SearchPlate = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.students?.filters || {});
  const branches = useSelector(state => state.students?.branches || []);
  const years = useSelector(state => state.students?.years || []);
  
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState(filters.search || '');

  // Debounce search input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm !== filters.search) {
        dispatch(setStudentFilter('search', searchTerm));
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, dispatch, filters.search]);

  const handleFilterClick = (key, value) => {
    // Toggle off if clicking the already active filter
    const newValue = filters[key] === value ? '' : value;
    dispatch(setStudentFilter(key, newValue));
  };

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
      <div className={`transition-all duration-300 overflow-hidden ${showFilters ? 'mt-6 max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">Branch:</span>
            {branches.map(branch => (
              <button 
                key={branch}
                onClick={() => handleFilterClick('course', branch)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                  filters.course === branch 
                    ? 'bg-primary text-white' 
                    : 'bg-surface-container-high text-slate-600 hover:bg-slate-200 font-medium'
                }`}
              >
                {branch}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">Year:</span>
            {years.map(year => (
              <button 
                key={year}
                onClick={() => handleFilterClick('year', year)}
                className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                  filters.year === year 
                    ? 'bg-primary-container text-primary' 
                    : 'bg-surface-container-high text-slate-600 hover:bg-slate-200 font-medium'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchPlate;
