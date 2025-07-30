"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useTest } from "../contexts/TestContext"
import { useStats } from "../contexts/StatsContext"
import {
  ArrowLeft,
  Clock,
  AlertCircle,
  BookOpen,
  CheckCircle2,
  Zap,
  Target,
  Brain,
  Sparkles,
  Star,
  Trophy,
  Rocket,
  Activity,
  TrendingUp,
  Users,
} from "lucide-react"

export default function SubjectSelection() {
  const { testType } = useParams<{ testType: string }>()
  const navigate = useNavigate()
  const { startTest } = useTest()
  const { stats } = useStats()

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [questionCount, setQuestionCount] = useState<string>("")
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy")
  const [error, setError] = useState<string>("")

  // 12 TA FAN BILAN MUKAMMAL SUBJECTS
  const subjects = [
    {
      id: "matematika",
      name: "Matematika",
      questions: 1500,
      icon: "📐",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      textColor: "text-blue-700",
      borderColor: "border-blue-200",
      description: "Algebra, geometriya, matematik analiz",
      difficulty: "Yuqori",
      popularity: 95,
      progress: 85,
    },
    {
      id: "ona_tili",
      name: "Ona tili",
      questions: 1500,
      icon: "📚",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      textColor: "text-green-700",
      borderColor: "border-green-200",
      description: "Grammatika, adabiyot, til qoidalari",
      difficulty: "O'rta",
      popularity: 88,
      progress: 92,
    },
    {
      id: "tarix",
      name: "O'zbekiston tarixi",
      questions: 1500,
      icon: "🏛️",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
      textColor: "text-purple-700",
      borderColor: "border-purple-200",
      description: "Qadimgi va zamonaviy tarix",
      difficulty: "O'rta",
      popularity: 82,
      progress: 78,
    },
    {
      id: "ingliz_tili",
      name: "Ingliz tili",
      questions: 1500,
      icon: "🇺🇸",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      iconBg: "bg-red-100",
      textColor: "text-red-700",
      borderColor: "border-red-200",
      description: "Grammar, vocabulary, reading",
      difficulty: "Yuqori",
      popularity: 92,
      progress: 88,
    },
    {
      id: "fizika",
      name: "Fizika",
      questions: 1500,
      icon: "⚛️",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      iconBg: "bg-indigo-100",
      textColor: "text-indigo-700",
      borderColor: "border-indigo-200",
      description: "Mexanika, termodinamika, optika",
      difficulty: "Yuqori",
      popularity: 78,
      progress: 72,
    },
    {
      id: "kimyo",
      name: "Kimyo",
      questions: 1500,
      icon: "🧪",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      iconBg: "bg-yellow-100",
      textColor: "text-yellow-700",
      borderColor: "border-yellow-200",
      description: "Organik, noorganik, analitik kimyo",
      difficulty: "Yuqori",
      popularity: 75,
      progress: 68,
    },
    {
      id: "biologiya",
      name: "Biologiya",
      questions: 1500,
      icon: "🧬",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      textColor: "text-emerald-700",
      borderColor: "border-emerald-200",
      description: "Botanika, zoologiya, genetika",
      difficulty: "O'rta",
      popularity: 85,
      progress: 80,
    },
    {
      id: "geografiya",
      name: "Geografiya",
      questions: 1500,
      icon: "🌍",
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50",
      iconBg: "bg-teal-100",
      textColor: "text-teal-700",
      borderColor: "border-teal-200",
      description: "Fizik va iqtisodiy geografiya",
      difficulty: "O'rta",
      popularity: 70,
      progress: 65,
    },
    {
      id: "adabiyot",
      name: "Adabiyot",
      questions: 1500,
      icon: "📖",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      iconBg: "bg-pink-100",
      textColor: "text-pink-700",
      borderColor: "border-pink-200",
      description: "Klassik va zamonaviy adabiyot",
      difficulty: "O'rta",
      popularity: 68,
      progress: 62,
    },
    {
      id: "informatika",
      name: "Informatika",
      questions: 1500,
      icon: "💻",
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50",
      iconBg: "bg-cyan-100",
      textColor: "text-cyan-700",
      borderColor: "border-cyan-200",
      description: "Dasturlash, algoritmlar, IT",
      difficulty: "Yuqori",
      popularity: 90,
      progress: 95,
    },
    {
      id: "huquq",
      name: "Huquq",
      questions: 1500,
      icon: "⚖️",
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      iconBg: "bg-amber-100",
      textColor: "text-amber-700",
      borderColor: "border-amber-200",
      description: "Konstitutsiya, fuqarolik huquqi",
      difficulty: "Yuqori",
      popularity: 65,
      progress: 58,
    },
    {
      id: "iqtisod",
      name: "Iqtisod",
      questions: 1500,
      icon: "💰",
      color: "from-lime-500 to-lime-600",
      bgColor: "bg-lime-50",
      iconBg: "bg-lime-100",
      textColor: "text-lime-700",
      borderColor: "border-lime-200",
      description: "Makro va mikroiqtisod",
      difficulty: "Yuqori",
      popularity: 72,
      progress: 70,
    },
  ]

  // MUKAMMAL QIYINCHILIK DARAJALARI
  const difficultyLevels = [
    {
      id: "easy",
      name: "Oson",
      description: "Boshlang'ich daraja",
      icon: Target,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      borderColor: "border-green-200",
      textColor: "text-green-700",
      timePerQuestion: 2,
      features: ["Asosiy tushunchalar", "Oddiy masalalar", "Boshlang'ichlar uchun", "Yuqori muvaffaqiyat kafolati"],
      successRate: "85-95%",
      emoji: "🟢",
    },
    {
      id: "medium",
      name: "O'rta",
      description: "O'rta daraja",
      icon: Zap,
      color: "from-yellow-500 to-orange-600",
      bgColor: "bg-yellow-50",
      iconBg: "bg-yellow-100",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-700",
      timePerQuestion: 3,
      features: ["Murakkab masalalar", "Tahlil talab qiladi", "O'rta daraja", "Yaxshi tayyorgarlik kerak"],
      successRate: "70-85%",
      emoji: "🟡",
    },
    {
      id: "hard",
      name: "Qiyin",
      description: "Yuqori daraja",
      icon: Brain,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      iconBg: "bg-red-100",
      borderColor: "border-red-200",
      textColor: "text-red-700",
      timePerQuestion: 5,
      features: ["Eng qiyin masalalar", "Chuqur bilim talab", "Ekspertlar uchun", "Yuqori darajadagi tayyorgarlik"],
      successRate: "50-70%",
      emoji: "🔴",
    },
  ]

  // Maksimal savol sonini hisoblash
  const getMaxQuestions = () => {
    if (selectedSubjects.length === 0) return 500
    return selectedSubjects.reduce((total, subjectId) => {
      const subject = subjects.find((s) => s.id === subjectId)
      return total + (subject?.questions || 0)
    }, 0)
  }

  const handleSubjectToggle = (subjectId: string) => {
    setSelectedSubjects((prev) => {
      const newSubjects = prev.includes(subjectId) ? prev.filter((id) => id !== subjectId) : [...prev, subjectId]

      // Agar fanlar o'zgarsa, savol sonini qayta tekshirish
      const maxQuestions = newSubjects.reduce((total, id) => {
        const subject = subjects.find((s) => s.id === id)
        return total + (subject?.questions || 0)
      }, 0)

      const currentCount = Number.parseInt(questionCount) || 0
      if (currentCount > maxQuestions) {
        setQuestionCount(maxQuestions.toString())
        setError(`Maksimal ${maxQuestions} ta savol tanlash mumkin`)
      } else {
        setError("")
      }

      return newSubjects
    })
  }

  const handleQuestionCountChange = (value: string) => {
    // Faqat raqamlarni qabul qilish
    const numericValue = value.replace(/[^0-9]/g, "")

    if (numericValue === "") {
      setQuestionCount("")
      setError("")
      return
    }

    const count = Number.parseInt(numericValue)
    const maxQuestions = getMaxQuestions()

    if (count < 5) {
      setQuestionCount(numericValue)
      setError("Kamida 5 ta savol tanlang")
    } else if (count > maxQuestions) {
      setQuestionCount(numericValue)
      setError(`Maksimal ${maxQuestions} ta savol tanlash mumkin`)
    } else {
      setQuestionCount(numericValue)
      setError("")
    }
  }

  const handleStartTest = () => {
    const count = Number.parseInt(questionCount)

    if (selectedSubjects.length === 0) {
      setError("Kamida bitta fan tanlang!")
      return
    }

    if (!questionCount || count < 5) {
      setError("Kamida 5 ta savol tanlang!")
      return
    }

    if (count > getMaxQuestions()) {
      setError(`Maksimal ${getMaxQuestions()} ta savol tanlash mumkin!`)
      return
    }

    setError("")
    startTest(testType!, selectedSubjects, count, difficulty)
    navigate(`/test/${testType}`)
  }

  const getTestTitle = (type: string) => {
    switch (type) {
      case "dtm":
        return "DTM Test"
      case "virtual":
        return "Virtual Test"
      case "oliy":
        return "Xususiy Oliygohllar"
      case "prezident":
        return "Prezident Maktabi"
      default:
        return "Test"
    }
  }

  const calculateTime = (questions: number, difficulty: "easy" | "medium" | "hard") => {
    if (!questions || questions === 0) return "0 daqiqa"

    const timeMultiplier = {
      easy: 2,
      medium: 3,
      hard: 5,
    }

    const totalMinutes = questions * timeMultiplier[difficulty]
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    if (hours > 0) {
      return minutes > 0 ? `${hours} soat ${minutes} daqiqa` : `${hours} soat`
    }
    return `${minutes} daqiqa`
  }

  const currentQuestionCount = Number.parseInt(questionCount) || 0
  const selectedDifficulty = difficultyLevels.find((d) => d.id === difficulty)!

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate("/")}
            className="group flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-all duration-300 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">Ortga qaytish</span>
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Sidebar - Test Info */}
          <div className="xl:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 sticky top-8 overflow-hidden">
              {/* Header gradient */}
              <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 shadow-xl">
                    <Trophy className="text-white" size={32} />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{getTestTitle(testType!)}</h2>
                  <p className="text-white/90 text-sm">Mukammal test tizimi</p>
                </div>
              </div>

              {/* Stats */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">{selectedSubjects.length}</div>
                    <div className="text-xs text-blue-600">Tanlangan fan</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">{currentQuestionCount}</div>
                    <div className="text-xs text-green-600">Savol soni</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-600 text-sm">Qiyinchilik:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{selectedDifficulty.emoji}</span>
                      <span className="font-semibold text-gray-900">{selectedDifficulty.name}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-600 text-sm">Vaqt:</span>
                    <span className="font-semibold text-gray-900">
                      {calculateTime(currentQuestionCount, difficulty)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-600 text-sm">Muvaffaqiyat:</span>
                    <span className="font-semibold text-gray-900">{selectedDifficulty.successRate}</span>
                  </div>

                  {selectedSubjects.length > 0 && (
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                      <span className="text-purple-600 text-sm">Maksimal:</span>
                      <span className="font-bold text-purple-700">{getMaxQuestions().toLocaleString()} savol</span>
                    </div>
                  )}
                </div>

                {/* Real-time indicator */}
                <div className="flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-700 text-sm font-medium">Real-time tizim</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="xl:col-span-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
              {/* Header */}
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Sparkles className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">Test sozlamalari</h3>
                  <p className="text-gray-600">12 ta fan, 18,000 ta savol, 3 qiyinchilik darajasi</p>
                </div>
              </div>

              {/* Difficulty Selection */}
              <div className="mb-10">
                <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                  <Brain className="text-purple-600" size={24} />
                  <span>Qiyinchilik darajasini tanlang</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-purple-200 to-transparent"></div>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {difficultyLevels.map((level) => {
                    const Icon = level.icon
                    const isSelected = difficulty === level.id
                    return (
                      <div
                        key={level.id}
                        onClick={() => setDifficulty(level.id as "easy" | "medium" | "hard")}
                        className={`group relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                          isSelected
                            ? `${level.borderColor} ${level.bgColor} shadow-2xl scale-105`
                            : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-xl"
                        }`}
                      >
                        {/* Background gradient effect */}
                        <div
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${level.color} opacity-0 ${isSelected ? "opacity-10" : "group-hover:opacity-5"} transition-opacity duration-300`}
                        ></div>

                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <div
                              className={`w-12 h-12 ${level.iconBg} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 ${isSelected ? "scale-110" : "group-hover:scale-105"}`}
                            >
                              <Icon className={isSelected ? level.textColor : "text-gray-400"} size={24} />
                            </div>
                            <div className="text-2xl animate-pulse">{level.emoji}</div>
                          </div>

                          <h4 className={`text-xl font-bold mb-2 ${isSelected ? level.textColor : "text-gray-800"}`}>
                            {level.name}
                          </h4>
                          <p className="text-gray-600 text-sm mb-4">{level.description}</p>

                          <div className="space-y-2 mb-4">
                            {level.features.map((feature, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <CheckCircle2
                                  size={14}
                                  className={isSelected ? level.textColor.replace("text-", "text-") : "text-gray-400"}
                                />
                                <span className="text-xs text-gray-600">{feature}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">{level.timePerQuestion} daqiqa/savol</span>
                            <span className={`font-semibold ${isSelected ? level.textColor : "text-gray-600"}`}>
                              {level.successRate}
                            </span>
                          </div>

                          {isSelected && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                              <CheckCircle2 className="text-white" size={14} />
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Question Count Input */}
              <div className="mb-10">
                <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                  <Activity className="text-green-600" size={24} />
                  <span>Savollar soni</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-green-200 to-transparent"></div>
                </h4>

                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Savol sonini kiriting (5-{getMaxQuestions().toLocaleString()} orasida)
                  </label>

                  <div className="relative mb-4">
                    <input
                      type="text"
                      value={questionCount}
                      onChange={(e) => handleQuestionCountChange(e.target.value)}
                      placeholder="Masalan: 50"
                      className={`w-full px-6 py-4 text-lg font-semibold border-2 rounded-2xl focus:ring-4 focus:border-transparent transition-all duration-300 ${
                        error
                          ? "border-red-300 focus:ring-red-500/20 bg-red-50"
                          : "border-gray-200 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                      } shadow-lg hover:shadow-xl`}
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock size={16} />
                        <span>{selectedDifficulty.timePerQuestion} daq/savol</span>
                      </div>
                    </div>
                  </div>

                  {currentQuestionCount > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-white rounded-xl shadow-sm">
                        <div className="text-lg font-bold text-blue-600">{currentQuestionCount}</div>
                        <div className="text-xs text-gray-600">Jami savol</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-xl shadow-sm">
                        <div className="text-lg font-bold text-green-600">
                          {calculateTime(currentQuestionCount, difficulty)}
                        </div>
                        <div className="text-xs text-gray-600">Vaqt</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-xl shadow-sm">
                        <div className="text-lg font-bold text-purple-600">{selectedDifficulty.successRate}</div>
                        <div className="text-xs text-gray-600">Muvaffaqiyat</div>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                      <span className="text-red-700 font-medium">{error}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Subject Selection */}
              <div className="mb-10">
                <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                  <BookOpen className="text-indigo-600" size={24} />
                  <span>Fanlarni tanlang</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-indigo-200 to-transparent"></div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {selectedSubjects.length}/12 tanlangan
                  </span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {subjects.map((subject) => {
                    const isSelected = selectedSubjects.includes(subject.id)
                    return (
                      <div
                        key={subject.id}
                        onClick={() => handleSubjectToggle(subject.id)}
                        className={`group relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                          isSelected
                            ? `${subject.borderColor} ${subject.bgColor} shadow-2xl scale-105`
                            : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-xl"
                        }`}
                      >
                        {/* Background gradient */}
                        <div
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${subject.color} opacity-0 ${isSelected ? "opacity-10" : "group-hover:opacity-5"} transition-opacity duration-300`}
                        ></div>

                        <div className="relative z-10">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="text-3xl">{subject.icon}</div>
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                isSelected
                                  ? "border-green-500 bg-green-500 shadow-lg"
                                  : "border-gray-300 group-hover:border-gray-400"
                              }`}
                            >
                              {isSelected && <CheckCircle2 className="text-white" size={14} />}
                            </div>
                          </div>

                          {/* Content */}
                          <h4 className="font-bold text-gray-900 mb-2 text-lg">{subject.name}</h4>
                          <p className="text-sm text-gray-600 mb-3 leading-relaxed">{subject.description}</p>

                          {/* Stats */}
                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-gray-500">Savollar:</span>
                              <span className="font-semibold text-gray-700">{subject.questions.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-gray-500">Qiyinchilik:</span>
                              <span
                                className={`font-semibold ${
                                  subject.difficulty === "Yuqori" ? "text-red-600" : "text-yellow-600"
                                }`}
                              >
                                {subject.difficulty}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-gray-500">Mashhurlik:</span>
                              <div className="flex items-center space-x-1">
                                <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-1000"
                                    style={{ width: `${subject.popularity}%` }}
                                  ></div>
                                </div>
                                <span className="font-semibold text-gray-700">{subject.popularity}%</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-gray-500">Muvaffaqiyat:</span>
                              <div className="flex items-center space-x-1">
                                <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-1000"
                                    style={{ width: `${subject.progress}%` }}
                                  ></div>
                                </div>
                                <span className="font-semibold text-gray-700">{subject.progress}%</span>
                              </div>
                            </div>
                          </div>

                          {/* Selection indicator */}
                          {isSelected && (
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                              <Star className="text-white" size={16} />
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Bottom Section */}
              <div className="border-t-2 border-gray-100 pt-8">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-6 lg:space-y-0">
                  {/* Info */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="text-blue-500" size={20} />
                      <span className="font-semibold text-gray-900">Ta'lim tili: O'zbek</span>
                    </div>
                    {currentQuestionCount > 0 && selectedSubjects.length > 0 && (
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          <span className="font-medium">Tanlangan:</span> {currentQuestionCount} savol,{" "}
                          {selectedSubjects.length} fan
                        </p>
                        <p>
                          <span className="font-medium">Vaqt:</span> {calculateTime(currentQuestionCount, difficulty)}
                        </p>
                        <p>
                          <span className="font-medium">Kutilayotgan natija:</span> {selectedDifficulty.successRate}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Users className="text-green-500" size={16} />
                          <span className="font-medium">Online:</span> {stats.onlineUsers} foydalanuvchi
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Start Button */}
                  <button
                    onClick={handleStartTest}
                    disabled={selectedSubjects.length === 0 || !questionCount || !!error}
                    className="group relative overflow-hidden bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 transform hover:scale-105 disabled:transform-none min-w-[200px]"
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-3">
                      <Rocket size={24} className="group-hover:animate-bounce" />
                      <span>Testni boshlash</span>
                    </span>

                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-shine"></div>

                    {/* Pulse effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400 to-purple-500 opacity-0 group-hover:opacity-20 animate-pulse"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
