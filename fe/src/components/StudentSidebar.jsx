import React from 'react';
import { NavLink } from 'react-router-dom';

const StudentSidebar = () => {
  const navItems = [
    { name: 'Dashboard', icon: 'dashboard', path: '/student/dashboard' },
    { name: 'Academic', icon: 'school', path: '/student/academic' },
    { name: 'Remarks', icon: 'rate_review', path: '/student/remarks' },
    { name: 'Profile', icon: 'person', path: '/student/profile' }
  ];

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-blue-50/80 to-white/60 backdrop-blur-xl border-r border-white/60 shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex-col p-4 z-40 transition-all duration-200 ease-in-out">
      <div className="mb-10 px-4 py-6">
        <h2 className="font-headline font-extrabold text-blue-700 text-xl">EduTrack Horizon</h2>
        <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">Student Portal</p>
      </div>
      <nav className="space-y-2 flex-grow">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-4 px-4 py-3 rounded-lg transition-transform hover:translate-x-1 ${
                isActive 
                  ? 'bg-white text-blue-700 font-bold shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-200/50 font-medium text-sm'
              }`
            }
          >
            <span 
              className="material-symbols-outlined"
              style={window.location.pathname === item.path ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {item.icon}
            </span>
            <span className="font-medium text-sm">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto bg-white/40 p-4 rounded-xl flex items-center gap-3 shadow-sm border border-white/60">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold overflow-hidden">
          <img 
            alt="student profile" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpsvuMcvBD_soJ9wlesX-Epemify8XgF9QGCIeTJSD3Pe6X_GG22KZFtIQ6lQffzBg2e_Hga-ZW2Azig4iAhU-GhNJqHz72DOzVfFouhhM33165N2IAyBP4VdWmR5N2Y6NIDkOXfEhtgDznuNuu5kJeTaZyv-DmfXRUuZGRDWN2lo2RJov4LRxl5hipAI9j9SvgegsyvBL_xdKM9dxk-64h-Y-07aBHWKgWrcd9axVXk5VaFgepUisY0EZxkPpqlwMRmR6uGDEUA0"
          />
        </div>
        <div>
          <p className="text-sm font-bold text-on-surface">Alexander Sterling</p>
          <p className="text-[10px] text-slate-400">ID: STU-2021-0842</p>
        </div>
      </div>
    </aside>
  );
};

export default StudentSidebar;
