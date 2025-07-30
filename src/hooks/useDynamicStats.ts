"use client"

import { useState, useEffect } from "react"

interface DynamicStats {
  totalUsers: number
  totalQuestions: number
  totalTests: number
  averageScore: number
  successRate: number
  activeUsers: number
  averageUserRating: number
  totalRatings: number
  difficultyStats: {
    easy: number
    medium: number
    hard: number
  }
  realTimeData: {
    lastUpdated: string
    newUsersToday: number
    testsToday: number
    onlineUsers: number
  }
}

interface UserRating {
  userId: string
  rating: number
  comment?: string
  timestamp: string
  testId: string
}

// BUTUNLAY TOZA TIZIM - NOL'DAN BOSHLASH
export function useDynamicStats(): DynamicStats {
  const [stats, setStats] = useState<DynamicStats>({
    totalUsers: 0,
    totalQuestions: 90, // Faqat mavjud savollar soni
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
  })

  useEffect(() => {
    const calculatePureRealStats = () => {
      try {
        // FAQAT REAL ma'lumotlarni o'qish
        const users = JSON.parse(localStorage.getItem("users") || "[]")
        const testResults = JSON.parse(localStorage.getItem("testResults") || "[]")
        const userRatings = JSON.parse(localStorage.getItem("userRatings") || "[]") as UserRating[]

        // Demo userlarni filtrlash - faqat real userlar
        const realUsers = users.filter(
          (user: any) =>
            !user.username?.includes("demo_") && !user.username?.includes("test_") && !user.id?.includes("demo_"),
        )

        // Demo testlarni filtrlash - faqat real testlar
        const realTestResults = testResults.filter((result: any) => {
          const user = realUsers.find((u: any) => u.id === result.userId)
          return user !== undefined
        })

        // Demo ratinglarni filtrlash - faqat real ratinglar
        const realUserRatings = userRatings.filter((rating: UserRating) => {
          const user = realUsers.find((u: any) => u.id === rating.userId)
          return user !== undefined
        })

        // Bugungi sana
        const today = new Date().toDateString()

        // FAQAT REAL statistikalar
        const totalUsers = realUsers.length
        const totalTests = realTestResults.length
        const totalRatings = realUserRatings.length

        // Bugungi real userlar
        const newUsersToday = realUsers.filter((user: any) => {
          return new Date(user.registeredAt).toDateString() === today
        }).length

        // Bugungi real testlar
        const testsToday = realTestResults.filter((result: any) => {
          return new Date(result.completedAt).toDateString() === today
        }).length

        // Real o'rtacha ball
        let averageScore = 0
        let successRate = 0

        if (realTestResults.length > 0) {
          const totalScore = realTestResults.reduce((sum: number, result: any) => {
            return sum + (result.score / result.totalQuestions) * 100
          }, 0)
          averageScore = Math.round(totalScore / realTestResults.length)

          const successfulTests = realTestResults.filter((result: any) => {
            return (result.score / result.totalQuestions) * 100 >= 70
          }).length
          successRate = Math.round((successfulTests / realTestResults.length) * 100)
        }

        // Real faol userlar (oxirgi 24 soat)
        const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000
        const activeUserIds = new Set()

        realTestResults.forEach((result: any) => {
          if (new Date(result.completedAt).getTime() > twentyFourHoursAgo) {
            activeUserIds.add(result.userId)
          }
        })

        realUsers.forEach((user: any) => {
          if (user.lastLoginAt && new Date(user.lastLoginAt).getTime() > twentyFourHoursAgo) {
            activeUserIds.add(user.id)
          }
        })

        const activeUsers = activeUserIds.size

        // Real online userlar (oxirgi 5 daqiqa)
        const fiveMinutesAgo = Date.now() - 5 * 60 * 1000
        const onlineUsers = realUsers.filter((user: any) => {
          return user.lastLoginAt && new Date(user.lastLoginAt).getTime() > fiveMinutesAgo
        }).length

        // Real user rating
        const averageUserRating =
          totalRatings > 0
            ? Math.round((realUserRatings.reduce((sum, rating) => sum + rating.rating, 0) / totalRatings) * 10) / 10
            : 0

        // Real qiyinchilik statistikasi
        const difficultyStats = realTestResults.reduce(
          (acc: any, result: any) => {
            const difficulty = result.difficulty || "easy"
            acc[difficulty] = (acc[difficulty] || 0) + 1
            return acc
          },
          { easy: 0, medium: 0, hard: 0 },
        )

        const newStats = {
          totalUsers,
          totalQuestions: 90,
          totalTests,
          averageScore,
          successRate,
          activeUsers,
          averageUserRating,
          totalRatings,
          difficultyStats,
          realTimeData: {
            lastUpdated: new Date().toISOString(),
            newUsersToday,
            testsToday,
            onlineUsers,
          },
        }

        setStats(newStats)

        // Faqat real ma'lumotlar bo'lganda log
        if (totalUsers > 0 || totalTests > 0 || totalRatings > 0) {
          console.log("📊 PURE Real Stats:", {
            realUsers: totalUsers,
            realTests: totalTests,
            realRatings: totalRatings,
            newToday: newUsersToday,
            testsToday,
            onlineNow: onlineUsers,
          })
        } else {
          console.log("📊 Clean slate - No real data yet")
        }
      } catch (error) {
        console.error("Error calculating pure stats:", error)
      }
    }

    // Dastlabki hisoblash
    calculatePureRealStats()

    // Faqat real storage o'zgarishlarini kuzatish
    const handleRealStorageChange = (event: any) => {
      if (event.detail && ["users", "testResults", "userRatings"].includes(event.detail.key)) {
        console.log("🔄 Real data changed:", event.detail.key)
        calculatePureRealStats()
      }
    }

    window.addEventListener("localStorageChange", handleRealStorageChange)

    return () => {
      window.removeEventListener("localStorageChange", handleRealStorageChange)
    }
  }, [])

  return stats
}

