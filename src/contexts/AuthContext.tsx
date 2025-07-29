"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  registeredAt: string;
  lastLoginAt: string;
  testCount: number;
  averageScore: number;
}

interface AuthToken {
  token: string;
  expiresAt: number;
  userId: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (
    userData: Omit<
      User,
      "id" | "registeredAt" | "lastLoginAt" | "testCount" | "averageScore"
    > & { password: string }
  ) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  updateUserStats: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Token yaratish funksiyasi
const createToken = (userId: string): AuthToken => {
  return {
    token: `token_${userId}_${Date.now()}`,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 soat
    userId,
  };
};

// Token tekshirish funksiyasi
const isTokenValid = (token: AuthToken): boolean => {
  return Date.now() < token.expiresAt;
};

// Real-time event dispatcher
const dispatchStorageEvent = (key: string) => {
  window.dispatchEvent(
    new CustomEvent("localStorageChange", {
      detail: { key, timestamp: Date.now() },
    })
  );
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const lastActivityRef = useRef<number>(Date.now());
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const tokenCheckTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sahifa yuklanganda authentication holatini tekshirish
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const savedToken = localStorage.getItem("authToken");
        const savedUser = localStorage.getItem("currentUser");

        if (savedToken && savedUser) {
          const token: AuthToken = JSON.parse(savedToken);
          const userData: User = JSON.parse(savedUser);

          // Token hali ham amal qiladimi tekshirish
          if (isTokenValid(token)) {
            // User ma'lumotlarini yangilash
            const updatedUser = {
              ...userData,
              lastLoginAt: new Date().toISOString(),
            };

            setUser(updatedUser);
            localStorage.setItem("currentUser", JSON.stringify(updatedUser));

            // Users ro'yxatini yangilash
            updateUserInStorage(updatedUser);

            lastActivityRef.current = Date.now();
            startActivityTracking();
            startTokenCheck();
          } else {
            // Token muddati tugagan
            clearAuthData();
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        clearAuthData();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // User ma'lumotlarini storage'da yangilash
  const updateUserInStorage = (updatedUser: User) => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userIndex = users.findIndex((u: User) => u.id === updatedUser.id);

      if (userIndex >= 0) {
        users[userIndex] = updatedUser;
        localStorage.setItem("users", JSON.stringify(users));
        dispatchStorageEvent("users");
      }
    } catch (error) {
      console.error("Error updating user in storage:", error);
    }
  };

  // User statistikalarini yangilash
  const updateUserStats = (userId: string) => {
    try {
      const testResults = JSON.parse(
        localStorage.getItem("testResults") || "[]"
      );
      const userTests = testResults.filter(
        (result: any) => result.userId === userId
      );

      if (userTests.length > 0) {
        const totalScore = userTests.reduce((sum: number, result: any) => {
          return sum + (result.score / result.totalQuestions) * 100;
        }, 0);
        const averageScore = Math.round(totalScore / userTests.length);

        // Current user yangilash
        if (user && user.id === userId) {
          const updatedUser = {
            ...user,
            testCount: userTests.length,
            averageScore,
          };
          setUser(updatedUser);
          localStorage.setItem("currentUser", JSON.stringify(updatedUser));
          updateUserInStorage(updatedUser);
        }

        // Users ro'yxatidagi user ma'lumotlarini yangilash
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const userIndex = users.findIndex((u: User) => u.id === userId);

        if (userIndex >= 0) {
          users[userIndex] = {
            ...users[userIndex],
            testCount: userTests.length,
            averageScore,
          };
          localStorage.setItem("users", JSON.stringify(users));
          dispatchStorageEvent("users");
        }
      }
    } catch (error) {
      console.error("Error updating user stats:", error);
    }
  };

  // Faollik kuzatuvini boshlash
  const startActivityTracking = () => {
    const updateActivity = () => {
      lastActivityRef.current = Date.now();
    };

    // User faollik hodisalari
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
      "focus",
    ];
    events.forEach((event) => {
      document.addEventListener(event, updateActivity, true);
    });

    // 30 daqiqa faoliyatsizlik tekshiruvi
    const checkInactivity = () => {
      const inactiveTime = Date.now() - lastActivityRef.current;
      const thirtyMinutes = 30 * 60 * 1000; // 30 daqiqa

      if (inactiveTime > thirtyMinutes) {
        logout();
        alert(
          "30 daqiqa faoliyatsizlik tufayli tizimdan chiqarildingiz. Iltimos, qayta kiring."
        );
      }
    };

    // Har daqiqada tekshirish
    inactivityTimerRef.current = setInterval(checkInactivity, 60000);

    // Cleanup function
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, updateActivity, true);
      });
      if (inactivityTimerRef.current) {
        clearInterval(inactivityTimerRef.current);
      }
    };
  };

  // Token amal qilish muddatini tekshirish
  const startTokenCheck = () => {
    const checkToken = () => {
      const savedToken = localStorage.getItem("authToken");
      if (savedToken) {
        try {
          const token: AuthToken = JSON.parse(savedToken);
          if (!isTokenValid(token)) {
            logout();
            alert("Sessiya muddati tugadi. Iltimos, qayta kiring.");
          }
        } catch (error) {
          console.error("Token check error:", error);
          logout();
        }
      }
    };

    // Har 5 daqiqada token tekshirish
    tokenCheckTimerRef.current = setInterval(checkToken, 5 * 60 * 1000);
  };

  // Authentication ma'lumotlarini tozalash
  const clearAuthData = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
    setUser(null);

    if (inactivityTimerRef.current) {
      clearInterval(inactivityTimerRef.current);
    }
    if (tokenCheckTimerRef.current) {
      clearInterval(tokenCheckTimerRef.current);
    }
  };

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const foundUser = users.find(
        (u: any) =>
          (u.username === username || u.email === username) &&
          u.password === password
      );

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;

        // Login vaqtini yangilash
        const updatedUser: User = {
          ...userWithoutPassword,
          lastLoginAt: new Date().toISOString(),
        };

        const token = createToken(foundUser.id);

        // Ma'lumotlarni saqlash
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        localStorage.setItem("authToken", JSON.stringify(token));

        setUser(updatedUser);
        lastActivityRef.current = Date.now();

        // Users ro'yxatini yangilash
        updateUserInStorage(updatedUser);

        // Kuzatuvlarni boshlash
        startActivityTracking();
        startTokenCheck();

        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (
    userData: Omit<
      User,
      "id" | "registeredAt" | "lastLoginAt" | "testCount" | "averageScore"
    > & { password: string }
  ): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      const existingUser = users.find(
        (u: any) =>
          u.username === userData.username || u.email === userData.email
      );

      if (existingUser) {
        return false;
      }

      const now = new Date().toISOString();
      const newUser: User & { password: string } = {
        ...userData,
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        registeredAt: now,
        lastLoginAt: now,
        testCount: 0,
        averageScore: 0,
      };

      // Users ro'yxatiga qo'shish
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      const { password: _, ...userWithoutPassword } = newUser;
      const token = createToken(newUser.id);

      // Ma'lumotlarni saqlash
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
      localStorage.setItem("authToken", JSON.stringify(token));

      setUser(userWithoutPassword);
      lastActivityRef.current = Date.now();

      // Real-time event dispatch
      dispatchStorageEvent("users");

      // Kuzatuvlarni boshlash
      startActivityTracking();
      startTokenCheck();

      // Registration event log
      const registrationEvents = JSON.parse(
        localStorage.getItem("registrationEvents") || "[]"
      );
      registrationEvents.push({
        userId: newUser.id,
        timestamp: now,
        type: "user_registered",
      });
      localStorage.setItem(
        "registrationEvents",
        JSON.stringify(registrationEvents)
      );
      dispatchStorageEvent("registrationEvents");

      return true;
    } catch (error) {
      console.error("Register error:", error);
      return false;
    }
  };

  const logout = () => {
    clearAuthData();
    dispatchStorageEvent("logout");
  };

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
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
