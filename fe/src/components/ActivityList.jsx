import React from 'react';

const ActivityList = () => {
  return (
    <section className="bg-surface-container-lowest p-6 rounded-[24px] shadow-sm mb-8">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-xl font-extrabold font-headline text-on-surface tracking-tight">Recent Activity</h2>
          <p className="text-xs text-on-surface-variant font-medium mt-1">Student Performance Highlights</p>
        </div>
        <button className="text-primary text-xs font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
          View All
        </button>
      </div>
      <div className="divide-y divide-surface-container space-y-4">
        {/* Student 1 */}
        <div className="flex items-center justify-between pt-4 first:pt-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-secondary-container overflow-hidden">
              <img 
                alt="Student 1" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNfwwLR1l1EXD0dQ5zLvNz2YVOIqjH_p6UXS3xhLKayW45qdWahSFhRxXWP5YbGJjYCMOMrCvOlpHTCQzFuQFwlt5zFg1ZWo2qaQJW_nMuo8wQCc4cZY6hVBRqw6h8lNc1aBWq7sublF9YxcdXOfiHQH5bGz8z-cEnhfkQnmFLWz1hxjyVMAURtXo-1mTsTLkxs0Btany8TUcbIoXckrnZ5pOAJi4lswWoFGE-YhcgzAIwqSyjRS2uVLvkfBsA5JMEv6Q3RPMbu54"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-on-surface">Liam Carter</div>
              <div className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider">Roll No: 2045</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-black text-primary">98%</div>
            <div className="flex gap-2 mt-1">
              <button className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px]">edit</span>
              </button>
              <button className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">visibility</span>
              </button>
            </div>
          </div>
        </div>
        {/* Student 2 */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-secondary-container overflow-hidden">
              <img 
                alt="Student 2" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUmoOIr87brIxckUN7bwLt_mWsr-vmFUc73knqo8kTsWbsXiYP0o1r7hYQmBVlm43_YidtlXOL8GyymbwjSii7CF_7GbIPa8fbr2OG1QExQ7FUKngPQ7luAFFxp1IhgcKKXtJrTIVygvuR1pF4U0Z5vgaVmS2CCPv7JC2CabiH2Ov-inXZ2UU1pKvNhCfCQlVUdkSKr_xf9ylBASkWwy60_BG7meIdrm6EAa9EWMmdpkxJua3AUnQKYPNgwjF-OVYH-rqpgzqfTcU"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-on-surface">Sophia Vance</div>
              <div className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider">Roll No: 2046</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-black text-error">72%</div>
            <div className="flex gap-2 mt-1">
              <button className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px]">edit</span>
              </button>
              <button className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">visibility</span>
              </button>
            </div>
          </div>
        </div>
        {/* Student 3 */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-secondary-container overflow-hidden">
              <img 
                alt="Student 3" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSM-eshLrewiM7VP3V0_In_HUlwwcBaiSKa1TTHZlfUxe38Pt_o_-yDpCR7d9up3ozHrVf9DHAjEALSLhbbxyp9gepuquKYRUGKN54z7asDSRpz5w_7ZGXX7Sjp6jiUHKLCjguHewNA9IvUkDwxoZUZZbP_bl5ktezdQsE4-7AXkFNp9C7Hl5OrHhk9aFw-TXlknM0l5bG3fy75GqHl3Oi7UYi6dCfCh0ZJXADzujMfO1B1lYffD8GHdPTRWvhtd4NqH2r9ST09g0"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-on-surface">Marcus Zhou</div>
              <div className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider">Roll No: 2047</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-black text-primary">89%</div>
            <div className="flex gap-2 mt-1">
              <button className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px]">edit</span>
              </button>
              <button className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">visibility</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivityList;
