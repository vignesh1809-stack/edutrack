import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchStudentsRequest, fetchFiltersRequest } from '../../store/actions/studentActions';
import Sidebar from '../../components/Sidebar';
import StudentHeader from '../../components/StudentHeader';
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
      <StudentHeader />
      <main className="pt-24 pb-32 md:pb-10 px-6 md:pl-72 max-w-7xl mx-auto min-h-screen">
        <SearchPlate />
        <StudentDirectory />
      </main>
      
      <BottomNavBar />
    </>
  );
};

export default Students;
