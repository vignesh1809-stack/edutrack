import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiltersRequest } from '../../store/actions/studentActions';
import Sidebar from '../../components/Sidebar';
import TopAppBar from '../../components/TopAppBar';
import BottomNavBar from '../../components/BottomNavBar';

const Reports = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const branches = useSelector(state => state.students?.branches || []);
  const years = useSelector(state => state.students?.years || []);
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [activeDropdown, setActiveDropdown] = useState(null); // 'branch' | 'year' | null

  useEffect(() => {
    dispatch(fetchFiltersRequest());
  }, [dispatch]);

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

  return (
    <>
      <Sidebar />
      <TopAppBar />
      <main className="pt-24 pb-32 md:pb-10 px-6 md:pl-72 max-w-7xl mx-auto min-h-screen">
        {/* Filter Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-on-surface">Analytics & Insights</h2>
            <p className="text-on-surface-variant mt-1">Deep dive into institutional performance metrics.</p>
          </div>
          <div className="flex flex-wrap gap-3 items-end flex-grow">
            {/* Branch Dropdown — Professional Style */}
            <div className="relative">
              <button 
                onClick={(e) => toggleDropdown(e, 'branch')}
                className="flex items-center gap-3 px-6 py-2.5 bg-slate-50 border-none text-[#475569] rounded-lg hover:bg-slate-100 transition-all active:scale-95 shadow-sm"
              >
                <span className="text-[13px] font-black uppercase tracking-wider whitespace-nowrap">
                  {selectedBranch === 'All Branches' ? 'ALL BRANCHES' : selectedBranch}
                </span>
                <span className={`material-symbols-outlined text-[18px] text-slate-400 transition-transform duration-300 ${activeDropdown === 'branch' ? 'rotate-180' : ''}`}>expand_more</span>
              </button>

              {activeDropdown === 'branch' && (
                <div 
                  className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-100 rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] py-2 z-50 animate-in fade-in zoom-in-95 duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    onClick={() => { setSelectedBranch('All Branches'); setActiveDropdown(null); }}
                    className={`w-full flex items-center justify-between px-5 py-3 text-sm transition-colors ${
                      selectedBranch === 'All Branches' 
                        ? 'bg-primary/5 text-primary font-bold' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="uppercase font-bold tracking-tight">All Branches</span>
                    {selectedBranch === 'All Branches' && <span className="material-symbols-outlined text-sm">check</span>}
                  </button>
                  {branches.map((branch) => (
                    <button 
                      key={branch}
                      onClick={() => { setSelectedBranch(branch); setActiveDropdown(null); }}
                      className={`w-full flex items-center justify-between px-5 py-3 text-sm transition-colors ${
                        selectedBranch === branch 
                          ? 'bg-primary/5 text-primary font-bold' 
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="uppercase font-bold tracking-tight">{branch}</span>
                      {selectedBranch === branch && <span className="material-symbols-outlined text-sm">check</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Year Dropdown — Professional Style */}
            <div className="relative">
              <button 
                onClick={(e) => toggleDropdown(e, 'year')}
                className="flex items-center gap-3 px-6 py-2.5 bg-slate-50 border-none text-[#475569] rounded-lg hover:bg-slate-100 transition-all active:scale-95 shadow-sm"
              >
                <span className="text-[13px] font-black uppercase tracking-wider whitespace-nowrap">
                  {selectedYear === 'All Years' ? 'YEAR ALL' : `YEAR ${selectedYear}`}
                </span>
                <span className={`material-symbols-outlined text-[18px] text-slate-400 transition-transform duration-300 ${activeDropdown === 'year' ? 'rotate-180' : ''}`}>expand_more</span>
              </button>

              {activeDropdown === 'year' && (
                <div 
                  className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-100 rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] py-2 z-50 animate-in fade-in zoom-in-95 duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    onClick={() => { setSelectedYear('All Years'); setActiveDropdown(null); }}
                    className={`w-full flex items-center justify-between px-5 py-3 text-sm transition-colors ${
                      selectedYear === 'All Years' 
                        ? 'bg-primary/5 text-primary font-bold' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="uppercase font-bold tracking-tight">All Years</span>
                    {selectedYear === 'All Years' && <span className="material-symbols-outlined text-sm">check</span>}
                  </button>
                  {years.map((year) => (
                    <button 
                      key={year}
                      onClick={() => { setSelectedYear(year); setActiveDropdown(null); }}
                      className={`w-full flex items-center justify-between px-5 py-3 text-sm transition-colors ${
                        selectedYear === year 
                          ? 'bg-primary/5 text-primary font-bold' 
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="uppercase font-bold tracking-tight">{year}</span>
                      {selectedYear === year && <span className="material-symbols-outlined text-sm">check</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="md:ml-auto bg-gradient-to-br from-primary to-primary-dim text-on-primary px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 shadow-sm hover:shadow-lg transition-all active:scale-95">
              <span className="material-symbols-outlined text-lg" data-icon="filter_list">filter_list</span>
              Apply Filters
            </button>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Academic Performance Distribution (Large Card) */}
          <div className="md:col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-[24px] p-8 shadow-[0px_20px_40px_rgba(42,52,57,0.06)] flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Academic Performance Distribution</h3>
              <span className="text-xs font-medium text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-full uppercase tracking-wider">Internal Assessment</span>
            </div>
            <div className="flex items-end justify-between h-64 gap-3 px-1 sm:px-4">
              <div className="flex-1 group relative flex flex-col items-center h-full justify-end">
                <div className="absolute -top-8 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-on-surface text-surface text-xs px-2 py-1 rounded">12%</div>
                <div className="bg-surface-container-low w-full rounded-t-xl hover:bg-tertiary-container transition-colors" style={{ height: '24%' }}></div>
                <div className="text-[10px] font-bold text-center mt-3 text-on-surface-variant">F (&lt;40)</div>
              </div>
              <div className="flex-1 group relative flex flex-col items-center h-full justify-end">
                <div className="absolute -top-8 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-on-surface text-surface text-xs px-2 py-1 rounded">18%</div>
                <div className="bg-surface-container-low w-full rounded-t-xl hover:bg-tertiary-container transition-colors" style={{ height: '36%' }}></div>
                <div className="text-[10px] font-bold text-center mt-3 text-on-surface-variant">C (40-59)</div>
              </div>
              <div className="flex-1 group relative flex flex-col items-center h-full justify-end">
                <div className="absolute -top-8 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-on-surface text-surface text-xs px-2 py-1 rounded">25%</div>
                <div className="bg-surface-container-low w-full rounded-t-xl hover:bg-tertiary-container transition-colors" style={{ height: '50%' }}></div>
                <div className="text-[10px] font-bold text-center mt-3 text-on-surface-variant">B (60-74)</div>
              </div>
              <div className="flex-1 group relative flex flex-col items-center h-full justify-end">
                <div className="absolute -top-8 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-on-surface text-surface text-xs px-2 py-1 rounded">32%</div>
                <div className="bg-primary/20 w-full rounded-t-xl hover:bg-primary/40 transition-colors" style={{ height: '64%' }}></div>
                <div className="text-[10px] font-bold text-center mt-3 text-on-surface-variant">A (75-89)</div>
              </div>
              <div className="flex-1 group relative flex flex-col items-center h-full justify-end">
                <div className="absolute -top-8 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-on-surface text-surface text-xs px-2 py-1 rounded">13%</div>
                <div className="bg-primary w-full rounded-t-xl relative overflow-hidden" style={{ height: '85%' }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>
                <div className="text-[10px] font-bold text-center mt-3 text-primary">A+ (90+)</div>
              </div>
            </div>
          </div>

          {/* Top Performers (Side Panel) */}
          <div className="md:col-span-12 lg:col-span-4 bg-surface-container-lowest rounded-[24px] p-8 shadow-[0px_20px_40px_rgba(42,52,57,0.06)] flex flex-col">
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Top Performers</h3>
                <button 
                  onClick={() => navigate('/principal/top-performers')}
                  className="text-primary text-xs font-bold uppercase tracking-wider hover:underline"
                >
                  View All
                </button>
              </div>
              <div className="space-y-6 flex-grow">
                {[
                  { name: 'Elena Rodriguez', meta: 'CSE • 98.4%', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABD46mTrl2O0QftdyHZzJkbrfrDm9DjjiBv8735pirsjt2NXhBj4K-orYBzdRMUJRZA0vvFPwOgjoYsZxwLRtvyyMdLGEn9aNi-JmSQxebSacPryemwEYMpe0TmCWL6MPmAvUpT79G4wTazr-wtAacj1HFrtOO3G0_5ISWUxbdddGwl1qUwd7pMcQ029DhjAYJKIU1752coxFxzl3yGF7RPl7T8d2fssYnsB-wwLwiAOBmZeS5uE2bXng7cr3Vf-1topi1d6S-kcg', place: '1st', bg: 'bg-tertiary-container', text: 'text-on-tertiary-container' },
                  { name: 'Marcus Chen', meta: 'ECE • 96.2%', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZhUvb1_TmRadNhqBKHfnGiANndeVS3FIdUANOFbJvyqqgeT8AixdraH40tPMQKmMqBXAP5sXi42CRNQ3umt2YHYJ6i_2WJakERsGI_uFunJMCc6GCP1gIh1boxcmwxdV6-IdRIIqnRHh9VAkUsBC77VR2dU2pDNhg32_8gyQJgh_yptPaj9ZPaLof7mez26V85OW1HzzipgP3qV28uvVx2P1IXbCl7oFPdOInA-fL22ipRftD4gfsr14n5CnIcs1YyO71SIHO5YE', place: '2nd', bg: 'bg-surface-container-high', text: 'text-on-surface-variant' },
                  { name: 'Sarah Jenkins', meta: 'ME • 95.8%', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWOfqj96RtiQtB5SwtbQM_VhZyuucdbuQptEjrfJ-I8ryEIPv50b_Fl6YnepdwbQCFJOWvNfiaTDbgAqUwTe91Bbm38kU23vLyL9FTbUq446HwvO0xQL6ZGjAX3eTYaX7jJm8QuxNhCEHLGeMQhp81jMXiwfg4uJZNlNtDvs7p8UznUGhi6c7MssS_q43onrinVFQOW2hKKf7pC5fS13TbTgPR28p28YftJWanVAzcOmpaR-r4xRA-GkNqoMq9gmCeSsFaJFduIxo', place: '3rd', bg: 'bg-surface-container-high', text: 'text-on-surface-variant' }
                ].map((student, idx) => (
                  <div key={idx} className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-primary/10 group-hover:ring-primary transition-all">
                      <img alt={student.name} className="w-full h-full object-cover" src={student.src} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm">{student.name}</p>
                      <p className="text-xs text-on-surface-variant font-medium mt-0.5">{student.meta}</p>
                    </div>
                    <div className={`w-8 h-8 rounded-full ${student.bg} flex items-center justify-center`}>
                      <span className={`${student.text} text-[10px] font-bold`}>{student.place}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-dashed border-outline-variant/30 text-center">
                <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-[0.2em] mb-2">Honorable Mention</p>
                <p className="text-xs italic text-on-surface-variant">Institute average increased by 4.2% since last semester.</p>
              </div>
            </div>
          </div>

          {/* Attendance Analytics (Wide Chart Section) */}
          <div className="md:col-span-12 bg-surface-container-lowest rounded-[24px] p-8 shadow-[0px_20px_40px_rgba(42,52,57,0.06)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h3 className="text-xl font-bold">Attendance Trends</h3>
                <p className="text-sm text-on-surface-variant mt-1">Comparison across major departments (Last 6 Months)</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                  <span className="text-xs font-semibold">CSE</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-tertiary"></span>
                  <span className="text-xs font-semibold">ECE</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-outline-variant"></span>
                  <span className="text-xs font-semibold">ME</span>
                </div>
              </div>
            </div>
            {/* Abstract Multi-Line Trend */}
            <div className="h-64 relative w-full mb-4">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between opacity-10">
                <div className="border-t border-on-surface w-full"></div>
                <div className="border-t border-on-surface w-full"></div>
                <div className="border-t border-on-surface w-full"></div>
                <div className="border-t border-on-surface w-full"></div>
                <div className="border-t border-on-surface w-full"></div>
              </div>
              {/* SVG Path for Trends */}
              <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 1000 200" preserveAspectRatio="none">
                {/* ME Line (Bottom) */}
                <path d="M0,150 Q166,160 333,140 Q500,155 666,130 Q833,145 1000,120" fill="none" stroke="#a9b4b9" strokeLinecap="round" strokeWidth="3"></path>
                {/* ECE Line (Middle) */}
                <path d="M0,100 Q166,120 333,90 Q500,110 666,80 Q833,95 1000,70" fill="none" stroke="#625b77" strokeLinecap="round" strokeWidth="3"></path>
                {/* CSE Line (Top) */}
                <path d="M0,60 Q166,40 333,70 Q500,30 666,55 Q833,20 1000,45" fill="none" stroke="#3755c3" strokeLinecap="round" strokeWidth="4"></path>
              </svg>
            </div>
            <div className="flex justify-between px-2 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest relative z-10 bg-white/50 backdrop-blur-sm rounded-lg pt-2 mt-2">
              <span>Sept</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
              <span>Jan</span>
              <span>Feb</span>
            </div>
          </div>

          {/* Departmental Comparison (Multi-Bar) */}
          <div className="md:col-span-12 bg-surface-container rounded-[24px] p-8 shadow-[0px_20px_40px_rgba(42,52,57,0.06)]">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-bold">Departmental Average Comparison</h3>
              <div className="flex gap-2">
                <div className="px-3 py-1 bg-surface-container-lowest rounded-lg text-xs font-bold shadow-sm">Theory</div>
                <div className="px-3 py-1 bg-surface-container-lowest/50 rounded-lg text-xs font-medium text-on-surface-variant cursor-pointer hover:bg-surface-container-lowest/80 transition-colors">Practical</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { name: 'CSE', val: '84.5%', num: '84.5%', prev: 'Prev: 81.2%', diff: '+3.3%', diffColor: 'text-green-600', color: 'bg-primary', barClass: 'text-primary' },
                { name: 'ECE', val: '78.1%', num: '78.1%', prev: 'Prev: 79.4%', diff: '-1.3%', diffColor: 'text-red-600', color: 'bg-tertiary', barClass: 'text-tertiary' },
                { name: 'ME', val: '72.9%', num: '72.9%', prev: 'Prev: 70.5%', diff: '+2.4%', diffColor: 'text-green-600', color: 'bg-on-surface-variant', barClass: 'text-on-surface-variant' }
              ].map((dept, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold">{dept.name}</span>
                    <span className={`text-2xl font-black ${dept.barClass} tracking-tighter`}>{dept.val}</span>
                  </div>
                  <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div className={`h-full ${dept.color} rounded-full`} style={{ width: dept.num }}></div>
                  </div>
                  <div className="flex justify-between text-[10px] font-medium text-on-surface-variant uppercase">
                    <span>{dept.prev}</span>
                    <span className={`${dept.diffColor} font-bold`}>{dept.diff}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <BottomNavBar />
    </>
  );
};

export default Reports;
