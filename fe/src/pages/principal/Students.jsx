import React from 'react';
import Sidebar from '../../components/Sidebar';
import StudentHeader from '../../components/StudentHeader';
import SearchPlate from '../../components/SearchPlate';
import StudentDirectory from '../../components/StudentDirectory';
import BottomNavBar from '../../components/BottomNavBar';

const Students = () => {
  return (
    <>
      <Sidebar />
      <StudentHeader />
      <main className="pt-24 pb-32 md:pb-10 px-6 md:pl-72 max-w-7xl mx-auto min-h-screen">
        <SearchPlate />
        <StudentDirectory />
      </main>
      
      {/* FAB: Add Student */}
      <button className="fixed bottom-28 right-6 w-14 h-14 bg-primary text-on-primary rounded-2xl shadow-2xl shadow-primary/40 flex items-center justify-center group active:scale-95 duration-200 ease-out z-[60]">
        <span className="material-symbols-outlined transition-transform duration-300 group-hover:rotate-90" data-icon="add" style={{ fontVariationSettings: "'FILL' 0", fontSize: '28px' }}>add</span>
      </button>

      <BottomNavBar />
    </>
  );
};

export default Students;
