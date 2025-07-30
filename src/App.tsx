import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { StatsProvider } from "./contexts/StatsContext"
import { TestProvider } from "./contexts/TestContext"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import SubjectSelection from "./pages/SubjectSelection"
import TestInterface from "./pages/TestInterface"
import Results from "./pages/Results"
import Profile from "./pages/Profile"
import Contact from "./pages/Contact"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <AuthProvider>
      <StatsProvider>
        <TestProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact" element={<Contact />} />
                <Route
                  path="/subject-selection"
                  element={
                    <ProtectedRoute>
                      <SubjectSelection />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/test/:subject"
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
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </Router>
        </TestProvider>
      </StatsProvider>
    </AuthProvider>
  )
}

export default App
