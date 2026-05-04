import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchStaffAttendanceGraphRequest, 
  fetchAssessmentTypesRequest, 
  fetchMarksDistributionRequest 
} from '../store/actions/dashboardActions';

const ChartsSection = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { 
    graphData, graphLoading, graphError, filters,
    availableAssessmentTypes, marksDistribution, marksLoading, marksError 
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchStaffAttendanceGraphRequest({ days: 7, filters }));
    dispatch(fetchAssessmentTypesRequest(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    if (availableAssessmentTypes && availableAssessmentTypes.length > 0) {
      if (!selectedType || !availableAssessmentTypes.includes(selectedType)) {
        setSelectedType(availableAssessmentTypes[0]);
      }
    } else {
        setSelectedType(null);
    }
  }, [availableAssessmentTypes]);

  useEffect(() => {
    if (selectedType) {
      dispatch(fetchMarksDistributionRequest({ type: selectedType, filters }));
    }
  }, [dispatch, selectedType, filters]);

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
                    style={{ 
                      // Logarithmic scaling to emphasize variations in lower ranges 
                      // height = log10(val + 1) / log10(101) * 100
                      height: `${Math.max(10, (Math.log10(day.percentage + 1) / Math.log10(101)) * 100)}%` 
                    }}
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

      {/* Marks Distribution */}
      <div className="bg-surface-container-lowest p-5 rounded-3xl shadow-sm relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold font-headline text-on-surface">Marks Distribution</h2>
          <div 
            onClick={() => setIsTypeModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-high hover:bg-surface-container-highest rounded-xl cursor-pointer transition-colors group"
          >
            <span className="text-[11px] font-bold text-primary uppercase tracking-tight">{selectedType || 'Select Type'}</span>
            <span className="material-symbols-outlined text-primary text-lg group-hover:translate-y-0.5 transition-transform">expand_more</span>
          </div>
        </div>

        {marksLoading ? (
            <div className="space-y-4 animate-pulse">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="w-14 h-3 bg-surface-container rounded-full"></div>
                        <div className="flex-1 h-3 bg-surface-container rounded-full"></div>
                        <div className="w-8 h-3 bg-surface-container rounded-full"></div>
                    </div>
                ))}
            </div>
        ) : marksError ? (
            <div className="flex items-center justify-center py-10 text-red-500 text-sm">
                <span className="material-symbols-outlined mr-2">error</span>
                {marksError}
            </div>
        ) : marksDistribution && marksDistribution.length > 0 ? (
            <div className="space-y-4">
              {marksDistribution.map((item, idx) => {
                const colorMap = {
                  'primary': 'bg-primary',
                  'tertiary': 'bg-tertiary',
                  'secondary': 'bg-secondary',
                  'error': 'bg-error'
                };
                const barColor = colorMap[item.color] || 'bg-primary';
                
                return (
                  <div key={idx} className="flex items-center gap-3 group">
                    <span className="text-xs font-bold w-14 text-on-surface-variant uppercase tracking-tighter whitespace-nowrap">{item.grade}</span>
                    <div className="flex-1 h-3 bg-surface-container rounded-full overflow-hidden">
                      <div className={`h-full ${barColor} rounded-full transition-all duration-500`} style={{ width: item.width }}></div>
                    </div>
                    <span className="text-xs font-bold text-on-surface w-8 text-right">{item.percent}%</span>
                  </div>
                );
              })}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center py-10 text-on-surface-variant text-sm text-center">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-20">analytics</span>
                <p className="font-medium">No distribution data available</p>
                <p className="text-xs opacity-60">Try selecting a different filter or assignment type</p>
            </div>
        )}

        {/* Assignment Type Selection Modal */}
        {isTypeModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity">
            <div className="w-full max-w-sm bg-surface-container-lowest rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="px-6 py-5 border-b border-surface-container flex items-center justify-between">
                <h3 className="font-headline font-bold text-xl text-on-surface">Select Type</h3>
                <button 
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors" 
                  onClick={() => setIsTypeModalOpen(false)}
                >
                  <span className="material-symbols-outlined text-on-surface-variant">close</span>
                </button>
              </div>
              <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
                {availableAssessmentTypes && availableAssessmentTypes.length > 0 ? (
                    availableAssessmentTypes.map((type) => (
                      <button 
                        key={type}
                        onClick={() => {
                          setSelectedType(type);
                          setIsTypeModalOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-colors group ${
                          selectedType === type 
                            ? 'bg-primary-container text-on-primary-container' 
                            : 'hover:bg-surface-container text-on-surface'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined">
                            {selectedType === type ? 'check_circle' : 'assignment'}
                          </span>
                          <span className={selectedType === type ? 'font-semibold' : 'font-medium'}>
                            {type}
                          </span>
                        </div>
                      </button>
                    ))
                ) : (
                    <div className="p-8 text-center text-on-surface-variant text-sm">
                        No assignment types found for current filters.
                    </div>
                )}
              </div>
            </div>
            <div className="absolute inset-0 -z-10" onClick={() => setIsTypeModalOpen(false)}></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ChartsSection;
