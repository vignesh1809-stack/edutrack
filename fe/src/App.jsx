import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/principal/Home';
import Students from './pages/principal/Students';
import StudentProfile from './pages/principal/StudentProfile';
import Reports from './pages/principal/Reports';
import Profile from './pages/principal/Profile';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import InstitutionSelection from './pages/InstitutionSelection';
import GuardianDashboard from './pages/guardian/GuardianDashboard';
import FacultyDirectory from './pages/guardian/FacultyDirectory';
import FacultyProfile from './pages/guardian/FacultyProfile';
import GuardianProfile from './pages/guardian/GuardianProfile';
import GuardianChat from './pages/guardian/GuardianChat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InstitutionSelection />} />
        <Route path="/principal/dashboard" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<InstitutionSelection />} />
        <Route path="/login-credentials" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/guardian/dashboard" element={<GuardianDashboard />} />
        <Route path="/guardian/faculty-directory" element={<FacultyDirectory />} />
        <Route path="/guardian/faculty-profile" element={<FacultyProfile />} />
        <Route path="/guardian/profile" element={<GuardianProfile />} />
        <Route path="/guardian/chat" element={<GuardianChat />} />
      </Routes>
    </Router>
  );
}

export default App;
