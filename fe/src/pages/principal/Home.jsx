import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrincipalDashboardRequest } from '../../store/actions/dashboardActions';
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
  const dispatch = useDispatch();
  const { loading, error, filters } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchPrincipalDashboardRequest(filters));
  }, [dispatch, filters]);

  return (
    <>
      <Sidebar />
      <TopAppBar />
      <main className="pt-24 md:pt-10 mb-28 md:mb-10 px-4 md:pl-72 space-y-6 max-w-7xl mx-auto">
        <FilterSection />
        {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <span className="material-symbols-outlined text-red-400">error</span>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">
                            Error loading dashboard: {error}
                        </p>
                    </div>
                </div>
            </div>
        )}
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
