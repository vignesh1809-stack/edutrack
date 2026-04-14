import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const BottomNavBar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', icon: 'home', path: '/' },
    { name: 'Students', icon: 'group', path: '/students' },
    { name: 'Reports', icon: 'analytics', path: '/reports' },
    { name: 'Profile', icon: 'account_circle', path: '/profile' }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-[100] flex justify-around items-center px-4 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.04)] border-t border-slate-100 dark:border-slate-800 pb-safe">
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
