import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', icon: 'dashboard', path: '/' },
  { name: 'Students', icon: 'group', path: '/students' },
  { name: 'Reports', icon: 'analytics', path: '/reports' },
  { name: 'Profile', icon: 'account_circle', path: '/profile' },
  { name: 'Attendance', icon: 'calendar_today', path: '/attendance' },
  { name: 'Settings', icon: 'settings', path: '/settings' },
];

const Sidebar = () => {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full w-72 bg-surface-container-low flex-col p-4 z-40 transition-all duration-200 ease-in-out">
      <div className="mb-10 px-4 py-6">
        <h2 className="font-headline font-extrabold text-blue-700 text-xl">EduTrack Horizon</h2>
        <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">Main Campus</p>
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
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className={`font-medium text-sm ${window.location.pathname === item.path ? 'font-bold' : ''}`}>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto bg-surface-container-lowest p-4 rounded-xl flex items-center gap-3 shadow-sm border border-slate-100">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">AH</div>
        <div>
          <p className="text-sm font-bold text-on-surface">Admin User</p>
          <p className="text-[10px] text-slate-400">Main Campus</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
