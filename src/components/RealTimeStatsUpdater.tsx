"use client";

import { useEffect } from "react";

export default function RealTimeStatsUpdater() {
  useEffect(() => {
    // Har 5 soniyada localStorage'ni yangilash (demo uchun)
    const interval = setInterval(() => {
      // Random yangi user qo'shish (demo)
      if (Math.random() < 0.3) {
        // 30% ehtimol
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const newUser = {
          id: `demo_user_${Date.now()}`,
          username: `user${Date.now()}`,
          email: `user${Date.now()}@demo.com`,
          fullName: `Demo User ${Date.now()}`,
          registeredAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          testCount: 0,
          averageScore: 0,
        };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        // Event dispatch
        window.dispatchEvent(
          new CustomEvent("localStorageChange", {
            detail: { key: "users", timestamp: Date.now() },
          })
        );

        console.log("🆕 Demo user added:", newUser.username);
      }

      // Random test natijasi qo'shish (demo)
      if (Math.random() < 0.2) {
        // 20% ehtimol
        const testResults = JSON.parse(
          localStorage.getItem("testResults") || "[]"
        );
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        if (users.length > 0) {
          const randomUser = users[Math.floor(Math.random() * users.length)];
          const difficulties = ["easy", "medium", "hard"];
          const subjects = ["matematika", "ona_tili", "tarix"];

          const newResult = {
            id: `demo_test_${Date.now()}`,
            testType: "dtm",
            subjects: [subjects[Math.floor(Math.random() * subjects.length)]],
            score: Math.floor(Math.random() * 20) + 10, // 10-30 orasida
            totalQuestions: 30,
            completedAt: new Date().toISOString(),
            userId: randomUser.id,
            timeSpent: Math.floor(Math.random() * 1800) + 600, // 10-40 daqiqa
            totalTimeGiven: 3600,
            difficulty:
              difficulties[Math.floor(Math.random() * difficulties.length)],
          };

          testResults.push(newResult);
          localStorage.setItem("testResults", JSON.stringify(testResults));

          // Event dispatch
          window.dispatchEvent(
            new CustomEvent("localStorageChange", {
              detail: { key: "testResults", timestamp: Date.now() },
            })
          );

          console.log(
            "📝 Demo test result added:",
            newResult.score + "/" + newResult.totalQuestions
          );
        }
      }

      // Random user rating qo'shish (demo)
      if (Math.random() < 0.15) {
        // 15% ehtimol
        const userRatings = JSON.parse(
          localStorage.getItem("userRatings") || "[]"
        );
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        if (users.length > 0) {
          const randomUser = users[Math.floor(Math.random() * users.length)];
          const ratings = [4.5, 4.6, 4.7, 4.8, 4.9, 5.0]; // Yuqori baholar

          const newRating = {
            userId: randomUser.id,
            rating: ratings[Math.floor(Math.random() * ratings.length)],
            comment: "Juda yaxshi platforma!",
            timestamp: new Date().toISOString(),
            testId: `test_${Date.now()}`,
          };

          userRatings.push(newRating);
          localStorage.setItem("userRatings", JSON.stringify(userRatings));

          // Event dispatch
          window.dispatchEvent(
            new CustomEvent("localStorageChange", {
              detail: { key: "userRatings", timestamp: Date.now() },
            })
          );

          console.log("⭐ Demo rating added:", newRating.rating);
        }
      }
    }, 8000); // Har 8 soniyada

    return () => clearInterval(interval);
  }, []);

  return null; // Bu komponent hech narsa render qilmaydi
}
