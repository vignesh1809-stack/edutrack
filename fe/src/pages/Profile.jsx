import React from 'react';
import Sidebar from '../components/Sidebar';
import BottomNavBar from '../components/BottomNavBar';

const Profile = () => {
  return (
    <>
      <Sidebar />
      <main className="flex-1 flex flex-col min-h-screen relative md:pl-80">
        
        {/* Top App Bar */}
        <header className="flex justify-between items-center px-6 h-16 w-full bg-slate-50/70 dark:bg-slate-900/70 backdrop-blur-xl sticky top-0 z-40 shadow-[0px_20px_40px_rgba(42,52,57,0.06)]">
          <div className="flex items-center gap-4">
            <button className="text-blue-600 dark:text-blue-400 hover:bg-slate-200/50 p-2 rounded-full transition-colors active:scale-90">
              <span className="material-symbols-outlined" data-icon="arrow_back">arrow_back</span>
            </button>
            <h1 className="font-headline font-bold text-lg tracking-tight text-on-surface">Staff Profile</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-blue-600 dark:text-blue-400 hover:bg-slate-200/50 p-2 rounded-full transition-colors active:scale-90">
              <span className="material-symbols-outlined" data-icon="edit">edit</span>
            </button>
          </div>
        </header>

        {/* Content Canvas */}
        <div className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full mb-24 md:mb-0">
          
          {/* Focus Plate: Profile Header */}
          <section className="bg-surface-container-lowest rounded-[24px] p-8 mb-8 flex flex-col md:flex-row gap-8 items-center md:items-end relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20"></div>
            <div className="relative group shrink-0">
              <img 
                alt="Profile" 
                className="w-40 h-40 rounded-3xl object-cover shadow-lg border-4 border-white" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFbIi42ymqpjUJ9AkxJTNZH0DIH6TVjJW_jwrrXAUgnzjkGl2r87Xtr-Y86yRoopHD4Mv8V48jarUxf5QtfwngH-Xggnu_1c65umke2pG6Y6n6Z5YfaW8rmuy_RNTncR8WLtu6-2AWhAjmZQZBc-fGDh_U9rMCOpT7Z_cjf_uSVweru9CrnBn4x5eQdlrxz30h31woaHGQV5NOw08-ZhUmnIEVOJ3alolJvmQ_FqUNRWKfMibEEB3GILyDQfp5VE1ZP8fLsBQyjYU"
              />
              <div className="absolute -bottom-2 -right-2 bg-primary text-on-primary p-2 rounded-xl shadow-lg border-2 border-white">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left z-10 w-full">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                <h2 className="text-4xl font-extrabold text-on-surface tracking-tight">Dr. Elena Sterling</h2>
                <span className="px-3 py-1 bg-tertiary-container text-on-tertiary-container text-xs font-bold rounded-full uppercase tracking-wider">Active</span>
              </div>
              <p className="text-xl text-primary font-medium mb-4">Senior Faculty, Humanities Department</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                  <span className="material-symbols-outlined text-primary/60 text-lg">pin_drop</span>
                  Block B, Room 402
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                  <span className="material-symbols-outlined text-primary/60 text-lg">calendar_today</span>
                  Joined Jan 2018
                </div>
              </div>
            </div>
            <div className="hidden lg:flex flex-col items-end gap-2 pb-2 shrink-0 z-10">
              <p className="text-[10px] uppercase font-bold text-outline tracking-[0.2em]">Employee ID</p>
              <p className="text-2xl font-headline font-bold text-on-surface">ED-HUM-284</p>
            </div>
          </section>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Professional Details (Small Plate) */}
            <div className="md:col-span-1 flex flex-col gap-6">
              <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10">
                <h3 className="text-sm font-bold text-outline uppercase tracking-widest mb-6 flex items-center justify-between">
                  Professional Details
                  <span className="material-symbols-outlined text-primary">work</span>
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-on-surface-variant font-medium mb-1">Designation</p>
                    <p className="text-on-surface font-semibold">Senior Professor & Researcher</p>
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant font-medium mb-1">Department</p>
                    <p className="text-on-surface font-semibold">Humanities & Social Sciences</p>
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant font-medium mb-1">Work Status</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <p className="text-on-surface font-semibold">Full-Time Permanent</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Card */}
              <div className="bg-surface-container-low p-6 rounded-2xl border border-primary/5">
                <h3 className="text-sm font-bold text-outline uppercase tracking-widest mb-6 flex items-center justify-between">
                  Connect
                  <span className="material-symbols-outlined text-primary">contact_page</span>
                </h3>
                <div className="space-y-4">
                  <a className="flex items-center gap-4 group" href="#mailto">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all shadow-sm">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-outline font-bold uppercase tracking-tight">Institutional Email</p>
                      <p className="text-sm text-on-surface font-medium truncate">e.sterling@edutrack.edu</p>
                    </div>
                  </a>
                  <a className="flex items-center gap-4 group" href="#tel">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all shadow-sm">
                      <span className="material-symbols-outlined">call</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-outline font-bold uppercase tracking-tight">Office Extension</p>
                      <p className="text-sm text-on-surface font-medium">+1 (555) 0128-44</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Main Focus Content (Large Plate) */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Responsibilities */}
              <div className="bg-surface-container-lowest p-8 rounded-[32px] shadow-sm border border-outline-variant/10">
                <h3 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary-container text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">history_edu</span>
                  </span>
                  Responsibilities & Specializations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container-high transition-colors">
                    <p className="text-sm font-bold text-on-surface-variant mb-2">Academic Taught</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-on-surface">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span> Modern Ethics 401
                      </li>
                      <li className="flex items-center gap-2 text-sm text-on-surface">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span> Sociological Theory
                      </li>
                      <li className="flex items-center gap-2 text-sm text-on-surface">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span> Thesis Supervision
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container-high transition-colors">
                    <p className="text-sm font-bold text-on-surface-variant mb-2">Administrative</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-on-surface">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span> Curriculum Review Board
                      </li>
                      <li className="flex items-center gap-2 text-sm text-on-surface">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span> Faculty Mentor Lead
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-surface-container-highest">
                  <h4 className="text-sm font-bold text-on-surface-variant mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">auto_awesome</span>
                    Research Focus
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-surface-container-low text-on-surface text-sm rounded-xl">Digital Ethics</span>
                    <span className="px-4 py-2 bg-surface-container-low text-on-surface text-sm rounded-xl">Urban Sociology</span>
                    <span className="px-4 py-2 bg-surface-container-low text-on-surface text-sm rounded-xl">Pedagogical Innovation</span>
                  </div>
                </div>
              </div>

              {/* Security & Quick Links */}
              <div className="bg-surface-container-lowest p-8 rounded-[32px] shadow-sm border border-outline-variant/10">
                <h3 className="text-lg font-bold text-on-surface mb-6">Account & Security</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button className="flex flex-col items-center justify-center p-6 bg-surface-container-low rounded-2xl hover:bg-primary-container group transition-all">
                    <span className="material-symbols-outlined text-primary mb-3 group-hover:scale-110 transition-transform">lock_reset</span>
                    <span className="text-sm font-bold text-on-surface">Password</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-6 bg-surface-container-low rounded-2xl hover:bg-primary-container group transition-all">
                    <span className="material-symbols-outlined text-primary mb-3 group-hover:scale-110 transition-transform">notifications</span>
                    <span className="text-sm font-bold text-on-surface">Notifications</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-6 bg-error-container/10 rounded-2xl hover:bg-error-container group transition-all">
                    <span className="material-symbols-outlined text-error mb-3 group-hover:scale-110 transition-transform">logout</span>
                    <span className="text-sm font-bold text-on-error-container">Logout</span>
                  </button>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </main>

      <BottomNavBar />
    </>
  );
};

export default Profile;
