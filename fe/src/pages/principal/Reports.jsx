import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiltersRequest, fetchTopPerformersRequest } from '../../store/actions/studentActions';
import { fetchPrincipalDashboardRequest, fetchAttendanceTrendsRequest, fetchDepartmentAveragesRequest, fetchLeastPerformedStaffRequest } from '../../store/actions/dashboardActions';
import Sidebar from '../../components/Sidebar';
import TopAppBar from '../../components/TopAppBar';
import BottomNavBar from '../../components/BottomNavBar';
import ProfessionalDropdown from '../../components/ProfessionalDropdown';

const CHART_GRADIENTS = [
  { id: 'grad-blue', start: '#BFDBFE', end: '#60A5FA' },
  { id: 'grad-orange', start: '#FED7AA', end: '#FB923C' },
  { id: 'grad-gray', start: '#E5E7EB', end: '#9CA3AF' },
  { id: 'grad-amber', start: '#FDE68A', end: '#FBBF24' },
  { id: 'grad-cyan', start: '#A5F3FC', end: '#22D3EE' },
  { id: 'grad-red', start: '#FECACA', end: '#F87171' },
  { id: 'grad-slate', start: '#CBD5E1', end: '#64748B' },
  { id: 'grad-sky', start: '#BAE6FD', end: '#38BDF8' },
];

