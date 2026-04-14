import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const studentsData = [
  {
    id: 'AS-2024-045',
    name: 'Liam Carter',
    roll: '2045',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuK5ea-CQnsg9H3SSK-s00z83Y3RDrl2CCwNPRrC1CFOhGmhe00nej2AU4ZxowY-J1Bs9xECe61LGerMBhWbjSXVMV3Oz7GqAh7XZFovM2Jf_T3Uiiig4A1OdN6c1YTyFStRFVHEOtuCGHXUCiZI0a2X-0Uan49bYv9_zwjl2GIFTr7KaPsrBGCAew5G71ANZtcxGNg8g3z9YgB-Wg71PVdkFJ0gi64eG_WJ542-Lcaa1S1ahlIyyos5wpAY-v52OQJ4bRLuZOFXw',
    status: 'Good',
    statusToken: 'bg-green-50 text-green-700',
    courseDetails: ['CSE | 3rd Year', 'Section A'],
    attendance: '88%',
    avgMarks: '9.2',
    borderStyle: '',
    actionBtn: 'View Portfolio',
    actionStyle: 'bg-secondary-container text-on-secondary-container',
  },
  {
    id: 'AS-2024-102',
    name: 'Sophie Chen',
    roll: '2102',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqCeAq3YNYXEm_mrCqHCTGZDY7T_z389pyA_h-zJuUllUZIeeI-_DgiWJlkkqxNBX1ziPYqeosBKdmlgt-ZfV2wbPFOMA2rtnaJeLxICW1WZeG1rxAH7-DYKHdcN3IurVF--aE70D18mFqEbiF-4o31qeiejfXvax9_16ujFADMf5wHefJw3psnyVnsOGUVjJtg9C_eNkz1tV4UqmxCo2bmedzbDKxtHSjUWxVAQUuG-zj23TdmN7PTdywfEh_wPTZ0Z8xLr_v3LQ',
    status: 'Critical',
    statusToken: 'bg-error-container/20 text-error',
    courseDetails: ['ECE | 3rd Year', 'Section B'],
    attendance: '64%',
    avgMarks: '6.8',
    borderStyle: 'border-l-4 border-error',
    actionBtn: 'Intervene',
    actionStyle: 'bg-error text-white',
    attendBg: 'bg-error-container/10',
    attendText: 'text-error'
  },
  {
    id: 'AS-2024-058',
    name: 'Marcus Thorne',
    roll: '2058',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYlrYyG98vcgIEGJpubKbauNwmV5vgpO94aAecoHOb9PmTtI-Gqvt6CdJdvC1NoGpShfyDgDK3DeYQIVZTlEOsIsVKa8DvexO_knpoZ5p353Pk8gw6Yx0MNNxuoIWgj-ooEvHOw9BUO0bj_GE-3XQEiY-hqP_E6cNQDMrwi4-nXTf1RVwywFkK18wmy3a0WeJqTWelTM-lihZwk6vsQ6I3QIaOKWUqxUT8jJ13uySNndhbHgGl5R-rQ57Hw-fBrKHYkUIk0qpIP64',
    status: 'At Risk',
    statusToken: 'bg-yellow-100 text-yellow-700',
    courseDetails: ['CSE | 3rd Year', 'Section A'],
    attendance: '76%',
    avgMarks: '7.4',
    borderStyle: '',
    actionBtn: 'View Portfolio',
    actionStyle: 'bg-secondary-container text-on-secondary-container'
  },
  {
    id: 'AS-2024-011',
    name: 'Elena Rodriguez',
    roll: '2011',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAI0aUkW7N-_zxmvQiyU00A6_eP6TzFCFMB0PznmEyhjAWAY-zFTpTftFSoAHnwzy0Q1J35rxshZeHgJAyHXKX8Od-5ORu2vyr-TuZVEenFaZp5bSFbs0vGa2i7zs9S1ZjQ58Z7rkrJCPxKCeL7eIJ_kdbT8zE-VZvcwFwtbsx-rQCeBTUGR47JzyncDio-4zY9QhdchM_NavLkmjzJA2Z0zmAINAEdSHrdB9f4lI0XyD4W46fRRjK4XhL81COZudD0PvsErxuOqyI',
    status: 'Good',
    statusToken: 'bg-green-50 text-green-700',
    courseDetails: ['CSE | 3rd Year', 'Section C'],
    attendance: '94%',
    avgMarks: '9.5',
    borderStyle: '',
    actionBtn: 'View Portfolio',
    actionStyle: 'bg-secondary-container text-on-secondary-container'
  }
];

