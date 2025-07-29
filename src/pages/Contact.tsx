"use client";

import type React from "react";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageCircle,
  AlertCircle,
  User,
  Zap,
  Shield,
  Star,
} from "lucide-react";
import { EmailService, type ContactFormData } from "../services/emailService";
import { useRealTimeWorkingHours } from "../hooks/useRealTimeWorkingHours";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [messageId, setMessageId] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Real-time working hours
  const workingHours = useRealTimeWorkingHours();

  // Real contact information
  const REAL_CONTACT = {
    email: "ashuraliyevnurmuhammad16@gmail.com",
    supportEmail: "support@akamquiz.uz",
    phone1: "+998 (71) 123-45-67",
    phone2: "+998 (90) 123-45-67",
    address: "Toshkent shahri, Chilonzor tumani",
    workingHours: {
      weekdays: "Dushanba - Juma: 9:00 - 18:00",
      saturday: "Shanba: 9:00 - 14:00",
      sunday: "Yakshanba: Dam olish kuni",
    },
  };

  // Form validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Ism majburiy";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Ism kamida 2 ta belgidan iborat bo'lishi kerak";
    }

    if (!formData.email.trim()) {
      errors.email = "Email majburiy";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email formati noto'g'ri";
    }

    if (!formData.subject) {
      errors.subject = "Mavzuni tanlang";
    }

    if (!formData.message.trim()) {
      errors.message = "Xabar matni majburiy";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Xabar kamida 10 ta belgidan iborat bo'lishi kerak";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Enhanced form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const emailData: ContactFormData = {
        ...formData,
        timestamp: new Date().toISOString(),
      };

      const result = await EmailService.sendContactMessage(emailData);

      if (result.success) {
        setIsSubmitted(true);
        setMessageId(result.messageId || "");

        // Reset form after 8 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: "", email: "", subject: "", message: "" });
          setMessageId("");
        }, 8000);
      } else {
        setSubmitError(
          result.error ||
            "Xabar yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
        );
      }
    } catch (error) {
      setSubmitError(
        "Tarmoq xatosi. Iltimos, internetni tekshiring va qayta urinib ko'ring."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Real-time character count for message
  const messageCharCount = formData.message.length;
  const maxMessageLength = 1000;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                <MessageCircle className="text-white" size={40} />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <Star className="text-white" size={12} />
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Biz bilan bog'laning
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Savollaringiz bormi? Biz sizga yordam berishga tayyormiz!
          </p>

          {/* Real-time status */}
          <div className="inline-flex items-center justify-center space-x-3 bg-white rounded-full px-6 py-3 shadow-lg">
            <span className="text-2xl animate-pulse">
              {workingHours.statusIcon}
            </span>
            <div className="text-left">
              <div className={`font-semibold ${workingHours.statusColor}`}>
                {workingHours.status}
              </div>
              {workingHours.nextWorkingTime && (
                <div className="text-sm text-gray-500">
                  Keyingi: {workingHours.nextWorkingTime}
                  {workingHours.timeUntilWork &&
                    ` (${workingHours.timeUntilWork})`}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Enhanced Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 to-blue-600"></div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <Send className="text-green-600" size={24} />
              <span>Xabar yuborish</span>
            </h2>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="relative">
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4 animate-bounce" />
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-green-100 rounded-full animate-ping opacity-75"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Xabar muvaffaqiyatli yuborildi! ✅
                </h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-green-800 font-medium mb-2">
                    Sizning xabaringiz <strong>{REAL_CONTACT.email}</strong>{" "}
                    manziliga yuborildi.
                  </p>
                  {messageId && (
                    <p className="text-sm text-green-700">
                      Xabar ID:{" "}
                      <code className="bg-green-200 px-2 py-1 rounded">
                        #{messageId.slice(-8)}
                      </code>
                    </p>
                  )}
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-center justify-center space-x-2">
                    <Clock size={16} />
                    <span>Biz odatda 24 soat ichida javob beramiz</span>
                  </p>
                  <p className="flex items-center justify-center space-x-2">
                    <Shield size={16} />
                    <span>Sizning ma'lumotlaringiz xavfsiz saqlandi</span>
                  </p>
                  <p className="flex items-center justify-center space-x-2">
                    <Mail size={16} />
                    <span>Tasdiqlash xabari emailingizga yuborildi</span>
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                    <AlertCircle
                      className="text-red-500 flex-shrink-0 mt-0.5"
                      size={20}
                    />
                    <div>
                      <p className="text-red-700 font-medium">
                        Xatolik yuz berdi
                      </p>
                      <p className="text-red-600 text-sm">{submitError}</p>
                    </div>
                  </div>
                )}

                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To'liq ismingiz *
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all ${
                        formErrors.name
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-300 focus:ring-green-500"
                      }`}
                      placeholder="Ismingizni kiriting"
                    />
                  </div>
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email manzilingiz *
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all ${
                        formErrors.email
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-300 focus:ring-green-500"
                      }`}
                      placeholder="email@example.com"
                    />
                  </div>
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mavzu *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all ${
                      formErrors.subject
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 focus:ring-green-500"
                    }`}
                  >
                    <option value="">Mavzuni tanlang</option>
                    <option value="technical">🔧 Texnik yordam</option>
                    <option value="account">👤 Hisob bilan bog'liq</option>
                    <option value="payment">💳 To'lov masalalari</option>
                    <option value="test">📝 Test bilan bog'liq</option>
                    <option value="general">❓ Umumiy savol</option>
                    <option value="feedback">💭 Fikr-mulohaza</option>
                    <option value="partnership">🤝 Hamkorlik</option>
                  </select>
                  {formErrors.subject && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.subject}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Xabar matni *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    maxLength={maxMessageLength}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all resize-none ${
                      formErrors.message
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 focus:ring-green-500"
                    }`}
                    placeholder="Xabaringizni batafsil yozing..."
                  />
                  <div className="flex justify-between items-center mt-1">
                    {formErrors.message ? (
                      <p className="text-sm text-red-600">
                        {formErrors.message}
                      </p>
                    ) : (
                      <div></div>
                    )}
                    <p
                      className={`text-sm ${
                        messageCharCount > maxMessageLength * 0.9
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      {messageCharCount}/{maxMessageLength}
                    </p>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Mail
                      className="text-blue-600 flex-shrink-0 mt-0.5"
                      size={20}
                    />
                    <div>
                      <p className="text-sm font-medium text-blue-800 mb-1">
                        Xabar qayerga yuboriladi?
                      </p>
                      <p className="text-sm text-blue-700">
                        Sizning xabaringiz to'g'ridan-to'g'ri{" "}
                        <strong>{REAL_CONTACT.email}</strong> manziliga
                        yuboriladi. Shuningdek, sizga tasdiqlash xabari ham
                        yuboriladi.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Yuborilmoqda...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Xabar yuborish</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Enhanced Contact Information */}
          <div className="space-y-8">
            {/* Main Contact Info */}
            <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <Phone className="text-blue-600" size={24} />
                <span>Aloqa ma'lumotlari</span>
              </h2>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-green-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a
                      href={`mailto:${REAL_CONTACT.email}?subject=Akam Quiz - Aloqa`}
                      className="text-green-600 hover:text-green-700 transition-colors font-medium block"
                    >
                      {REAL_CONTACT.email}
                    </a>
                    <a
                      href={`mailto:${REAL_CONTACT.supportEmail}?subject=Akam Quiz - Yordam`}
                      className="text-gray-600 hover:text-green-600 transition-colors text-sm"
                    >
                      {REAL_CONTACT.supportEmail}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-blue-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Telefon
                    </h3>
                    <a
                      href={`tel:${REAL_CONTACT.phone1.replace(/\s/g, "")}`}
                      className="text-blue-600 hover:text-blue-700 transition-colors font-medium block"
                    >
                      {REAL_CONTACT.phone1}
                    </a>
                    <a
                      href={`tel:${REAL_CONTACT.phone2.replace(/\s/g, "")}`}
                      className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                    >
                      {REAL_CONTACT.phone2}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-purple-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Manzil</h3>
                    <a
                      href="https://maps.google.com/?q=Tashkent,Chilonzor,Uzbekistan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-700 transition-colors"
                    >
                      {REAL_CONTACT.address}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="text-orange-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                      <span>Ish vaqti</span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${workingHours.statusColor} bg-white border`}
                      >
                        {workingHours.status}
                      </span>
                    </h3>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-700">
                        {REAL_CONTACT.workingHours.weekdays}
                      </p>
                      <p className="text-gray-700">
                        {REAL_CONTACT.workingHours.saturday}
                      </p>
                      <p className="text-gray-700">
                        {REAL_CONTACT.workingHours.sunday}
                      </p>
                    </div>
                    {workingHours.nextWorkingTime && (
                      <p className="text-xs text-gray-500 mt-2">
                        Keyingi ish vaqti: {workingHours.nextWorkingTime}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Help Section */}
            <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                  <Zap size={24} />
                  <span>Tezkor yordam</span>
                </h3>
                <p className="mb-6 text-white/90 leading-relaxed">
                  Shoshilinch yordam kerakmi? Bizning onlayn chat xizmatimizdan
                  foydalaning yoki to'g'ridan-to'g'ri email yuboring.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={`mailto:${REAL_CONTACT.email}?subject=Shoshilinch Yordam - Akam Quiz`}
                    className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Mail size={18} />
                    <span>Email yuborish</span>
                  </a>
                  <a
                    href={`tel:${REAL_CONTACT.phone1.replace(/\s/g, "")}`}
                    className="bg-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center justify-center space-x-2 backdrop-blur-sm border border-white/20 hover:border-white/40 transform hover:scale-105"
                  >
                    <Phone size={18} />
                    <span>Qo'ng'iroq</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
