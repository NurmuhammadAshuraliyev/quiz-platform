"use client";

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  User,
  Mail,
  Trophy,
  Calendar,
  Clock,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const [selectedTest, setSelectedTest] = useState<any>(null);

  const testResults = JSON.parse(localStorage.getItem("testResults") || "[]");
  const userResults = testResults.filter(
    (result: any) => result.userId === user?.id
  );

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const getSubjectName = (subject: string) => {
    switch (subject) {
      case "matematika":
        return "Matematika";
      case "ona_tili":
        return "Ona tili";
      case "tarix":
        return "Tarix";
      default:
        return subject.charAt(0).toUpperCase() + subject.slice(1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-blue-600 px-6 py-8">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="text-white" size={40} />
                  </div>
                  <div className="text-white">
                    <h1 className="text-2xl font-bold">{user?.fullName}</h1>
                    <p className="text-white/90">@{user?.username}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="text-gray-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">To'liq ism</p>
                      <p className="font-medium">{user?.fullName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="text-gray-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-sm break-all">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Trophy className="text-gray-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Jami testlar</p>
                      <p className="font-medium">
                        {userResults.length} ta test
                      </p>
                    </div>
                  </div>
                  {userResults.length > 0 && (
                    <div className="flex items-center space-x-3">
                      <Calendar className="text-gray-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">O'rtacha ball</p>
                        <p className="font-medium">
                          {Math.round(
                            userResults.reduce(
                              (sum: any, result: any) =>
                                sum +
                                (result.score / result.totalQuestions) * 100,
                              0
                            ) / userResults.length
                          )}
                          %
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Test Results */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center space-x-2">
                <Trophy className="text-yellow-500" size={24} />
                <span>Test natijalari</span>
              </h2>

              {userResults.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Trophy className="mx-auto mb-4 text-gray-300" size={48} />
                  <p>Hali test topshirmadingiz</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {userResults.map((result: any, index: number) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold capitalize">
                            {result.testType} Test
                          </h3>
                          <p className="text-sm text-gray-500">
                            Fanlar:{" "}
                            {result.subjects.map(getSubjectName).join(", ")}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar size={14} />
                              <span>
                                {new Date(
                                  result.completedAt
                                ).toLocaleDateString("uz-UZ")}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock size={14} />
                              <span>{formatTime(result.timeSpent)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Trophy size={14} />
                              <span>{result.totalQuestions} savol</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div
                            className={`text-lg font-bold ${
                              result.score / result.totalQuestions >= 0.7
                                ? "text-green-600"
                                : result.score / result.totalQuestions >= 0.5
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {result.score}/{result.totalQuestions}
                          </div>
                          <div className="text-sm text-gray-500">
                            {Math.round(
                              (result.score / result.totalQuestions) * 100
                            )}
                            %
                          </div>
                          <button
                            onClick={() => setSelectedTest(result)}
                            className="mt-2 flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                          >
                            <Eye size={14} />
                            <span>Tahlil</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Test Analysis Modal */}
        {selectedTest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">Test tahlili</h3>
                  <button
                    onClick={() => setSelectedTest(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-gray-600 mt-1">
                  {selectedTest.testType.toUpperCase()} -{" "}
                  {selectedTest.subjects.map(getSubjectName).join(", ")}
                </p>
              </div>

              <div className="p-6">
                {/* Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedTest.totalQuestions}
                    </div>
                    <div className="text-sm text-gray-600">Jami savollar</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedTest.score}
                    </div>
                    <div className="text-sm text-gray-600">
                      To'g'ri javoblar
                    </div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {selectedTest.totalQuestions - selectedTest.score}
                    </div>
                    <div className="text-sm text-gray-600">
                      Noto'g'ri javoblar
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {formatTime(selectedTest.timeSpent)}
                    </div>
                    <div className="text-sm text-gray-600">Sarflangan vaqt</div>
                  </div>
                </div>

                {/* Questions Analysis */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Savollar tahlili</h4>
                  {selectedTest.answers.map((answer: any, index: number) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 ${
                        answer.isCorrect
                          ? "border-green-200 bg-green-50"
                          : "border-red-200 bg-red-50"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          {answer.isCorrect ? (
                            <CheckCircle className="text-green-600" size={20} />
                          ) : (
                            <XCircle className="text-red-600" size={20} />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded capitalize">
                              {getSubjectName(answer.question?.subject || "")}
                            </span>
                            <span className="text-sm text-gray-500">
                              Savol {index + 1}
                            </span>
                          </div>
                          <p className="font-medium mb-2">
                            {answer.question?.question}
                          </p>
                          <div className="space-y-1">
                            {answer.question?.options.map(
                              (option: string, optIndex: number) => (
                                <div
                                  key={optIndex}
                                  className={`text-sm p-2 rounded ${
                                    optIndex === answer.question.correctAnswer
                                      ? "bg-green-100 text-green-800 font-medium"
                                      : optIndex === answer.selectedAnswer &&
                                        !answer.isCorrect
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-50 text-gray-600"
                                  }`}
                                >
                                  {String.fromCharCode(97 + optIndex)}) {option}
                                  {optIndex ===
                                    answer.question.correctAnswer && (
                                    <span className="ml-2 text-green-600">
                                      ✓ To'g'ri javob
                                    </span>
                                  )}
                                  {optIndex === answer.selectedAnswer &&
                                    !answer.isCorrect && (
                                      <span className="ml-2 text-red-600">
                                        ✗ Sizning javobingiz
                                      </span>
                                    )}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
