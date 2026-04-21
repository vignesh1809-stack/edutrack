import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const GuardianNavBar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', icon: 'dashboard', path: '/guardian/dashboard' },
    { name: 'Messages', icon: 'chat_bubble', path: '/guardian/faculty-directory' },
    { name: 'Profile', icon: 'person', path: '/guardian/profile' }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-[0px_-10px_30px_rgba(0,0,0,0.03)] rounded-t-3xl border-t-0">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <NavLink
            key={item.name}
            to={item.path}
            className={`flex flex-col items-center justify-center p-2 transition-all active:scale-95 ${
              isActive 
                ? 'bg-blue-600 text-white rounded-2xl px-5 py-2 mt-1 shadow-lg shadow-blue-500/20' 
                : 'text-slate-400 dark:text-slate-500 hover:text-blue-500'
            }`}
          >
            <span 
              className="material-symbols-outlined" 
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {item.icon}
            </span>
            <span className="font-inter text-[11px] font-medium uppercase tracking-wider">
              {item.name}
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default GuardianNavBar;
