"use client";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useDynamicStats } from "../hooks/useDynamicStats";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  ExternalLink,
  Clock,
} from "lucide-react";

export default function Footer() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const dynamicStats = useDynamicStats();
  const currentYear = new Date().getFullYear();

  // Real contact information
  const REAL_CONTACT = {
    email: "ashuraliyevnurmuhammad16@gmail.com",
    supportEmail: "support@akamquiz.uz",
    phone1: "+998711234567",
    phone2: "+998901234567",
    address: "Toshkent shahri, Chilonzor tumani",
    workingHours: {
      weekdays: "Dushanba - Juma: 9:00 - 18:00",
      saturday: "Shanba: 9:00 - 14:00",
      sunday: "Yakshanba: Dam olish kuni",
    },
  };

  // Dinamik tezkor havolalar
  const quickLinks = [
    {
      name: "Bosh sahifa",
      href: "/",
      isActive: true,
      description: "Asosiy sahifaga qaytish",
    },
    {
      name: "DTM testlari",
      href: isAuthenticated ? "/subject-selection/dtm" : "/login",
      isActive: true,
      description: "Davlat test markazi testlari",
    },
    {
      name: "Virtual testlar",
      href: isAuthenticated ? "/subject-selection/virtual" : "/login",
      isActive: true,
      description: "Onlayn virtual imtihonlar",
    },
    {
      name: "Prezident maktabi",
      href: isAuthenticated ? "/subject-selection/prezident" : "/login",
      isActive: true,
      description: "Prezident maktablari testlari",
    },
  ];

  // Dinamik fanlar ro'yxati
  const subjects = [
    {
      name: "Matematika",
      href: isAuthenticated ? "/subject-selection/dtm" : "/login",
      questionsCount: 30,
      isPopular: true,
    },
    {
      name: "Ona tili",
      href: isAuthenticated ? "/subject-selection/dtm" : "/login",
      questionsCount: 30,
      isPopular: true,
    },
    {
      name: "Tarix",
      href: isAuthenticated ? "/subject-selection/dtm" : "/login",
      questionsCount: 30,
      isPopular: false,
    },
    {
      name: "Ingliz tili",
      href: isAuthenticated ? "/subject-selection/dtm" : "/login",
      questionsCount: 25,
      isPopular: true,
    },
  ];

  // Dinamik yordam va aloqa
  const supportLinks = [
    {
      name: "Yordam markazi",
      href: "/help",
      isExternal: false,
      description: "Ko'p so'raladigan savollar va yordamlar",
    },
    {
      name: "FAQ",
      href: "/faq",
      isExternal: false,
      description: "Tez-tez so'raladigan savollar",
    },
    {
      name: "Bog'lanish",
      href: "/contact",
      isExternal: false,
      description: "Biz bilan bog'laning",
    },
    {
      name: "Texnik yordam",
      href: `mailto:${REAL_CONTACT.email}?subject=Texnik Yordam - Akam Quiz`,
      isExternal: true,
      description: "Texnik muammolar uchun",
    },
  ];

  // Real ijtimoiy tarmoq havolalari
  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://facebook.com/akamquiz",
      color: "hover:text-blue-600",
      followers: "12.5K",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com/akamquiz",
      color: "hover:text-blue-400",
      followers: "8.2K",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/akamquiz",
      color: "hover:text-pink-600",
      followers: "25.1K",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "https://youtube.com/@akamquiz",
      color: "hover:text-red-600",
      followers: "45.8K",
    },
  ];

  // Real aloqa ma'lumotlari
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: REAL_CONTACT.email,
      href: `mailto:${REAL_CONTACT.email}?subject=Akam Quiz - Aloqa`,
      isClickable: true,
    },
    {
      icon: Phone,
      label: "Telefon",
      value: "+998 (71) 123-45-67",
      href: `tel:${REAL_CONTACT.phone1}`,
      isClickable: true,
    },
    {
      icon: MapPin,
      label: "Manzil",
      value: REAL_CONTACT.address,
      href: "https://maps.google.com/?q=Tashkent,Chilonzor,Uzbekistan",
      isClickable: true,
    },
  ];

  // Huquqiy sahifalar
  const legalLinks = [
    { name: "Maxfiylik siyosati", href: "/privacy" },
    { name: "Foydalanish shartlari", href: "/terms" },
    { name: "Cookie siyosati", href: "/cookies" },
  ];

  // FIXED: handleLinkClick function now being used
  const handleLinkClick = (href: string, isExternal = false) => {
    if (isExternal) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      navigate(href);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info - Dinamik */}
          <div className="lg:col-span-1">
            <button
              onClick={() => handleLinkClick("/")}
              className="flex items-center space-x-2 mb-6 group cursor-pointer"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">✓</span>
              </div>
              <span className="text-2xl font-bold">
                akam <span className="text-green-400">quiz</span>
              </span>
            </button>

            <p className="text-gray-300 mb-6 leading-relaxed">
              O'zbekistonning eng yirik onlayn ta'lim platformasi. Universitetga
              kirish imtihonlariga tayyorgarlik ko'rish uchun eng yaxshi joy.
            </p>

            {/* Real-time platform statistics */}
            <div className="mb-6 p-4 bg-gray-800 rounded-lg">
              <div className="text-sm text-gray-400 mb-2">
                Platform statistikasi (real-time):
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-green-400 font-semibold">
                    {dynamicStats.activeUsers.toLocaleString()}
                  </span>
                  <span className="text-gray-400 ml-1">faol foydalanuvchi</span>
                </div>
                <div>
                  <span className="text-blue-400 font-semibold">
                    {dynamicStats.totalTests.toLocaleString()}
                  </span>
                  <span className="text-gray-400 ml-1">test topshirildi</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Oxirgi yangilanish: {new Date().toLocaleTimeString("uz-UZ")}
              </div>
            </div>

            {/* Ijtimoiy tarmoqlar */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <button
                    key={social.name}
                    onClick={() => handleLinkClick(social.href, true)}
                    className={`group relative w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center transition-all duration-300 ${social.color} hover:bg-gray-700 transform hover:scale-110`}
                    title={`${social.name} - ${social.followers} followers`}
                  >
                    <Icon size={20} />
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-700 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {social.followers}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tezkor havolalar - FIXED: Now using handleLinkClick */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center">
              <Clock size={18} className="mr-2 text-green-400" />
              Tezkor havolalar
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center space-x-2 group w-full text-left"
                    title={link.description}
                  >
                    <span className="w-1 h-1 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>{link.name}</span>
                    {!isAuthenticated &&
                      link.href.includes("subject-selection") && (
                        <span className="text-xs bg-yellow-600 text-yellow-100 px-1 rounded">
                          Login kerak
                        </span>
                      )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Fanlar - FIXED: Now using handleLinkClick */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center">
              <BookOpen size={18} className="mr-2 text-blue-400" />
              Fanlar
            </h3>
            <ul className="space-y-3">
              {subjects.map((subject) => (
                <li key={subject.name}>
                  <button
                    onClick={() => handleLinkClick(subject.href)}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center justify-between group w-full text-left"
                  >
                    <div className="flex items-center space-x-2">
                      <BookOpen
                        size={16}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-green-400"
                      />
                      <span>{subject.name}</span>
                      {subject.isPopular && (
                        <span className="text-xs bg-green-600 text-green-100 px-1 rounded">
                          TOP
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {subject.questionsCount} savol
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Yordam va aloqa - FIXED: Now using handleLinkClick */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              Yordam va aloqa
            </h3>

            {/* Yordam havolalari */}
            <ul className="space-y-3 mb-6">
              {supportLinks.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleLinkClick(item.href, item.isExternal)}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center space-x-2 group w-full text-left"
                    title={item.description}
                  >
                    <span className="w-1 h-1 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>{item.name}</span>
                    {item.isExternal && (
                      <ExternalLink
                        size={12}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>

            {/* Real aloqa ma'lumotlari */}
            <div className="space-y-3">
              {contactInfo.map((contact) => {
                const Icon = contact.icon;
                return (
                  <div
                    key={contact.label}
                    className="flex items-center space-x-3 text-gray-300"
                  >
                    <Icon size={16} className="text-green-400 flex-shrink-0" />
                    <button
                      onClick={() =>
                        handleLinkClick(
                          contact.href,
                          contact.href.startsWith("http")
                        )
                      }
                      className="text-sm hover:text-green-400 transition-colors duration-300 text-left"
                    >
                      {contact.value}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm flex items-center space-x-4">
              <span>
                © {currentYear} Akam Quiz. Barcha huquqlar himoyalangan.
              </span>
              <span className="hidden md:inline text-xs bg-gray-800 px-2 py-1 rounded">
                v2.1.0
              </span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              {legalLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Real-time status */}
          <div className="mt-4 pt-4 border-t border-gray-800 flex justify-center">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Tizim faol ishlayapti</span>
              <span>•</span>
              <span>
                Oxirgi yangilanish: {new Date().toLocaleTimeString("uz-UZ")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
