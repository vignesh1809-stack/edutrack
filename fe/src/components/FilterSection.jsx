import React from 'react';

const FilterSection = () => {
  return (
    <section className="flex gap-3 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
      <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest text-primary font-semibold rounded-full shadow-sm whitespace-nowrap border-primary border">
        <span className="material-symbols-outlined text-[18px]">account_balance</span>
        <span className="text-xs uppercase tracking-wider font-bold">Main Branch</span>
      </button>
      <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-low text-on-surface-variant rounded-full whitespace-nowrap">
        <span className="text-xs uppercase tracking-wider font-bold">Year 2024</span>
        <span className="material-symbols-outlined text-[18px]">expand_more</span>
      </button>
      <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-low text-on-surface-variant rounded-full whitespace-nowrap">
        <span className="text-xs uppercase tracking-wider font-bold">Section B</span>
        <span className="material-symbols-outlined text-[18px]">expand_more</span>
      </button>
      <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-low text-on-surface-variant rounded-full whitespace-nowrap">
        <span className="material-symbols-outlined text-[18px]">filter_list</span>
        <span className="text-xs uppercase tracking-wider font-bold">More</span>
      </button>
    </section>
  );
};

export default FilterSection;
