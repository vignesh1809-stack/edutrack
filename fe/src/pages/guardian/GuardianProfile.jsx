import React from 'react';
import { useNavigate } from 'react-router-dom';
import GuardianNavBar from '../../components/GuardianNavBar';
import GuardianSidebar from '../../components/GuardianSidebar';

const GuardianProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface font-body text-on-surface antialiased mb-24 md:mb-0 min-h-screen">
      <GuardianSidebar />
      <div className="md:pl-64">
        <header className="fixed top-0 w-full z-50 bg-[#f7f9fb]/70 backdrop-blur-xl shadow-[0px_20px_40px_rgba(42,52,57,0.06)] md:w-[calc(100%-16rem)] flex justify-between items-center px-6 h-16">
        <div className="flex items-center gap-3">
          <span 
            className="material-symbols-outlined text-blue-600 active:scale-95 duration-200 cursor-pointer"
            onClick={() => navigate('/guardian/dashboard')}
          >
            arrow_back
          </span>
          <h1 className="font-headline text-xl font-bold tracking-tight text-on-surface">Guardian Profile</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-blue-600 active:scale-95 duration-200 cursor-pointer">settings</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 pt-24 pb-12">
        <section className="flex flex-col items-center mb-12">
          <div className="relative mb-6">
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-primary to-primary-dim">
              <img 
                className="w-full h-full object-cover rounded-full border-4 border-white" 
                alt="Sarah Sterling" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuClQKhXwVQr2CROipVsZFX6eligluBRzByT4Q5olS6K_7KelKQ9mPwYXLrySmvobZCF9pS2lo-qq2AXhkGt4D7fU4OhLSL2aAedrn6WknhiMg9j6dORPyypdudnQDTltm6LDqbYraZWrJfJGYeSgaulQwA1AT93o5aGBN0-Z7RT-Cj-hOham_3XUDhQfQD_9L-5GJucZbghadEn-wDFNHMWOMrL_VVciwa5LIi9Yf6NLv3ocjP_y-JJDhYZl4NvAn7AsfwG7kfkLAY"
              />
            </div>
            <div className="absolute bottom-1 right-1 bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center shadow-lg cursor-pointer">
              <span className="material-symbols-outlined text-sm">edit</span>
            </div>
          </div>
          <div className="text-center">
            <h2 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface">Sarah Sterling</h2>
            <p className="text-on-surface-variant font-medium mt-1">sarah.sterling@edu-horizon.com</p>
            <div className="mt-3 inline-flex items-center px-3 py-1 bg-surface-container-high rounded-full">
              <span className="text-xs font-bold tracking-wider text-on-surface-variant uppercase">Guardian ID: #8821</span>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <section className="bg-surface-container-lowest rounded-3xl p-8 transition-all">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-headline text-xl font-bold">Personal Information</h3>
              <span className="text-primary text-sm font-semibold cursor-pointer hover:underline">Edit All</span>
            </div>
            <div className="grid grid-cols-1 gap-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-container/30 rounded-2xl text-primary">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Phone</p>
                  <p className="text-on-surface font-semibold text-lg">+1 (555) 012-3456</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-container/30 rounded-2xl text-primary">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Address</p>
                  <p className="text-on-surface font-semibold text-lg">742 Evergreen Terrace, Springfield, IL</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-tertiary-container/30 rounded-2xl text-tertiary">
                  <span className="material-symbols-outlined">emergency</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Emergency Contact</p>
                  <p className="text-on-surface font-semibold text-lg">Mark Sterling (Husband)</p>
                  <p className="text-on-surface-variant text-sm">+1 (555) 012-7890</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-low rounded-[2rem] p-8">
            <h3 className="font-headline text-xl font-bold mb-6">Portal Settings</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-on-surface">Push Notifications</p>
                  <p className="text-xs text-on-surface-variant font-medium">Alerts for attendance and grades</p>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative flex items-center px-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-on-surface">Email Alerts</p>
                  <p className="text-xs text-on-surface-variant font-medium">Weekly summary of activities</p>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative flex items-center px-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-on-surface">Dark Mode</p>
                  <p className="text-xs text-on-surface-variant font-medium">Adjust appearance for comfort</p>
                </div>
                <div className="w-12 h-6 bg-surface-container-highest rounded-full relative flex items-center px-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full mr-auto shadow-sm"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest rounded-3xl p-8">
            <h3 className="font-headline text-xl font-bold mb-6">Security</h3>
            <div className="grid grid-cols-1 gap-4">
              <button className="flex items-center justify-between w-full p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors active:scale-[0.98] duration-150">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-on-surface-variant">lock</span>
                  <span className="font-bold text-on-surface">Change Password</span>
                </div>
                <span className="material-symbols-outlined text-outline">chevron_right</span>
              </button>
              <button className="flex items-center justify-between w-full p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors active:scale-[0.98] duration-150">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-on-surface-variant">verified_user</span>
                  <span className="font-bold text-on-surface">Two-Factor Authentication</span>
                </div>
                <span className="material-symbols-outlined text-outline">chevron_right</span>
              </button>
            </div>
          </section>

          <footer className="pt-8 flex justify-center">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 px-8 py-4 rounded-2xl text-error font-bold hover:bg-error/5 transition-all active:scale-95 duration-200">
              <span className="material-symbols-outlined">logout</span>
              Log Out
            </button>
          </footer>
        </div>
      </main>
      <GuardianNavBar />
      </div>
    </div>
  );
};

export default GuardianProfile;
