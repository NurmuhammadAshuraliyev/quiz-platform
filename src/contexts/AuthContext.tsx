"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  fullName: string
  name: string
  username: string
  email: string
  avatar?: string
  createdAt: string
  stats?: {
    testsCompleted: number
    averageScore: number
    totalTime: number
    rank: string
  }
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

interface RegisterData {
  fullName: string
  username: string
  email: string
  password: string
}

// Demo users database
const DEMO_USERS = [
  {
    email: "demo@test.uz",
    password: "demo123",
    userData: {
      id: "1",
      fullName: "Demo Foydalanuvchi",
      name: "Demo Foydalanuvchi",
      username: "demo_user",
      email: "demo@test.uz",
      avatar: "",
      createdAt: new Date().toISOString(),
      stats: {
        testsCompleted: 5,
        averageScore: 85,
        totalTime: 2400,
        rank: "O'rta",
      },
    },
  },
]

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setUser(userData)
      } catch (error) {
        console.error("Error parsing stored user data:", error)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check demo users first
      const demoUser = DEMO_USERS.find((u) => u.email === email && u.password === password)
      if (demoUser) {
        setUser(demoUser.userData)
        localStorage.setItem("user", JSON.stringify(demoUser.userData))
        setIsLoading(false)
        return true
      }

      // Check registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      const foundUser = registeredUsers.find((u: any) => u.email === email && u.password === password)

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        localStorage.setItem("user", JSON.stringify(userWithoutPassword))
        setIsLoading(false)
        return true
      }

      setIsLoading(false)
      return false
    } catch (error) {
      console.error("Login error:", error)
      setIsLoading(false)
      return false
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if user already exists
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      const userExists = registeredUsers.some(
        (u: any) => u.email === userData.email || u.username === userData.username,
      )

      if (userExists) {
        setIsLoading(false)
        return false
      }

      // Create new user
      const newUser: User & { password: string } = {
        id: Date.now().toString(),
        fullName: userData.fullName,
        name: userData.fullName,
        username: userData.username,
        email: userData.email,
        password: userData.password,
        avatar: "",
        createdAt: new Date().toISOString(),
        stats: {
          testsCompleted: 0,
          averageScore: 0,
          totalTime: 0,
          rank: "Yangi",
        },
      }

      // Save to registered users
      registeredUsers.push(newUser)
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers))

      // Set current user (without password)
      const { password: _, ...userWithoutPassword } = newUser
      setUser(userWithoutPassword)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))

      setIsLoading(false)
      return true
    } catch (error) {
      console.error("Registration error:", error)
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
