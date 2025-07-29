"use client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { TestProvider } from "./contexts/TestContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import RealTimeStatsUpdater from "./components/RealTimeStatsUpdater";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import SubjectSelection from "./pages/SubjectSelection";
import TestInterface from "./pages/TestInterface";
import Results from "./pages/Results";
import Contact from "./pages/Contact";

function App() {
  return (
    <AuthProvider>
      <TestProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <RealTimeStatsUpdater />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/subject-selection/:testType"
                element={
                  <ProtectedRoute>
                    <SubjectSelection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/test/:testType"
                element={
                  <ProtectedRoute>
                    <TestInterface />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/results"
                element={
                  <ProtectedRoute>
                    <Results />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </TestProvider>
    </AuthProvider>
  );
}

export default App;