// FAQAT REAL USER RATING
export const addUserRating = (userId: string, rating: number, comment?: string, testId?: string) => {
  try {
    // Avval user real ekanligini tekshirish
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((u: any) => u.id === userId)

    if (!user || user.username?.includes("demo_") || user.id?.includes("demo_")) {
      console.log("❌ Demo user rating blocked")
      return
    }

    const userRatings = JSON.parse(localStorage.getItem("userRatings") || "[]") as UserRating[]

    const newRating: UserRating = {
      userId,
      rating,
      comment,
      timestamp: new Date().toISOString(),
      testId: testId || `test_${Date.now()}`,
    }

    userRatings.push(newRating)
    localStorage.setItem("userRatings", JSON.stringify(userRatings))

    // Real event dispatch
    window.dispatchEvent(
      new CustomEvent("localStorageChange", {
        detail: { key: "userRatings", timestamp: Date.now() },
      }),
    )

    console.log("⭐ REAL user rating added:", rating)
  } catch (error) {
    console.error("Error adding rating:", error)
  }
}

// DEMO MA'LUMOTLARNI TOZALASH FUNKSIYASI
export const clearAllDemoData = () => {
  try {
    // Barcha demo userlarni o'chirish
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const realUsers = users.filter(
      (user: any) =>
        !user.username?.includes("demo_") && !user.username?.includes("test_") && !user.id?.includes("demo_"),
    )
    localStorage.setItem("users", JSON.stringify(realUsers))

    // Demo testlarni o'chirish
    const testResults = JSON.parse(localStorage.getItem("testResults") || "[]")
    const realTestResults = testResults.filter((result: any) => {
      const user = realUsers.find((u: any) => u.id === result.userId)
      return user !== undefined
    })
    localStorage.setItem("testResults", JSON.stringify(realTestResults))

    // Demo ratinglarni o'chirish
    const userRatings = JSON.parse(localStorage.getItem("userRatings") || "[]")
    const realUserRatings = userRatings.filter((rating: any) => {
      const user = realUsers.find((u: any) => u.id === rating.userId)
      return user !== undefined
    })
    localStorage.setItem("userRatings", JSON.stringify(realUserRatings))

    // Event dispatch
    window.dispatchEvent(
      new CustomEvent("localStorageChange", {
        detail: { key: "users", timestamp: Date.now() },
      }),
    )

    console.log("🧹 All demo data cleared! Clean slate ready.")
  } catch (error) {
    console.error("Error clearing demo data:", error)
  }
}

export const getUserRatingStats = () => {
  const userRatings = JSON.parse(localStorage.getItem("userRatings") || "[]") as UserRating[]

  // Faqat real userlarning ratinglari
  const users = JSON.parse(localStorage.getItem("users") || "[]")
  const realUserRatings = userRatings.filter((rating: UserRating) => {
    const user = users.find((u: any) => u.id === rating.userId)
    return user && !user.username?.includes("demo_") && !user.id?.includes("demo_")
  })

  const ratingDistribution = realUserRatings.reduce(
    (acc, rating) => {
      const star = Math.floor(rating.rating)
      acc[star] = (acc[star] || 0) + 1
      return acc
    },
    {} as Record<number, number>,
  )

  return {
    total: realUserRatings.length,
    average:
      realUserRatings.length > 0 ? realUserRatings.reduce((sum, r) => sum + r.rating, 0) / realUserRatings.length : 0,
    distribution: ratingDistribution,
    recent: realUserRatings.slice(-10),
  }
}
