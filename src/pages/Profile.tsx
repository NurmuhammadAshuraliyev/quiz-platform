"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import {
  User,
  Mail,
  Trophy,
  Calendar,
  Clock,
  Eye,
  CheckCircle,
  XCircle,
  Award,
  Target,
  BookOpen,
  Activity,
  AlertCircle,
} from "lucide-react"

interface TestResult {
  id: string
  testType: string
  subjects: string[]
  score: number
  totalQuestions: number
  answers: {
    questionId: string
    selectedAnswer: number
    isCorrect: boolean
    question?: any
  }[]
  completedAt: string
  userId: string
  timeSpent: number
  totalTimeGiven: number
  difficulty: "easy" | "medium" | "hard"
}

export default function Profile() {
  const { user } = useAuth()
  const [selectedTest, setSelectedTest] = useState<TestResult | null>(null)
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")

  // Real ma'lumotlarni yuklash
  useEffect(() => {
    const loadUserData = () => {
      try {
        setLoading(true)
        setError("")

        if (!user?.id) {
          setError("Foydalanuvchi ma'lumotlari topilmadi")
          setLoading(false)
          return
        }

        // Faqat real test natijalarini olish
        const allResults = JSON.parse(localStorage.getItem("testResults") || "[]")

        // User'ning testlarini filtrlash va validatsiya qilish
        const userResults = allResults
          .filter((result: any) => {
            // Faqat shu user'ning testlari
            return result.userId === user.id
          })
          .map((result: any) => {
            // Ma'lumotlarni validatsiya qilish va to'ldirish
            return {
              id: result.id || `test_${Date.now()}`,
              testType: result.testType || "unknown",
              subjects: Array.isArray(result.subjects) ? result.subjects : [],
              score: typeof result.score === "number" ? result.score : 0,
              totalQuestions: typeof result.totalQuestions === "number" ? result.totalQuestions : 0,
              answers: Array.isArray(result.answers) ? result.answers : [],
              completedAt: result.completedAt || new Date().toISOString(),
              userId: result.userId || user.id,
              timeSpent: typeof result.timeSpent === "number" ? result.timeSpent : 0,
              totalTimeGiven: typeof result.totalTimeGiven === "number" ? result.totalTimeGiven : 0,
              difficulty: result.difficulty || "easy",
            } as TestResult
          })
          .filter((result: TestResult) => {
            // Faqat to'liq ma'lumotli testlarni qoldirish
            return result.totalQuestions > 0 && result.subjects.length > 0
          })
          .sort((a: TestResult, b: TestResult) => {
            // Eng yangi testlar birinchi
            return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
          })

        setTestResults(userResults)
        console.log("📊 User test results loaded:", userResults.length)
      } catch (err) {
        console.error("Error loading user data:", err)
        setError("Ma'lumotlarni yuklashda xatolik yuz berdi")
      } finally {
        setLoading(false)
      }
    }

    loadUserData()

    // Real-time yangilanishlarni kuzatish
    const handleStorageChange = (event: any) => {
      if (event.detail && event.detail.key === "testResults") {
        console.log("🔄 Test results updated, reloading...")
        loadUserData()
      }
    }

    window.addEventListener("localStorageChange", handleStorageChange)

    return () => {
      window.removeEventListener("localStorageChange", handleStorageChange)
    }
  }, [user?.id])

  const formatTime = (seconds: number): string => {
    if (!seconds || seconds < 0) return "0:00"
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  const getSubjectName = (subject: string): string => {
    const subjectNames: Record<string, string> = {
      matematika: "Matematika",
      ona_tili: "Ona tili",
      tarix: "Tarix",
    }
    return subjectNames[subject] || subject.charAt(0).toUpperCase() + subject.slice(1)
  }

  const getDifficultyText = (difficulty: string): string => {
    const difficultyTexts: Record<string, string> = {
      easy: "Oson",
      medium: "O'rta",
      hard: "Qiyin",
    }
    return difficultyTexts[difficulty] || difficulty
  }

  const getDifficultyColor = (difficulty: string): string => {
    const colors: Record<string, string> = {
      easy: "text-green-600 bg-green-100",
      medium: "text-yellow-600 bg-yellow-100",
      hard: "text-red-600 bg-red-100",
    }
    return colors[difficulty] || "text-gray-600 bg-gray-100"
  }

  const getScoreColor = (score: number, total: number): string => {
    if (total === 0) return "text-gray-600"
    const percentage = (score / total) * 100
    if (percentage >= 90) return "text-green-600"
    if (percentage >= 80) return "text-blue-600"
    if (percentage >= 70) return "text-yellow-600"
    if (percentage >= 60) return "text-orange-600"
    return "text-red-600"
  }

  const calculateStats = () => {
    if (testResults.length === 0) {
      return {
        totalTests: 0,
        averageScore: 0,
        bestScore: 0,
        totalTimeSpent: 0,
        averageTime: 0,
        difficultyBreakdown: { easy: 0, medium: 0, hard: 0 },
        subjectBreakdown: {} as Record<string, number>,
      }
    }

    const totalScore = testResults.reduce((sum, result) => {
      return sum + (result.score / result.totalQuestions) * 100
    }, 0)

    const bestResult = testResults.reduce((best, current) => {
      const currentPercentage = (current.score / current.totalQuestions) * 100
      const bestPercentage = (best.score / best.totalQuestions) * 100
      return currentPercentage > bestPercentage ? current : best
    })

    const totalTimeSpent = testResults.reduce((sum, result) => sum + result.timeSpent, 0)

    const difficultyBreakdown = testResults.reduce(
      (acc, result) => {
        acc[result.difficulty] = (acc[result.difficulty] || 0) + 1
        return acc
      },
      { easy: 0, medium: 0, hard: 0 } as Record<string, number>,
    )

    const subjectBreakdown = testResults.reduce(
      (acc, result) => {
        result.subjects.forEach((subject) => {
          acc[subject] = (acc[subject] || 0) + 1
        })
        return acc
      },
      {} as Record<string, number>,
    )

    return {
      totalTests: testResults.length,
      averageScore: Math.round(totalScore / testResults.length),
      bestScore: Math.round((bestResult.score / bestResult.totalQuestions) * 100),
      totalTimeSpent,
      averageTime: Math.round(totalTimeSpent / testResults.length),
      difficultyBreakdown,
      subjectBreakdown,
    }
  }

  const stats = calculateStats()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Ma'lumotlar yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Xatolik yuz berdi</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Qayta yuklash
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    <div className="flex items-center space-x-1 mt-2">
                      <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                      <span className="text-sm text-white/80">Real-time profil</span>
                    </div>
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
                      <p className="font-medium text-sm break-all">{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Trophy className="text-gray-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Jami testlar</p>
                      <p className="font-medium">{stats.totalTests} ta test</p>
                    </div>
                  </div>
                  {stats.totalTests > 0 && (
                    <>
                      <div className="flex items-center space-x-3">
                        <Target className="text-gray-400" size={20} />
                        <div>
                          <p className="text-sm text-gray-500">O'rtacha ball</p>
                          <p className="font-medium">{stats.averageScore}%</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Award className="text-gray-400" size={20} />
                        <div>
                          <p className="text-sm text-gray-500">Eng yaxshi natija</p>
                          <p className="font-medium">{stats.bestScore}%</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="text-gray-400" size={20} />
                        <div>
                          <p className="text-sm text-gray-500">O'rtacha vaqt</p>
                          <p className="font-medium">{formatTime(stats.averageTime)}</p>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="flex items-center space-x-3">
                    <Calendar className="text-gray-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Ro'yxatdan o'tgan</p>
                      <p className="font-medium">
                        {user?.registeredAt ? new Date(user.registeredAt).toLocaleDateString("uz-UZ") : "Noma'lum"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                {stats.totalTests > 0 && (
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="font-semibold text-gray-900 mb-4">Statistika</h3>

                    {/* Difficulty breakdown */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Qiyinchilik bo'yicha</p>
                      <div className="space-y-2">
                        {Object.entries(stats.difficultyBreakdown).map(([difficulty, count]) => (
                          <div key={difficulty} className="flex justify-between items-center">
                            <span className="text-sm">{getDifficultyText(difficulty)}</span>
                            <span className="text-sm font-medium">{count} ta</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Subject breakdown */}
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Fanlar bo'yicha</p>
                      <div className="space-y-2">
                        {Object.entries(stats.subjectBreakdown).map(([subject, count]) => (
                          <div key={subject} className="flex justify-between items-center">
                            <span className="text-sm">{getSubjectName(subject)}</span>
                            <span className="text-sm font-medium">{count} ta</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Test Results */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center space-x-2">
                  <Trophy className="text-yellow-500" size={24} />
                  <span>Test natijalari</span>
                </h2>
                {stats.totalTests > 0 && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Activity size={16} />
                    <span>Real-time yangilanadi</span>
                  </div>
                )}
              </div>

              {testResults.length === 0 ? (
                <div className="text-center py-12">
                  <Trophy className="mx-auto mb-4 text-gray-300" size={64} />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Hali test topshirmadingiz</h3>
                  <p className="text-gray-500 mb-6">
                    Birinchi testingizni topshiring va natijalaringizni bu yerda ko'ring
                  </p>
                  <button
                    onClick={() => (window.location.href = "/")}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Test boshlash
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {testResults.map((result, index) => (
                    <div key={result.id || index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold capitalize">{result.testType} Test</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(result.difficulty)}`}>
                              {getDifficultyText(result.difficulty)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">
                            Fanlar: {result.subjects.map(getSubjectName).join(", ")}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar size={14} />
                              <span>{new Date(result.completedAt).toLocaleDateString("uz-UZ")}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock size={14} />
                              <span>{formatTime(result.timeSpent)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <BookOpen size={14} />
                              <span>{result.totalQuestions} savol</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className={`text-lg font-bold ${getScoreColor(result.score, result.totalQuestions)}`}>
                            {result.score}/{result.totalQuestions}
                          </div>
                          <div className="text-sm text-gray-500">
                            {result.totalQuestions > 0 ? Math.round((result.score / result.totalQuestions) * 100) : 0}%
                          </div>
                          <button
                            onClick={() => setSelectedTest(result)}
                            className="mt-2 flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm transition-colors"
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
                  <button onClick={() => setSelectedTest(null)} className="text-gray-500 hover:text-gray-700 text-2xl">
                    ✕
                  </button>
                </div>
                <p className="text-gray-600 mt-1">
                  {selectedTest.testType.toUpperCase()} - {selectedTest.subjects.map(getSubjectName).join(", ")}
                </p>
              </div>

              <div className="p-6">
                {/* Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedTest.totalQuestions}</div>
                    <div className="text-sm text-gray-600">Jami savollar</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{selectedTest.score}</div>
                    <div className="text-sm text-gray-600">To'g'ri javoblar</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {selectedTest.totalQuestions - selectedTest.score}
                    </div>
                    <div className="text-sm text-gray-600">Noto'g'ri javoblar</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{formatTime(selectedTest.timeSpent)}</div>
                    <div className="text-sm text-gray-600">Sarflangan vaqt</div>
                  </div>
                </div>

                {/* Questions Analysis */}
                {selectedTest.answers && selectedTest.answers.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Savollar tahlili</h4>
                    {selectedTest.answers.map((answer, index) => (
                      <div
                        key={answer.questionId || index}
                        className={`p-4 rounded-lg border-2 ${
                          answer.isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
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
                                {answer.question?.subject ? getSubjectName(answer.question.subject) : "Noma'lum fan"}
                              </span>
                              <span className="text-sm text-gray-500">Savol {index + 1}</span>
                            </div>
                            {answer.question?.question && (
                              <>
                                <p className="font-medium mb-2">{answer.question.question}</p>
                                {answer.question.options && (
                                  <div className="space-y-1">
                                    {answer.question.options.map((option: string, optIndex: number) => (
                                      <div
                                        key={optIndex}
                                        className={`text-sm p-2 rounded ${
                                          optIndex === answer.question.correctAnswer
                                            ? "bg-green-100 text-green-800 font-medium"
                                            : optIndex === answer.selectedAnswer && !answer.isCorrect
                                              ? "bg-red-100 text-red-800"
                                              : "bg-gray-50 text-gray-600"
                                        }`}
                                      >
                                        {String.fromCharCode(97 + optIndex)}) {option}
                                        {optIndex === answer.question.correctAnswer && (
                                          <span className="ml-2 text-green-600">✓ To'g'ri javob</span>
                                        )}
                                        {optIndex === answer.selectedAnswer && !answer.isCorrect && (
                                          <span className="ml-2 text-red-600">✗ Sizning javobingiz</span>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
