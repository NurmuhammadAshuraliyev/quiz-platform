"use client";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTest } from "../contexts/TestContext";
import {
  ArrowLeft,
  Play,
  Clock,
  AlertCircle,
  BookOpen,
  CheckCircle2,
  Zap,
  Target,
  Brain,
} from "lucide-react";

export default function SubjectSelection() {
  const { testType } = useParams<{ testType: string }>();
  const navigate = useNavigate();
  const { startTest } = useTest();

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [questionCount, setQuestionCount] = useState<string>("");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  );
  const [error, setError] = useState<string>("");

  const subjects = [
    {
      id: "matematika",
      name: "Matematika",
      questions: 30,
      icon: "📐",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "ona_tili",
      name: "Ona tili",
      questions: 30,
      icon: "📚",
      color: "from-green-500 to-green-600",
    },
    {
      id: "tarix",
      name: "O'zbekiston tarixi",
      questions: 30,
      icon: "🏛️",
      color: "from-purple-500 to-purple-600",
    },
  ];

  // Qiyinchilik darajasi sozlamalari
  const difficultyLevels = [
    {
      id: "easy",
      name: "Oson",
      description: "Boshlang'ich daraja",
      icon: Target,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-700",
      timePerQuestion: 2,
      features: [
        "Asosiy tushunchalar",
        "Oddiy masalalar",
        "Boshlang'ichlar uchun",
      ],
    },
    {
      id: "medium",
      name: "O'rta",
      description: "O'rta daraja",
      icon: Zap,
      color: "from-yellow-500 to-orange-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-700",
      timePerQuestion: 3,
      features: ["Murakkab masalalar", "Tahlil talab qiladi", "O'rta daraja"],
    },
    {
      id: "hard",
      name: "Qiyin",
      description: "Yuqori daraja",
      icon: Brain,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-700",
      timePerQuestion: 5,
      features: [
        "Eng qiyin masalalar",
        "Chuqur bilim talab",
        "Ekspertlar uchun",
      ],
    },
  ];

  // Maksimal savol sonini hisoblash
  const getMaxQuestions = () => {
    if (selectedSubjects.length === 0) return 90;
    return selectedSubjects.reduce((total, subjectId) => {
      const subject = subjects.find((s) => s.id === subjectId);
      return total + (subject?.questions || 0);
    }, 0);
  };

  const handleSubjectToggle = (subjectId: string) => {
    setSelectedSubjects((prev) => {
      const newSubjects = prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId];

      // Agar fanlar o'zgarsa, savol sonini qayta tekshirish
      const maxQuestions = newSubjects.reduce((total, id) => {
        const subject = subjects.find((s) => s.id === id);
        return total + (subject?.questions || 0);
      }, 0);

      const currentCount = Number.parseInt(questionCount) || 0;
      if (currentCount > maxQuestions) {
        setQuestionCount(maxQuestions.toString());
        setError(`Maksimal ${maxQuestions} ta savol tanlash mumkin`);
      } else {
        setError("");
      }

      return newSubjects;
    });
  };

  const handleQuestionCountChange = (value: string) => {
    // Faqat raqamlarni qabul qilish
    const numericValue = value.replace(/[^0-9]/g, "");

    if (numericValue === "") {
      setQuestionCount("");
      setError("");
      return;
    }

    const count = Number.parseInt(numericValue);
    const maxQuestions = getMaxQuestions();

    if (count < 5) {
      setQuestionCount(numericValue);
      setError("Kamida 5 ta savol tanlang");
    } else if (count > maxQuestions) {
      setQuestionCount(numericValue);
      setError(`Maksimal ${maxQuestions} ta savol tanlash mumkin`);
    } else {
      setQuestionCount(numericValue);
      setError("");
    }
  };

  const handleStartTest = () => {
    const count = Number.parseInt(questionCount);

    if (selectedSubjects.length === 0) {
      setError("Kamida bitta fan tanlang!");
      return;
    }

    if (!questionCount || count < 5) {
      setError("Kamida 5 ta savol tanlang!");
      return;
    }

    if (count > getMaxQuestions()) {
      setError(`Maksimal ${getMaxQuestions()} ta savol tanlash mumkin!`);
      return;
    }

    setError("");
    startTest(testType!, selectedSubjects, count, difficulty);
    navigate(`/test/${testType}`);
  };

  const getTestTitle = (type: string) => {
    switch (type) {
      case "dtm":
        return "DTM Test";
      case "virtual":
        return "Virtual Test";
      case "oliy":
        return "Xususiy Oliygohllar";
      case "prezident":
        return "Prezident Maktabi";
      default:
        return "Test";
    }
  };

  const calculateTime = (
    questions: number,
    difficulty: "easy" | "medium" | "hard"
  ) => {
    if (!questions || questions === 0) return "0 daqiqa";

    const timeMultiplier = {
      easy: 2,
      medium: 3,
      hard: 5,
    };

    const totalMinutes = questions * timeMultiplier[difficulty];
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
      return minutes > 0 ? `${hours} soat ${minutes} daqiqa` : `${hours} soat`;
    }
    return `${minutes} daqiqa`;
  };

  const currentQuestionCount = Number.parseInt(questionCount) || 0;
  const selectedDifficulty = difficultyLevels.find((d) => d.id === difficulty)!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Ortga qaytish</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Test Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white sticky top-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6">
                {getTestTitle(testType!)}
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Test savolini yili:</span>
                  <span className="font-semibold">2025</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Tanlangan fanlar:</span>
                  <span className="font-semibold">
                    {selectedSubjects.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Qiyinchilik:</span>
                  <span className="font-semibold">
                    {selectedDifficulty.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Jami savollar:</span>
                  <span className="font-semibold">
                    {currentQuestionCount} ta
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Vaqt:</span>
                  <span className="font-semibold">
                    {calculateTime(currentQuestionCount, difficulty)}
                  </span>
                </div>
                {selectedSubjects.length > 0 && (
                  <div className="flex justify-between items-center border-t border-blue-400 pt-4">
                    <span className="text-blue-100">Maksimal:</span>
                    <span className="font-semibold">
                      {getMaxQuestions()} ta
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center space-x-3 mb-8">
                <BookOpen className="text-blue-600" size={28} />
                <h3 className="text-2xl font-bold text-gray-800">
                  Test sozlamalari
                </h3>
              </div>

              {/* Difficulty Selection */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center space-x-2">
                  <Brain className="text-purple-600" size={20} />
                  <span>Qiyinchilik darajasini tanlang</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {difficultyLevels.map((level) => {
                    const Icon = level.icon;
                    const isSelected = difficulty === level.id;
                    return (
                      <div
                        key={level.id}
                        onClick={() =>
                          setDifficulty(level.id as "easy" | "medium" | "hard")
                        }
                        className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          isSelected
                            ? `${level.borderColor} ${level.bgColor} shadow-lg`
                            : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <Icon
                            className={
                              isSelected ? level.textColor : "text-gray-400"
                            }
                            size={24}
                          />
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                              isSelected
                                ? `${level.borderColor.replace(
                                    "border-",
                                    "border-"
                                  )} ${level.bgColor.replace("bg-", "bg-")}`
                                : "border-gray-300"
                            }`}
                          >
                            {isSelected && (
                              <CheckCircle2
                                className={level.textColor}
                                size={12}
                              />
                            )}
                          </div>
                        </div>
                        <h4
                          className={`font-semibold mb-1 ${
                            isSelected ? level.textColor : "text-gray-800"
                          }`}
                        >
                          {level.name}
                        </h4>
                        <p className="text-sm text-gray-500 mb-3">
                          {level.description}
                        </p>
                        <div className="space-y-1">
                          {level.features.map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <div
                                className={`w-1 h-1 rounded-full ${
                                  isSelected
                                    ? level.bgColor
                                        .replace("bg-", "bg-")
                                        .replace("-50", "-400")
                                    : "bg-gray-300"
                                }`}
                              ></div>
                              <span className="text-xs text-gray-600">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 text-xs text-gray-500">
                          {level.timePerQuestion} daqiqa/savol
                        </div>
                        {isSelected && (
                          <div className="absolute top-2 right-2">
                            <div
                              className={`w-3 h-3 rounded-full animate-pulse ${level.bgColor
                                .replace("bg-", "bg-")
                                .replace("-50", "-400")}`}
                            ></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Question Count Input */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Savollar soni (5-{getMaxQuestions()} orasida)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={questionCount}
                    onChange={(e) => handleQuestionCountChange(e.target.value)}
                    placeholder="Savol sonini kiriting"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:border-transparent transition-all ${
                      error
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-200 focus:ring-blue-500"
                    }`}
                  />
                </div>
                <div className="flex items-center space-x-2 mt-3 text-sm text-gray-600">
                  <Clock size={16} />
                  <span>
                    Har bir savol uchun {selectedDifficulty.timePerQuestion}{" "}
                    daqiqa vaqt beriladi
                  </span>
                </div>
                {error && (
                  <div className="flex items-center space-x-2 mt-3 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                )}
              </div>

              {/* Subject Selection */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">
                  Fanlarni tanlang
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {subjects.map((subject) => {
                    const isSelected = selectedSubjects.includes(subject.id);
                    return (
                      <div
                        key={subject.id}
                        onClick={() => handleSubjectToggle(subject.id)}
                        className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          isSelected
                            ? "border-green-400 bg-green-50 shadow-lg"
                            : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-2xl">{subject.icon}</div>
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              isSelected
                                ? "border-green-500 bg-green-500"
                                : "border-gray-300"
                            }`}
                          >
                            {isSelected && (
                              <CheckCircle2 className="text-white" size={16} />
                            )}
                          </div>
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-2">
                          {subject.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {subject.questions} ta savol mavjud
                        </p>
                        {isSelected && (
                          <div className="absolute top-2 right-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Section */}
              <div className="border-t pt-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Ta'lim tili</p>
                    <p className="font-semibold text-gray-800">O'zbek</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {currentQuestionCount > 0 ? (
                        <>
                          Tanlangan savollar:{" "}
                          <span className="font-medium">
                            {currentQuestionCount} ta
                          </span>{" "}
                          (
                          <span className="font-medium">
                            {calculateTime(currentQuestionCount, difficulty)}
                          </span>
                          )
                        </>
                      ) : (
                        "Savol sonini kiriting"
                      )}
                    </p>
                  </div>
                  <button
                    onClick={handleStartTest}
                    disabled={
                      selectedSubjects.length === 0 || !questionCount || !!error
                    }
                    className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                  >
                    <Play size={20} />
                    <span>Testni boshlash</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
