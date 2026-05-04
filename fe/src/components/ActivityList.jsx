import { useSelector } from 'react-redux';

const ActivityList = () => {
  const { data, loading } = useSelector((state) => state.dashboard);
  const { latestRemarks } = data;

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
        ) : latestRemarks && latestRemarks.length > 0 ? (
          latestRemarks.map((remark) => (
            <div key={remark.id} className="flex items-center justify-between group transition-all bg-surface-container-lowest rounded-2xl p-3">
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined">person</span>
                </div>
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
