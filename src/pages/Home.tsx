"use client";

import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useDynamicStats } from "../hooks/useDynamicStats";
import Footer from "../components/Footer";
import {
  BookOpen,
  Clock,
  Users,
  Trophy,
  Star,
  Award,
  Target,
  Zap,
  TrendingUp,
  Shield,
  Sparkles,
  Brain,
  Activity,
} from "lucide-react";
import StatsAnimator from "../components/StatsAnimator";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const dynamicStats = useDynamicStats();

  const testTypes = [
    {
      id: "dtm",
      title: "DTM test",
      description: "Davlat test markazi testlari",
      color: "from-blue-500 to-blue-600",
      icon: BookOpen,
      gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      id: "virtual",
      title: "Virtual test",
      description: "Onlayn virtual imtihonlar",
      color: "from-pink-500 to-pink-600",
      icon: Clock,
      gradient: "bg-gradient-to-br from-pink-500 to-pink-600",
    },
    {
      id: "oliy",
      title: "Xususiy oliygohllar",
      description: "Xususiy universitetlar testlari",
      color: "from-purple-500 to-purple-600",
      icon: Users,
      gradient: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      id: "prezident",
      title: "Prezident maktabi",
      description: "Prezident maktablari testlari",
      color: "from-green-500 to-green-600",
      icon: Trophy,
      gradient: "bg-gradient-to-br from-green-500 to-green-600",
    },
  ];

  // Real-time dinamik statistikalar
  const stats = [
    {
      icon: Users,
      number:
        dynamicStats.totalUsers >= 1000
          ? `${Math.floor(dynamicStats.totalUsers / 1000)}K+`
          : `${dynamicStats.totalUsers}+`,
      label: "Faol foydalanuvchilar",
      color: "text-blue-600",
      count: dynamicStats.totalUsers,
      realTime: true,
      subInfo: `+${dynamicStats.realTimeData.newUsersToday} bugun`,
    },
    {
      icon: BookOpen,
      number:
        dynamicStats.totalQuestions >= 1000
          ? `${Math.floor(dynamicStats.totalQuestions / 1000)}K+`
          : `${dynamicStats.totalQuestions}+`,
      label: "Test savollari",
      color: "text-green-600",
      count: dynamicStats.totalQuestions,
      realTime: false,
      subInfo: "3 fan bo'yicha",
    },
    {
      icon: Award,
      number: `${dynamicStats.successRate}%`,
      label: "Muvaffaqiyat darajasi",
      color: "text-purple-600",
      count: dynamicStats.successRate,
      realTime: true,
      subInfo: "70%+ natija",
    },
    {
      icon: Star,
      number: dynamicStats.averageUserRating.toFixed(1),
      label: "Foydalanuvchi bahosi",
      color: "text-yellow-600",
      count: dynamicStats.averageUserRating,
      realTime: true,
      subInfo: `${dynamicStats.totalRatings} ta baho`,
    },
  ];

  // Dinamik xususiyatlar
  const features = [
    {
      icon: Brain,
      title: "3 Qiyinchilik Darajasi",
      description:
        "Oson, O'rta va Qiyin darajalardan tanlang. Har bir daraja o'z vaqt chegarasi bilan",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      dynamicInfo: `${
        dynamicStats.difficultyStats.easy +
        dynamicStats.difficultyStats.medium +
        dynamicStats.difficultyStats.hard
      } ta test topshirildi`,
      subStats: [
        {
          label: "Oson",
          count: dynamicStats.difficultyStats.easy,
          color: "text-green-600",
        },
        {
          label: "O'rta",
          count: dynamicStats.difficultyStats.medium,
          color: "text-yellow-600",
        },
        {
          label: "Qiyin",
          count: dynamicStats.difficultyStats.hard,
          color: "text-red-600",
        },
      ],
    },
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description:
        "Barcha statistikalar real vaqtda yangilanadi. Har bir ro'yxatdan o'tish va test natijasi darhol ko'rinadi",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      dynamicInfo: `${dynamicStats.realTimeData.onlineUsers} ta online foydalanuvchi`,
      subStats: [
        {
          label: "Bugun testlar",
          count: dynamicStats.realTimeData.testsToday,
          color: "text-green-600",
        },
        {
          label: "Yangi userlar",
          count: dynamicStats.realTimeData.newUsersToday,
          color: "text-blue-600",
        },
      ],
    },
    {
      icon: TrendingUp,
      title: "Real-time Baholash",
      description:
        "Test yakunlangach platformani baholang. Sizning fikringiz boshqalar uchun muhim va darhol ko'rinadi",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      dynamicInfo: `${dynamicStats.totalRatings} ta baho berildi`,
      subStats: [
        {
          label: `${dynamicStats.averageUserRating.toFixed(1)} ⭐ o'rtacha`,
          count: 0,
          color: "text-yellow-600",
        },
        {
          label: "Real foydalanuvchilar",
          count: dynamicStats.totalRatings,
          color: "text-purple-600",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                  <Zap className="text-white" size={40} />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                  <Star className="text-white" size={12} />
                </div>
                {/* Real-time indicator */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse border-2 border-white"></div>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Universitetga kirishni{" "}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                xohlaysizmi?
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
              Akam sizga DTM testlari, imtihon materiallari va universitet
              tanlashda yordam beradi.{" "}
              <span className="font-semibold text-green-600">
                3 xil qiyinchilik darajasi va real-time statistikalar bilan
                rivojlanishingizni biz bilan boshlang!
              </span>
            </p>

            {/* Real-time stats preview */}
            <div className="flex justify-center items-center space-x-6 mb-8 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>{dynamicStats.realTimeData.onlineUsers} online</span>
              </div>
              <div className="flex items-center space-x-1">
                <Activity size={14} className="text-blue-500" />
                <span>+{dynamicStats.realTimeData.newUsersToday} bugun</span>
              </div>
              <div className="flex items-center space-x-1">
                <Trophy size={14} className="text-yellow-500" />
                <span>+{dynamicStats.realTimeData.testsToday} test</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users size={14} className="text-purple-500" />
                <span>{dynamicStats.totalUsers.toLocaleString()} user</span>
              </div>
            </div>

            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/register"
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <Sparkles size={20} />
                    <span>Bepul ro'yxatdan o'tish</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-green-600 bg-white border-2 border-green-200 rounded-2xl hover:bg-green-50 hover:border-green-300 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Shield className="mr-2" size={20} />
                  Tizimga kirish
                </Link>
              </div>
            )}
          </div>

          {/* Real-time Dynamic Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110 relative">
                    <Icon className={`${stat.color}`} size={28} />
                    {stat.realTime && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    <StatsAnimator
                      targetValue={stat.count}
                      formatter={(value) => {
                        if (
                          stat.label.includes("foydalanuvchilar") ||
                          stat.label.includes("savollari")
                        ) {
                          return value >= 1000
                            ? `${Math.floor(value / 1000)}K+`
                            : `${value}+`;
                        }
                        if (stat.label.includes("daraja")) {
                          return `${value}%`;
                        }
                        if (stat.label.includes("baho")) {
                          return value.toFixed(1);
                        }
                        return value.toString();
                      }}
                    />
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {stat.realTime ? (
                      <span className="flex items-center justify-center space-x-1">
                        <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                        <span>{stat.subInfo}</span>
                      </span>
                    ) : (
                      stat.subInfo
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Test Types Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Test turlarini tanlang
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Maqsadingizga mos test turini tanlab, 3 xil qiyinchilik darajasida
            tayyorgarlikni boshlang
          </p>
          <div className="flex justify-center mt-4">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              <Activity size={16} />
              <span>Real-time natijalar</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {testTypes.map((test) => {
            const Icon = test.icon;
            return (
              <Link
                key={test.id}
                to={
                  isAuthenticated ? `/subject-selection/${test.id}` : "/login"
                }
                className="group relative"
              >
                <div className="relative overflow-hidden bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                  <div className={`${test.gradient} p-8 text-white relative`}>
                    <div className="absolute top-4 right-4 opacity-20">
                      <Icon size={60} />
                    </div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{test.title}</h3>
                      <p className="text-white/90 text-sm leading-relaxed">
                        {test.description}
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        3 qiyinchilik darajasi
                      </span>
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-green-100 transition-colors">
                        <Target
                          className="text-gray-600 group-hover:text-green-600"
                          size={16}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Enhanced Dynamic Features Section */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nima uchun bizni tanlaysiz?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Zamonaviy texnologiyalar, 3 qiyinchilik darajasi va real-time
              baholash tizimi bilan muvaffaqiyatga erishing
            </p>
            <div className="flex justify-center mt-4 space-x-4">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Real-time yangilanish</span>
              </div>
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                <TrendingUp size={14} />
                <span>Dinamik statistika</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 h-full">
                    <div
                      className={`w-20 h-20 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 relative`}
                    >
                      <Icon className={`${feature.iconColor}`} size={32} />
                      {index === 1 && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed mb-4">
                      {feature.description}
                    </p>

                    {/* Real-time statistics */}
                    <div className="text-center mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <TrendingUp size={12} className="mr-1" />
                        {feature.dynamicInfo}
                      </span>
                    </div>

                    {/* Sub-statistics */}
                    {feature.subStats && (
                      <div className="space-y-2">
                        {feature.subStats.map((subStat, subIndex) => (
                          <div
                            key={subIndex}
                            className="flex items-center justify-between text-xs"
                          >
                            <span className="text-gray-500">
                              {subStat.label}
                            </span>
                            {subStat.count > 0 && (
                              <span
                                className={`font-semibold ${subStat.color}`}
                              >
                                {subStat.count.toLocaleString()}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      {!isAuthenticated && (
        <div className="bg-gradient-to-r from-green-600 to-blue-600 py-16">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Bugun o'z kelajagingizni quring!
            </h2>
            <p className="text-xl text-green-100 mb-4 max-w-2xl mx-auto">
              {dynamicStats.totalUsers.toLocaleString()}+ talaba bizning
              platformamiz orqali universitetga kirish imtihonlarini
              muvaffaqiyatli topshirdi
            </p>
            <div className="flex justify-center space-x-8 mb-8 text-green-100">
              <div className="text-center">
                <div className="text-2xl font-bold flex items-center justify-center space-x-1">
                  <span>{dynamicStats.averageUserRating.toFixed(1)}</span>
                  <Star className="text-yellow-300 fill-current" size={20} />
                </div>
                <div className="text-sm">O'rtacha baho</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {dynamicStats.successRate}%
                </div>
                <div className="text-sm">Muvaffaqiyat</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold flex items-center justify-center space-x-1">
                  <span>3</span>
                  <Brain size={20} />
                </div>
                <div className="text-sm">Qiyinchilik darajasi</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold flex items-center justify-center space-x-1">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                  <span>{dynamicStats.realTimeData.onlineUsers}</span>
                </div>
                <div className="text-sm">Online</div>
              </div>
            </div>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-green-600 bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="mr-2" size={20} />
              Hoziroq boshlash
            </Link>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
