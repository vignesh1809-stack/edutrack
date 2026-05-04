import { useSelector } from 'react-redux';

const profileImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAUmoOIr87brIxckUN7bwLt_mWsr-vmFUc73knqo8kTsWbsXiYP0o1r7hYQmBVlm43_YidtlXOL8GyymbwjSii7CF_7GbIPa8fbr2OG1QExQ7FUKngPQ7luAFFxp1IhgcKKXtJrTIVygvuR1pF4U0Z5vgaVmS2CCPv7JC2CabiH2Ov-inXZ2UU1pKvNhCfCQlVUdkSKr_xf9ylBASkWwy60_BG7meIdrm6EAa9EWMmdpkxJua3AUnQKYPNgwjF-OVYH-rqpgzqfTcU',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDSM-eshLrewiM7VP3V0_In_HUlwwcBaiSKa1TTHZlfUxe38Pt_o_-yDpCR7d9up3ozHrVf9DHAjEALSLhbbxyp9gepuquKYRUGKN54z7asDSRpz5w_7ZGXX7Sjp6jiUHKLCjguHewNA9IvUkDwxoZUZZbP_bl5ktezdQsE4-7AXkFNp9C7Hl5OrHhk9aFw-TXlknM0l5bG3fy75GqHl3Oi7UYi6dCfCh0ZJXADzujMfO1B1lYffD8GHdPTRWvhtd4NqH2r9ST09g0',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBNfwwLR1l1EXD0dQ5zLvNz2YVOIqjH_p6UXS3xhLKayW45qdWahSFhRxXWP5YbGJjYCMOMrCvOlpHTCQzFuQFwlt5zFg1ZWo2qaQJW_nMuo8wQCc4cZY6hVBRqw6h8lNc1aBWq7sublF9YxcdXOfiHQH5bGz8z-cEnhfkQnmFLWz1hxjyVMAURtXo-1mTsTLkxs0Btany8TUcbIoXckrnZ5pOAJi4lswWoFGE-YhcgzAIwqSyjRS2uVLvkfBsA5JMEv6Q3RPMbu54',
];

const ActivityList = () => {
  const { data, loading } = useSelector((state) => state.dashboard);
  const { latestRemarks } = data;

  // Only show up to 3 remarks on the dashboard
  const visibleRemarks = latestRemarks ? latestRemarks.slice(0, 3) : [];

  const formatTime = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const Skeleton = () => (
    <div className="flex items-center justify-between pt-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-surface-container"></div>
        <div className="space-y-2">
          <div className="h-4 bg-surface-container rounded w-24"></div>
          <div className="h-3 bg-surface-container rounded w-16"></div>
        </div>
      </div>
      <div className="h-8 bg-surface-container rounded w-12"></div>
    </div>
  );

  return (
    <section className="bg-surface-container-lowest p-4 sm:p-6 rounded-[24px] shadow-sm mb-8 overflow-hidden">
      <div className="flex justify-between items-end mb-6 gap-2">
        <div className="min-w-0">
          <h2 className="text-xl font-extrabold font-headline text-on-surface tracking-tight truncate">Recent Activity</h2>
          <p className="text-xs text-on-surface-variant font-medium mt-1 truncate">Student Performance & Feedback</p>
        </div>
        <button className="text-primary text-xs font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4 shrink-0">
          View All
        </button>
      </div>
      
      <div className="flex flex-col gap-4">
        {loading ? (
          [1, 2, 3].map((i) => <Skeleton key={i} />)
        ) : visibleRemarks.length > 0 ? (
          visibleRemarks.map((remark, idx) => (
            <div key={remark.id} className="flex items-center justify-between group transition-all bg-surface-container-lowest rounded-2xl p-3">
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <img 
                  src={profileImages[idx % profileImages.length]} 
                  alt={remark.studentName}
                  className="w-12 h-12 rounded-2xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-on-surface truncate">{remark.studentName}</span>
                    <span className="text-[10px] text-on-surface-variant font-semibold bg-surface-container px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">
                      ID: {remark.studentCode}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant font-medium mt-0.5 line-clamp-1 group-hover:line-clamp-none transition-all">
                    {remark.content}
                  </p>
                </div>
              </div>
              <div className="text-right ml-2 sm:ml-4 shrink-0">
                <div className="text-[10px] font-bold text-primary uppercase tracking-tighter mb-1">
                  {formatTime(remark.createdAt)}
                </div>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[18px]">reply</span>
                  </button>
                  <button className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors">
                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center">
            <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">info</span>
            <p className="text-sm text-on-surface-variant font-medium">No recent activity found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ActivityList;

