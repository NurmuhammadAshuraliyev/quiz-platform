"use client";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { User, LogOut, Home } from "lucide-react";

export default function Navbar() {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Loading holatida navbar ko'rsatish
  if (isLoading) {
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <span className="text-xl font-bold">
                akam <span className="text-green-500">quiz</span>
              </span>
            </Link>
            <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">✓</span>
            </div>
            <span className="text-xl font-bold">
              akam <span className="text-green-500">quiz</span>
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center space-x-1 text-gray-700 hover:text-green-600"
            >
              <Home size={18} />
              <span>Bosh sahifa</span>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-600"
                >
                  <User size={18} />
                  <span>{user?.fullName}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                >
                  <LogOut size={18} />
                  <span>Chiqish</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-green-600 font-medium"
                >
                  Kirish
                </Link>
                <Link
                  to="/register"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 font-medium"
                >
                  Ro'yxatdan o'tish
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
