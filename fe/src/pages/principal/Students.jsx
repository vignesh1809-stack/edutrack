import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchStudentsRequest, fetchFiltersRequest } from '../../store/actions/studentActions';
import Sidebar from '../../components/Sidebar';
import TopAppBar from '../../components/TopAppBar';

import SearchPlate from '../../components/SearchPlate';
import StudentDirectory from '../../components/StudentDirectory';
import BottomNavBar from '../../components/BottomNavBar';

const Students = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudentsRequest());
    dispatch(fetchFiltersRequest());
  }, [dispatch]);

  return (
    <>
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen relative md:pl-72">
        <TopAppBar title="Student Directory" />
        <main className="flex-1 p-6 md:p-10 mb-24 md:mb-0 max-w-7xl mx-auto w-full">
          <SearchPlate />
          <StudentDirectory />
        </main>
      </div>

      
      <BottomNavBar />
    </>
  );
};

export default Students;
