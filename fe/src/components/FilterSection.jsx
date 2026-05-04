import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDashboardFilter, fetchYearsRequest, fetchSectionsRequest } from '../store/actions/dashboardActions';

const FilterSection = () => {
  const dispatch = useDispatch();
  const { filters, availableYears, availableSections } = useSelector((state) => state.dashboard);
  const { year: selectedYear, section: selectedSection } = filters;
  
  const [activeDropdown, setActiveDropdown] = useState(null); // 'year' | 'section' | null

  useEffect(() => {
    dispatch(fetchYearsRequest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSectionsRequest(selectedYear));
  }, [dispatch, selectedYear]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    if (activeDropdown) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => window.removeEventListener('click', handleClickOutside);
  }, [activeDropdown]);

  const toggleDropdown = (e, type) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === type ? null : type);
  };

  const formatValue = (prefix, value) => {
    if (value === 'All Years' || value === 'All Sections') {
      return `${prefix} ALL`;
    }
    return `${prefix} ${value}`;
  };

  return (
    <section className="flex gap-3 pb-2 relative z-[60]">
      {/* Year Filter */}
      <div className="relative">
        <button 
          onClick={(e) => toggleDropdown(e, 'year')}
          className="flex items-center gap-3 px-6 py-2.5 bg-slate-50 border-none text-[#475569] rounded-full hover:bg-slate-100 transition-all active:scale-95 shadow-sm"
        >
          <span className="text-[13px] font-black uppercase tracking-wider whitespace-nowrap">
            {formatValue('YEAR', selectedYear)}
          </span>
          <span className={`material-symbols-outlined text-[18px] text-slate-400 transition-transform duration-300 ${activeDropdown === 'year' ? 'rotate-180' : ''}`}>expand_more</span>
        </button>

        {activeDropdown === 'year' && (
          <div 
            className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] py-2 z-50 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {availableYears.map((year) => (
              <button 
                key={year}
                onClick={() => {
                  dispatch(setDashboardFilter({ year, section: 'All Sections' }));
                  setActiveDropdown(null);
                }}
                className={`w-full flex items-center justify-between px-5 py-3 text-sm transition-colors ${
                  selectedYear === year 
                    ? 'bg-primary/5 text-primary font-bold' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="uppercase font-bold tracking-tight">{year === 'All Years' ? 'All Years' : year}</span>
                {selectedYear === year && <span className="material-symbols-outlined text-sm">check</span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Section Filter */}
      <div className="relative">
        <button 
          onClick={(e) => toggleDropdown(e, 'section')}
          className="flex items-center gap-3 px-6 py-2.5 bg-slate-50 border-none text-[#475569] rounded-full hover:bg-slate-100 transition-all active:scale-95 shadow-sm"
        >
          <span className="text-[13px] font-black uppercase tracking-wider whitespace-nowrap">
            {formatValue('SECTION', selectedSection)}
          </span>
          <span className={`material-symbols-outlined text-[18px] text-slate-400 transition-transform duration-300 ${activeDropdown === 'section' ? 'rotate-180' : ''}`}>expand_more</span>
        </button>

        {activeDropdown === 'section' && (
          <div 
            className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] py-2 z-50 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {availableSections.map((section) => (
              <button 
                key={section}
                onClick={() => {
                  dispatch(setDashboardFilter({ section }));
                  setActiveDropdown(null);
                }}
                className={`w-full flex items-center justify-between px-5 py-3 text-sm transition-colors ${
                  selectedSection === section 
                    ? 'bg-primary/5 text-primary font-bold' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="uppercase font-bold tracking-tight">{section === 'All Sections' ? 'All Sections' : section}</span>
                {selectedSection === section && <span className="material-symbols-outlined text-sm">check</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FilterSection;
