import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import axiosInstance from '../../api/axiosInstance';

const StudentProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get(`/api/principal/students/${id}`);
        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching student profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!studentData) {
    return <div className="flex items-center justify-center min-h-screen font-bold text-error">Student not found</div>;
  }

  const { identity, performance, attendance, financials, remarks, contact } = studentData;
  const averageMark = performance.length > 0 ? (performance.reduce((acc, curr) => acc + curr.score, 0) / performance.length).toFixed(1) : "0.0";

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
                src={identity.avatarUrl}
              />
              <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl shadow-lg">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
            </div>
            <div className="text-center md:text-left">
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-tertiary-container text-on-tertiary-container rounded-full text-[10px] font-bold tracking-wider uppercase">Active Enrollment</span>
                <span className="text-slate-400 text-sm font-medium tracking-tight">ID: #{identity.studentId}</span>
              </div>
              <h2 className="font-headline font-extrabold text-4xl md:text-5xl text-on-surface tracking-tight">{identity.firstName} {identity.lastName}</h2>
              <p className="text-slate-500 font-medium text-lg mt-1">Sem {identity.currentSemester} • {identity.major} Major</p>
            </div>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row justify-center lg:justify-end gap-3 pb-2">
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-br from-primary to-primary-dim text-white font-bold rounded-xl shadow-lg hover:shadow-primary/30 transition-all active:scale-95">
              <span className="material-symbols-outlined text-xl">mail</span>
              Message
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
                <span className="px-3 py-1 bg-surface-container text-slate-600 rounded-lg text-xs font-bold hidden sm:block whitespace-nowrap">Academic History</span>
                <button className="material-symbols-outlined text-slate-400 hover:bg-slate-100 rounded-full transition-colors hidden sm:block">more_horiz</button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-12 items-center">
              {/* Custom Bar Chart (Asymmetric Visual) */}
              <div className="flex-grow w-full flex items-end justify-between gap-2 sm:gap-4 h-48 px-1 sm:px-4">
                {performance.map((item, idx) => (
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
                  <span className="text-4xl font-headline font-extrabold text-error">${financials.pendingAmount}</span>
                  <span className="text-slate-400 text-sm font-medium">USD</span>
                </div>
              </div>
              <div className="flex items-center gap-4 py-4 border-y border-slate-100">
                <div className="w-10 h-10 bg-error-container/10 text-error rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined">event_busy</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Due Date</p>
                  <p className="text-sm font-bold text-on-surface">{financials.dueDate || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Attendance Metric Card */}
          <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-[0px_20px_40px_rgba(42,52,57,0.04)] flex flex-col justify-between overflow-hidden">
            <div>
              <h3 className="font-headline font-bold text-xl text-on-surface mb-6">Attendance Overview</h3>
              <div className="flex items-center gap-5">
                <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90 absolute">
                    <circle className="text-slate-100" cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeWidth="8"></circle>
                    <circle 
                      className="text-blue-600 transition-all duration-1000 ease-out" 
                      cx="40" 
                      cy="40" 
                      fill="transparent" 
                      r="34" 
                      stroke="currentColor" 
                      strokeDasharray="213.6" 
                      strokeDashoffset={213.6 * (1 - (attendance.percentage || 0) / 100)} 
                      strokeWidth="8" 
                      strokeLinecap="round"
                    ></circle>
                  </svg>
                  <div className="flex flex-col items-center justify-center z-10">
                     <span className="font-bold text-lg text-slate-800">{(attendance.percentage || 0).toFixed(0)}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-semibold tracking-wide uppercase mb-1">Total Presents</p>
                  <p className="font-extrabold text-2xl text-on-surface">{attendance.presents} <span className="text-slate-400 text-lg font-medium">/ {attendance.totalDays}</span></p>
                </div>
              </div>
            </div>
            
            {/* 6-Month Trend Visual */}
            <div className="mt-8">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">6-Month Trend (Presents)</p>
              <div className="flex items-end justify-between h-20 gap-1 px-2 border-b-2 border-slate-100 pb-2">
                {attendance.monthlyTrend && attendance.monthlyTrend.map((count, idx) => {
                  // Assume max 25 working days for visual scaling
                  const height = Math.min(100, (count / 25) * 100);
                  const isLow = count < 15;
                  
                  // Get month name for this bar
                  const d = new Date();
                  d.setMonth(d.getMonth() - (5 - idx));
                  const monthName = d.toLocaleString('default', { month: 'long' });

                  return (
                    <div key={idx} className="group relative flex-1 flex flex-col items-center justify-end h-full">
                      <div 
                        className={`w-3 rounded-t-full transition-all duration-500 ${isLow ? 'bg-error-container hover:bg-error' : 'bg-blue-200 hover:bg-blue-400'}`}
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[9px] font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                        {monthName}: {count} Days
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-2 text-[9px] font-bold text-slate-400 uppercase px-1">
                {(() => {
                  const labels = [];
                  for (let i = 5; i >= 0; i--) {
                    const d = new Date();
                    d.setMonth(d.getMonth() - i);
                    labels.push(d.toLocaleString('default', { month: 'short' }));
                  }
                  return labels.map((label, idx) => (
                    <span key={idx} className="flex-1 text-center">{label}</span>
                  ));
                })()}
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
              {remarks.length > 0 ? remarks.map((remark, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-surface-container-low/50 hover:bg-surface-container-low transition-colors group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-50 flex-shrink-0 flex items-center justify-center text-blue-500 font-bold border-2 border-white shadow-sm">
                    {remark.authorName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h4 className="font-bold text-on-surface text-sm md:text-base">{remark.authorName}</h4>
                        <span className={`text-[9px] font-bold uppercase tracking-tighter px-2 py-0.5 rounded-full inline-block mt-1 ${
                          remark.type === 'Staff' ? 'text-primary bg-primary/10' : 'text-tertiary bg-tertiary-container/40'
                        }`}>{remark.type} Remark</span>
                      </div>
                      <span className="text-[10px] font-medium text-slate-400 bg-surface-container px-2 py-0.5 rounded">{remark.date}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mt-2 max-w-2xl">{remark.content}</p>
                  </div>
                </div>
              )) : <p className="text-sm text-slate-400 italic">No recent remarks</p>}
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
                  <p className="text-sm font-bold text-on-surface">{contact.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-5 p-3 rounded-2xl hover:bg-surface-container-low transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-blue-600 shadow-sm border border-white">
                  <span className="material-symbols-outlined">home</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Address</p>
                  <p className="text-sm font-bold text-on-surface">{contact.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-5 p-3 rounded-2xl hover:bg-surface-container-low transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-blue-600 shadow-sm border border-white">
                  <span className="material-symbols-outlined">family_history</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Guardian</p>
                  <p className="text-sm font-bold text-on-surface">{contact.guardianName} <span className="text-slate-400 font-medium">({contact.guardianRelation})</span></p>
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
