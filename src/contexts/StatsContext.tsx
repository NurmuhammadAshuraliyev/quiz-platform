"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface StatsData {
  totalUsers: number
  activeUsers: number
  totalTests: number
  totalQuestions: number
  successRate: number
  averageUserRating: number
  totalRatings: number
  onlineUsers: number
  newUsersToday: number
  testsToday: number
  lastUpdated: string
}

interface StatsContextType {
  stats: StatsData
  updateStats: () => void
  addUserRating: (userId: string, rating: number, comment: string, testId: string) => void
}

const StatsContext = createContext<StatsContextType | undefined>(undefined)

export function StatsProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<StatsData>({
    totalUsers: 416,
    activeUsers: 89,
    totalTests: 1247,
    totalQuestions: 6000,
    successRate: 87,
    averageUserRating: 4.8,
    totalRatings: 156,
    onlineUsers: 1,
    newUsersToday: 1,
    testsToday: 0,
    lastUpdated: new Date().toISOString(),
  })

  const updateStats = () => {
    // Get real data from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const testResults = JSON.parse(localStorage.getItem("testResults") || "[]")
    const ratings = JSON.parse(localStorage.getItem("userRatings") || "[]")

    // Calculate real stats with base numbers
    const totalUsers = Math.max(users.length, 416)
    const totalTests = Math.max(testResults.length, 1247)
    const totalRatings = Math.max(ratings.length, 156)

    // Calculate success rate
    const passedTests = testResults.filter((result: any) => {
      const percentage = (result.score / result.totalQuestions) * 100
      return percentage >= 70
    }).length
    const successRate = testResults.length > 0 ? Math.round((passedTests / testResults.length) * 100) : 87

    // Calculate average rating
    const totalRating = ratings.reduce((sum: number, rating: any) => sum + rating.rating, 0)
    const averageRating = ratings.length > 0 ? Math.round((totalRating / ratings.length) * 10) / 10 : 4.8

    // Calculate today's stats
    const today = new Date().toDateString()
    const newUsersToday = Math.max(
      users.filter((user: any) => new Date(user.registeredAt).toDateString() === today).length,
      1,
    )
    const testsToday = testResults.filter((result: any) => new Date(result.completedAt).toDateString() === today).length

    // Generate dynamic online users (1-5 range)
    const baseOnline = 1
    const timeVariation = Math.sin((Date.now() / 60000) * Math.PI) * 2
    const onlineUsers = Math.max(1, Math.min(5, Math.round(baseOnline + timeVariation + Math.random())))

    setStats({
      totalUsers,
      activeUsers: Math.round(totalUsers * 0.21),
      totalTests,
      totalQuestions: 6000,
      successRate,
      averageUserRating: averageRating,
      totalRatings,
      onlineUsers,
      newUsersToday,
      testsToday,
      lastUpdated: new Date().toISOString(),
    })
  }

  const addUserRating = (userId: string, rating: number, comment: string, testId: string) => {
    const ratings = JSON.parse(localStorage.getItem("userRatings") || "[]")
    const newRating = {
      id: `rating_${Date.now()}`,
      userId,
      rating,
      comment,
      testId,
      timestamp: new Date().toISOString(),
    }
    ratings.push(newRating)
    localStorage.setItem("userRatings", JSON.stringify(ratings))
    updateStats()
  }

  useEffect(() => {
    // Initial update
    updateStats()

    // Update every 30 seconds
    const interval = setInterval(updateStats, 30000)

    // Listen for data changes
    const handleStorageChange = () => updateStats()
    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("localStorageChange", handleStorageChange)
    window.addEventListener("ratingsUpdated", handleStorageChange)

    return () => {
      clearInterval(interval)
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("localStorageChange", handleStorageChange)
      window.removeEventListener("ratingsUpdated", handleStorageChange)
    }
  }, [])

  return <StatsContext.Provider value={{ stats, updateStats, addUserRating }}>{children}</StatsContext.Provider>
}

export function useStats() {
  const context = useContext(StatsContext)
  if (context === undefined) {
    throw new Error("useStats must be used within a StatsProvider")
  }
  return context
}
