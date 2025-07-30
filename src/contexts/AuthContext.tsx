"use client"

import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react"

interface User {
  id: string
  username: string
  email: string
  fullName: string
  registeredAt: string
  lastLoginAt: string
  testCount: number
  averageScore: number
}

interface AuthToken {
  token: string
  expiresAt: number
  userId: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  register: (
    userData: Omit<User, "id" | "registeredAt" | "lastLoginAt" | "testCount" | "averageScore"> & { password: string },
  ) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
  updateUserStats: (userId: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const createToken = (userId: string): AuthToken => {
  return {
    token: `token_${userId}_${Date.now()}`,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    userId,
  }
}

const isTokenValid = (token: AuthToken): boolean => {
  return Date.now() < token.expiresAt
}

// FAQAT REAL USER HODISALARI UCHUN
const dispatchRealUserEvent = (key: string, action: string, username?: string) => {
  window.dispatchEvent(
    new CustomEvent("localStorageChange", {
      detail: { key, timestamp: Date.now() },
    }),
  )
  console.log(`✅ REAL USER ${action}:`, username || key)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const lastActivityRef = useRef<number>(Date.now())
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null)
  const tokenCheckTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const savedToken = localStorage.getItem("authToken")
        const savedUser = localStorage.getItem("currentUser")

        if (savedToken && savedUser) {
          const token: AuthToken = JSON.parse(savedToken)
          const userData: User = JSON.parse(savedUser)

          // Demo user emasligini tekshirish
          if (userData.username?.includes("demo_") || userData.id?.includes("demo_")) {
            clearAuthData()
            setIsLoading(false)
            return
          }

          if (isTokenValid(token)) {
            const updatedUser = {
              ...userData,
              lastLoginAt: new Date().toISOString(),
            }

            setUser(updatedUser)
            localStorage.setItem("currentUser", JSON.stringify(updatedUser))
            updateUserInStorage(updatedUser)

            lastActivityRef.current = Date.now()
            startActivityTracking()
            startTokenCheck()
          } else {
            clearAuthData()
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error)
        clearAuthData()
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const updateUserInStorage = (updatedUser: User) => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const userIndex = users.findIndex((u: User) => u.id === updatedUser.id)

      if (userIndex >= 0) {
        users[userIndex] = updatedUser
        localStorage.setItem("users", JSON.stringify(users))
        dispatchRealUserEvent("users", "updated", updatedUser.username)
      }
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  const updateUserStats = (userId: string) => {
    try {
      const testResults = JSON.parse(localStorage.getItem("testResults") || "[]")
      const userTests = testResults.filter((result: any) => result.userId === userId)

      if (userTests.length > 0) {
        const totalScore = userTests.reduce((sum: number, result: any) => {
          return sum + (result.score / result.totalQuestions) * 100
        }, 0)
        const averageScore = Math.round(totalScore / userTests.length)

        if (user && user.id === userId) {
          const updatedUser = {
            ...user,
            testCount: userTests.length,
            averageScore,
          }
          setUser(updatedUser)
          localStorage.setItem("currentUser", JSON.stringify(updatedUser))
          updateUserInStorage(updatedUser)
        }

        const users = JSON.parse(localStorage.getItem("users") || "[]")
        const userIndex = users.findIndex((u: User) => u.id === userId)

        if (userIndex >= 0) {
          users[userIndex] = {
            ...users[userIndex],
            testCount: userTests.length,
            averageScore,
          }
          localStorage.setItem("users", JSON.stringify(users))
          dispatchRealUserEvent("users", "stats updated", users[userIndex].username)
        }
      }
    } catch (error) {
      console.error("Error updating user stats:", error)
    }
  }

  const startActivityTracking = () => {
    const updateActivity = () => {
      lastActivityRef.current = Date.now()
    }

    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click", "focus"]
    events.forEach((event) => {
      document.addEventListener(event, updateActivity, true)
    })

    const checkInactivity = () => {
      const inactiveTime = Date.now() - lastActivityRef.current
      const thirtyMinutes = 30 * 60 * 1000

      if (inactiveTime > thirtyMinutes) {
        logout()
        alert("30 daqiqa faoliyatsizlik tufayli tizimdan chiqarildingiz.")
      }
    }

    inactivityTimerRef.current = setInterval(checkInactivity, 60000)

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, updateActivity, true)
      })
      if (inactivityTimerRef.current) {
        clearInterval(inactivityTimerRef.current)
      }
    }
  }

  const startTokenCheck = () => {
    const checkToken = () => {
      const savedToken = localStorage.getItem("authToken")
      if (savedToken) {
        try {
          const token: AuthToken = JSON.parse(savedToken)
          if (!isTokenValid(token)) {
            logout()
            alert("Sessiya muddati tugadi. Qayta kiring.")
          }
        } catch (error) {
          console.error("Token check error:", error)
          logout()
        }
      }
    }

    tokenCheckTimerRef.current = setInterval(checkToken, 5 * 60 * 1000)
  }

  const clearAuthData = () => {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("authToken")
    setUser(null)

    if (inactivityTimerRef.current) {
      clearInterval(inactivityTimerRef.current)
    }
    if (tokenCheckTimerRef.current) {
      clearInterval(tokenCheckTimerRef.current)
    }
  }

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const foundUser = users.find(
        (u: any) =>
          (u.username === username || u.email === username) &&
          u.password === password &&
          !u.username?.includes("demo_") &&
          !u.id?.includes("demo_"),
      )

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser

        const updatedUser: User = {
          ...userWithoutPassword,
          lastLoginAt: new Date().toISOString(),
        }

        const token = createToken(foundUser.id)

        localStorage.setItem("currentUser", JSON.stringify(updatedUser))
        localStorage.setItem("authToken", JSON.stringify(token))

        setUser(updatedUser)
        lastActivityRef.current = Date.now()

        updateUserInStorage(updatedUser)
        startActivityTracking()
        startTokenCheck()

        console.log("🔐 REAL USER logged in:", updatedUser.username)
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const register = async (
    userData: Omit<User, "id" | "registeredAt" | "lastLoginAt" | "testCount" | "averageScore"> & { password: string },
  ): Promise<boolean> => {
    try {
      // Demo username larni bloklash
      if (userData.username.includes("demo_") || userData.username.includes("test_")) {
        console.log("❌ Demo username blocked")
        return false
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]")

      const existingUser = users.find((u: any) => u.username === userData.username || u.email === userData.email)

      if (existingUser) {
        return false
      }

      const now = new Date().toISOString()
      const newUser: User & { password: string } = {
        ...userData,
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        registeredAt: now,
        lastLoginAt: now,
        testCount: 0,
        averageScore: 0,
      }

      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))

      const { password: _, ...userWithoutPassword } = newUser
      const token = createToken(newUser.id)

      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))
      localStorage.setItem("authToken", JSON.stringify(token))

      setUser(userWithoutPassword)
      lastActivityRef.current = Date.now()

      dispatchRealUserEvent("users", "registered", newUser.username)
      console.log("🎉 REAL USER registered:", newUser.username)

      startActivityTracking()
      startTokenCheck()

      return true
    } catch (error) {
      console.error("Register error:", error)
      return false
    }
  }

  const logout = () => {
    const currentUsername = user?.username
    clearAuthData()
    console.log("👋 REAL USER logged out:", currentUsername)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isLoading,
        updateUserStats,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
