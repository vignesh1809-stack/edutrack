import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const BottomNavBar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', icon: 'home', path: '/principal/dashboard' },
    { name: 'Students', icon: 'group', path: '/principal/students' },
    { name: 'Reports', icon: 'analytics', path: '/principal/reports' },
    { name: 'Profile', icon: 'account_circle', path: '/principal/profile' }
  ];

  return (
    <nav className="md:hidden fixed bottom-6 left-6 right-6 z-[100] flex justify-around items-center px-4 py-3 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl rounded-2xl shadow-[0_12px_40px_rgba(42,52,57,0.12)] border border-white/40 dark:border-slate-800/40">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <NavLink
            key={item.name}
            to={item.path}
            className={`flex flex-col items-center justify-center px-4 py-1.5 transition-transform active:scale-90 ${
              isActive 
                ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-xl scale-90' 
                : 'text-slate-400 dark:text-slate-500 hover:text-blue-500'
            }`}
          >
            <span 
              className="material-symbols-outlined mb-1" 
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {item.icon}
            </span>
            <span className="font-inter text-[10px] font-semibold uppercase tracking-wider">{item.name}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default BottomNavBar;
