import React, { useState } from 'react';

const ChartsSection = () => {
  const [selectedSubject, setSelectedSubject] = useState('All');

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
      {/* Line Chart Mockup */}
      <div className="bg-surface-container-lowest p-5 rounded-3xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold font-headline text-on-surface">Attendance Trends</h2>
          <span className="material-symbols-outlined text-on-surface-variant">more_vert</span>
        </div>
        {/* Abstract Graphic representation */}
        <div className="relative h-32 flex items-end justify-between gap-1">
          <div className="w-1/12 bg-primary/10 h-1/2 rounded-t-full"></div>
          <div className="w-1/12 bg-primary/20 h-2/3 rounded-t-full"></div>
          <div className="w-1/12 bg-primary/30 h-1/3 rounded-t-full"></div>
          <div className="w-1/12 bg-primary/40 h-3/4 rounded-t-full"></div>
          <div className="w-1/12 bg-primary-dim h-4/5 rounded-t-full"></div>
          <div className="w-1/12 bg-primary h-full rounded-t-full shadow-lg shadow-primary/20"></div>
          <div className="w-1/12 bg-primary/60 h-3/4 rounded-t-full"></div>
          <div className="w-1/12 bg-primary/40 h-1/2 rounded-t-full"></div>
          <div className="w-1/12 bg-primary/20 h-2/3 rounded-t-full"></div>
        </div>
        <div className="flex justify-between mt-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>
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
