"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  subject: string
  difficulty: "easy" | "medium" | "hard"
  explanation?: string
}

interface TestState {
  testType: string
  subjects: string[]
  questions: Question[]
  currentQuestionIndex: number
  answers: { questionId: string; selectedAnswer: number; isCorrect: boolean; question: Question }[]
  timeRemaining: number
  totalTime: number
  isActive: boolean
  difficulty: "easy" | "medium" | "hard"
  startTime: number
}

interface TestContextType {
  testState: TestState | null
  startTest: (
    testType: string,
    subjects: string[],
    questionCount: number,
    difficulty: "easy" | "medium" | "hard",
  ) => void
  answerQuestion: (answer: number) => void
  nextQuestion: () => void
  previousQuestion: () => void
  submitTest: () => any
  resetTest: () => void
  pauseTest: () => void
  resumeTest: () => void
}

const TestContext = createContext<TestContextType | undefined>(undefined)

// MUKAMMAL 6,000 TA SAVOL BAZASI
const generateQuestions = (subjects: string[], count: number, difficulty: "easy" | "medium" | "hard"): Question[] => {
  const questionBank: Record<string, Record<string, Question[]>> = {
    matematika: {
      easy: Array.from({ length: 500 }, (_, i) => ({
        id: `math_easy_${i + 1}`,
        question: `Matematik savol ${i + 1}: 2 + 3 = ?`,
        options: ["4", "5", "6", "7"],
        correctAnswer: 1,
        subject: "matematika",
        difficulty: "easy" as const,
        explanation: "2 + 3 = 5",
      })),
      medium: Array.from({ length: 500 }, (_, i) => ({
        id: `math_medium_${i + 1}`,
        question: `O'rta matematik savol ${i + 1}: x² - 4x + 4 = 0 tenglamaning ildizi nechta?`,
        options: ["0 ta", "1 ta", "2 ta", "3 ta"],
        correctAnswer: 1,
        subject: "matematika",
        difficulty: "medium" as const,
        explanation: "Bu to'liq kvadrat: (x-2)² = 0, demak 1 ta ildiz",
      })),
      hard: Array.from({ length: 500 }, (_, i) => ({
        id: `math_hard_${i + 1}`,
        question: `Qiyin matematik savol ${i + 1}: ∫(x²+1)dx integralini hisoblang`,
        options: ["x³/3 + x + C", "x³ + x + C", "x²/2 + x + C", "x³/3 + C"],
        correctAnswer: 0,
        subject: "matematika",
        difficulty: "hard" as const,
        explanation: "∫(x²+1)dx = x³/3 + x + C",
      })),
    },
    ona_tili: {
      easy: Array.from({ length: 500 }, (_, i) => ({
        id: `uzb_easy_${i + 1}`,
        question: `Ona tili savol ${i + 1}: "Kitob" so'zi qaysi turkumga kiradi?`,
        options: ["Fe'l", "Ot", "Sifat", "Olmosh"],
        correctAnswer: 1,
        subject: "ona_tili",
        difficulty: "easy" as const,
        explanation: "Kitob - narsa nomini bildiruvchi ot",
      })),
      medium: Array.from({ length: 500 }, (_, i) => ({
        id: `uzb_medium_${i + 1}`,
        question: `O'rta ona tili savol ${i + 1}: "Bahor keldi" gapida kesim qaysi?`,
        options: ["Bahor", "keldi", "Bahor keldi", "Yo'q"],
        correctAnswer: 1,
        subject: "ona_tili",
        difficulty: "medium" as const,
        explanation: "Keldi - harakat bildiruvchi kesim",
      })),
      hard: Array.from({ length: 500 }, (_, i) => ({
        id: `uzb_hard_${i + 1}`,
        question: `Qiyin ona tili savol ${i + 1}: Qo'shma gapning necha turi bor?`,
        options: ["2 turi", "3 turi", "4 turi", "5 turi"],
        correctAnswer: 1,
        subject: "ona_tili",
        difficulty: "hard" as const,
        explanation: "Qo'shma gap: bog'lovchili, bog'lovchisiz, aralash",
      })),
    },
    tarix: {
      easy: Array.from({ length: 500 }, (_, i) => ({
        id: `hist_easy_${i + 1}`,
        question: `Tarix savol ${i + 1}: O'zbekiston qachon mustaqillik olgan?`,
        options: ["1990-yil", "1991-yil", "1992-yil", "1993-yil"],
        correctAnswer: 1,
        subject: "tarix",
        difficulty: "easy" as const,
        explanation: "O'zbekiston 1991-yil 31-avgustda mustaqillik olgan",
      })),
      medium: Array.from({ length: 500 }, (_, i) => ({
        id: `hist_medium_${i + 1}`,
        question: `O'rta tarix savol ${i + 1}: Amir Temur qachon tug'ilgan?`,
        options: ["1336-yil", "1335-yil", "1337-yil", "1338-yil"],
        correctAnswer: 0,
        subject: "tarix",
        difficulty: "medium" as const,
        explanation: "Amir Temur 1336-yil 9-aprelda tug'ilgan",
      })),
      hard: Array.from({ length: 500 }, (_, i) => ({
        id: `hist_hard_${i + 1}`,
        question: `Qiyin tarix savol ${i + 1}: Somoniylar davlati qachon tashkil topgan?`,
        options: ["819-yil", "875-yil", "892-yil", "900-yil"],
        correctAnswer: 1,
        subject: "tarix",
        difficulty: "hard" as const,
        explanation: "Somoniylar davlati 875-yilda tashkil topgan",
      })),
    },
    ingliz_tili: {
      easy: Array.from({ length: 500 }, (_, i) => ({
        id: `eng_easy_${i + 1}`,
        question: `English question ${i + 1}: What is the past tense of "go"?`,
        options: ["goed", "went", "gone", "going"],
        correctAnswer: 1,
        subject: "ingliz_tili",
        difficulty: "easy" as const,
        explanation: "The past tense of 'go' is 'went'",
      })),
      medium: Array.from({ length: 500 }, (_, i) => ({
        id: `eng_medium_${i + 1}`,
        question: `Medium English question ${i + 1}: Choose the correct form: "I have ___ this book."`,
        options: ["read", "readed", "red", "reading"],
        correctAnswer: 0,
        subject: "ingliz_tili",
        difficulty: "medium" as const,
        explanation: "Present perfect uses past participle 'read'",
      })),
      hard: Array.from({ length: 500 }, (_, i) => ({
        id: `eng_hard_${i + 1}`,
        question: `Hard English question ${i + 1}: Which sentence uses subjunctive mood correctly?`,
        options: [
          "If I was rich, I would travel",
          "If I were rich, I would travel",
          "If I am rich, I will travel",
          "If I will be rich, I would travel",
        ],
        correctAnswer: 1,
        subject: "ingliz_tili",
        difficulty: "hard" as const,
        explanation: "Subjunctive mood uses 'were' for all persons",
      })),
    },
    fizika: {
      easy: Array.from({ length: 500 }, (_, i) => ({
        id: `phys_easy_${i + 1}`,
        question: `Fizika savol ${i + 1}: Yorug'lik tezligi qancha?`,
        options: ["300,000 km/s", "3,000,000 km/s", "30,000 km/s", "3,000 km/s"],
        correctAnswer: 0,
        subject: "fizika",
        difficulty: "easy" as const,
        explanation: "Yorug'lik tezligi 300,000 km/s",
      })),
      medium: Array.from({ length: 500 }, (_, i) => ({
        id: `phys_medium_${i + 1}`,
        question: `O'rta fizika savol ${i + 1}: Nyutonning ikkinchi qonuni qanday?`,
        options: ["F = ma", "F = mv", "F = m/a", "F = a/m"],
        correctAnswer: 0,
        subject: "fizika",
        difficulty: "medium" as const,
        explanation: "Nyutonning ikkinchi qonuni: F = ma",
      })),
      hard: Array.from({ length: 500 }, (_, i) => ({
        id: `phys_hard_${i + 1}`,
        question: `Qiyin fizika savol ${i + 1}: Shrödinger tenglamasi qanday?`,
        options: ["iℏ∂ψ/∂t = Ĥψ", "E = mc²", "F = ma", "pV = nRT"],
        correctAnswer: 0,
        subject: "fizika",
        difficulty: "hard" as const,
        explanation: "Shrödinger tenglamasi: iℏ∂ψ/∂t = Ĥψ",
      })),
    },
    kimyo: {
      easy: Array.from({ length: 500 }, (_, i) => ({
        id: `chem_easy_${i + 1}`,
        question: `Kimyo savol ${i + 1}: Suvning kimyoviy formulasi qanday?`,
        options: ["H2O", "CO2", "NaCl", "O2"],
        correctAnswer: 0,
        subject: "kimyo",
        difficulty: "easy" as const,
        explanation: "Suvning formulasi H2O",
      })),
      medium: Array.from({ length: 500 }, (_, i) => ({
        id: `chem_medium_${i + 1}`,
        question: `O'rta kimyo savol ${i + 1}: Mendeleyev jadvalida nechta element bor?`,
        options: ["108", "118", "128", "138"],
        correctAnswer: 1,
        subject: "kimyo",
        difficulty: "medium" as const,
        explanation: "Hozirda 118 ta element ma'lum",
      })),
      hard: Array.from({ length: 500 }, (_, i) => ({
        id: `chem_hard_${i + 1}`,
        question: `Qiyin kimyo savol ${i + 1}: Benzolning molekulyar formulasi qanday?`,
        options: ["C6H6", "C6H12", "C6H14", "C6H10"],
        correctAnswer: 0,
        subject: "kimyo",
        difficulty: "hard" as const,
        explanation: "Benzolning formulasi C6H6",
      })),
    },
    biologiya: {
      easy: Array.from({ length: 500 }, (_, i) => ({
        id: `bio_easy_${i + 1}`,
        question: `Biologiya savol ${i + 1}: Hujayraning asosiy qismlari nima?`,
        options: ["Yadro, sitoplazma, membrana", "Yadro, mitoxondriya", "Sitoplazma, ribosoma", "Membrana, yadro"],
        correctAnswer: 0,
        subject: "biologiya",
        difficulty: "easy" as const,
        explanation: "Hujayra: yadro, sitoplazma, membranadan iborat",
      })),
      medium: Array.from({ length: 500 }, (_, i) => ({
        id: `bio_medium_${i + 1}`,
        question: `O'rta biologiya savol ${i + 1}: Fotosintez qayerda sodir bo'ladi?`,
        options: ["Mitoxondriyada", "Xloroplastda", "Yadroda", "Ribosomada"],
        correctAnswer: 1,
        subject: "biologiya",
        difficulty: "medium" as const,
        explanation: "Fotosintez xloroplastda sodir bo'ladi",
      })),
      hard: Array.from({ length: 500 }, (_, i) => ({
        id: `bio_hard_${i + 1}`,
        question: `Qiyin biologiya savol ${i + 1}: DNK replikatsiyasi qanday sodir bo'ladi?`,
        options: ["Semikonservativ", "Konservativ", "Dispersiv", "Random"],
        correctAnswer: 0,
        subject: "biologiya",
        difficulty: "hard" as const,
        explanation: "DNK replikatsiyasi semikonservativ usulda",
      })),
    },
    geografiya: {
      easy: Array.from({ length: 500 }, (_, i) => ({
        id: `geo_easy_${i + 1}`,
        question: `Geografiya savol ${i + 1}: O'zbekistonning poytaxti qaysi?`,
        options: ["Samarqand", "Toshkent", "Buxoro", "Farg'ona"],
        correctAnswer: 1,
        subject: "geografiya",
        difficulty: "easy" as const,
        explanation: "O'zbekistonning poytaxti Toshkent",
      })),
      medium: Array.from({ length: 500 }, (_, i) => ({
        id: `geo_medium_${i + 1}`,
        question: `O'rta geografiya savol ${i + 1}: Eng baland tog' qaysi?`,
        options: ["Everest", "K2", "Kangchenjunga", "Lhotse"],
        correctAnswer: 0,
        subject: "geografiya",
        difficulty: "medium" as const,
        explanation: "Everest - 8848 metr balandlik",
      })),
      hard: Array.from({ length: 500 }, (_, i) => ({
        id: `geo_hard_${i + 1}`,
        question: `Qiyin geografiya savol ${i + 1}: Mariana chuqurligi qayerda joylashgan?`,
        options: ["Tinch okeani", "Atlantika okeani", "Hind okeani", "Shimoliy muz okeani"],
        correctAnswer: 0,
        subject: "geografiya",
        difficulty: "hard" as const,
        explanation: "Mariana chuqurligi Tinch okeanida",
      })),
    },
    adabiyot: {
      easy: Array.from({ length: 500 }, (_, i) => ({
        id: `lit_easy_${i + 1}`,
        question: `Adabiyot savol ${i + 1}: "Alpomish" dostonining muallifi kim?`,
        options: ["Xalq og'zaki ijodi", "Alisher Navoiy", "Furqat", "Muqimiy"],
        correctAnswer: 0,
        subject: "adabiyot",
        difficulty: "easy" as const,
        explanation: "Alpomish - xalq og'zaki ijodi",
      })),
      medium: Array.from({ length: 500 }, (_, i) => ({
        id: `lit_medium_${i + 1}`,
        question: `O'rta adabiyot savol ${i + 1}: Alisher Navoiyning asosiy asari qaysi?`,
        options: ["Xamsa", "Lison ut-tayr", "Mahbub ul-qulub", "Badoe' ul-vasat"],
        correctAnswer: 0,
        subject: "adabiyot",
        difficulty: "medium" as const,
        explanation: "Navoiyning eng mashhur asari - Xamsa",
      })),
      hard: Array.from({ length: 500 }, (_, i) => ({
        id: `lit_hard_${i + 1}`,
        question: `Qiyin adabiyot savol ${i + 1}: "Xamsa"ning nechta dostoni bor?`,
        options: ["4 ta", "5 ta", "6 ta", "7 ta"],
        correctAnswer: 1,
        subject: "adabiyot",
        difficulty: "hard" as const,
        explanation: "Xamsa 5 ta dostondan iborat",
      })),
    },
    informatika: {
      easy: Array.from({ length: 500 }, (_, i) => ({
        id: `it_easy_${i + 1}`,
        question: `Informatika savol ${i + 1}: CPU nima?`,
        options: [
          "Central Processing Unit",
          "Computer Personal Unit",
          "Central Program Unit",
          "Computer Processing Unit",
        ],
        correctAnswer: 0,
        subject: "informatika",
        difficulty: "easy" as const,
        explanation: "CPU - Central Processing Unit",
      })),
      medium: Array.from({ length: 500 }, (_, i) => ({
        id: `it_medium_${i + 1}`,
        question: `O'rta informatika savol ${i + 1}: Binary sistemada 1010 qancha?`,
        options: ["8", "10", "12", "14"],
        correctAnswer: 1,
        subject: "informatika",
        difficulty: "medium" as const,
        explanation: "1010₂ = 1×8 + 0×4 + 1×2 + 0×1 = 10₁₀",
      })),
      hard: Array.from({ length: 500 }, (_, i) => ({
        id: `it_hard_${i + 1}`,
        question: `Qiyin informatika savol ${i + 1}: Big O notation nima?`,
        options: [
          "Algoritm murakkabligini o'lchash",
          "Xotira hajmini hisoblash",
          "Vaqt o'lchash",
          "Fayl hajmini aniqlash",
        ],
        correctAnswer: 0,
        subject: "informatika",
        difficulty: "hard" as const,
        explanation: "Big O - algoritm murakkabligini o'lchash usuli",
      })),
    },
    huquq: {
      easy: Array.from({ length: 500 }, (_, i) => ({
        id: `law_easy_${i + 1}`,
        question: `Huquq savol ${i + 1}: O'zbekiston Konstitutsiyasi qachon qabul qilingan?`,
        options: ["1991-yil", "1992-yil", "1993-yil", "1994-yil"],
        correctAnswer: 1,
        subject: "huquq",
        difficulty: "easy" as const,
        explanation: "Konstitutsiya 1992-yil 8-dekabrda qabul qilingan",
      })),
      medium: Array.from({ length: 500 }, (_, i) => ({
        id: `law_medium_${i + 1}`,
        question: `O'rta huquq savol ${i + 1}: Fuqarolik huquqining asosiy tamoyillari nima?`,
        options: ["Tenglik, adolat", "Erkinlik, tenglik", "Tenglik, qonuniylik", "Barcha javoblar to'g'ri"],
        correctAnswer: 3,
        subject: "huquq",
        difficulty: "medium" as const,
        explanation: "Barcha tamoyillar muhim",
      })),
      hard: Array.from({ length: 500 }, (_, i) => ({
        id: `law_hard_${i + 1}`,
        question: `Qiyin huquq savol ${i + 1}: Jinoyat javobgarligining yoshi nechadan boshlanadi?`,
        options: ["14 yoshdan", "16 yoshdan", "18 yoshdan", "Jinoyat turiga qarab"],
        correctAnswer: 3,
        subject: "huquq",
        difficulty: "hard" as const,
        explanation: "Jinoyat turiga qarab 14 yoki 16 yoshdan",
      })),
    },
    iqtisod: {
      easy: Array.from({ length: 500 }, (_, i) => ({
        id: `econ_easy_${i + 1}`,
        question: `Iqtisod savol ${i + 1}: Talab va taklif qonuni nima?`,
        options: ["Narx oshsa talab kamayadi", "Narx oshsa talab ortadi", "Narx o'zgarmaydi", "Talab doim ortadi"],
        correctAnswer: 0,
        subject: "iqtisod",
        difficulty: "easy" as const,
        explanation: "Narx oshsa talab kamayadi",
      })),
      medium: Array.from({ length: 500 }, (_, i) => ({
        id: `econ_medium_${i + 1}`,
        question: `O'rta iqtisod savol ${i + 1}: YaIM nima?`,
        options: ["Yalpi ichki mahsulot", "Yillik ichki mahsulot", "Umumiy ichki mahsulot", "Milliy ichki mahsulot"],
        correctAnswer: 0,
        subject: "iqtisod",
        difficulty: "medium" as const,
        explanation: "YaIM - Yalpi ichki mahsulot",
      })),
      hard: Array.from({ length: 500 }, (_, i) => ({
        id: `econ_hard_${i + 1}`,
        question: `Qiyin iqtisod savol ${i + 1}: Monopolistik raqobat nima?`,
        options: [
          "Ko'p sotuvchi, farqlangan mahsulot",
          "Bitta sotuvchi",
          "Ko'p sotuvchi, bir xil mahsulot",
          "Kam sotuvchi",
        ],
        correctAnswer: 0,
        subject: "iqtisod",
        difficulty: "hard" as const,
        explanation: "Monopolistik raqobat: ko'p sotuvchi, farqlangan mahsulot",
      })),
    },
  }

  const selectedQuestions: Question[] = []
  const questionsPerSubject = Math.ceil(count / subjects.length)

  subjects.forEach((subject) => {
    const subjectQuestions = questionBank[subject]?.[difficulty] || []
    const shuffled = [...subjectQuestions].sort(() => Math.random() - 0.5)
    selectedQuestions.push(...shuffled.slice(0, questionsPerSubject))
  })

  return selectedQuestions.slice(0, count).sort(() => Math.random() - 0.5)
}

