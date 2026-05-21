import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/principal/Home';
import Students from './pages/principal/Students';
import StudentProfile from './pages/principal/StudentProfile';
import Reports from './pages/principal/Reports';
import Profile from './pages/principal/Profile';
import TopPerformers from './pages/principal/TopPerformers';
import Remarks from './pages/principal/Remarks';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import InstitutionSelection from './pages/InstitutionSelection';
import RoleSelectionPage from './pages/RoleSelectionPage';
import GuardianDashboard from './pages/guardian/GuardianDashboard';
import FacultyDirectory from './pages/guardian/FacultyDirectory';
import FacultyProfile from './pages/guardian/FacultyProfile';
import GuardianProfile from './pages/guardian/GuardianProfile';
import GuardianChat from './pages/guardian/GuardianChat';
import StudentDashboard from './pages/student/StudentDashboard';
import Academics from './pages/student/Academics';
import SubjectAnalysis from './pages/student/SubjectAnalysis';
import StudentRemarks from './pages/student/StudentRemarks';
import SubmitFeedback from './pages/student/SubmitFeedback';
import StudentOwnProfile from './pages/student/StudentProfile';
import TransportDashboard from './pages/transport-incharge/TransportDashboard';
import TransportStaffDirectory from './pages/transport-incharge/TransportStaffDirectory';
import TransportRoutes from './pages/transport-incharge/TransportRoutes';
import AddTransportStaff from './pages/transport-incharge/AddTransportStaff';
import AddTransportLog from './pages/transport-incharge/AddTransportLog';
import TransportProfile from './pages/transport-incharge/TransportProfile';
import LecturerDashboard from './pages/staff/LecturerDashboard';
import LecturerAttendance from './pages/staff/LecturerAttendance';
import LecturerPapers from './pages/staff/LecturerPapers';
import LecturerProfile from './pages/staff/LecturerProfile';

function App() {
  return (
    <Router>
      <Routes>
        {/* --- Auth Flow --- */}
        <Route path="/" element={<InstitutionSelection />} />
        <Route path="/login" element={<InstitutionSelection />} />
        <Route path="/select-role" element={<RoleSelectionPage />} />
        <Route path="/login-credentials" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* --- Principal --- */}
        <Route path="/principal/dashboard" element={<ProtectedRoute allowedRoles={['Principal', 'Administrator']}><Home /></ProtectedRoute>} />
        <Route path="/principal/students" element={<ProtectedRoute allowedRoles={['Principal', 'Administrator']}><Students /></ProtectedRoute>} />
        <Route path="/principal/student-profile/:id" element={<ProtectedRoute allowedRoles={['Principal', 'Administrator']}><StudentProfile /></ProtectedRoute>} />
        <Route path="/principal/reports" element={<ProtectedRoute allowedRoles={['Principal', 'Administrator']}><Reports /></ProtectedRoute>} />
        <Route path="/principal/top-performers" element={<ProtectedRoute allowedRoles={['Principal', 'Administrator']}><TopPerformers /></ProtectedRoute>} />
        <Route path="/principal/remarks" element={<ProtectedRoute allowedRoles={['Principal', 'Administrator']}><Remarks /></ProtectedRoute>} />
        <Route path="/principal/profile" element={<ProtectedRoute allowedRoles={['Principal', 'Administrator']}><Profile /></ProtectedRoute>} />

        {/* --- Guardian --- */}
        <Route path="/guardian/dashboard" element={<ProtectedRoute allowedRoles={['Guardian']}><GuardianDashboard /></ProtectedRoute>} />
        <Route path="/guardian/faculty-directory" element={<ProtectedRoute allowedRoles={['Guardian']}><FacultyDirectory /></ProtectedRoute>} />
        <Route path="/guardian/faculty-profile" element={<ProtectedRoute allowedRoles={['Guardian']}><FacultyProfile /></ProtectedRoute>} />
        <Route path="/guardian/profile" element={<ProtectedRoute allowedRoles={['Guardian']}><GuardianProfile /></ProtectedRoute>} />
        <Route path="/guardian/chat" element={<ProtectedRoute allowedRoles={['Guardian']}><GuardianChat /></ProtectedRoute>} />

        {/* --- Student --- */}
        <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={['Student']}><StudentDashboard /></ProtectedRoute>} />
        <Route path="/student/academics" element={<ProtectedRoute allowedRoles={['Student']}><Academics /></ProtectedRoute>} />
        <Route path="/student/subject-analysis" element={<ProtectedRoute allowedRoles={['Student']}><SubjectAnalysis /></ProtectedRoute>} />
        <Route path="/student/remarks" element={<ProtectedRoute allowedRoles={['Student']}><StudentRemarks /></ProtectedRoute>} />
        <Route path="/student/submit-feedback" element={<ProtectedRoute allowedRoles={['Student']}><SubmitFeedback /></ProtectedRoute>} />
        <Route path="/student/profile" element={<ProtectedRoute allowedRoles={['Student']}><StudentOwnProfile /></ProtectedRoute>} />

        {/* --- Transport Incharge --- */}
        <Route path="/transport/dashboard" element={<ProtectedRoute allowedRoles={['Transport', 'Transport_Incharge']}><TransportDashboard /></ProtectedRoute>} />
        <Route path="/transport/staff" element={<ProtectedRoute allowedRoles={['Transport', 'Transport_Incharge']}><TransportStaffDirectory /></ProtectedRoute>} />
        <Route path="/transport/routes" element={<ProtectedRoute allowedRoles={['Transport', 'Transport_Incharge']}><TransportRoutes /></ProtectedRoute>} />
        <Route path="/transport/add-staff" element={<ProtectedRoute allowedRoles={['Transport', 'Transport_Incharge']}><AddTransportStaff /></ProtectedRoute>} />
        <Route path="/transport/add-log" element={<ProtectedRoute allowedRoles={['Transport', 'Transport_Incharge']}><AddTransportLog /></ProtectedRoute>} />
        <Route path="/transport/profile" element={<ProtectedRoute allowedRoles={['Transport', 'Transport_Incharge']}><TransportProfile /></ProtectedRoute>} />

        {/* --- Staff / Lecturer --- */}
        <Route path="/staff/dashboard" element={<ProtectedRoute allowedRoles={['Lecturer', 'Class_Teacher', 'Head_of_Department']}><LecturerDashboard /></ProtectedRoute>} />
        <Route path="/staff/attendance" element={<ProtectedRoute allowedRoles={['Lecturer', 'Class_Teacher', 'Head_of_Department']}><LecturerAttendance /></ProtectedRoute>} />
        <Route path="/staff/papers" element={<ProtectedRoute allowedRoles={['Lecturer', 'Class_Teacher', 'Head_of_Department']}><LecturerPapers /></ProtectedRoute>} />
        <Route path="/staff/profile" element={<ProtectedRoute allowedRoles={['Lecturer', 'Class_Teacher', 'Head_of_Department']}><LecturerProfile /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
