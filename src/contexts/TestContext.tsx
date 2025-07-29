"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: string;
  difficulty: "easy" | "medium" | "hard";
}

interface TestResult {
  id: string;
  testType: string;
  subjects: string[];
  score: number;
  totalQuestions: number;
  answers: {
    questionId: string;
    selectedAnswer: number;
    isCorrect: boolean;
    question?: Question;
  }[];
  completedAt: string;
  userId: string;
  timeSpent: number;
  totalTimeGiven: number;
  difficulty: "easy" | "medium" | "hard";
  userRating?: number;
  userComment?: string;
}

interface TestContextType {
  currentTest: {
    testType: string;
    subjects: string[];
    questions: Question[];
    currentQuestionIndex: number;
    answers: { questionId: string; selectedAnswer: number }[];
    timeRemaining: number;
    totalQuestions: number;
    startTime: number;
    totalTimeGiven: number;
    difficulty: "easy" | "medium" | "hard";
  } | null;
  startTest: (
    testType: string,
    subjects: string[],
    questionCount: number,
    difficulty?: "easy" | "medium" | "hard"
  ) => void;
  submitAnswer: (questionId: string, selectedAnswer: number) => void;
  nextQuestion: () => void;
  finishTest: () => TestResult;
  resetTest: () => void;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

// Real-time event dispatcher
const dispatchStorageEvent = (key: string) => {
  window.dispatchEvent(
    new CustomEvent("localStorageChange", {
      detail: { key, timestamp: Date.now() },
    })
  );
};

// Qiyinchilik darajasiga qarab savollar (kengaytirilgan)
const questionsData: Record<string, Question[]> = {
  matematika: [
    // EASY savollar
    {
      id: "math1_easy",
      question: "2 + 2 = ?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1,
      subject: "matematika",
      difficulty: "easy",
    },
    {
      id: "math2_easy",
      question: "5 × 2 = ?",
      options: ["8", "10", "12", "15"],
      correctAnswer: 1,
      subject: "matematika",
      difficulty: "easy",
    },
    {
      id: "math3_easy",
      question: "10 - 3 = ?",
      options: ["6", "7", "8", "9"],
      correctAnswer: 1,
      subject: "matematika",
      difficulty: "easy",
    },
    {
      id: "math4_easy",
      question: "8 ÷ 4 = ?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 1,
      subject: "matematika",
      difficulty: "easy",
    },
    {
      id: "math5_easy",
      question: "3 + 5 = ?",
      options: ["7", "8", "9", "10"],
      correctAnswer: 1,
      subject: "matematika",
      difficulty: "easy",
    },
    {
      id: "math6_easy",
      question: "6 × 3 = ?",
      options: ["15", "18", "21", "24"],
      correctAnswer: 1,
      subject: "matematika",
      difficulty: "easy",
    },
    {
      id: "math7_easy",
      question: "15 ÷ 3 = ?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 2,
      subject: "matematika",
      difficulty: "easy",
    },
    {
      id: "math8_easy",
      question: "7 + 8 = ?",
      options: ["14", "15", "16", "17"],
      correctAnswer: 1,
      subject: "matematika",
      difficulty: "easy",
    },
    {
      id: "math9_easy",
      question: "20 - 12 = ?",
      options: ["6", "7", "8", "9"],
      correctAnswer: 2,
      subject: "matematika",
      difficulty: "easy",
    },
    {
      id: "math10_easy",
      question: "4 × 5 = ?",
      options: ["15", "20", "25", "30"],
      correctAnswer: 1,
      subject: "matematika",
      difficulty: "easy",
    },
    // MEDIUM savollar
    {
      id: "math1_medium",
      question: "Uchburchakning ichki burchaklari yig'indisi necha gradus?",
      options: ["90°", "180°", "270°", "360°"],
      correctAnswer: 1,
      subject: "matematika",
      difficulty: "medium",
    },
    {
      id: "math2_medium",
      question: "Kvadratning perimetri formulasi?",
      options: ["P = 4a", "P = 2a", "P = a²", "P = a + b"],
      correctAnswer: 0,
      subject: "matematika",
      difficulty: "medium",
    },
    {
      id: "math3_medium",
      question: "12x + 8 = 44 tenglamani yeching",
      options: ["x = 2", "x = 3", "x = 4", "x = 5"],
      correctAnswer: 1,
      subject: "matematika",
      difficulty: "medium",
    },
    {
      id: "math4_medium",
      question: "Doiraning yuzi formulasi?",
      options: ["S = πr²", "S = 2πr", "S = πd", "S = r²"],
      correctAnswer: 0,
      subject: "matematika",
      difficulty: "medium",
    },
    {
      id: "math5_medium",
      question: "√64 = ?",
      options: ["6", "7", "8", "9"],
      correctAnswer: 2,
      subject: "matematika",
      difficulty: "medium",
    },
    {
      id: "math6_medium",
      question: "2x² - 8 = 0 tenglamaning ildizi?",
      options: ["x = ±2", "x = ±4", "x = ±1", "x = ±3"],
      correctAnswer: 0,
      subject: "matematika",
      difficulty: "medium",
    },
    {
      id: "math7_medium",
      question: "Parallelogrammning yuzi formulasi?",
      options: ["S = a × h", "S = a²", "S = 2(a + b)", "S = πr²"],
      correctAnswer: 0,
      subject: "matematika",
      difficulty: "medium",
    },
    {
      id: "math8_medium",
      question: "log₂(8) = ?",
      options: ["2", "3", "4", "8"],
      correctAnswer: 1,
      subject: "matematika",
      difficulty: "medium",
    },
    {
      id: "math9_medium",
      question: "sin(30°) = ?",
      options: ["1/2", "√3/2", "1", "0"],
      correctAnswer: 0,
      subject: "matematika",
      difficulty: "medium",
    },
    {
      id: "math10_medium",
      question: "Arifmetik progressiyada a₁ = 3, d = 2 bo'lsa, a₅ = ?",
      options: ["9", "11", "13", "15"],
      correctAnswer: 1,
      subject: "matematika",
      difficulty: "medium",
    },
    // HARD savollar
    {
      id: "math1_hard",
      question: "∫(2x + 3)dx ni hisoblang",
      options: ["x² + 3x + C", "2x² + 3x + C", "x² + 3x", "2x + 3"],
      correctAnswer: 0,
      subject: "matematika",
      difficulty: "hard",
    },
    {
      id: "math2_hard",
      question: "lim(x→0) (sin x)/x = ?",
      options: ["0", "1", "∞", "aniqlanmagan"],
      correctAnswer: 1,
      subject: "matematika",
      difficulty: "hard",
    },
    {
      id: "math3_hard",
      question: "Matritsalar ko'paytmasi A×B qachon mavjud?",
      options: [
        "A ning ustunlari = B ning qatorlari",
        "A ning qatorlari = B ning ustunlari",
        "Har doim",
        "Hech qachon",
      ],
      correctAnswer: 0,
      subject: "matematika",
      difficulty: "hard",
    },
    {
      id: "math4_hard",
      question: "f(x) = x³ - 3x² + 2x funksiyaning ekstremum nuqtalari?",
      options: [
        "x = 1/3, x = 2",
        "x = 0, x = 2",
        "x = 1, x = 2/3",
        "x = -1, x = 2",
      ],
      correctAnswer: 0,
      subject: "matematika",
      difficulty: "hard",
    },
    {
      id: "math5_hard",
      question: "Bernulli tenglamasi qanday ko'rinishda?",
      options: [
        "y' + P(x)y = Q(x)y^n",
        "y' + P(x)y = Q(x)",
        "y'' + P(x)y' + Q(x)y = 0",
        "dy/dx = f(x,y)",
      ],
      correctAnswer: 0,
      subject: "matematika",
      difficulty: "hard",
    },
    {
      id: "math6_hard",
      question: "Furye qatori qanday funksiyalar uchun yaqinlashadi?",
      options: [
        "Uzluksiz funksiyalar",
        "Dirichlet shartlarini qanoatlantiruvchi",
        "Barcha funksiyalar",
        "Faqat juft funksiyalar",
      ],
      correctAnswer: 1,
      subject: "matematika",
      difficulty: "hard",
    },
    {
      id: "math7_hard",
      question: "Green formulasi qaysi integrallarni bog'laydi?",
      options: [
        "Chiziqli va sirt",
        "Sirt va hajm",
        "Chiziqli va hajm",
        "Ikki va uch o'lchovli",
      ],
      correctAnswer: 0,
      subject: "matematika",
      difficulty: "hard",
    },
    {
      id: "math8_hard",
      question: "Laplace transformatsiyasining asosiy xossasi?",
      options: ["Chiziqlilik", "Siljish", "Konvolyutsiya", "Barchasi"],
      correctAnswer: 3,
      subject: "matematika",
      difficulty: "hard",
    },
    {
      id: "math9_hard",
      question: "Kompleks sonlar maydonida z² + 1 = 0 ning yechimlari?",
      options: ["z = ±i", "z = ±1", "z = 0", "Yechimi yo'q"],
      correctAnswer: 0,
      subject: "matematika",
      difficulty: "hard",
    },
    {
      id: "math10_hard",
      question: "Banach fazosining ta'rifi?",
      options: [
        "To'la norma fazosi",
        "Ichki ko'paytma fazosi",
        "Metrik fazo",
        "Topologik fazo",
      ],
      correctAnswer: 0,
      subject: "matematika",
      difficulty: "hard",
    },
  ],
  ona_tili: [
    // EASY savollar (10 ta)
    {
      id: "uz1_easy",
      question: "O'zbek tilida nechta unli tovush bor?",
      options: ["5 ta", "6 ta", "7 ta", "8 ta"],
      correctAnswer: 1,
      subject: "ona_tili",
      difficulty: "easy",
    },
    {
      id: "uz2_easy",
      question: "Qaysi so'z turkumi predmetni bildiradi?",
      options: ["Ot", "Sifat", "Fe'l", "Olmosh"],
      correctAnswer: 0,
      subject: "ona_tili",
      difficulty: "easy",
    },
    {
      id: "uz3_easy",
      question: "O'zbek alifbosida nechta harf bor?",
      options: ["32 ta", "33 ta", "34 ta", "35 ta"],
      correctAnswer: 0,
      subject: "ona_tili",
      difficulty: "easy",
    },
    {
      id: "uz4_easy",
      question: "Qaysi so'z turkumi harakat-holatni bildiradi?",
      options: ["Ot", "Sifat", "Fe'l", "Olmosh"],
      correctAnswer: 2,
      subject: "ona_tili",
      difficulty: "easy",
    },
    {
      id: "uz5_easy",
      question: "Qaysi so'z turkumi belgini bildiradi?",
      options: ["Ot", "Sifat", "Fe'l", "Olmosh"],
      correctAnswer: 1,
      subject: "ona_tili",
      difficulty: "easy",
    },
    {
      id: "uz6_easy",
      question: "O'zbek tilida nechta undosh tovush bor?",
      options: ["20 ta", "21 ta", "22 ta", "23 ta"],
      correctAnswer: 1,
      subject: "ona_tili",
      difficulty: "easy",
    },
    {
      id: "uz7_easy",
      question: "Qaysi so'z turkumi otning o'rnini bosadi?",
      options: ["Sifat", "Fe'l", "Olmosh", "Ravish"],
      correctAnswer: 2,
      subject: "ona_tili",
      difficulty: "easy",
    },
    {
      id: "uz8_easy",
      question: "O'zbek tilida nechta shaxs bor?",
      options: ["2 ta", "3 ta", "4 ta", "5 ta"],
      correctAnswer: 1,
      subject: "ona_tili",
      difficulty: "easy",
    },
    {
      id: "uz9_easy",
      question: "Qaysi so'z turkumi sonni bildiradi?",
      options: ["Son", "Sifat", "Fe'l", "Olmosh"],
      correctAnswer: 0,
      subject: "ona_tili",
      difficulty: "easy",
    },
    {
      id: "uz10_easy",
      question: "O'zbek tilida nechta son bor?",
      options: ["1 ta", "2 ta", "3 ta", "4 ta"],
      correctAnswer: 1,
      subject: "ona_tili",
      difficulty: "easy",
    },
    // MEDIUM savollar (10 ta)
    {
      id: "uz1_medium",
      question: "Gapning bosh bo'laklari qaysilar?",
      options: [
        "Ega va kesim",
        "To'ldiruvchi va aniqlovchi",
        "Hol va to'ldiruvchi",
        "Kesim va hol",
      ],
      correctAnswer: 0,
      subject: "ona_tili",
      difficulty: "medium",
    },
    {
      id: "uz2_medium",
      question: "O'zbek tilida nechta kelishik bor?",
      options: ["5 ta", "6 ta", "7 ta", "8 ta"],
      correctAnswer: 1,
      subject: "ona_tili",
      difficulty: "medium",
    },
    {
      id: "uz3_medium",
      question: "Alisher Navoiyning asarlaridan biri?",
      options: ["Xamsa", "Boburnoma", "Guliston", "Navodir ush-shabob"],
      correctAnswer: 0,
      subject: "ona_tili",
      difficulty: "medium",
    },
    {
      id: "uz4_medium",
      question: "Gapning ikkinchi darajali bo'laklari qaysilar?",
      options: [
        "Ega va kesim",
        "To'ldiruvchi, aniqlovchi, hol",
        "Faqat to'ldiruvchi",
        "Faqat aniqlovchi",
      ],
      correctAnswer: 1,
      subject: "ona_tili",
      difficulty: "medium",
    },
    {
      id: "uz5_medium",
      question: "O'zbek tilida nechta zamon bor?",
      options: ["2 ta", "3 ta", "4 ta", "5 ta"],
      correctAnswer: 1,
      subject: "ona_tili",
      difficulty: "medium",
    },
    {
      id: "uz6_medium",
      question: "Cholpon qaysi janrda yozgan?",
      options: ["She'riyat", "Nasriyat", "Drama", "Barchasi"],
      correctAnswer: 3,
      subject: "ona_tili",
      difficulty: "medium",
    },
    {
      id: "uz7_medium",
      question: "Abdulla Qodiriyning mashhur asari?",
      options: ["O'tkan kunlar", "Mehrobdan chayon", "Sarob", "Qiyomat"],
      correctAnswer: 0,
      subject: "ona_tili",
      difficulty: "medium",
    },
    {
      id: "uz8_medium",
      question: "O'zbek tilida nechta mayl bor?",
      options: ["3 ta", "4 ta", "5 ta", "6 ta"],
      correctAnswer: 2,
      subject: "ona_tili",
      difficulty: "medium",
    },
    {
      id: "uz9_medium",
      question: "Qaysi so'z turkumi fe'lning belgisini bildiradi?",
      options: ["Ot", "Sifat", "Ravish", "Olmosh"],
      correctAnswer: 2,
      subject: "ona_tili",
      difficulty: "medium",
    },
    {
      id: "uz10_medium",
      question: "Hamid Olimjonning mashhur asari?",
      options: ["Turkiston", "Vatanparvarlar", "Ikki eshik orasi", "Barchasi"],
      correctAnswer: 0,
      subject: "ona_tili",
      difficulty: "medium",
    },
    // HARD savollar (10 ta)
    {
      id: "uz1_hard",
      question: "Morfemaning qaysi turi so'z yasovchi hisoblanadi?",
      options: ["Qo'shimcha", "Asos", "Prefiks va suffiks", "Faqat suffiks"],
      correctAnswer: 2,
      subject: "ona_tili",
      difficulty: "hard",
    },
    {
      id: "uz2_hard",
      question: "Sintaktik bog'lanishning nechta turi bor?",
      options: ["2 ta", "3 ta", "4 ta", "5 ta"],
      correctAnswer: 1,
      subject: "ona_tili",
      difficulty: "hard",
    },
    {
      id: "uz3_hard",
      question: "Leksik-semantik guruhlanishda antonimlar qanday ta'riflanadi?",
      options: [
        "Bir xil ma'noli so'zlar",
        "Qarama-qarshi ma'noli so'zlar",
        "Yaqin ma'noli so'zlar",
        "Ko'p ma'noli so'zlar",
      ],
      correctAnswer: 1,
      subject: "ona_tili",
      difficulty: "hard",
    },
    {
      id: "uz4_hard",
      question: "Fonema va allofon o'rtasidagi farq nimada?",
      options: [
        "Fonema - tovush, allofon - harf",
        "Fonema - abstrakt, allofon - konkret",
        "Farqi yo'q",
        "Fonema - katta, allofon - kichik",
      ],
      correctAnswer: 1,
      subject: "ona_tili",
      difficulty: "hard",
    },
    {
      id: "uz5_hard",
      question: "Transformatsion grammatikada chuqur struktura nima?",
      options: [
        "Yuzaki struktura",
        "Semantik struktura",
        "Sintaktik struktura",
        "Morfologik struktura",
      ],
      correctAnswer: 1,
      subject: "ona_tili",
      difficulty: "hard",
    },
    {
      id: "uz6_hard",
      question: "Generativ grammatikaning asoschisi kim?",
      options: [
        "Noam Chomsky",
        "Ferdinand de Saussure",
        "Leonard Bloomfield",
        "Roman Jakobson",
      ],
      correctAnswer: 0,
      subject: "ona_tili",
      difficulty: "hard",
    },
    {
      id: "uz7_hard",
      question: "Pragmatikada illokutiv aktlar nechta turga bo'linadi?",
      options: ["3 ta", "4 ta", "5 ta", "6 ta"],
      correctAnswer: 2,
      subject: "ona_tili",
      difficulty: "hard",
    },
    {
      id: "uz8_hard",
      question: "Diskurs tahlilida koheziya va kogerensiya farqi nimada?",
      options: [
        "Koheziya - mazmuniy, kogerensiya - shakl",
        "Koheziya - shakl, kogerensiya - mazmuniy",
        "Farqi yo'q",
        "Ikkalasi ham shakl",
      ],
      correctAnswer: 1,
      subject: "ona_tili",
      difficulty: "hard",
    },
    {
      id: "uz9_hard",
      question: "Sociolingvistikada diglosiya nima?",
      options: [
        "Ikki tillilik",
        "Til variantlarining funksional taqsimoti",
        "Til o'zgarishi",
        "Til interferensiyasi",
      ],
      correctAnswer: 1,
      subject: "ona_tili",
      difficulty: "hard",
    },
    {
      id: "uz10_hard",
      question: "Psixolingvistikada til egallash nazariyalari nechta?",
      options: ["2 ta", "3 ta", "4 ta", "5 ta"],
      correctAnswer: 2,
      subject: "ona_tili",
      difficulty: "hard",
    },
  ],
  tarix: [
    // EASY savollar (10 ta)
    {
      id: "hist1_easy",
      question: "O'zbekiston mustaqillik e'lon qilgan sana?",
      options: [
        "1991 yil 31 avgust",
        "1991 yil 1 sentyabr",
        "1990 yil 31 avgust",
        "1992 yil 1 yanvar",
      ],
      correctAnswer: 0,
      subject: "tarix",
      difficulty: "easy",
    },
    {
      id: "hist2_easy",
      question: "O'zbekistonning birinchi prezidenti kim?",
      options: [
        "Islam Karimov",
        "Shavkat Mirziyoyev",
        "Abdulla Oripov",
        "Rustam Azimov",
      ],
      correctAnswer: 0,
      subject: "tarix",
      difficulty: "easy",
    },
    {
      id: "hist3_easy",
      question: "Amir Temur qachon tug'ilgan?",
      options: ["1336 yil", "1340 yil", "1350 yil", "1360 yil"],
      correctAnswer: 0,
      subject: "tarix",
      difficulty: "easy",
    },
    {
      id: "hist4_easy",
      question: "O'zbekiston Konstitutsiyasi qachon qabul qilingan?",
      options: [
        "1992 yil 8 dekabr",
        "1992 yil 9 dekabr",
        "1992 yil 10 dekabr",
        "1992 yil 11 dekabr",
      ],
      correctAnswer: 0,
      subject: "tarix",
      difficulty: "easy",
    },
    {
      id: "hist5_easy",
      question: "O'zbekiston qachon BMTga a'zo bo'lgan?",
      options: [
        "1992 yil 2 mart",
        "1992 yil 3 mart",
        "1992 yil 4 mart",
        "1992 yil 5 mart",
      ],
      correctAnswer: 0,
      subject: "tarix",
      difficulty: "easy",
    },
    {
      id: "hist6_easy",
      question: "O'zbekiston bayrog'i qachon qabul qilingan?",
      options: [
        "1991 yil 18 noyabr",
        "1991 yil 19 noyabr",
        "1991 yil 20 noyabr",
        "1991 yil 21 noyabr",
      ],
      correctAnswer: 0,
      subject: "tarix",
      difficulty: "easy",
    },
    {
      id: "hist7_easy",
      question: "O'zbekiston gerbi qachon qabul qilingan?",
      options: [
        "1992 yil 2 iyul",
        "1992 yil 3 iyul",
        "1992 yil 4 iyul",
        "1992 yil 5 iyul",
      ],
      correctAnswer: 0,
      subject: "tarix",
      difficulty: "easy",
    },
    {
      id: "hist8_easy",
      question: "O'zbekiston madhiyasi qachon qabul qilingan?",
      options: [
        "1992 yil 10 dekabr",
        "1992 yil 11 dekabr",
        "1992 yil 12 dekabr",
        "1992 yil 13 dekabr",
      ],
      correctAnswer: 2,
      subject: "tarix",
      difficulty: "easy",
    },
    {
      id: "hist9_easy",
      question: "Amir Temur imperiyasining poytaxti qaysi shahar edi?",
      options: ["Samarqand", "Buxoro", "Toshkent", "Xiva"],
      correctAnswer: 0,
      subject: "tarix",
      difficulty: "easy",
    },
    {
      id: "hist10_easy",
      question: "Mirzo Ulug'bek rasadxonasi qayerda joylashgan?",
      options: ["Samarqandda", "Buxoroda", "Toshkentda", "Xivada"],
      correctAnswer: 0,
      subject: "tarix",
      difficulty: "easy",
    },
    // MEDIUM savollar (10 ta)
    {
      id: "hist1_medium",
      question: "Samarqand qachon qurilgan?",
      options: [
        "Miloddan avvalgi 7-asrda",
        "Miloddan avvalgi 6-asrda",
        "Miloddan avvalgi 8-asrda",
        "Miloddan avvalgi 5-asrda",
      ],
      correctAnswer: 0,
      subject: "tarix",
      difficulty: "medium",
    },
    {
      id: "hist2_medium",
      question: "Buxoro xonligi qachon tashkil topgan?",
      options: ["1500-yilda", "1501-yilda", "1502-yilda", "1503-yilda"],
      correctAnswer: 0,
      subject: "tarix",
      difficulty: "medium",
    },
    {
      id: "hist3_medium",
      question: "Ulug'bek qachon tug'ilgan?",
      options: ["1394 yil", "1395 yil", "1396 yil", "1397 yil"],
      correctAnswer: 0,
      subject: "tarix",
      difficulty: "medium",
    },
    {
      id: "hist4_medium",
      question: "Turkiston ASSR qachon tashkil topgan?",
      options: ["1918 yil", "1919 yil", "1920 yil", "1921 yil"],
      correctAnswer: 0,
      subject: "tarix",
      difficulty: "medium",
    },
    {
      id: "hist5_medium",
      question: "Jadidchilik harakati qachon boshlangan?",
      options: [
        "19-asr oxiri",
        "20-asr boshi",
        "18-asr oxiri",
        "19-asr o'rtasi",
      ],
      correctAnswer: 0,
      subject: "tarix",
      difficulty: "medium",
    },
    {
      id: "hist6_medium",
      question: "Xiva xonligi qachon tashkil topgan?",
      options: ["1511-yilda", "1512-yilda", "1513-yilda", "1514-yilda"],
      correctAnswer: 0,
      subject: "tarix",
      difficulty: "medium",
    },
    {
      id: "hist7_medium",
      question: "Qo'qon xonligi qachon tashkil topgan?",
      options: ["1709-yilda", "1710-yilda", "1711-yilda", "1712-yilda"],
      correctAnswer: 1,
      subject: "tarix",
      difficulty: "medium",
    },
    {
      id: "hist8_medium",
      question: "Bobur qachon tug'ilgan?",
      options: ["1483 yil", "1484 yil", "1485 yil", "1486 yil"],
      correctAnswer: 0,
      subject: "tarix",
      difficulty: "medium",
    },
    {
      id: "hist9_medium",
      question: "Toshkent qachon Rossiya tomonidan bosib olingan?",
      options: ["1865 yil", "1866 yil", "1867 yil", "1868 yil"],
      correctAnswer: 0,
      subject: "tarix",
      difficulty: "medium",
    },
    {
      id: "hist10_medium",
      question: "O'zbekiston SSR qachon tashkil topgan?",
      options: ["1924 yil", "1925 yil", "1926 yil", "1927 yil"],
      correctAnswer: 0,
      subject: "tarix",
      difficulty: "medium",
    },
    // HARD savollar (10 ta)
    {
      id: "hist1_hard",
      question: "Somoniylar davlatining poytaxti qayerda joylashgan?",
      options: ["Buxoro", "Samarqand", "Balx", "Nishopur"],
      correctAnswer: 0,
      subject: "tarix",
      difficulty: "hard",
    },
    {
      id: "hist2_hard",
      question: "Xorazmshohlar davlatining so'nggi hukmdori kim edi?",
      options: [
        "Jaloliddun Manguberdi",
        "Atsiz",
        "Il-Arslon",
        "Anushtegin G'azni",
      ],
      correctAnswer: 0,
      subject: "tarix",
      difficulty: "hard",
    },
    {
      id: "hist3_hard",
      question:
        "Mo'g'ullar istilosi natijasida qaysi shahar butunlay vayron bo'lgan?",
      options: ["Urganch", "Samarqand", "Buxoro", "Toshkent"],
      correctAnswer: 0,
      subject: "tarix",
      difficulty: "hard",
    },
    {
      id: "hist4_hard",
      question: "Shayboniylar davlatining asoschisi kim?",
      options: [
        "Muhammad Shayboniy",
        "Abdullaxon II",
        "Ubaydullaxon",
        "Iskandar",
      ],
      correctAnswer: 0,
      subject: "tarix",
      difficulty: "hard",
    },
    {
      id: "hist5_hard",
      question: "Rossiya imperiyasi O'rta Osiyoni qachon to'liq bosib oldi?",
      options: ["1876 yil", "1873 yil", "1881 yil", "1884 yil"],
      correctAnswer: 0,
      subject: "tarix",
      difficulty: "hard",
    },
    {
      id: "hist6_hard",
      question: "Ismoil Somoni qachon hukmronlik qilgan?",
      options: [
        "892-907 yillar",
        "893-908 yillar",
        "894-909 yillar",
        "895-910 yillar",
      ],
      correctAnswer: 0,
      subject: "tarix",
      difficulty: "hard",
    },
    {
      id: "hist7_hard",
      question: "Buxoro Xalq Sovet Respublikasi qachon tashkil topgan?",
      options: ["1920 yil", "1921 yil", "1922 yil", "1923 yil"],
      correctAnswer: 0,
      subject: "tarix",
      difficulty: "hard",
    },
    {
      id: "hist8_hard",
      question: "Xiva Xalq Sovet Respublikasi qachon tashkil topgan?",
      options: ["1920 yil", "1921 yil", "1922 yil", "1923 yil"],
      correctAnswer: 0,
      subject: "tarix",
      difficulty: "hard",
    },
    {
      id: "hist9_hard",
      question: "Al-Xorazmiy qaysi fanda mashhur?",
      options: ["Matematika", "Astronomiya", "Tibbiyot", "Falsafa"],
      correctAnswer: 0,
      subject: "tarix",
      difficulty: "hard",
    },
    {
      id: "hist10_hard",
      question: "Ibn Sino qaysi fanda mashhur?",
      options: ["Tibbiyot", "Matematika", "Astronomiya", "Falsafa"],
      correctAnswer: 0,
      subject: "tarix",
      difficulty: "hard",
    },
  ],
};

export function TestProvider({ children }: { children: ReactNode }) {
  const [currentTest, setCurrentTest] =
    useState<TestContextType["currentTest"]>(null);
  const { updateUserStats } = useAuth();

  const startTest = (
    testType: string,
    subjects: string[],
    questionCount: number,
    difficulty: "easy" | "medium" | "hard" = "easy"
  ) => {
    const allQuestions: Question[] = [];
    const usedQuestionIds = new Set<string>();

    subjects.forEach((subject) => {
      const subjectQuestions =
        questionsData[subject]?.filter((q) => q.difficulty === difficulty) ||
        [];
      const questionsPerSubject = Math.ceil(questionCount / subjects.length);

      const availableQuestions = subjectQuestions.filter(
        (q) => !usedQuestionIds.has(q.id)
      );
      const selectedQuestions = availableQuestions
        .sort(() => Math.random() - 0.5)
        .slice(0, questionsPerSubject);

      selectedQuestions.forEach((q) => usedQuestionIds.add(q.id));
      allQuestions.push(...selectedQuestions);
    });

    const finalQuestions = allQuestions
      .sort(() => Math.random() - 0.5)
      .slice(0, questionCount);

    // Qiyinchilik darajasiga qarab vaqt hisoblash
    const timeMultiplier = {
      easy: 2, // 2 daqiqa har savol uchun
      medium: 3, // 3 daqiqa har savol uchun
      hard: 5, // 5 daqiqa har savol uchun
    };
    const totalTimeInSeconds = questionCount * timeMultiplier[difficulty] * 60;

    setCurrentTest({
      testType,
      subjects,
      questions: finalQuestions,
      currentQuestionIndex: 0,
      answers: [],
      timeRemaining: totalTimeInSeconds,
      totalQuestions: questionCount,
      startTime: Date.now(),
      totalTimeGiven: totalTimeInSeconds,
      difficulty,
    });

    console.log("🚀 Test started:", {
      testType,
      subjects,
      difficulty,
      questionCount,
      timeInMinutes: totalTimeInSeconds / 60,
    });
  };

  const submitAnswer = (questionId: string, selectedAnswer: number) => {
    if (!currentTest) return;

    const existingAnswerIndex = currentTest.answers.findIndex(
      (a) => a.questionId === questionId
    );
    const newAnswers = [...currentTest.answers];

    if (existingAnswerIndex >= 0) {
      newAnswers[existingAnswerIndex] = { questionId, selectedAnswer };
    } else {
      newAnswers.push({ questionId, selectedAnswer });
    }

    setCurrentTest({
      ...currentTest,
      answers: newAnswers,
    });
  };

  const nextQuestion = () => {
    if (!currentTest) return;

    if (currentTest.currentQuestionIndex < currentTest.questions.length - 1) {
      setCurrentTest({
        ...currentTest,
        currentQuestionIndex: currentTest.currentQuestionIndex + 1,
      });
    }
  };

  const finishTest = (): TestResult => {
    if (!currentTest) throw new Error("No active test");

    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const timeSpent = Math.floor((Date.now() - currentTest.startTime) / 1000);

    let correctAnswers = 0;
    const detailedAnswers = currentTest.answers.map((answer) => {
      const question = currentTest.questions.find(
        (q) => q.id === answer.questionId
      );
      const isCorrect = question
        ? question.correctAnswer === answer.selectedAnswer
        : false;
      if (isCorrect) correctAnswers++;
      return {
        ...answer,
        isCorrect,
        question,
      };
    });

    const result: TestResult = {
      id: `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      testType: currentTest.testType,
      subjects: currentTest.subjects,
      score: correctAnswers,
      totalQuestions: currentTest.questions.length,
      answers: detailedAnswers,
      completedAt: new Date().toISOString(),
      userId: currentUser.id || "",
      timeSpent,
      totalTimeGiven: currentTest.totalTimeGiven,
      difficulty: currentTest.difficulty,
    };

    const results = JSON.parse(localStorage.getItem("testResults") || "[]");
    results.push(result);
    localStorage.setItem("testResults", JSON.stringify(results));

    // Real-time event dispatch
    dispatchStorageEvent("testResults");

    // User statistikalarini yangilash
    updateUserStats(currentUser.id);

    console.log("✅ Test completed:", {
      score: `${correctAnswers}/${currentTest.questions.length}`,
      percentage: Math.round(
        (correctAnswers / currentTest.questions.length) * 100
      ),
      difficulty: currentTest.difficulty,
      timeSpent: Math.round(timeSpent / 60) + " minutes",
    });

    return result;
  };

  const resetTest = () => {
    setCurrentTest(null);
  };

  return (
    <TestContext.Provider
      value={{
        currentTest,
        startTest,
        submitAnswer,
        nextQuestion,
        finishTest,
        resetTest,
      }}
    >
      {children}
    </TestContext.Provider>
  );
}

export function useTest() {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error("useTest must be used within a TestProvider");
  }
  return context;
}
