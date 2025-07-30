"use client"

import type React from "react"

import { useState } from "react"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Headphones,
  Zap,
  CheckCircle,
  AlertCircle,
  User,
  MessageSquare,
} from "lucide-react"

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Save to localStorage for demo
      const existingMessages = JSON.parse(localStorage.getItem("contactMessages") || "[]")
      const newMessage = {
        id: Date.now(),
        ...formData,
        timestamp: new Date().toISOString(),
        status: "new",
      }
      existingMessages.push(newMessage)
      localStorage.setItem("contactMessages", JSON.stringify(existingMessages))

      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus("idle"), 5000)
    }
  }

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      primary: "ashuralieyunurmuhammad16@gmail.com",
      secondary: "support@akamquiz.uz",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      textColor: "text-green-700",
    },
    {
      icon: Phone,
      title: "Telefon",
      primary: "+998 (71) 123-45-67",
      secondary: "+998 (90) 123-45-67",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      textColor: "text-blue-700",
    },
    {
      icon: MapPin,
      title: "Manzil",
      primary: "Toshkent shahri, Chilonzor tumani",
      secondary: "Uzbekistan",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
      textColor: "text-purple-700",
    },
  ]

  const workingHours = [
    { day: "Dushanba - Juma", time: "9:00 - 18:00", status: "active" },
    { day: "Shanba", time: "9:00 - 14:00", status: "active" },
    { day: "Yakshanba", time: "Dam olish kuni", status: "closed" },
  ]

  const supportFeatures = [
    {
      icon: Zap,
      title: "Tezkor yordam",
      description: "Savollaringizga tez javob berishga tayyormiz",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      icon: Headphones,
      title: "24/7 qo'llab-quvvatlash",
      description: "Har doim sizning xizmatingizdamiz",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: MessageCircle,
      title: "Shaxsiy yordam",
      description: "Har bir muammoga individual yondashuv",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ]

  const subjects = [
    "Texnik yordam",
    "Marvuni tanlang",
    "Test haqida savol",
    "Akkaunt muammosi",
    "To'lov masalasi",
    "Takliflar",
    "Boshqa",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl animate-float">
            <MessageCircle className="text-white w-10 h-10" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <Zap className="text-white w-3 h-3" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Biz bilan bog'laning</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Savollaringiz bormi? Biz sizga yordam berishga tayyormiz!
          </p>

          <div className="mt-6 inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">Hozir ishlaymiz</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Send className="text-white w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Xabar yuborish</h2>
                  <p className="text-gray-600">Sizning savollaringizni to'g'ridan-to'g'ri email yuborishingiz mumkin</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">To'liq ismingiz *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Ismingizni kiriting"
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300 bg-white shadow-lg hover:shadow-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email manzilingiz *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="email@example.com"
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300 bg-white shadow-lg hover:shadow-xl"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mavzu *</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300 bg-white shadow-lg hover:shadow-xl appearance-none"
                    >
                      <option value="">Mavzuni tanlang</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Xabar matni *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Xabaringizni batafsil yozing..."
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300 bg-white shadow-lg hover:shadow-xl resize-none"
                    maxLength={1000}
                  />
                  <div className="text-right text-sm text-gray-500 mt-2">{formData.message.length}/1000</div>
                </div>

                {/* Submit Status */}
                {submitStatus === "success" && (
                  <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-2xl">
                    <CheckCircle className="text-green-500 w-5 h-5" />
                    <span className="text-green-700 font-medium">
                      Xabaringiz muvaffaqiyatli yuborildi! Tez orada javob beramiz.
                    </span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-2xl">
                    <AlertCircle className="text-red-500 w-5 h-5" />
                    <span className="text-red-700 font-medium">
                      Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Sizning ma'lumotlaringiz xavfsiz saqlanadi va uchinchi shaxslarga berilmaydi.
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 transform hover:scale-105 disabled:transform-none"
                  >
                    <span className="relative z-10 flex items-center space-x-3">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Yuborilmoqda...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Xabar yuborish</span>
                        </>
                      )}
                    </span>

                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-shine"></div>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                <Phone className="text-blue-600 w-6 h-6" />
                <span>Aloqa ma'lumotlari</span>
              </h3>

              <div className="space-y-6">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon
                  return (
                    <div
                      key={index}
                      className={`p-6 ${method.bgColor} rounded-2xl border-2 ${method.textColor.replace("text-", "border-").replace("-700", "-200")} transition-all duration-300 hover:scale-105`}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 ${method.iconBg} rounded-xl flex items-center justify-center shadow-lg`}
                        >
                          <Icon className={`w-6 h-6 ${method.textColor}`} />
                        </div>
                        <div>
                          <h4 className={`font-bold ${method.textColor} mb-1`}>{method.title}</h4>
                          <div className="text-sm text-gray-600">
                            <div className="font-medium">{method.primary}</div>
                            <div className="text-gray-500">{method.secondary}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                <Clock className="text-purple-600 w-6 h-6" />
                <span>Ish vaqti</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">Hozir ishlaymiz</span>
                </div>
              </h3>

              <div className="space-y-4">
                {workingHours.map((schedule, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-2xl ${
                      schedule.status === "active"
                        ? "bg-green-50 border-2 border-green-200"
                        : "bg-gray-50 border-2 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          schedule.status === "active" ? "bg-green-400 animate-pulse" : "bg-gray-400"
                        }`}
                      ></div>
                      <span className="font-medium text-gray-900">{schedule.day}</span>
                    </div>
                    <span
                      className={`font-semibold ${schedule.status === "active" ? "text-green-700" : "text-gray-600"}`}
                    >
                      {schedule.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Features */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                <Headphones className="text-green-600 w-6 h-6" />
                <span>Qo'llab-quvvatlash</span>
              </h3>

              <div className="space-y-4">
                {supportFeatures.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <div
                      key={index}
                      className={`p-4 ${feature.bgColor} rounded-2xl transition-all duration-300 hover:scale-105`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-5 h-5 ${feature.color}`} />
                        <div>
                          <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
