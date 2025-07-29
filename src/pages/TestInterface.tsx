"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTest } from "../contexts/TestContext";
import {
  Clock,
  ArrowRight,
  Flag,
  BookOpen,
  Timer,
  CheckCircle2,
} from "lucide-react";

export default function TestInterface() {
  const navigate = useNavigate();
  const { currentTest, submitAnswer, nextQuestion, finishTest } = useTest();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!currentTest) {
      navigate("/");
      return;
    }

    // Faqat test birinchi marta boshlanganda timer-ni o'rnatish
    if (timeRemaining === 0) {
      setTimeRemaining(currentTest.timeRemaining);
    }
  }, [currentTest, navigate]); // currentTest va navigate dependency sifatida

  // Timer uchun alohida useEffect
  useEffect(() => {
    if (timeRemaining > 0 && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleFinishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      // Component unmount bo'lganda timer-ni to'xtatish
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [timeRemaining]); // faqat timeRemaining dependency

  // Selected answer uchun alohida useEffect
  useEffect(() => {
    setSelectedAnswer(null);

    if (currentTest) {
      const currentQuestion =
        currentTest.questions[currentTest.currentQuestionIndex];
      const existingAnswer = currentTest.answers.find(
        (a) => a.questionId === currentQuestion.id
      );
      if (existingAnswer) {
        setSelectedAnswer(existingAnswer.selectedAnswer);
      }
    }
  }, [currentTest]); // updated dependency

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    if (currentTest) {
      const currentQuestion =
        currentTest.questions[currentTest.currentQuestionIndex];
      submitAnswer(currentQuestion.id, answerIndex);
    }
  };

  const handleNextQuestion = () => {
    if (
      currentTest &&
      currentTest.currentQuestionIndex < currentTest.questions.length - 1
    ) {
      nextQuestion();
    } else {
      handleFinishTest();
    }
  };

  const handleFinishTest = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    const result = finishTest();
    navigate("/results", { state: { result } });
  }, [finishTest, navigate]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
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

  if (!currentTest) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const currentQuestion =
    currentTest.questions[currentTest.currentQuestionIndex];
  const progress =
    ((currentTest.currentQuestionIndex + 1) / currentTest.questions.length) *
    100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
              <div className="text-center mb-6">
                <h3 className="font-bold text-xl text-gray-800 mb-2">
                  {currentTest.testType.toUpperCase()}
                </h3>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Timer className="text-white" size={28} />
                </div>
              </div>

              {/* Timer */}
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center space-x-2 text-white">
                  <Clock size={20} />
                  <span className="font-mono text-xl font-bold">
                    {formatTime(timeRemaining)}
                  </span>
                </div>
                <p className="text-purple-100 text-center text-sm mt-1">
                  Qolgan vaqt
                </p>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Jarayon</span>
                  <span>
                    {currentTest.currentQuestionIndex + 1}/
                    {currentTest.questions.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-center">
                  {Math.round(progress)}% bajarildi
                </p>
              </div>

              {/* Subjects */}
              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-gray-700 text-sm">Fanlar</h4>
                {currentTest.subjects.map((subject) => (
                  <div
                    key={subject}
                    className={`p-3 rounded-lg transition-all ${
                      currentQuestion.subject === subject
                        ? "bg-green-100 border-2 border-green-500"
                        : "bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">
                        {getSubjectName(subject)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {
                          currentTest.questions.filter(
                            (q) => q.subject === subject
                          ).length
                        }{" "}
                        ta
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Finish Button */}
              <button
                onClick={handleFinishTest}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Flag size={18} />
                <span className="font-semibold">Testni yakunlash</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* Question Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <BookOpen className="text-white" size={20} />
                  </div>
                  <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                    {getSubjectName(currentQuestion.subject)}
                  </span>
                </div>
                <span className="text-gray-500 font-medium">
                  {currentTest.currentQuestionIndex + 1}/
                  {currentTest.questions.length}
                </span>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 leading-relaxed">
                  {currentTest.currentQuestionIndex + 1}.{" "}
                  {currentQuestion.question}
                </h2>
              </div>

              {/* Answer Options */}
              <div className="space-y-4 mb-8">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 ${
                      selectedAnswer === index
                        ? "border-green-500 bg-green-50 shadow-lg transform scale-[1.02]"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all ${
                          selectedAnswer === index
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-gray-300 text-gray-500"
                        }`}
                      >
                        {selectedAnswer === index ? (
                          <CheckCircle2 size={18} />
                        ) : (
                          <span>{String.fromCharCode(97 + index)}</span>
                        )}
                      </div>
                      <span className="text-gray-800 font-medium">
                        {option}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className="flex items-center space-x-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                >
                  <span className="text-lg">
                    {currentTest.currentQuestionIndex ===
                    currentTest.questions.length - 1
                      ? "Testni yakunlash"
                      : "Keyingi savol"}
                  </span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
