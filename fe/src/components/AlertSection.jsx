import React from 'react';

const AlertSection = () => {
  return (
    <section className="bg-tertiary-container/40 p-4 rounded-2xl flex items-start gap-4">
      <div className="bg-tertiary p-2 rounded-xl text-on-tertiary shadow-sm">
        <span className="material-symbols-outlined">notifications_active</span>
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-bold text-on-tertiary-container">Weekly Attendance Alert</h3>
        <p className="text-xs text-on-tertiary-container/80 mt-1">
          Section B attendance dropped by 4% this week. Review pending remarks.
        </p>
      </div>
      <button className="text-on-tertiary-container">
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>
    </section>
  );
};

export default AlertSection;
