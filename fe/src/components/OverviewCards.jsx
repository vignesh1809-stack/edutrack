import { useSelector } from 'react-redux';

const OverviewCards = () => {
  const { data, loading } = useSelector((state) => state.dashboard);

  const Skeleton = () => (
    <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm animate-pulse">
      <div className="flex justify-between items-start mb-3">
        <div className="w-10 h-10 bg-surface-container rounded-lg"></div>
        <div className="w-12 h-4 bg-surface-container rounded-full"></div>
      </div>
      <div className="h-8 bg-surface-container rounded w-2/3 mb-2"></div>
      <div className="h-3 bg-surface-container rounded w-1/2"></div>
    </div>
  );

  if (loading) {
    return (
      <section className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => <Skeleton key={i} />)}
      </section>
    );
  }

  return (
    <section className="grid grid-cols-2 gap-4">
      {/* Card 1: Total Students */}
      <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm transition-all hover:shadow-md">
        <div className="flex justify-between items-start mb-3">
          <span className="material-symbols-outlined text-primary text-3xl">groups</span>
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Active</span>
        </div>
        <div className="text-2xl font-black text-on-surface font-headline">{data.totalStudents.toLocaleString()}</div>
        <div className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mt-1">Total Students</div>
      </div>

      {/* Card 2: Attendance */}
      <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm transition-all hover:shadow-md">
        <div className="flex justify-between items-start mb-3">
          <span className="material-symbols-outlined text-primary text-3xl">how_to_reg</span>
          <span className={`text-[10px] font-bold ${data.attendancePercentageToday >= 75 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'} px-2 py-0.5 rounded-full`}>
            {data.studentsMarkedToday} Marked
          </span>
        </div>
        <div className="text-2xl font-black text-on-surface font-headline">{data.attendancePercentageToday}%</div>
        <div className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mt-1">Daily Attendance</div>
      </div>

      {/* Card 3: Busses */}
      <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm transition-all hover:shadow-md">
        <div className="flex justify-between items-start mb-3">
          <span className="material-symbols-outlined text-primary text-3xl">directions_bus</span>
          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Tracking</span>
        </div>
        <div className="text-2xl font-black text-on-surface font-headline">{data.busesArrivedToday}/{data.totalBuses}</div>
        <div className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mt-1">Busses Arrived</div>
      </div>

      {/* Card 4: Remarks */}
      <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm transition-all hover:shadow-md">
        <div className="flex justify-between items-start mb-3">
          <span className="material-symbols-outlined text-primary text-3xl">pending_actions</span>
          <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">
            {data.remarksSubmittedToday} New
          </span>
        </div>
        <div className="text-2xl font-black text-on-surface font-headline">{data.totalRemarks}</div>
        <div className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mt-1">Total Remarks</div>
      </div>
    </section>
  );
};

export default OverviewCards;
