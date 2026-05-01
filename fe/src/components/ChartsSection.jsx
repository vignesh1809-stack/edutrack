import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStaffAttendanceGraphRequest } from '../store/actions/dashboardActions';

const ChartsSection = () => {
  const [selectedSubject, setSelectedSubject] = useState('All');
  const dispatch = useDispatch();
  const { graphData, graphLoading, graphError } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchStaffAttendanceGraphRequest(7));
  }, [dispatch]);

  const distributionData = {
    All: [
      { grade: 'A+ 90+', percent: 32, width: '32%', color: 'bg-primary' },
      { grade: 'A 80-89', percent: 42, width: '42%', color: 'bg-primary' },
      { grade: 'B 70-79', percent: 18, width: '18%', color: 'bg-primary-container' },
      { grade: 'C <70', percent: 8, width: '8%', color: 'bg-surface-variant' }
    ],
    Math: [
      { grade: 'A+ 90+', percent: 35, width: '35%', color: 'bg-primary' },
      { grade: 'A 80-89', percent: 45, width: '45%', color: 'bg-primary' },
      { grade: 'B 70-79', percent: 15, width: '15%', color: 'bg-primary-container' },
      { grade: 'C <70', percent: 5, width: '5%', color: 'bg-surface-variant' }
    ],
    Physics: [
      { grade: 'A+ 90+', percent: 20, width: '20%', color: 'bg-primary' },
      { grade: 'A 80-89', percent: 50, width: '50%', color: 'bg-primary' },
      { grade: 'B 70-79', percent: 20, width: '20%', color: 'bg-primary-container' },
      { grade: 'C <70', percent: 10, width: '10%', color: 'bg-surface-variant' }
    ],
    History: [
      { grade: 'A+ 90+', percent: 45, width: '45%', color: 'bg-primary' },
      { grade: 'A 80-89', percent: 30, width: '30%', color: 'bg-primary' },
      { grade: 'B 70-79', percent: 20, width: '20%', color: 'bg-primary-container' },
      { grade: 'C <70', percent: 5, width: '5%', color: 'bg-surface-variant' }
    ]
  };

  return (
    <section className="space-y-4">
      {/* Attendance Trends */}
      <div className="bg-surface-container-lowest p-5 rounded-[32px] shadow-[0px_20px_40px_rgba(42,52,57,0.04)]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold font-headline text-on-surface">Attendance Trends</h2>
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer">more_vert</span>
        </div>
        
        {graphLoading ? (
          <div className="relative h-32 flex items-end justify-between gap-2 animate-pulse mt-4">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex-1 bg-surface-container-high rounded-t-full" style={{ height: `${Math.random() * 50 + 20}%` }}></div>
            ))}
          </div>
        ) : graphError ? (
          <div className="flex items-center justify-center h-32 text-red-500 text-sm mt-4">
            <span className="material-symbols-outlined mr-2 text-xl">error</span>
            <span className="font-medium">{graphError}</span>
          </div>
        ) : (
          <>
            <div className="relative h-32 flex items-end justify-between gap-2 mt-4">
              {graphData && graphData.length > 0 ? (
                graphData.map((day, idx) => (
                  <div 
                    key={idx} 
                    className="flex-1 bg-primary/20 hover:bg-primary transition-colors duration-300 rounded-t-full relative group cursor-pointer" 
                    style={{ height: `${Math.max(10, day.percentage)}%` }}
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface-container-highest text-on-surface text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none shadow-sm">
                      {day.percentage}% ({day.presentCount}/{day.totalCount})
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center w-full h-full text-on-surface-variant text-sm font-medium">
                  No attendance data available
                </div>
              )}
            </div>
            
            {graphData && graphData.length > 0 && (
              <div className="flex justify-between mt-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest px-1">
                {graphData.map((day, idx) => {
                  const date = new Date(day.date);
                  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                  return <span key={idx}>{days[date.getDay()]}</span>;
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* Bar Chart Mockup (Side Scroller) */}
      <div className="bg-surface-container-lowest p-5 rounded-3xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold font-headline text-on-surface">Marks Distribution</h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary hidden sm:block"></div>
            <select 
              value={selectedSubject} 
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="bg-surface-container-high border-none outline-none rounded-lg px-2 py-1 text-[11px] font-bold text-slate-700 focus:ring-2 focus:ring-primary cursor-pointer hover:bg-surface-container-highest transition-colors"
            >
              <option value="All">All Subjects</option>
              <option value="Math">Math</option>
              <option value="Physics">Physics</option>
              <option value="History">History</option>
            </select>
          </div>
        </div>
        <div className="space-y-4">
          {distributionData[selectedSubject].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 group">
              <span className="text-xs font-bold w-14 text-on-surface-variant uppercase tracking-tighter whitespace-nowrap">{item.grade}</span>
              <div className="flex-1 h-3 bg-surface-container rounded-full overflow-hidden">
                <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: item.width }}></div>
              </div>
              <span className="text-xs font-bold text-on-surface w-8 text-right">{item.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChartsSection;