const getSmoothPath = (points) => {
  if (!points || points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x},${points[0].y}`;
  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const midX = (p0.x + p1.x) / 2;
    d += ` C ${midX},${p0.y} ${midX},${p1.y} ${p1.x},${p1.y}`;
  }
  return d;
};

const Reports = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const branches = useSelector(state => state.students?.branches || []);
  const years = useSelector(state => state.students?.years || []);
  const { data: topPerformers, loading: topPerformersLoading } = useSelector(state => state.students?.topPerformers || { data: [], loading: false });
  const { data: dashboardData, loading: dashboardLoading, attendanceTrends, departmentAverages, leastPerformedStaff } = useSelector(state => state.dashboard);
  
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [activeDropdown, setActiveDropdown] = useState(null); // 'branch' | 'year' | null

  useEffect(() => {
    dispatch(fetchFiltersRequest());
    dispatch(fetchPrincipalDashboardRequest({ branch: 'All Branches', year: 'All Years' }));
    dispatch(fetchTopPerformersRequest({ branch: 'All Branches', year: 'All Years' }));
    dispatch(fetchAttendanceTrendsRequest({ branch: 'All Branches', year: 'All Years' }));
    dispatch(fetchDepartmentAveragesRequest({ year: 'All Years' }));
    dispatch(fetchLeastPerformedStaffRequest({ branch: 'All Branches', year: 'All Years' }));
  }, [dispatch]);

  const handleApplyFilters = () => {
    const filters = { 
      branch: selectedBranch, 
      year: selectedYear === 'All Years' ? '' : selectedYear 
    };
    dispatch(fetchPrincipalDashboardRequest(filters));
    dispatch(fetchTopPerformersRequest(filters));
    dispatch(fetchAttendanceTrendsRequest(filters));
    dispatch(fetchDepartmentAveragesRequest({ year: filters.year }));
    dispatch(fetchLeastPerformedStaffRequest(filters));
  };

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
      <div className="flex-1 flex flex-col min-h-screen relative md:pl-72">
        <TopAppBar title="Analytics Reports" />
        <main className="flex-1 p-6 md:p-10 mb-24 md:mb-0 max-w-7xl mx-auto w-full">

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
            <ProfessionalDropdown
              value={selectedYear}
              onChange={setSelectedYear}
              options={years}
              labelPrefix="YEAR"
              defaultValue="All Years"
              defaultLabel="All Years"
            />

            <button 
              onClick={handleApplyFilters}
              className="md:ml-auto bg-gradient-to-br from-primary to-primary-dim text-on-primary px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 shadow-sm hover:shadow-lg transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-lg" data-icon="filter_list">filter_list</span>
              Apply Filters
            </button>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                 {/* Staff Performance Review (Enterprise Card) */}
          <div className="md:col-span-12 lg:col-span-8 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl rounded-[32px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white/40 dark:border-slate-800/40 flex flex-col gap-6 transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                  <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-slate-100">Performance At-Risk</h3>
                </div>
                <p className="text-xs text-slate-500 font-medium">Lowest performing faculty members based on course assessment averages.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {leastPerformedStaff?.loading ? (
                <div className="col-span-3 flex justify-center py-10">
                  <div className="w-8 h-8 border-4 border-error border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : leastPerformedStaff?.data?.length > 0 ? (
                leastPerformedStaff.data.map((staff, idx) => (
                  <div key={staff.staffId || idx} className="group p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800/50 shadow-sm hover:shadow-md hover:bg-white dark:hover:bg-slate-800 transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${idx === 0 ? 'bg-error/10 text-error' : idx === 1 ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-500/10 text-slate-500'} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <span className="material-symbols-outlined text-2xl">
                            {idx === 0 ? 'warning' : idx === 1 ? 'assignment_late' : 'person'}
                          </span>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-slate-100 line-clamp-1">{staff.staffName}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest line-clamp-1">{staff.subject}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <span className="text-[11px] font-bold text-slate-500">Performance Score</span>
                        <span className={`text-lg font-black ${staff.performanceScore < 60 ? 'text-error' : 'text-amber-500'}`}>{staff.performanceScore}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${staff.performanceScore < 60 ? 'from-error to-error/60' : 'from-amber-500 to-amber-500/60'} rounded-full`} 
                          style={{ width: `${staff.performanceScore}%` }}
                        ></div>
                      </div>
                      <button className="w-full py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors uppercase tracking-widest">Schedule Review</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 flex flex-col items-center justify-center py-10 opacity-50">
                  <span className="material-symbols-outlined text-4xl mb-2">check_circle</span>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">All staff meeting targets</p>
                </div>
              )}
            </div>
          </div>






          {/* Top Performers (Side Panel) */}
          <div className="md:col-span-12 lg:col-span-4 bg-surface-container-lowest rounded-[24px] p-8 shadow-[0px_20px_40px_rgba(42,52,57,0.06)] flex flex-col">
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Top Performers</h3>
                <button 
                  onClick={() => navigate('/principal/top-performers', { 
                    state: { 
                      branch: selectedBranch, 
                      year: selectedYear === 'All Years' ? '' : selectedYear 
                    } 
                  })}
                  className="text-primary text-xs font-bold uppercase tracking-wider hover:underline"
                >
                  View All
                </button>
              </div>
              <div className="space-y-6 flex-grow">
                {topPerformersLoading ? (
                  <div className="flex justify-center items-center h-48">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : topPerformers?.length > 0 ? (
                  topPerformers.map((student, idx) => (
                    <div key={student.id || idx} className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-primary/10 group-hover:ring-primary transition-all bg-slate-50">
                        <img alt={student.name} className="w-full h-full object-cover" src={student.image} />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm">{student.name}</p>
                        <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                          {student.courseDetails?.[0]} • {student.avgMarks} CGPA
                        </p>
                      </div>
                      <div className={`w-8 h-8 rounded-full ${idx === 0 ? 'bg-tertiary-container' : 'bg-surface-container-high'} flex items-center justify-center`}>
                        <span className={`${idx === 0 ? 'text-on-tertiary-container' : 'text-on-surface-variant'} text-[10px] font-bold`}>
                          {idx === 0 ? '1st' : idx === 1 ? '2nd' : '3rd'}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 text-on-surface-variant opacity-50">
                    <span className="material-symbols-outlined text-4xl mb-2">school</span>
                    <p className="text-xs font-bold uppercase tracking-widest">No Performers</p>
                  </div>
                )}
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
                <p className="text-sm text-on-surface-variant mt-1">Monthly Attendance Percentage Comparison</p>
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  {attendanceTrends?.series?.map((s, idx) => {
                    const grad = CHART_GRADIENTS[idx % CHART_GRADIENTS.length];
                    return (
                      <div key={s.label} className="flex items-center gap-2">
                        <span 
                          className="w-3 h-3 rounded-full shadow-sm" 
                          style={{ background: `linear-gradient(135deg, ${grad.start}, ${grad.end})` }}
                        ></span>
                        <span className="text-xs font-semibold text-on-surface-variant">{s.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Abstract Multi-Line Trend */}
            <div className="h-64 relative w-full mb-4">
              {attendanceTrends?.loading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : attendanceTrends?.series?.length > 0 ? (
                <>
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div className="border-t border-on-surface/10 w-full relative"><span className="absolute -top-4 left-0 text-[10px] font-medium text-on-surface-variant">100%</span></div>
                    <div className="border-t border-on-surface/10 w-full relative"><span className="absolute -top-4 left-0 text-[10px] font-medium text-on-surface-variant">75%</span></div>
                    <div className="border-t border-on-surface/10 w-full relative"><span className="absolute -top-4 left-0 text-[10px] font-medium text-on-surface-variant">50%</span></div>
                    <div className="border-t border-on-surface/10 w-full relative"><span className="absolute -top-4 left-0 text-[10px] font-medium text-on-surface-variant">25%</span></div>
                    <div className="border-t border-on-surface/10 w-full relative"><span className="absolute -top-4 left-0 text-[10px] font-medium text-on-surface-variant">0%</span></div>
                  </div>
                  {/* SVG Path for Trends */}
                  <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 1000 200" preserveAspectRatio="none">
                    <defs>
                      {CHART_GRADIENTS.map(grad => (
                        <linearGradient key={grad.id} id={grad.id} x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor={grad.start} />
                          <stop offset="100%" stopColor={grad.end} />
                        </linearGradient>
                      ))}
                    </defs>
                    {attendanceTrends.series.map((s, idx) => {
                      const grad = CHART_GRADIENTS[idx % CHART_GRADIENTS.length];
                      const data = s.data || [];
                      if (data.length === 0) return null;
                      
                      const points = data.map((val, i) => {
                         const x = (i / Math.max(1, data.length - 1)) * 1000;
                         const y = 200 - (val * 2); // 100% -> 0, 0% -> 200
                         return {x, y};
                      });
                      
                      const d = getSmoothPath(points);

                      return (
                        <path key={s.label} d={d} fill="none" stroke={`url(#${grad.id})`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path>
                      );
                    })}
                  </svg>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant opacity-50">
                  <p className="text-sm font-bold uppercase tracking-widest">No attendance data</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-between px-2 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest relative z-10 bg-white/50 backdrop-blur-sm rounded-lg pt-2 mt-2">
              {attendanceTrends?.months?.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>

          {/* Departmental Comparison (Multi-Bar) */}
          <div className="md:col-span-12 bg-surface-container rounded-[24px] p-8 shadow-[0px_20px_40px_rgba(42,52,57,0.06)]">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-bold">Departmental Average Comparison</h3>
            </div>
            
            {departmentAverages?.loading ? (
              <div className="h-32 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : departmentAverages?.data?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {departmentAverages.data.map((dept, idx) => {
                  const colors = ['bg-primary', 'bg-tertiary', 'bg-on-surface-variant', 'bg-emerald-600', 'bg-amber-500'];
                  const textColors = ['text-primary', 'text-tertiary', 'text-on-surface-variant', 'text-emerald-600', 'text-amber-500'];
                  const colorIdx = idx % colors.length;
                  
                  return (
                    <div key={idx} className="space-y-4">
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-bold">{dept.department}</span>
                        <span className={`text-2xl font-black ${textColors[colorIdx]} tracking-tighter`}>{dept.averagePercentage}%</span>
                      </div>
                      <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden">
                        <div className={`h-full ${colors[colorIdx]} rounded-full`} style={{ width: `${dept.averagePercentage}%` }}></div>
                      </div>
                      <div className="flex justify-between text-[10px] font-medium text-on-surface-variant uppercase">
                        {dept.previousPercentage != null ? (
                          <>
                            <span>Prev: {dept.previousPercentage}%</span>
                            <span className={`${dept.trend >= 0 ? 'text-green-600' : 'text-red-600'} font-bold`}>
                              {dept.trend > 0 ? '+' : ''}{dept.trend}%
                            </span>
                          </>
                        ) : (
                          <span>Overall Performance</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-32 flex items-center justify-center text-on-surface-variant opacity-50">
                <p className="text-sm font-bold uppercase tracking-widest">No average data</p>
              </div>
            )}
          </div>
        </div>
      </main>
      </div>
      <BottomNavBar />

    </>
  );
};

export default Reports;
