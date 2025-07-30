"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useTest } from "../contexts/TestContext"
import {
  AlertCircle,
  CheckCircle,
  BookOpen,
  Target,
  Timer,
  ArrowLeft,
  ArrowRight,
  Send,
  Pause,
  Play,
} from "lucide-react"

export default function TestInterface() {
  const navigate = useNavigate()
  const { testType } = useParams()
  const { testState, answerQuestion, nextQuestion, previousQuestion, submitTest, pauseTest, resumeTest } = useTest()

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false)
  const [timeWarning, setTimeWarning] = useState(false)

  // Redirect if no test is active
  useEffect(() => {
    if (!testState) {
      navigate("/")
      return
    }
  }, [testState, navigate])

  // Handle time warnings
  useEffect(() => {
    if (!testState) return

    const timeLeft = testState.timeRemaining
    const totalTime = testState.totalTime

    // Show warning when 10% time left
    if (timeLeft <= totalTime * 0.1 && timeLeft > 0) {
      setTimeWarning(true)
    } else {
      setTimeWarning(false)
    }

    // Auto submit when time runs out
    if (timeLeft <= 0) {
      submitTest()
      navigate("/results", { state: { result: testState } })
    }
  }, [testState])

  // Load existing answer when question changes
  useEffect(() => {
    if (!testState) return

    const currentQuestion = testState.questions[testState.currentQuestionIndex]
    const existingAnswer = testState.answers.find((a) => a.questionId === currentQuestion.id)

    if (existingAnswer) {
      setSelectedAnswer(existingAnswer.selectedAnswer)
    } else {
      setSelectedAnswer(null)
    }
  }, [testState])

  if (!testState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Test yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  const currentQuestion = testState.questions[testState.currentQuestionIndex]
  const progress = ((testState.currentQuestionIndex + 1) / testState.questions.length) * 100
  const answeredCount = testState.answers.length
  const isAnswered = selectedAnswer !== null

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    answerQuestion(answerIndex)
  }

  const handleNext = () => {
    if (testState.currentQuestionIndex < testState.questions.length - 1) {
      nextQuestion()
    }
  }

  const handlePrevious = () => {
    if (testState.currentQuestionIndex > 0) {
      previousQuestion()
    }
  }

  const handleSubmitTest = () => {
    const result = submitTest()
    if (result) {
      navigate("/results", { state: { result } })
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 bg-green-100"
      case "medium":
        return "text-yellow-600 bg-yellow-100"
      case "hard":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "Oson"
      case "medium":
        return "O'rta"
      case "hard":
        return "Qiyin"
      default:
        return difficulty
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-4 mb-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
            {/* Test Info */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 capitalize">{testType} Test</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <Target size={14} />
                    <span>
                      {testState.currentQuestionIndex + 1}/{testState.questions.length}
                    </span>
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(testState.difficulty)}`}
                  >
                    {getDifficultyText(testState.difficulty)}
                  </span>
                  <span className="flex items-center space-x-1">
                    <CheckCircle size={14} />
                    <span>{answeredCount} javob berildi</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Timer and Controls */}
            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-bold text-lg shadow-lg ${
                  timeWarning
                    ? "bg-red-100 text-red-700 animate-pulse"
                    : testState.timeRemaining < 300
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                }`}
              >
                <Timer size={20} />
                <span>{formatTime(testState.timeRemaining)}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={testState.isActive ? pauseTest : resumeTest}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  {testState.isActive ? <Pause size={16} /> : <Play size={16} />}
                  <span className="hidden sm:inline">{testState.isActive ? "Pauza" : "Davom"}</span>
                </button>

                <button
                  onClick={() => setShowConfirmSubmit(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
                >
                  <Send size={16} />
                  <span>Yakunlash</span>
                </button>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Jarayon</span>
              <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Question Panel */}
          <div className="xl:col-span-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              {/* Question Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold">
                    {testState.currentQuestionIndex + 1}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Savol {testState.currentQuestionIndex + 1}</h2>
                    <p className="text-sm text-gray-600 capitalize">
                      {currentQuestion.subject.replace("_", " ")} • {getDifficultyText(currentQuestion.difficulty)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {isAnswered && (
                    <div className="flex items-center space-x-1 text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm font-medium">
                      <CheckCircle size={14} />
                      <span>Javob berildi</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Question Text */}
              <div className="mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                  <p className="text-lg leading-relaxed text-gray-800 font-medium">{currentQuestion.question}</p>
                </div>
              </div>

              {/* Answer Options */}
              <div className="space-y-4 mb-8">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                      selectedAnswer === index
                        ? "border-blue-500 bg-blue-50 shadow-lg scale-[1.02]"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold transition-all duration-300 ${
                          selectedAnswer === index
                            ? "border-blue-500 bg-blue-500 text-white"
                            : "border-gray-300 text-gray-500"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-gray-800 font-medium leading-relaxed">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <button
                  onClick={handlePrevious}
                  disabled={testState.currentQuestionIndex === 0}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ArrowLeft size={18} />
                  <span>Oldingi</span>
                </button>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>
                    {testState.currentQuestionIndex + 1} / {testState.questions.length}
                  </span>
                </div>

                <button
                  onClick={handleNext}
                  disabled={testState.currentQuestionIndex === testState.questions.length - 1}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                >
                  <span>Keyingi</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sticky top-6">
              {/* Stats */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Test statistikasi</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                    <span className="text-blue-700 font-medium">Jami savollar</span>
                    <span className="text-blue-900 font-bold">{testState.questions.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                    <span className="text-green-700 font-medium">Javob berildi</span>
                    <span className="text-green-900 font-bold">{answeredCount}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-xl">
                    <span className="text-yellow-700 font-medium">Qolgan</span>
                    <span className="text-yellow-900 font-bold">{testState.questions.length - answeredCount}</span>
                  </div>
                </div>
              </div>

              {/* Question Grid */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Savollar</h3>
                <div className="grid grid-cols-5 gap-2">
                  {testState.questions.map((_, index) => {
                    const isCurrentQuestion = index === testState.currentQuestionIndex
                    const isAnswered = testState.answers.some((a) => a.questionId === testState.questions[index].id)

                    return (
                      <button
                        key={index}
                        onClick={() => {
                          // Navigate to specific question
                          const diff = index - testState.currentQuestionIndex
                          if (diff > 0) {
                            for (let i = 0; i < diff; i++) {
                              nextQuestion()
                            }
                          } else if (diff < 0) {
                            for (let i = 0; i < Math.abs(diff); i++) {
                              previousQuestion()
                            }
                          }
                        }}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all duration-200 ${
                          isCurrentQuestion
                            ? "bg-blue-500 text-white shadow-lg scale-110"
                            : isAnswered
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                        }`}
                      >
                        {index + 1}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-gray-600">Joriy savol</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-gray-600">Javob berilgan</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  <span className="text-gray-600">Javob berilmagan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="text-yellow-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Testni yakunlashni xohlaysizmi?</h3>
              <p className="text-gray-600">
                Siz {answeredCount}/{testState.questions.length} ta savolga javob berdingiz.
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleSubmitTest}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all font-medium shadow-lg"
              >
                Ha, yakunlash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Time Warning */}
      {timeWarning && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-xl shadow-2xl animate-bounce z-40">
          <div className="flex items-center space-x-2">
            <AlertCircle size={20} />
            <span className="font-medium">Vaqt tugayapti!</span>
          </div>
        </div>
      )}

      {/* Pause Overlay */}
      {!testState.isActive && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Pause className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Test pauza qilingan</h3>
            <p className="text-gray-600 mb-6">Davom etish uchun "Davom" tugmasini bosing</p>
            <button
              onClick={resumeTest}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg mx-auto"
            >
              <Play size={18} />
              <span>Davom etish</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
