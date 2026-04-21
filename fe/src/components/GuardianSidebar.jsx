import React from 'react';
import { NavLink } from 'react-router-dom';

const GuardianSidebar = () => {
  const navItems = [
    { name: 'Home', icon: 'dashboard', path: '/guardian/dashboard' },
    { name: 'Messages', icon: 'chat_bubble', path: '/guardian/faculty-directory' },
    { name: 'Profile', icon: 'person', path: '/guardian/profile' }
  ];

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-blue-50/80 to-white/60 backdrop-blur-xl border-r border-white/60 shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex-col p-4 z-40 transition-all duration-200 ease-in-out">
      <div className="mb-10 px-4 py-6">
        <h2 className="font-headline font-extrabold text-blue-700 text-xl">EduTrack Horizon</h2>
        <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">Guardian Portal</p>
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
            alt="Sarah Sterling" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuClQKhXwVQr2CROipVsZFX6eligluBRzByT4Q5olS6K_7KelKQ9mPwYXLrySmvobZCF9pS2lo-qq2AXhkGt4D7fU4OhLSL2aAedrn6WknhiMg9j6dORPyypdudnQDTltm6LDqbYraZWrJfJGYeSgaulQwA1AT93o5aGBN0-Z7RT-Cj-hOham_3XUDhQfQD_9L-5GJucZbghadEn-wDFNHMWOMrL_VVciwa5LIi9Yf6NLv3ocjP_y-JJDhYZl4NvAn7AsfwG7kfkLAY"
          />
        </div>
        <div>
          <p className="text-sm font-bold text-on-surface">Sarah Sterling</p>
          <p className="text-[10px] text-slate-400">Guardian ID: #8821</p>
        </div>
      </div>
    </aside>
  );
};

export default GuardianSidebar;
