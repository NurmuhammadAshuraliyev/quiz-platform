"use client"

import { Link } from "react-router-dom"
import {
  BookOpen,
  Users,
  Trophy,
  Star,
  Zap,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Github,
  Heart,
  ArrowUp,
  Globe,
  Shield,
  Clock,
  Award,
} from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const subjects = [
    { name: "Matematika", href: "/subject/matematika", icon: "📐" },
    { name: "Ona tili", href: "/subject/ona-tili", icon: "📚" },
    { name: "Tarix", href: "/subject/tarix", icon: "🏛️" },
    { name: "Ingliz tili", href: "/subject/ingliz-tili", icon: "🇺🇸" },
    { name: "Fizika", href: "/subject/fizika", icon: "⚛️" },
    { name: "Kimyo", href: "/subject/kimyo", icon: "🧪" },
    { name: "Biologiya", href: "/subject/biologiya", icon: "🧬" },
    { name: "Geografiya", href: "/subject/geografiya", icon: "🌍" },
    { name: "Adabiyot", href: "/subject/adabiyot", icon: "📖" },
    { name: "Informatika", href: "/subject/informatika", icon: "💻" },
    { name: "Huquq", href: "/subject/huquq", icon: "⚖️" },
    { name: "Iqtisod", href: "/subject/iqtisod", icon: "💰" },
  ]

  const testTypes = [
    { name: "DTM testlari", href: "/subject-selection/dtm", icon: BookOpen },
    { name: "Virtual testlar", href: "/subject-selection/virtual", icon: Globe },
    { name: "Xususiy oliygohllar", href: "/subject-selection/oliy", icon: Award },
    { name: "Prezident maktabi", href: "/subject-selection/prezident", icon: Trophy },
  ]

  const quickLinks = [
    { name: "Bosh sahifa", href: "/" },
    { name: "Test boshlash", href: "/subject-selection/dtm" },
    { name: "Natijalar", href: "/results" },
    { name: "Profil", href: "/profile" },
    { name: "Aloqa", href: "/contact" },
    { name: "Yordam", href: "/help" },
  ]

  const features = [
    { name: "Real-time statistika", icon: Clock },
    { name: "3 qiyinchilik darajasi", icon: Star },
    { name: "Xavfsiz platform", icon: Shield },
    { name: "24/7 mavjud", icon: Globe },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-3xl"></div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full animate-pulse ${
              ["bg-blue-400", "bg-purple-400", "bg-green-400", "bg-pink-400", "bg-yellow-400", "bg-indigo-400"][i]
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
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="text-white w-6 h-6" />
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    akam
                  </span>
                  <span className="text-2xl font-bold text-white ml-1">quiz</span>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Universitetga kirishda sizning eng ishonchli yordamchingiz. 12 ta fan bo'yicha 6000+ savol, 3
                qiyinchilik darajasi va real-time statistikalar bilan muvaffaqiyatga erishing.
              </p>

              {/* Features */}
              <div className="space-y-3">
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-300">{feature.name}</span>
                    </div>
                  )
                })}
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4 mt-8">
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Facebook className="w-5 h-5 text-blue-400" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Instagram className="w-5 h-5 text-pink-400" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Youtube className="w-5 h-5 text-red-400" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Github className="w-5 h-5 text-gray-400" />
                </a>
              </div>
            </div>

            {/* Test Types */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span>Test turlari</span>
              </h3>
              <div className="space-y-3">
                {testTypes.map((type, index) => {
                  const Icon = type.icon
                  return (
                    <Link
                      key={index}
                      to={type.href}
                      className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group"
                    >
                      <Icon className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
                      <span>{type.name}</span>
                    </Link>
                  )
                })}
              </div>

              {/* Quick Stats */}
              <div className="mt-8 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <h4 className="font-semibold mb-3 text-blue-400">Real-time statistika</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Jami foydalanuvchilar:</span>
                    <span className="text-white font-medium">416+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Test savollari:</span>
                    <span className="text-white font-medium">6K+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Muvaffaqiyat darajasi:</span>
                    <span className="text-green-400 font-medium">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Online:</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 font-medium">1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subjects */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-green-400" />
                <span>Fanlar</span>
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {subjects.map((subject, index) => (
                  <Link
                    key={index}
                    to={subject.href}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                  >
                    <span className="text-sm">{subject.icon}</span>
                    <span className="text-sm">{subject.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links & Contact */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-400" />
                <span>Tezkor havolalar</span>
              </h3>
              <div className="space-y-3 mb-8">
                {quickLinks.map((link, index) => (
                  <Link key={index} to={link.href} className="block text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h4 className="font-semibold text-purple-400">Aloqa</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">info@akamquiz.uz</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Phone className="w-4 h-4 text-green-400" />
                    <span className="text-sm">+998 90 123 45 67</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <MapPin className="w-4 h-4 text-red-400" />
                    <span className="text-sm">Toshkent, O'zbekiston</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400">
              <span>© 2024 akam quiz. Barcha huquqlar himoyalangan.</span>
              <span>Ishlab chiqildi</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>bilan</span>
            </div>

            <div className="flex items-center space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Maxfiylik siyosati
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Foydalanish shartlari
              </Link>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <ArrowUp className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Real-time indicator */}
          <div className="mt-6 flex items-center justify-center">
            <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Real-time tizim faol</span>
              <Clock className="w-4 h-4 text-blue-400" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
