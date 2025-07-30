"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useDynamicStats } from "../hooks/useDynamicStats"
import {
  BookOpen,
  Users,
  Trophy,
  TrendingUp,
  Zap,
  Target,
  Star,
  ChevronRight,
  Play,
  Award,
  Rocket,
  Activity,
  Globe,
  Shield,
  CheckCircle,
  ArrowRight,
  Timer,
  UserCheck,
  LineChart,
  Sparkles,
  Brain,
  Clock,
  Medal,
} from "lucide-react"
import StatsAnimator from "../components/StatsAnimator"
import RealTimeIndicator from "../components/RealTimeIndicator"

export default function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const stats = useDynamicStats()
  const [currentTestType, setCurrentTestType] = useState(0)

  // Auto-rotate test types
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestType((prev) => (prev + 1) % 4)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const testTypes = [
    {
      id: "dtm",
      title: "DTM Test",
      subtitle: "Davlat test markazi testlari",
      description: "Rasmiy DTM testlariga tayyorgarlik ko'ring",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      features: ["Rasmiy format", "Real vaqt", "Batafsil tahlil"],
      difficulty: "3 qiyinchilik darajasi",
      gradient: "bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700",
    },
    {
      id: "virtual",
      title: "Virtual Test",
      subtitle: "Onlayn virtual imtihonlar",
      description: "Interaktiv virtual muhitda test topshiring",
      icon: Globe,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      textColor: "text-pink-700",
      features: ["Virtual muhit", "Interaktiv", "Zamonaviy"],
      difficulty: "3 qiyinchilik darajasi",
      gradient: "bg-gradient-to-br from-pink-500 via-rose-600 to-red-700",
    },
    {
      id: "oliy",
      title: "Xususiy Oliygohllar",
      subtitle: "Xususiy universitetlar testlari",
      description: "Xususiy oliygohlarga kirish uchun tayyorlaning",
      icon: Award,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      features: ["Maxsus format", "Yuqori sifat", "Professional"],
      difficulty: "3 qiyinchilik darajasi",
      gradient: "bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-700",
    },
    {
      id: "prezident",
      title: "Prezident Maktabi",
      subtitle: "Prezident maktablari testlari",
      description: "Prezident maktablariga kirish imtihonlari",
      icon: Trophy,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      features: ["Yuqori daraja", "Maxsus tayyorgarlik", "Elite ta'lim"],
      difficulty: "3 qiyinchilik darajasi",
      gradient: "bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700",
    },
  ]

  const features = [
    {
      icon: Target,
      title: "3 Qiyinchilik Darajasi",
      description: "Oson, O'rta va Qiyin darajalardan tanlang. Har bir daraja o'z xususiyatlariga ega",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      textColor: "text-blue-700",
      features: ["Boshlang'ich daraja", "O'rta daraja", "Yuqori daraja"],
      stats: `${stats.testsToday} ta test bugun`,
      badge: "3 daraja",
    },
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description:
        "Barcha statistikalar real vaqtda yangilanadi. Har bir ro'yxatdan o'tish va test natijalari darhol ko'rinadi",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      textColor: "text-green-700",
      features: [`${stats.onlineUsers} ta online foydalanuvchi`, "Real-time yangilanish", "Darhol natija"],
      stats: "Live statistika",
      badge: "Real-time",
    },
    {
      icon: LineChart,
      title: "Real-time Baholash",
      description:
        "Test yakunlangach platformani baholang. Sizning fikringiz boshqalar uchun muhim va darhol ko'rinadi",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
      textColor: "text-purple-700",
      features: ["5 yulduzli baholash", "Real fikrlar", "Darhol ko'rinadi"],
      stats: `${stats.totalRatings} ta baho berildi`,
      badge: "Live baholash",
    },
  ]

  const subjects = [
    { name: "Matematika", tests: 500, icon: "📐", color: "bg-blue-100 text-blue-700" },
    { name: "Ona tili", tests: 500, icon: "📚", color: "bg-green-100 text-green-700" },
    { name: "Tarix", tests: 500, icon: "🏛️", color: "bg-purple-100 text-purple-700" },
    { name: "Ingliz tili", tests: 500, icon: "🇺🇸", color: "bg-red-100 text-red-700" },
    { name: "Fizika", tests: 500, icon: "⚛️", color: "bg-indigo-100 text-indigo-700" },
    { name: "Kimyo", tests: 500, icon: "🧪", color: "bg-yellow-100 text-yellow-700" },
    { name: "Biologiya", tests: 500, icon: "🧬", color: "bg-emerald-100 text-emerald-700" },
    { name: "Geografiya", tests: 500, icon: "🌍", color: "bg-teal-100 text-teal-700" },
    { name: "Adabiyot", tests: 500, icon: "📖", color: "bg-pink-100 text-pink-700" },
    { name: "Informatika", tests: 500, icon: "💻", color: "bg-cyan-100 text-cyan-700" },
    { name: "Huquq", tests: 500, icon: "⚖️", color: "bg-amber-100 text-amber-700" },
    { name: "Iqtisod", tests: 500, icon: "💰", color: "bg-lime-100 text-lime-700" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>

        {/* Enhanced Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full animate-bounce ${
              [
                "bg-blue-400",
                "bg-purple-400",
                "bg-green-400",
                "bg-pink-400",
                "bg-yellow-400",
                "bg-indigo-400",
                "bg-red-400",
                "bg-cyan-400",
              ][i]
            }`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Hero Section */}
        <section className="pt-20 pb-16 text-center relative">
          {/* Enhanced Animated Logo */}
          <div className="mb-8 relative">
            <div className="w-28 h-28 mx-auto bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl animate-float relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              <Zap className="text-white w-14 h-14 relative z-10 animate-pulse" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                <Star className="text-white w-4 h-4" />
              </div>
              <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="text-white w-3 h-3" />
              </div>
            </div>

            {/* Enhanced floating elements */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-3 h-3 rounded-full animate-ping ${
                  ["bg-blue-400", "bg-purple-400", "bg-green-400", "bg-pink-400", "bg-yellow-400", "bg-indigo-400"][i]
                }`}
                style={{
                  top: `${["-16px", "32px", "-8px", "40px", "8px", "-12px"][i]}`,
                  left: `${["-16px", "112px", "-32px", "-24px", "120px", "100px"][i]}`,
                  animationDelay: `${i * 0.3}s`,
                }}
              ></div>
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 relative">
            <span className="text-gray-900">Universitetga kirishni </span>
            <span className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
              xohlaysizmi?
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Akam sizga DTM testlari, imtihon materiallari va universitet tanlashda yordam beradi.
          </p>

          <div className="mb-12">
            <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-xl border border-white/20">
              <Brain className="w-6 h-6 text-purple-600" />
              <span className="text-lg font-semibold text-gray-800">
                3 xil qiyinchilik darajasi va real-time statistikalar bilan rivojlanishingizni biz bilan boshlang!
              </span>
            </div>
          </div>

          {/* Enhanced Real-time indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
            <div className="flex items-center space-x-2 bg-blue-100 text-blue-700 px-6 py-3 rounded-full shadow-lg border border-blue-200">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <Activity className="w-5 h-5" />
              <span className="font-medium">Real-time yangilanish</span>
            </div>
            <div className="flex items-center space-x-2 bg-green-100 text-green-700 px-6 py-3 rounded-full shadow-lg border border-green-200">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <LineChart className="w-5 h-5" />
              <span className="font-medium">Dinamik statistika</span>
            </div>
          </div>

          {/* Enhanced Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <StatsAnimator
              icon={Users}
              value={stats.totalUsers}
              label="Faol foydalanuvchilar"
              suffix="+"
              color="text-blue-600"
              bgColor="bg-blue-50"
              change={`+${stats.newUsersToday} bugun`}
            />
            <StatsAnimator
              icon={BookOpen}
              value={Math.floor(stats.totalQuestions / 1000)}
              label="Test savollari"
              suffix="K+"
              color="text-green-600"
              bgColor="bg-green-50"
              change="12 fan bo'yicha"
            />
            <StatsAnimator
              icon={TrendingUp}
              value={stats.successRate}
              label="Muvaffaqiyat darajasi"
              suffix="%"
              color="text-purple-600"
              bgColor="bg-purple-50"
              change="+70% natija"
            />
            <StatsAnimator
              icon={Star}
              value={stats.averageUserRating}
              label="Foydalanuvchi bahosi"
              suffix=""
              color="text-yellow-600"
              bgColor="bg-yellow-50"
              change={`${stats.totalRatings} ta baho`}
            />
          </div>

          {/* Enhanced Current online stats */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
            <RealTimeIndicator icon={Users} value={stats.onlineUsers} label="online" color="green" />
            <RealTimeIndicator icon={Zap} value={stats.newUsersToday} label="+1 bugun" color="blue" />
            <RealTimeIndicator icon={Trophy} value={stats.testsToday} label="+0 test" color="purple" />
            <RealTimeIndicator icon={Clock} value={stats.activeUsers} label="6 user" color="orange" />
          </div>
        </section>

        {/* Enhanced Test Types Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Test turlarini tanlang</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Maqsadingizga mos test turini tanlab, 3 xil qiyinchilik darajasida tayyorgarlikni boshlang
            </p>
            <div className="mt-6 inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Real-time natijalar</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testTypes.map((test, index) => {
              const Icon = test.icon
              const isActive = index === currentTestType

              return (
                <div
                  key={test.id}
                  onClick={() => navigate(`/subject-selection/${test.id}`)}
                  className={`group relative p-8 rounded-3xl cursor-pointer transition-all duration-700 transform hover:scale-105 ${
                    isActive ? "shadow-2xl scale-105 ring-4 ring-white/50" : "shadow-xl hover:shadow-2xl"
                  }`}
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${test.color.split(" ")[1]}, ${test.color.split(" ")[3]})`
                      : "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  {/* Background gradient overlay */}
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${test.color} opacity-0 ${isActive ? "opacity-100" : "group-hover:opacity-10"} transition-opacity duration-500`}
                  ></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 ${
                          isActive ? "bg-white/20 backdrop-blur-sm" : `${test.bgColor} group-hover:scale-110`
                        }`}
                      >
                        <Icon className={`w-8 h-8 ${isActive ? "text-white" : test.textColor}`} />
                      </div>

                      {isActive && (
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          <div
                            className="w-2 h-2 bg-white/70 rounded-full animate-pulse"
                            style={{ animationDelay: "0.5s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-white/50 rounded-full animate-pulse"
                            style={{ animationDelay: "1s" }}
                          ></div>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className={`text-2xl font-bold mb-2 ${isActive ? "text-white" : "text-gray-900"}`}>
                      {test.title}
                    </h3>
                    <p className={`text-sm mb-4 ${isActive ? "text-white/90" : "text-gray-600"}`}>{test.subtitle}</p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {test.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className={`w-4 h-4 ${isActive ? "text-white" : "text-green-500"}`} />
                          <span className={`text-sm ${isActive ? "text-white/90" : "text-gray-600"}`}>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Difficulty badge */}
                    <div
                      className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                        isActive ? "bg-white/20 text-white backdrop-blur-sm" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <Target className="w-3 h-3" />
                      <span>{test.difficulty}</span>
                    </div>

                    {/* Action button */}
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${isActive ? "text-white/90" : "text-gray-600"}`}>
                        Testni boshlash
                      </span>
                      <ArrowRight
                        className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${
                          isActive ? "text-white" : "text-gray-400"
                        }`}
                      />
                    </div>

                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
                        <Play className="w-3 h-3 text-gray-700" />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nima uchun bizni tanlaysiz?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Zamonaviy texnologiyalar, 3 qiyinchilik darajasi va real-time baholash tizimi bilan muvaffaqiyatga
              erishing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon

              return (
                <div
                  key={index}
                  className="group relative p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white/20"
                >
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 ${feature.iconBg} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}
                    >
                      <Icon className={`w-8 h-8 ${feature.textColor}`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>

                    {/* Features list */}
                    <div className="space-y-2 mb-6">
                      {feature.features.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stats and badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{feature.stats}</span>
                      <span
                        className={`px-3 py-1 ${feature.bgColor} ${feature.textColor} rounded-full text-xs font-medium`}
                      >
                        {feature.badge}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Enhanced Subjects Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">12 ta fan bo'yicha testlar</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Har bir fandan 500 tadan takrorlanmas savollar bilan mukammal tayyorgarlik
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="group p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/20"
              >
                <div className="text-center">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {subject.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{subject.name}</h3>
                  <div
                    className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${subject.color}`}
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>{subject.tests} savol</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-16 text-center">
          <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            {/* Enhanced background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-white/5 rounded-full"></div>

            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Rocket className="text-white w-10 h-10" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Hoziroq boshlang!</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                {stats.totalQuestions.toLocaleString()}+ savol, 12 ta fan, 3 qiyinchilik darajasi va real-time
                statistikalar sizni kutmoqda
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {user ? (
                  <button
                    onClick={() => navigate("/profile")}
                    className="group bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
                  >
                    <UserCheck className="w-6 h-6" />
                    <span>Profilga o'tish</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/register")}
                      className="group bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
                    >
                      <Rocket className="w-6 h-6" />
                      <span>Ro'yxatdan o'tish</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => navigate("/login")}
                      className="group bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
                    >
                      <span>Kirish</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </>
                )}
              </div>

              {/* Enhanced Real-time stats */}
              <div className="mt-8 flex flex-wrap justify-center gap-6">
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white font-medium">Real-time tizim</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Timer className="w-4 h-4 text-white" />
                  <span className="text-white font-medium">24/7 mavjud</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Shield className="w-4 h-4 text-white" />
                  <span className="text-white font-medium">Xavfsiz platform</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Medal className="w-4 h-4 text-white" />
                  <span className="text-white font-medium">{stats.onlineUsers} online</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
