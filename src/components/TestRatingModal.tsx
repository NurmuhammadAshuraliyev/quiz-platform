"use client";

import { useState } from "react";
import { Star, Send, MessageCircle, ThumbsUp } from "lucide-react";
import { addUserRating } from "../hooks/useDynamicStats";

interface TestRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  testResult: {
    testType: string;
    score: number;
    totalQuestions: number;
    difficulty: string;
  };
  userId: string;
  testId: string;
}

export default function TestRatingModal({
  isOpen,
  onClose,
  testResult,
  userId,
  testId,
}: TestRatingModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (rating === 0) return;

    setIsSubmitting(true);

    try {
      // Baholashni saqlash
      addUserRating(userId, rating, comment, testId);

      setIsSubmitted(true);

      // 3 soniyadan keyin modalni yopish
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setRating(0);
        setComment("");
      }, 3000);
    } catch (error) {
      console.error("Rating submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPerformanceText = () => {
    const percentage = (testResult.score / testResult.totalQuestions) * 100;
    if (percentage >= 90) return "Ajoyib natija! 🎉";
    if (percentage >= 80) return "Yaxshi natija! 👏";
    if (percentage >= 70) return "Yaxshi harakat! 👍";
    if (percentage >= 60) return "Yaxshi, lekin yaxshiroq bo'lishi mumkin 💪";
    return "Keyingi safar yaxshiroq bo'ladi! 📚";
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "Oson";
      case "medium":
        return "O'rta";
      case "hard":
        return "Qiyin";
      default:
        return difficulty;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
        {!isSubmitted ? (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Test yakunlandi!
              </h2>
              <p className="text-gray-600">{getPerformanceText()}</p>
            </div>

            {/* Test natijasi */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Test turi:</span>
                  <p className="font-semibold capitalize">
                    {testResult.testType}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Qiyinchilik:</span>
                  <p className="font-semibold">
                    {getDifficultyText(testResult.difficulty)}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Natija:</span>
                  <p className="font-semibold">
                    {testResult.score}/{testResult.totalQuestions}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Foiz:</span>
                  <p className="font-semibold">
                    {Math.round(
                      (testResult.score / testResult.totalQuestions) * 100
                    )}
                    %
                  </p>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Platformamizni baholang
              </h3>
              <div className="flex justify-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      size={32}
                      className={`${
                        star <= (hoveredRating || rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-center text-sm text-gray-500">
                {rating > 0 && (
                  <>
                    {rating === 1 && "Juda yomon 😞"}
                    {rating === 2 && "Yomon 😐"}
                    {rating === 3 && "O'rtacha 🙂"}
                    {rating === 4 && "Yaxshi 😊"}
                    {rating === 5 && "Ajoyib! 🤩"}
                  </>
                )}
              </p>
            </div>

            {/* Comment */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fikr-mulohaza (ixtiyoriy)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Platformamiz haqida fikringizni yozing..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                rows={3}
                maxLength={200}
              />
              <p className="text-xs text-gray-500 mt-1">{comment.length}/200</p>
            </div>

            {/* Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Keyinroq
              </button>
              <button
                onClick={handleSubmit}
                disabled={rating === 0 || isSubmitting}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Yuborish</span>
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ThumbsUp className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Rahmat!</h3>
            <p className="text-gray-600 mb-4">
              Sizning fikringiz biz uchun muhim
            </p>
            <div className="flex justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={20}
                  className={`${
                    star <= rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
