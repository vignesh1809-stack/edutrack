import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, fetchProfileRequest } from '../../store/actions/authActions';
import LecturerNavBar from '../../components/LecturerNavBar';
import LecturerSidebar from '../../components/LecturerSidebar';
import TopAppBar from '../../components/TopAppBar';

const LecturerProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user?.responsibilities && !loading) {
      dispatch(fetchProfileRequest());
    }
  }, [dispatch, user, loading]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  if (loading && !user?.responsibilities) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const responsibilities = user?.responsibilities || {};
  const academic = responsibilities.academic || [];
  const administrative = responsibilities.administrative || [];
  const specializations = responsibilities.specializations || [];

  return (
    <div className="bg-[#f8fafc] text-on-surface antialiased mb-24 md:mb-0 font-body min-h-screen">
      <LecturerSidebar />
      <div className="md:pl-64">
        <TopAppBar 
          title="Staff Profile" 
          showBack={true}
          actions={
            <button className="text-blue-600 hover:bg-slate-200/50 p-2 rounded-full transition-colors active:scale-90">
              <span className="material-symbols-outlined">edit</span>
            </button>
          }
        />

        <main className="p-6 max-w-7xl mx-auto w-full">
          {/* Focus Plate: Profile Header */}
          <section className="bg-white rounded-[24px] p-6 mb-8 flex flex-col md:flex-row gap-6 items-center md:items-end relative overflow-hidden shadow-sm border border-slate-50">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full -mr-20 -mt-20"></div>
            <div className="relative group shrink-0">
              <img 
                alt="Profile" 
                className="w-32 h-32 rounded-3xl object-cover shadow-lg border-4 border-white" 
                src={user?.avatarUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300"}
              />
              <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg border-2 border-white">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left z-10 w-full">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-headline">{user?.firstName} {user?.lastName}</h2>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full uppercase tracking-wider">Active</span>
              </div>
              <p className="text-lg text-blue-600 font-medium mb-4">{(user?.role?.replace('_', ' ')) || 'Staff Member'} {user?.departmentName ? `, ${user.departmentName} Department` : ''}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <span className="material-symbols-outlined text-blue-600/60 text-lg">pin_drop</span>
                  {user?.campus || 'Main Campus'}
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <span className="material-symbols-outlined text-blue-600/60 text-lg">calendar_today</span>
                  Academic Member
                </div>
              </div>
            </div>
            <div className="hidden lg:flex flex-col items-end gap-1 pb-2 shrink-0 z-10">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em]">User ID</p>
              <p className="text-xl font-headline font-bold text-slate-900">{user?.id?.substring(0, 8).toUpperCase() || 'ST-2024'}</p>
            </div>
          </section>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Professional Details */}
            <div className="md:col-span-1 flex flex-col gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-50">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center justify-between">
                  Professional Details
                  <span className="material-symbols-outlined text-blue-600">work</span>
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Role</p>
                    <p className="text-slate-900 font-bold">{(user?.role?.replace('_', ' ')) || 'Lecturer'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Department</p>
                    <p className="text-slate-900 font-bold">{user?.departmentName || 'Not Assigned'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Work Status</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      <p className="text-slate-900 font-bold">{user?.workStatus || 'Full-Time'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Card */}
              <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                <h3 className="text-[10px] font-bold text-blue-600/60 uppercase tracking-widest mb-6 flex items-center justify-between">
                  Connect
                  <span className="material-symbols-outlined text-blue-600">contact_page</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-600 transition-all shadow-sm">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Institutional Email</p>
                      <p className="text-sm text-slate-900 font-bold truncate">{user?.email || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-600 transition-all shadow-sm">
                      <span className="material-symbols-outlined">call</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Phone Number</p>
                      <p className="text-sm text-slate-900 font-bold">{user?.phone || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Focus Content */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Responsibilities */}
              <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-50">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3 font-headline">
                  <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">history_edu</span>
                  </span>
                  Responsibilities & Specializations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Academic Taught</p>
                    <ul className="space-y-2">
                      {academic.length > 0 ? academic.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-slate-900 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600/40"></span> {item}
                        </li>
                      )) : <li className="text-sm text-slate-500">General Education</li>}
                    </ul>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Administrative</p>
                    <ul className="space-y-2">
                      {administrative.length > 0 ? administrative.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-slate-900 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600/40"></span> {item}
                        </li>
                      )) : <li className="text-sm text-slate-500">Faculty Support</li>}
                    </ul>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-slate-50">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">auto_awesome</span>
                    Research Focus
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {specializations.length > 0 ? specializations.map((item, idx) => (
                      <span key={idx} className="px-4 py-2 bg-slate-50 text-slate-900 text-xs font-bold rounded-xl">{item}</span>
                    )) : <span className="px-4 py-2 bg-slate-50 text-slate-900 text-xs font-bold rounded-xl">General</span>}
                  </div>
                </div>
              </div>

              {/* Security & Quick Links */}
              <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-50">
                <h3 className="text-lg font-bold text-slate-900 mb-6 font-headline">Account & Security</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl hover:bg-blue-50 group transition-all">
                    <span className="material-symbols-outlined text-blue-600 mb-3 group-hover:scale-110 transition-transform">lock_reset</span>
                    <span className="text-xs font-bold text-slate-900">Password</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl hover:bg-blue-50 group transition-all">
                    <span className="material-symbols-outlined text-blue-600 mb-3 group-hover:scale-110 transition-transform">notifications</span>
                    <span className="text-xs font-bold text-slate-900">Notifications</span>
                  </button>
                  <button onClick={handleLogout} className="flex flex-col items-center justify-center p-6 bg-red-50 rounded-2xl hover:bg-red-100 group transition-all">
                    <span className="material-symbols-outlined text-red-600 mb-3 group-hover:scale-110 transition-transform">logout</span>
                    <span className="text-xs font-bold text-red-600">Logout</span>
                  </button>
                </div>
              </div>
              
            </div>
          </div>
        </main>

        <LecturerNavBar />
      </div>
    </div>
  );
};

export default LecturerProfile;
