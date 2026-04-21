import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const StudentProfile = () => {
  const navigate = useNavigate();

  const [selectedSubject, setSelectedSubject] = useState('Math');

  const performanceData = {
    Math: [
      { label: "Quiz 1", score: 92, height: "92%" },
      { label: "Midterm", score: 88, height: "88%" },
      { label: "Quiz 2", score: 95, height: "95%" },
      { label: "Project", score: 90, height: "90%" },
      { label: "Final", score: 94, height: "94%" }
    ],
    Physics: [
      { label: "Quiz 1", score: 85, height: "85%" },
      { label: "Midterm", score: 78, height: "78%" },
      { label: "Quiz 2", score: 82, height: "82%" },
      { label: "Lab", score: 95, height: "95%" },
      { label: "Final", score: 88, height: "88%" }
    ],
    History: [
      { label: "Essay 1", score: 88, height: "88%" },
      { label: "Midterm", score: 82, height: "82%" },
      { label: "Essay 2", score: 90, height: "90%" },
      { label: "Project", score: 85, height: "85%" },
      { label: "Final", score: 86, height: "86%" }
    ]
  };

  const averageMark = (performanceData[selectedSubject].reduce((acc, curr) => acc + curr.score, 0) / performanceData[selectedSubject].length).toFixed(1);

  return (
    <>
      <Sidebar />
      
      {/* Top Navigation Shell (Mobile) */}
      <header className="fixed top-0 w-full z-50 bg-[#f7f9fb]/70 backdrop-blur-md shadow-[0px_20px_40px_rgba(42,52,57,0.06)] md:hidden">
        <div className="flex items-center justify-between px-6 py-4 w-full">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="material-symbols-outlined text-blue-600">arrow_back</button>
            <h1 className="font-headline font-bold text-2xl tracking-tight text-slate-800">Student Profile</h1>
          </div>
          <img 
            alt="Admin Profile" 
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOLGPZqsGH3qHTFpPx87WojLAJKUQgMxbG4eEX8YFv8yIQD6SfiP34SObY_-LP0RAiF4tCVcnJfplblO9hWqmvEI_bs0dYsZnN8t1-sdzjZbBPJxn3UGNhEtv7d0-rr9FkjhuuwBtIFQn4MQdgKgxXQCqZrF0tThemI7jQs2STfTsPbhDuDdbgvfT9RM1JHI5ZMnUwCxaymm9BP1RqG7EL3F-hKST65VowCs7_erogspXUQJMz5tu1n5T5TPsJzw_IjDDEUhqrvAg"
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-24 md:pt-12 pb-32 md:pb-12 md:pl-72 bg-surface min-h-screen">
        
        {/* Alerts Banner */}
        <div className="mb-8 p-4 bg-error-container/10 border-l-4 border-error rounded-xl flex items-center gap-4 shadow-sm">
          <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
          <div>
            <p className="text-error font-bold text-sm">Academic Alert</p>
            <p className="text-on-error-container text-xs mt-0.5">Attendance dropped to 72% in November. Immediate attention required.</p>
          </div>
        </div>

        {/* Hero Section: Student Identity */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-end">
          <div className="lg:col-span-8 flex flex-col md:flex-row items-center md:items-end gap-8">
            <div className="relative group">
              <img 
                alt="Student Avatar" 
                className="w-40 h-40 rounded-3xl object-cover shadow-[0px_20px_40px_rgba(42,52,57,0.1)] transition-transform duration-300 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0bDwNT12BTfMdS5gEPoglxVgGvDwhozbDMv2MTW7XFgkx_jEYZacQf_EQEL3R85cHt3G4HCZCE4FmXNL4TeolkLc_Ci-AeicqAhzjgAHSR61fLk48dhxw2wkmRjDUfySNRxwcr66LTXy3FQv6HMLQJ8GRjUW1Mzc_8zXf21hgJ2FxFdqJC-mExCJDKkypx5hTRTawEUQqE-jFonYA8SyOyqi7ylnuiFJT0qf76fwWLTQd4Xy3z3IoC0zkjYx9AdK82zuPlMQcwIA"
              />
              <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl shadow-lg">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
            </div>
            <div className="text-center md:text-left">
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-tertiary-container text-on-tertiary-container rounded-full text-[10px] font-bold tracking-wider uppercase">Active Enrollment</span>
                <span className="text-slate-400 text-sm font-medium tracking-tight">ID: #ED-2024-0891</span>
              </div>
              <h2 className="font-headline font-extrabold text-4xl md:text-5xl text-on-surface tracking-tight">Alexander Sterling</h2>
              <p className="text-slate-500 font-medium text-lg mt-1">Sophomore • Computer Science Major</p>
            </div>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row justify-center lg:justify-end gap-3 pb-2">
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-outline-variant/20 text-on-surface font-semibold rounded-xl hover:shadow-md transition-all active:scale-95 shadow-sm">
              <span className="material-symbols-outlined text-xl">mail</span>
              Message
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-br from-primary to-primary-dim text-white font-bold rounded-xl shadow-lg hover:shadow-primary/30 transition-all active:scale-95">
              <span className="material-symbols-outlined text-xl">download</span>
              Report Card
            </button>
          </div>
        </section>

        {/* Main Bento Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Academic Performance Bento */}
          <div className="lg:col-span-2 bg-surface-container-lowest rounded-3xl p-8 shadow-[0px_20px_40px_rgba(42,52,57,0.04)] group">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-headline font-bold text-xl text-on-surface">Academic Performance</h3>
              <div className="flex gap-2 items-center flex-wrap justify-end">
                <select 
                  value={selectedSubject} 
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="bg-surface-container-high border-none outline-none rounded-lg px-2 py-1 text-[11px] font-bold text-slate-700 focus:ring-2 focus:ring-primary cursor-pointer hover:bg-surface-container-highest transition-colors"
                >
                  <option value="Math">Math</option>
                  <option value="Physics">Physics</option>
                  <option value="History">History</option>
                </select>
                <span className="px-3 py-1 bg-surface-container text-slate-600 rounded-lg text-xs font-bold hidden sm:block whitespace-nowrap">Fall Semester</span>
                <button className="material-symbols-outlined text-slate-400 hover:bg-slate-100 rounded-full transition-colors hidden sm:block">more_horiz</button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-12 items-center">
              {/* Custom Bar Chart (Asymmetric Visual) */}
              <div className="flex-grow w-full flex items-end justify-between gap-2 sm:gap-4 h-48 px-1 sm:px-4">
                {performanceData[selectedSubject].map((item, idx) => (
                  <div key={idx} className="group/bar flex-1 flex flex-col items-center gap-2 h-full justify-end relative">
                    <div className="w-full max-w-[1.5rem] sm:max-w-[2rem] md:max-w-[3rem] bg-primary-container rounded-t-xl transition-all duration-500 group-hover/bar:bg-primary" style={{ height: item.height }}></div>
                    <span className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-tighter text-center">{item.label}</span>
                    <span className="text-xs font-bold text-primary absolute -top-5 opacity-0 group-hover/bar:opacity-100 transition-opacity">{item.score}</span>
                  </div>
                ))}
              </div>
              
              {/* Metric Focus Card */}
              <div className="w-full md:w-48 bg-surface-container-low rounded-2xl p-6 flex flex-col items-center text-center shrink-0">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Average Marks</span>
                <div className="text-4xl font-headline font-extrabold text-blue-700">{averageMark}%</div>
                <div className="mt-4 flex items-center justify-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <span className="material-symbols-outlined text-sm font-bold">trending_up</span>
                  <span className="text-[10px] font-extrabold tracking-wide">+2.4% vs LY</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Financial Status Bento (NEW SECTION) */}
          <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-[0px_20px_40px_rgba(42,52,57,0.04)] flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <span className="material-symbols-outlined text-6xl">payments</span>
            </div>
            <h3 className="font-headline font-bold text-xl text-on-surface mb-6">Financial Status</h3>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pending Dues</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-headline font-extrabold text-error">$1,200</span>
                  <span className="text-slate-400 text-sm font-medium">USD</span>
                </div>
              </div>
              <div className="flex items-center gap-4 py-4 border-y border-slate-100">
                <div className="w-10 h-10 bg-error-container/10 text-error rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined">event_busy</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Due Date</p>
                  <p className="text-sm font-bold text-on-surface">Dec 15, 2023</p>
                </div>
              </div>
              <button className="w-full py-4 bg-surface-container-low text-blue-700 font-bold rounded-2xl hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 hover:shadow-sm active:scale-95">
                Pay Now
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Attendance Metric Card */}
          <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-[0px_20px_40px_rgba(42,52,57,0.04)] flex flex-col justify-between overflow-hidden">
            <div>
              <h3 className="font-headline font-bold text-xl text-on-surface mb-6">Attendance Overview</h3>
              <div className="flex items-center gap-5">
                <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90 absolute">
                    <circle className="text-slate-100" cx="48" cy="48" fill="transparent" r="42" stroke="currentColor" strokeWidth="10"></circle>
                    <circle className="text-blue-600" cx="48" cy="48" fill="transparent" r="42" stroke="currentColor" strokeDasharray="263.89" strokeDashoffset="75.5" strokeWidth="10" strokeLinecap="round"></circle>
                  </svg>
                  <div className="flex flex-col items-center justify-center z-10 w-full h-full rounded-full shadow-inner bg-white bg-opacity-50">
                     <span className="font-extrabold text-2xl text-slate-800">72%</span>
                  </div>
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-semibold tracking-wide uppercase mb-1">Total Presents</p>
                  <p className="font-extrabold text-2xl text-on-surface">144 <span className="text-slate-400 text-lg font-medium">/ 200</span></p>
                </div>
              </div>
            </div>
            
            {/* 6-Month Trend Visual */}
            <div className="mt-8">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">6-Month Trend</p>
              <div className="flex items-end justify-between h-20 gap-1 px-2 border-b-2 border-slate-100 pb-2">
                <div className="w-3 bg-blue-200 rounded-t-full h-[80%] hover:bg-blue-400 transition-colors"></div>
                <div className="w-3 bg-blue-200 rounded-t-full h-[90%] hover:bg-blue-400 transition-colors"></div>
                <div className="w-3 bg-blue-200 rounded-t-full h-[85%] hover:bg-blue-400 transition-colors"></div>
                <div className="w-3 bg-blue-200 rounded-t-full h-[95%] hover:bg-blue-400 transition-colors"></div>
                <div className="w-3 bg-error-container rounded-t-full h-[40%] group relative cursor-pointer">
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-error text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">72%</span>
                </div>
                <div className="w-3 bg-blue-200 rounded-t-full h-[75%] hover:bg-blue-400 transition-colors"></div>
              </div>
              <div className="flex justify-between mt-2 text-[9px] font-bold text-slate-400 uppercase px-1">
                <span>Jun</span>
                <span>Nov</span>
              </div>
            </div>
          </div>
          
          {/* Remarks Section (MODIFIED) */}
          <div className="lg:col-span-2 bg-surface-container-lowest rounded-3xl p-8 shadow-[0px_20px_40px_rgba(42,52,57,0.04)]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-headline font-bold text-xl text-on-surface">Recent Remarks</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-surface-container text-blue-700 rounded-xl text-sm font-bold hover:bg-blue-50 transition-colors active:scale-95">
                <span className="material-symbols-outlined text-lg">add_circle</span>
                Add Remark
              </button>
            </div>
            <div className="space-y-6">
              {/* Teacher Remark */}
              <div className="flex gap-4 p-4 rounded-2xl bg-surface-container-low/50 hover:bg-surface-container-low transition-colors group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-50 flex-shrink-0 flex items-center justify-center text-blue-500 font-bold border-2 border-white shadow-sm">DR</div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h4 className="font-bold text-on-surface text-sm md:text-base">Dr. Sarah Richardson</h4>
                      <span className="text-[9px] font-bold text-primary uppercase tracking-tighter bg-primary/10 px-2 py-0.5 rounded-full inline-block mt-1">Staff Remark</span>
                    </div>
                    <span className="text-[10px] font-medium text-slate-400 bg-surface-container px-2 py-0.5 rounded">Oct 24, 2023</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mt-2 max-w-2xl">Alexander shows great potential in algorithm design but needs to focus more on documentation and peer review participation.</p>
                </div>
              </div>

              {/* Guardian Remark */}
              <div className="flex gap-4 p-4 rounded-2xl border border-slate-100/50 hover:bg-surface-container-low transition-colors group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-tertiary-container/30 flex-shrink-0 flex items-center justify-center text-on-tertiary-container font-bold border-2 border-white shadow-sm">MS</div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h4 className="font-bold text-on-surface text-sm md:text-base">Mary Sterling</h4>
                      <span className="text-[9px] font-bold text-tertiary uppercase tracking-tighter bg-tertiary-container/40 px-2 py-0.5 rounded-full inline-block mt-1">Guardian Remark</span>
                    </div>
                    <span className="text-[10px] font-medium text-slate-400 bg-surface-container px-2 py-0.5 rounded">Nov 15, 2023</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mt-2 italic max-w-2xl">"He has been feeling unwell lately, which explains the recent absence. We are working to catch him up on the missed lectures."</p>
                </div>
              </div>

              {/* Parent Remark */}
              <div className="flex gap-4 p-4 rounded-2xl border border-slate-100/50 hover:bg-surface-container-low transition-colors group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-slate-400 font-bold border-2 border-white shadow-sm">JS</div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h4 className="font-bold text-on-surface text-sm md:text-base">James Sterling</h4>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter bg-slate-200 px-2 py-0.5 rounded-full inline-block mt-1">Parent Remark</span>
                    </div>
                    <span className="text-[10px] font-medium text-slate-400 bg-surface-container px-2 py-0.5 rounded">Sep 10, 2023</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mt-2 italic max-w-2xl">"Could you please share the reading list for the upcoming semester in advance?"</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Profile Overview / Quick Links */}
          <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-[0px_20px_40px_rgba(42,52,57,0.04)] flex flex-col gap-6">
            <h3 className="font-headline font-bold text-xl text-on-surface">Quick Profile</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-5 p-3 rounded-2xl hover:bg-surface-container-low transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-blue-600 shadow-sm border border-white">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone</p>
                  <p className="text-sm font-bold text-on-surface">+1 (555) 092-3482</p>
                </div>
              </div>
              <div className="flex items-center gap-5 p-3 rounded-2xl hover:bg-surface-container-low transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-blue-600 shadow-sm border border-white">
                  <span className="material-symbols-outlined">home</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Address</p>
                  <p className="text-sm font-bold text-on-surface">221B Baker St, London</p>
                </div>
              </div>
              <div className="flex items-center gap-5 p-3 rounded-2xl hover:bg-surface-container-low transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-blue-600 shadow-sm border border-white">
                  <span className="material-symbols-outlined">family_history</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Guardian</p>
                  <p className="text-sm font-bold text-on-surface">Mary Sterling <span className="text-slate-400 font-medium">(Mother)</span></p>
                </div>
              </div>
            </div>
            <div className="mt-auto pt-6 border-t border-slate-100">
              <button className="w-full py-4 text-center text-sm font-bold text-blue-700 bg-blue-50/50 hover:bg-blue-50 rounded-xl transition-colors">
                View Full Academic History
              </button>
            </div>
          </div>
          
        </div>
      </main>
    </>
  );
};

export default StudentProfile;
