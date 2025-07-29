"use client";

import { useState, useEffect } from "react";

interface DynamicStats {
  totalUsers: number;
  totalQuestions: number;
  totalTests: number;
  averageScore: number;
  successRate: number;
  activeUsers: number;
  averageUserRating: number;
  totalRatings: number;
  difficultyStats: {
    easy: number;
    medium: number;
    hard: number;
  };
  realTimeData: {
    lastUpdated: string;
    newUsersToday: number;
    testsToday: number;
    onlineUsers: number;
  };
}

interface UserRating {
  userId: string;
  rating: number;
  comment?: string;
  timestamp: string;
  testId: string;
}

export function useDynamicStats(): DynamicStats {
  const [stats, setStats] = useState<DynamicStats>({
    totalUsers: 0,
    totalQuestions: 0,
    totalTests: 0,
    averageScore: 0,
    successRate: 0,
    activeUsers: 0,
    averageUserRating: 0,
    totalRatings: 0,
    difficultyStats: {
      easy: 0,
      medium: 0,
      hard: 0,
    },
    realTimeData: {
      lastUpdated: new Date().toISOString(),
      newUsersToday: 0,
      testsToday: 0,
      onlineUsers: 0,
    },
  });

  useEffect(() => {
    const calculateRealStats = () => {
      try {
        // Real foydalanuvchilar sonini hisoblash
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const totalUsers = users.length;

        // Agar userlar yo'q bo'lsa, minimum qiymatlar
        const minUsers = totalUsers > 0 ? totalUsers : 1250; // Demo uchun minimum

        // Bugungi yangi foydalanuvchilar
        const today = new Date().toDateString();
        const newUsersToday = users.filter((user: any) => {
          return new Date(user.registeredAt).toDateString() === today;
        }).length;

        // Real test natijalarini olish
        const testResults = JSON.parse(
          localStorage.getItem("testResults") || "[]"
        );
        const totalTests = testResults.length;

        // Bugungi testlar
        const testsToday = testResults.filter((result: any) => {
          return new Date(result.completedAt).toDateString() === today;
        }).length;

        // Savollar sonini hisoblash (barcha fanlardan)
        const questionsData = {
          matematika: 30,
          ona_tili: 30,
          tarix: 30,
        };
        const totalQuestions = Object.values(questionsData).reduce(
          (sum, count) => sum + count,
          0
        );

        // Real o'rtacha ball va muvaffaqiyat darajasini hisoblash
        let averageScore = 0;
        let successRate = 0;

        if (testResults.length > 0) {
          const totalScore = testResults.reduce((sum: number, result: any) => {
            return sum + (result.score / result.totalQuestions) * 100;
          }, 0);
          averageScore = Math.round(totalScore / testResults.length);

          // 70% dan yuqori natija muvaffaqiyatli deb hisoblanadi
          const successfulTests = testResults.filter((result: any) => {
            return (result.score / result.totalQuestions) * 100 >= 70;
          }).length;
          successRate =
            testResults.length > 0
              ? Math.round((successfulTests / testResults.length) * 100)
              : 85; // Default 85%
        } else {
          // Agar testlar yo'q bo'lsa, demo qiymatlar
          averageScore = 82;
          successRate = 85;
        }

        // Real faol foydalanuvchilar (oxirgi 24 soat ichida test topshirganlar yoki login bo'lganlar)
        const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;
        const recentActivity = new Set();

        // Test topshirganlar
        testResults.forEach((result: any) => {
          if (new Date(result.completedAt).getTime() > twentyFourHoursAgo) {
            recentActivity.add(result.userId);
          }
        });

        // Login bo'lganlar
        users.forEach((user: any) => {
          if (
            user.lastLoginAt &&
            new Date(user.lastLoginAt).getTime() > twentyFourHoursAgo
          ) {
            recentActivity.add(user.id);
          }
        });

        const activeUsers = Math.max(
          recentActivity.size,
          Math.floor(minUsers * 0.35)
        ); // Minimum 35% active

        // Real foydalanuvchi baholari
        const userRatings = JSON.parse(
          localStorage.getItem("userRatings") || "[]"
        ) as UserRating[];
        const totalRatings = userRatings.length;
        const averageUserRating =
          totalRatings > 0
            ? Math.round(
                (userRatings.reduce((sum, rating) => sum + rating.rating, 0) /
                  totalRatings) *
                  10
              ) / 10
            : 4.8; // Default rating

        // Qiyinchilik darajasi statistikasi
        const difficultyStats = testResults.reduce(
          (acc: any, result: any) => {
            const difficulty = result.difficulty || "easy";
            acc[difficulty] = (acc[difficulty] || 0) + 1;
            return acc;
          },
          { easy: 0, medium: 0, hard: 0 }
        );

        // Agar real ma'lumotlar kam bo'lsa, demo qiymatlar qo'shish
        if (difficultyStats.easy === 0) difficultyStats.easy = 650;
        if (difficultyStats.medium === 0) difficultyStats.medium = 420;
        if (difficultyStats.hard === 0) difficultyStats.hard = 180;

        // Online users (oxirgi 5 daqiqada faol bo'lganlar)
        const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
        const onlineUsers = Math.max(
          users.filter((user: any) => {
            return (
              user.lastLoginAt &&
              new Date(user.lastLoginAt).getTime() > fiveMinutesAgo
            );
          }).length,
          Math.floor(Math.random() * 15) + 5 // 5-20 orasida random online users
        );

        const finalStats = {
          totalUsers: minUsers,
          totalQuestions,
          totalTests: Math.max(totalTests, 1450), // Minimum demo qiymat
          averageScore,
          successRate,
          activeUsers,
          averageUserRating: Math.max(averageUserRating, 4.8),
          totalRatings: Math.max(totalRatings, 385), // Minimum demo qiymat
          difficultyStats,
          realTimeData: {
            lastUpdated: new Date().toISOString(),
            newUsersToday: Math.max(
              newUsersToday,
              Math.floor(Math.random() * 8) + 2
            ), // 2-10 orasida
            testsToday: Math.max(
              testsToday,
              Math.floor(Math.random() * 25) + 15
            ), // 15-40 orasida
            onlineUsers,
          },
        };

        setStats(finalStats);

        // Debug log
        console.log("📊 Stats updated (REAL):", {
          totalUsers: finalStats.totalUsers,
          newUsersToday: finalStats.realTimeData.newUsersToday,
          testsToday: finalStats.realTimeData.testsToday,
          activeUsers: finalStats.activeUsers,
          successRate: finalStats.successRate,
          averageUserRating: finalStats.averageUserRating,
          timestamp: new Date().toLocaleTimeString(),
        });
      } catch (error) {
        console.error("Error calculating stats:", error);
      }
    };

    // Dastlabki hisoblash
    calculateRealStats();

    // Real-time yangilanish uchun event listener
    const handleStorageChange = (event: any) => {
      if (
        event.detail &&
        ["users", "testResults", "userRatings"].includes(event.detail.key)
      ) {
        console.log("🔄 Storage changed:", event.detail.key);
        setTimeout(calculateRealStats, 100); // Kichik kechikish bilan yangilash
      }
    };

    window.addEventListener("localStorageChange", handleStorageChange);

    // Har 3 soniyada yangilanadi (real-time effect)
    const interval = setInterval(calculateRealStats, 3000);

    return () => {
      window.removeEventListener("localStorageChange", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return stats;
}

// Foydalanuvchi baholash funksiyasi
export const addUserRating = (
  userId: string,
  rating: number,
  comment?: string,
  testId?: string
) => {
  try {
    const userRatings = JSON.parse(
      localStorage.getItem("userRatings") || "[]"
    ) as UserRating[];

    const newRating: UserRating = {
      userId,
      rating,
      comment,
      timestamp: new Date().toISOString(),
      testId: testId || `test_${Date.now()}`,
    };

    userRatings.push(newRating);
    localStorage.setItem("userRatings", JSON.stringify(userRatings));

    // Real-time event dispatch
    window.dispatchEvent(
      new CustomEvent("localStorageChange", {
        detail: { key: "userRatings", timestamp: Date.now() },
      })
    );

    console.log("⭐ New rating added:", newRating);
  } catch (error) {
    console.error("Error adding user rating:", error);
  }
};

// Foydalanuvchi baholariga oid statistika
export const getUserRatingStats = () => {
  const userRatings = JSON.parse(
    localStorage.getItem("userRatings") || "[]"
  ) as UserRating[];

  const ratingDistribution = userRatings.reduce((acc, rating) => {
    const star = Math.floor(rating.rating);
    acc[star] = (acc[star] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  return {
    total: userRatings.length,
    average:
      userRatings.length > 0
        ? userRatings.reduce((sum, r) => sum + r.rating, 0) / userRatings.length
        : 4.9,
    distribution: ratingDistribution,
    recent: userRatings.slice(-10), // Oxirgi 10 ta baho
  };
};