const StudentCard = ({ student, isExpanded, onToggle, viewMode }) => {
  const navigate = useNavigate();

  if (isExpanded) {
    return (
      <div 
        onClick={onToggle}
        className={`bg-surface-container-lowest rounded-2xl p-5 hover:shadow-xl shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col group cursor-pointer ${student.borderStyle} ${viewMode === 'grid' ? 'md:col-span-2' : ''}`}
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
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${student.statusToken}`}>
            {student.status}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {student.courseDetails.map((detail, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded-lg bg-surface-container text-slate-600 text-xs font-medium">
              {detail}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-auto">
          <div className={`p-3 rounded-xl ${student.attendBg || 'bg-surface-container-low'}`}>
            <p className={`text-[10px] uppercase font-bold mb-1 ${student.attendText || 'text-slate-400'}`}>Attendance</p>
            <p className={`text-xl font-bold ${student.attendText || 'text-on-surface'}`}>{student.attendance}</p>
          </div>
          <div className="p-3 rounded-xl bg-surface-container-low">
            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Avg Marks</p>
            <p className="text-xl font-bold text-on-surface">{student.avgMarks}</p>
          </div>
        </div>
        <button onClick={(e) => { e.stopPropagation(); navigate('/student-profile'); }} className={`mt-4 w-full py-2.5 rounded-xl text-sm font-bold opacity-100 transition-opacity ${student.actionStyle}`}>
          {student.actionBtn}
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
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${student.status === 'Critical' || student.status === 'At Risk' ? 'bg-amber-400' : 'bg-emerald-500'}`}></div>
          </div>
          <button className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">expand_more</button>
        </div>
        <h3 className="font-manrope font-bold text-lg text-on-surface group-hover:text-primary transition-colors">{student.name}</h3>
        <p className="text-xs font-medium text-slate-500 mb-4 tracking-tight">ID: #{student.id} • {student.courseDetails[0]}</p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md ${student.statusToken}`}>
            {student.status}
          </span>
          <div className="flex gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Att</span>
              <span className={`text-xs font-bold ${student.attendText || 'text-slate-700'}`}>{student.attendance}</span>
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
        <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${student.status === 'Critical' || student.status === 'At Risk' ? 'bg-amber-400' : 'bg-emerald-500'}`}></div>
      </div>
      <div className="ml-5 flex-1">
        <h3 className="font-manrope font-bold text-on-surface group-hover:text-primary transition-colors">{student.name}</h3>
        <p className="text-xs font-medium text-on-surface-variant">ID: #{student.id} • {student.courseDetails[0]}</p>
      </div>
      <div className="hidden md:flex flex-col items-end mr-8">
        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">Status</span>
        <span className={`text-[10px] font-bold uppercase tracking-wider ${student.statusToken.split(' ')[1]}`}>
          {student.status}
        </span>
      </div>
      <button className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">expand_more</button>
    </div>
  );
};

const StudentDirectory = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [viewMode, setViewMode] = useState('list');

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-6 px-2">
        <div>
          <h2 className="font-manrope font-bold text-xl text-on-surface">Active Students</h2>
          <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wider mt-1">248 Total Registered</p>
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

      {/* Responsive Grid/List container */}
      <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "flex flex-col gap-4"}>
        {studentsData.map(student => (
          <StudentCard 
            key={student.id} 
            student={student} 
            isExpanded={expandedId === student.id} 
            onToggle={() => toggleExpand(student.id)} 
            viewMode={viewMode}
          />
        ))}
      </div>

      {/* Pagination/Footer */}
      <div className="mt-10 pt-6 border-t border-surface-container-low flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400">PAGE 1 OF 12</span>
        <div className="flex gap-4">
          <button className="p-2 rounded-lg bg-surface-container-low text-slate-400 material-symbols-outlined disabled:opacity-50">arrow_back_ios</button>
          <button className="p-2 rounded-lg bg-primary text-on-primary material-symbols-outlined">arrow_forward_ios</button>
        </div>
      </div>
    </section>
  );
};

export default StudentDirectory;
