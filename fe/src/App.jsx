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
        <Route path="/principal/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/principal/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
        <Route path="/principal/student-profile/:id" element={<ProtectedRoute><StudentProfile /></ProtectedRoute>} />
        <Route path="/principal/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/principal/top-performers" element={<ProtectedRoute><TopPerformers /></ProtectedRoute>} />
        <Route path="/principal/remarks" element={<ProtectedRoute><Remarks /></ProtectedRoute>} />
        <Route path="/principal/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* --- Guardian --- */}
        <Route path="/guardian/dashboard" element={<ProtectedRoute><GuardianDashboard /></ProtectedRoute>} />
        <Route path="/guardian/faculty-directory" element={<ProtectedRoute><FacultyDirectory /></ProtectedRoute>} />
        <Route path="/guardian/faculty-profile" element={<ProtectedRoute><FacultyProfile /></ProtectedRoute>} />
        <Route path="/guardian/profile" element={<ProtectedRoute><GuardianProfile /></ProtectedRoute>} />
        <Route path="/guardian/chat" element={<ProtectedRoute><GuardianChat /></ProtectedRoute>} />

        {/* --- Student --- */}
        <Route path="/student/dashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
        <Route path="/student/academics" element={<ProtectedRoute><Academics /></ProtectedRoute>} />
        <Route path="/student/subject-analysis" element={<ProtectedRoute><SubjectAnalysis /></ProtectedRoute>} />
        <Route path="/student/remarks" element={<ProtectedRoute><StudentRemarks /></ProtectedRoute>} />
        <Route path="/student/submit-feedback" element={<ProtectedRoute><SubmitFeedback /></ProtectedRoute>} />
        <Route path="/student/profile" element={<ProtectedRoute><StudentOwnProfile /></ProtectedRoute>} />

        {/* --- Transport Incharge --- */}
        <Route path="/transport/dashboard" element={<ProtectedRoute><TransportDashboard /></ProtectedRoute>} />
        <Route path="/transport/staff" element={<ProtectedRoute><TransportStaffDirectory /></ProtectedRoute>} />
        <Route path="/transport/routes" element={<ProtectedRoute><TransportRoutes /></ProtectedRoute>} />
        <Route path="/transport/add-staff" element={<ProtectedRoute><AddTransportStaff /></ProtectedRoute>} />
        <Route path="/transport/add-log" element={<ProtectedRoute><AddTransportLog /></ProtectedRoute>} />
        <Route path="/transport/profile" element={<ProtectedRoute><TransportProfile /></ProtectedRoute>} />

        {/* --- Staff / Lecturer --- */}
        <Route path="/staff/dashboard" element={<ProtectedRoute><LecturerDashboard /></ProtectedRoute>} />
        <Route path="/staff/attendance" element={<ProtectedRoute><LecturerAttendance /></ProtectedRoute>} />
        <Route path="/staff/papers" element={<ProtectedRoute><LecturerPapers /></ProtectedRoute>} />
        <Route path="/staff/profile" element={<ProtectedRoute><LecturerProfile /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
