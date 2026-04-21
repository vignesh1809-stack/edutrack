import React from 'react';
import Sidebar from '../../components/Sidebar';
import TopAppBar from '../../components/TopAppBar';
import FilterSection from '../../components/FilterSection';
import AlertSection from '../../components/AlertSection';
import OverviewCards from '../../components/OverviewCards';
import ChartsSection from '../../components/ChartsSection';
import ActivityList from '../../components/ActivityList';
import BottomNavBar from '../../components/BottomNavBar';
import FloatingActionButton from '../../components/FloatingActionButton';

const Home = () => {
  return (
    <>
      <Sidebar />
      <TopAppBar />
      <main className="pt-24 md:pt-10 mb-28 md:mb-10 px-4 md:pl-72 space-y-6 max-w-7xl mx-auto">
        <FilterSection />
        <AlertSection />
        <OverviewCards />
        <ChartsSection />
        <ActivityList />
      </main>
      <BottomNavBar />
      <FloatingActionButton />
    </>
  );
};

export default Home;
