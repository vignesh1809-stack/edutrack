import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setStudentPage } from '../store/actions/studentActions';

const getUIStyles = (status) => {
  switch (status) {
    case 'Critical':
      return {
        statusToken: 'bg-error-container/20 text-error',
        borderStyle: 'border-l-4 border-error',
        actionBtn: 'Intervene',
        actionStyle: 'bg-error text-white',
        attendBg: 'bg-error-container/10',
        attendText: 'text-error',
        dotColor: 'bg-amber-400'
      };
    case 'At Risk':
      return {
        statusToken: 'bg-yellow-100 text-yellow-700',
        borderStyle: '',
        actionBtn: 'View Portfolio',
        actionStyle: 'bg-secondary-container text-on-secondary-container',
        attendBg: 'bg-surface-container-low',
        attendText: 'text-on-surface',
        dotColor: 'bg-amber-400'
      };
    default:
      return {
        statusToken: 'bg-green-50 text-green-700',
        borderStyle: '',
        actionBtn: 'View Portfolio',
        actionStyle: 'bg-secondary-container text-on-secondary-container',
        attendBg: 'bg-surface-container-low',
        attendText: 'text-on-surface',
        dotColor: 'bg-emerald-500'
      };
  }
};

const StudentCard = ({ student, isExpanded, onToggle, viewMode }) => {
  const navigate = useNavigate();
  const styles = getUIStyles(student.status);

  if (isExpanded) {
    return (
      <div 
        onClick={onToggle}
        className={`bg-surface-container-lowest rounded-2xl p-5 hover:shadow-xl shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col group cursor-pointer ${styles.borderStyle} ${viewMode === 'grid' ? 'md:col-span-2' : ''}`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-surface-container-high">
              <img alt={student.name} className="w-full h-full object-cover" src={student.image}/>
            </div>
            <div>
              <h3 className="text-lg font-bold text-on-surface">{student.name}</h3>
              <p className="text-xs font-semibold text-slate-400">ROLL: {student.roll}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles.statusToken}`}>
            {student.status}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {student.courseDetails?.map((detail, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded-lg bg-surface-container text-slate-600 text-xs font-medium">
              {detail}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-auto">
          <div className={`p-3 rounded-xl ${styles.attendBg}`}>
            <p className={`text-[10px] uppercase font-bold mb-1 ${styles.attendText === 'text-on-surface' ? 'text-slate-400' : styles.attendText}`}>Attendance</p>
            <p className={`text-xl font-bold ${styles.attendText}`}>{student.attendance}</p>
          </div>
          <div className="p-3 rounded-xl bg-surface-container-low">
            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Avg Marks</p>
            <p className="text-xl font-bold text-on-surface">{student.avgMarks}</p>
          </div>
        </div>
        <button onClick={(e) => { e.stopPropagation(); navigate('/principal/student-profile'); }} className={`mt-4 w-full py-2.5 rounded-xl text-sm font-bold opacity-100 transition-opacity ${styles.actionStyle}`}>
          {styles.actionBtn}
        </button>
      </div>
    );
  }

  if (!isExpanded && viewMode === 'grid') {
    return (
      <div 
        onClick={onToggle}
        className="group flex flex-col p-5 rounded-2xl bg-surface-container-lowest hover:bg-surface-container-low cursor-pointer transition-all duration-300 shadow-sm border border-transparent hover:border-primary/10 relative"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="relative">
            <img alt={student.name} className="w-16 h-16 rounded-2xl object-cover shadow-sm bg-white" src={student.image}/>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${styles.dotColor}`}></div>
          </div>
          <button className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">expand_more</button>
        </div>
        <h3 className="font-manrope font-bold text-lg text-on-surface group-hover:text-primary transition-colors">{student.name}</h3>
        <p className="text-xs font-medium text-slate-500 mb-4 tracking-tight">ID: #{student.id} • {student.courseDetails?.[0]}</p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md ${styles.statusToken}`}>
            {student.status}
          </span>
          <div className="flex gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Att</span>
              <span className={`text-xs font-bold ${styles.attendText === 'text-on-surface' ? 'text-slate-700' : styles.attendText}`}>{student.attendance}</span>
            </div>
            <div className="flex flex-col items-end pl-4 border-l border-slate-100">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Score</span>
              <span className="text-xs font-bold text-slate-700">{student.avgMarks}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onToggle}
      className="group flex items-center p-4 rounded-2xl bg-surface-container-lowest hover:bg-surface-container-low cursor-pointer transition-all duration-300 shadow-sm"
    >
      <div className="relative">
        <img alt={student.name} className="w-14 h-14 rounded-xl object-cover ring-4 ring-white" src={student.image}/>
        <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${styles.dotColor}`}></div>
      </div>
      <div className="ml-5 flex-1">
        <h3 className="font-manrope font-bold text-on-surface group-hover:text-primary transition-colors">{student.name}</h3>
        <p className="text-xs font-medium text-on-surface-variant">ID: #{student.id} • {student.courseDetails?.[0]}</p>
      </div>
      <div className="hidden md:flex flex-col items-end mr-8">
        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">Status</span>
        <span className={`text-[10px] font-bold uppercase tracking-wider ${styles.statusToken.split(' ')[1]}`}>
          {student.status}
        </span>
      </div>
      <button className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">expand_more</button>
    </div>
  );
};

const StudentDirectory = () => {
  const dispatch = useDispatch();
  const { data, pagination, loading, error } = useSelector(state => state.students);
  
  const [expandedId, setExpandedId] = useState(null);
  const [viewMode, setViewMode] = useState('list');

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const handlePrevPage = () => {
    if (!pagination.first) {
      dispatch(setStudentPage(pagination.page - 1));
    }
  };

  const handleNextPage = () => {
    if (!pagination.last) {
      dispatch(setStudentPage(pagination.page + 1));
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-6 px-2">
        <div>
          <h2 className="font-manrope font-bold text-xl text-on-surface">Active Students</h2>
          <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wider mt-1">{pagination.totalElements} Total Registered</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg material-symbols-outlined transition-colors ${viewMode === 'list' ? 'text-primary bg-primary-container/30' : 'text-slate-400 hover:bg-surface-container-low'}`}
          >
            view_list
          </button>
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg material-symbols-outlined transition-colors ${viewMode === 'grid' ? 'text-primary bg-primary-container/30' : 'text-slate-400 hover:bg-surface-container-low'}`}
          >
            grid_view
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="p-6 text-center text-error bg-error-container/20 rounded-2xl">
          <p>Error loading students: {error}</p>
        </div>
      ) : data?.length === 0 ? (
        <div className="p-12 text-center text-slate-500 bg-surface-container-lowest rounded-2xl border border-dashed border-slate-300">
          <span className="material-symbols-outlined text-4xl mb-2 text-slate-300">person_off</span>
          <p className="font-medium">No students found matching your criteria.</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "flex flex-col gap-4"}>
          {data?.map(student => (
            <StudentCard 
              key={student.id} 
              student={student} 
              isExpanded={expandedId === student.id} 
              onToggle={() => toggleExpand(student.id)} 
              viewMode={viewMode}
            />
          ))}
        </div>
      )}

      {/* Pagination/Footer */}
      {data?.length > 0 && (
        <div className="mt-10 pt-6 border-t border-surface-container-low flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            PAGE {pagination.totalPages > 0 ? pagination.page + 1 : 0} OF {pagination.totalPages}
          </span>
          <div className="flex gap-4">
            <button 
              onClick={handlePrevPage}
              disabled={pagination.first || loading}
              className={`p-2 rounded-lg material-symbols-outlined ${pagination.first ? 'bg-surface-container-low text-slate-300 cursor-not-allowed' : 'bg-surface-container-low text-slate-600 hover:text-primary transition-colors'}`}
            >
              arrow_back_ios
            </button>
            <button 
              onClick={handleNextPage}
              disabled={pagination.last || loading}
              className={`p-2 rounded-lg material-symbols-outlined ${pagination.last ? 'bg-surface-container-low text-slate-300 cursor-not-allowed' : 'bg-primary text-on-primary hover:bg-primary/90 transition-colors'}`}
            >
              arrow_forward_ios
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default StudentDirectory;
