import { Routes, Route } from "react-router-dom";
import './App.css'
import LandingPage from "./components/LandingPage";
import ProfilePage from "./components/ProfilePage";
import NotificationsPage from "./components/NotificationsPage";
import AdvisorDashboard from "./components/AdvisorDashboard";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import StudentDashboard from "./components/StudentDashboard";
import ProgramManagerDashboard from "./components/ProgramManagerDashboard";

function App() {
  return (
    <Routes>
      {/* Landing / Home */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* User Pages */}
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/notifications" element={<NotificationsPage />} />

      {/* Advisor */}
      <Route path="/advisordashboard" element={<AdvisorDashboard />} />
      <Route path="/pmdashboard" element={<ProgramManagerDashboard />} />
      <Route path="/studentdashboard" element={<StudentDashboard />} />
    </Routes>
  );
}

export default App;
