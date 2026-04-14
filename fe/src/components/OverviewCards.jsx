import React from 'react';

const OverviewCards = () => {
  return (
    <section className="grid grid-cols-2 gap-4">
      {/* Card 1 */}
      <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border-b-2 border-primary/10">
        <div className="flex justify-between items-start mb-3">
          <span className="material-symbols-outlined text-primary text-3xl">groups</span>
          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">+12</span>
        </div>
        <div className="text-2xl font-black text-on-surface font-headline">1,248</div>
        <div className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mt-1">Total Students</div>
      </div>
      {/* Card 2 */}
      <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border-b-2 border-primary/10">
        <div className="flex justify-between items-start mb-3">
          <span className="material-symbols-outlined text-primary text-3xl">how_to_reg</span>
          <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">-2.1%</span>
        </div>
        <div className="text-2xl font-black text-on-surface font-headline">94.2%</div>
        <div className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mt-1">Attendance</div>
      </div>
      {/* Card 3 */}
      <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border-b-2 border-primary/10">
        <div className="flex justify-between items-start mb-3">
          <span className="material-symbols-outlined text-primary text-3xl">directions_bus</span>
          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">On time</span>
        </div>
        <div className="text-2xl font-black text-on-surface font-headline">12/14</div>
        <div className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mt-1">Busses Arrived</div>
      </div>
      {/* Card 4 */}
      <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border-b-2 border-primary/10">
        <div className="flex justify-between items-start mb-3">
          <span className="material-symbols-outlined text-primary text-3xl">pending_actions</span>
          <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">3 Today</span>
        </div>
        <div className="text-2xl font-black text-on-surface font-headline">07</div>
        <div className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mt-1">Pending Remarks</div>
      </div>
    </section>
  );
};

export default OverviewCards;
