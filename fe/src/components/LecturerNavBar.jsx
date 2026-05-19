import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const LecturerNavBar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', icon: 'grid_view', path: '/staff/dashboard' },
    { name: 'Attendance', icon: 'calendar_month', path: '/staff/attendance' },
    { name: 'Papers', icon: 'description', path: '/staff/papers' },
    { name: 'Profile', icon: 'person', path: '/staff/profile' }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-[0px_-10px_30px_rgba(0,0,0,0.03)] rounded-t-3xl border-t border-slate-100 dark:border-slate-800">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <NavLink
            key={item.name}
            to={item.path}
            className={`flex flex-col items-center justify-center p-2 transition-all active:scale-95 ${
              isActive 
                ? 'text-blue-600 font-bold' 
                : 'text-slate-400 dark:text-slate-500 hover:text-blue-500'
            }`}
          >
            <div className={`flex flex-col items-center transition-all ${isActive ? 'scale-110' : ''}`}>
                <span 
                  className={`material-symbols-outlined text-[28px] mb-1`} 
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                <span className="font-inter text-[10px] font-bold uppercase tracking-widest">
                  {item.name}
                </span>
            </div>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default LecturerNavBar;