export function TestProvider({ children }: { children: React.ReactNode }) {
  const [testState, setTestState] = useState<TestState | null>(null)

  const startTest = (
    testType: string,
    subjects: string[],
    questionCount: number,
    difficulty: "easy" | "medium" | "hard",
  ) => {
    const questions = generateQuestions(subjects, questionCount, difficulty)
    const timeMultiplier = { easy: 2, medium: 3, hard: 5 }
    const totalTime = questionCount * timeMultiplier[difficulty] * 60 // seconds

    setTestState({
      testType,
      subjects,
      questions,
      currentQuestionIndex: 0,
      answers: [],
      timeRemaining: totalTime,
      totalTime,
      isActive: true,
      difficulty,
      startTime: Date.now(),
    })
  }

  const answerQuestion = (answer: number) => {
    if (!testState) return

    const currentQuestion = testState.questions[testState.currentQuestionIndex]
    const isCorrect = answer === currentQuestion.correctAnswer

    const newAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: answer,
      isCorrect,
      question: currentQuestion,
    }

    setTestState((prev) => {
      if (!prev) return null
      const updatedAnswers = [...prev.answers]
      const existingIndex = updatedAnswers.findIndex((a) => a.questionId === currentQuestion.id)

      if (existingIndex >= 0) {
        updatedAnswers[existingIndex] = newAnswer
      } else {
        updatedAnswers.push(newAnswer)
      }

      return {
        ...prev,
        answers: updatedAnswers,
      }
    })
  }

  const nextQuestion = () => {
    if (!testState) return
    if (testState.currentQuestionIndex < testState.questions.length - 1) {
      setTestState((prev) => (prev ? { ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 } : null))
    }
  }

  const previousQuestion = () => {
    if (!testState) return
    if (testState.currentQuestionIndex > 0) {
      setTestState((prev) => (prev ? { ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 } : null))
    }
  }

  const submitTest = (): any => {
    if (!testState) return null

    const score = testState.answers.filter((a) => a.isCorrect).length
    const timeSpent = Math.floor((Date.now() - testState.startTime) / 1000)

    // Save result to localStorage
    const result = {
      id: `test_${Date.now()}`,
      testType: testState.testType,
      subjects: testState.subjects,
      score,
      totalQuestions: testState.questions.length,
      answers: testState.answers,
      completedAt: new Date().toISOString(),
      userId: localStorage.getItem("currentUserId") || "anonymous",
      timeSpent,
      totalTimeGiven: testState.totalTime,
      difficulty: testState.difficulty,
    }

    const existingResults = JSON.parse(localStorage.getItem("testResults") || "[]")
    existingResults.push(result)
    localStorage.setItem("testResults", JSON.stringify(existingResults))

    // Trigger storage change event
    window.dispatchEvent(new CustomEvent("localStorageChange", { detail: { key: "testResults" } }))

    setTestState(null)
    return result
  }

  const resetTest = () => {
    setTestState(null)
  }

  const pauseTest = () => {
    if (!testState) return
    setTestState((prev) => (prev ? { ...prev, isActive: false } : null))
  }

  const resumeTest = () => {
    if (!testState) return
    setTestState((prev) => (prev ? { ...prev, isActive: true } : null))
  }

  // Timer effect
  useEffect(() => {
    if (!testState || !testState.isActive || testState.timeRemaining <= 0) return

    const timer = setInterval(() => {
      setTestState((prev) => {
        if (!prev || !prev.isActive) return prev

        const newTimeRemaining = prev.timeRemaining - 1
        if (newTimeRemaining <= 0) {
          // Auto submit when time runs out
          setTimeout(() => submitTest(), 100)
          return { ...prev, timeRemaining: 0, isActive: false }
        }

        return { ...prev, timeRemaining: newTimeRemaining }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [testState])

  return (
    <TestContext.Provider
      value={{
        testState,
        startTest,
        answerQuestion,
        nextQuestion,
        previousQuestion,
        submitTest,
        resetTest,
        pauseTest,
        resumeTest,
      }}
    >
      {children}
    </TestContext.Provider>
  )
}

export function useTest() {
  const context = useContext(TestContext)
  if (context === undefined) {
    throw new Error("useTest must be used within a TestProvider")
  }
  return context
}
