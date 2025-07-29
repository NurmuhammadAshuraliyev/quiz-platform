"use client";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTest } from "../contexts/TestContext";
import {
  Trophy,
  RotateCcw,
  Home,
  CheckCircle,
  XCircle,
  Clock,
  Star,
} from "lucide-react";
import TestRatingModal from "../components/TestRatingModal";

interface TestResult {
  testType: string;
  subjects: string[];
  score: number;
  totalQuestions: number;
  answers: { questionId: string; selectedAnswer: number; isCorrect: boolean }[];
  completedAt: string;
  timeSpent: number;
  totalTimeGiven: number;
  difficulty: "easy" | "medium" | "hard";
  userId: string;
}

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { resetTest } = useTest();
  const [showRatingModal, setShowRatingModal] = useState(true);

  const result = location.state?.result as TestResult;

  if (!result) {
    navigate("/");
    return null;
  }

  const percentage = Math.round((result.score / result.totalQuestions) * 100);

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 70) return "text-yellow-600";
    if (percentage >= 60) return "text-orange-600";
    return "text-red-600";
  };

  const getGradeText = (percentage: number) => {
    if (percentage >= 90) return "A'lo";
    if (percentage >= 80) return "Yaxshi";
    if (percentage >= 70) return "Qoniqarli";
    if (percentage >= 60) return "Qoniqarsiz";
    return "Yomon";
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "Oson";
      case "medium":
        return "O'rta";
      case "hard":
        return "Qiyin";
      default:
        return difficulty;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 bg-green-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "hard":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const formatTimeDetailed = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours} soat ${minutes} daqiqa`;
    }
    return `${minutes} daqiqa`;
  };

  const handleRetakeTest = () => {
    resetTest();
    navigate(`/subject-selection/${result.testType}`);
  };

  const handleGoHome = () => {
    resetTest();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center">
            <div
              className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
                percentage >= 90
                  ? "bg-green-100"
                  : percentage >= 80
                  ? "bg-blue-100"
                  : percentage >= 70
                  ? "bg-yellow-100"
                  : percentage >= 60
                  ? "bg-orange-100"
                  : "bg-red-100"
              }`}
            >
              <Trophy className={`${getGradeColor(percentage)} w-12 h-12`} />
            </div>

            <h1 className="text-3xl font-bold mb-2">Test yakunlandi!</h1>
            <p className="text-gray-600 mb-2">
              {result.testType.toUpperCase()} testi bo'yicha natijangiz
            </p>

            {/* Difficulty Badge */}
            <div className="flex justify-center mb-6">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                  result.difficulty
                )}`}
              >
                <Star size={14} className="mr-1" />
                {getDifficultyText(result.difficulty)} daraja
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div
                  className={`text-4xl font-bold mb-2 ${getGradeColor(
                    percentage
                  )}`}
                >
                  {result.score}/{result.totalQuestions}
                </div>
                <p className="text-gray-600">To'g'ri javoblar</p>
              </div>

              <div className="text-center">
                <div
                  className={`text-4xl font-bold mb-2 ${getGradeColor(
                    percentage
                  )}`}
                >
                  {percentage}%
                </div>
                <p className="text-gray-600">Foiz ko'rsatkichi</p>
              </div>

              <div className="text-center">
                <div
                  className={`text-2xl font-bold mb-2 ${getGradeColor(
                    percentage
                  )}`}
                >
                  {getGradeText(percentage)}
                </div>
                <p className="text-gray-600">Baho</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleRetakeTest}
                className="flex items-center justify-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                <RotateCcw size={18} />
                <span>Qayta ishlash</span>
              </button>

              <button
                onClick={handleGoHome}
                className="flex items-center justify-center space-x-2 bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                <Home size={18} />
                <span>Bosh sahifa</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold mb-6">Batafsil natijalar</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Test turi:</span>
                <span className="ml-2 font-medium capitalize">
                  {result.testType}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Qiyinchilik:</span>
                <span
                  className={`ml-2 font-medium px-2 py-1 rounded text-xs ${getDifficultyColor(
                    result.difficulty
                  )}`}
                >
                  {getDifficultyText(result.difficulty)}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Fanlar:</span>
                <span className="ml-2 font-medium">
                  {result.subjects.join(", ")}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Yakunlangan vaqt:</span>
                <span className="ml-2 font-medium">
                  {new Date(result.completedAt).toLocaleString("uz-UZ")}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Sarflangan vaqt:</span>
                <span className="ml-2 font-medium">
                  {formatTime(result.timeSpent)}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Berilgan vaqt:</span>
                <span className="ml-2 font-medium">
                  {formatTimeDetailed(result.totalTimeGiven)}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Vaqt tejash:</span>
                <span className="ml-2 font-medium">
                  {formatTime(result.totalTimeGiven - result.timeSpent)}
                </span>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Javoblar tahlili</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-green-500" size={20} />
                  <span>To'g'ri javoblar: {result.score}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <XCircle className="text-red-500" size={20} />
                  <span>
                    Noto'g'ri javoblar: {result.totalQuestions - result.score}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="text-blue-500" size={20} />
                  <span>
                    Har savolga o'rtacha:{" "}
                    {formatTime(
                      Math.floor(result.timeSpent / result.totalQuestions)
                    )}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="text-purple-500" size={20} />
                  <span>
                    Qiyinchilik: {getDifficultyText(result.difficulty)} daraja
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Modal */}
      <TestRatingModal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        testResult={{
          testType: result.testType,
          score: result.score,
          totalQuestions: result.totalQuestions,
          difficulty: result.difficulty,
        }}
        userId={result.userId}
        testId={`test_${Date.now()}`}
      />
    </div>
  );
}
