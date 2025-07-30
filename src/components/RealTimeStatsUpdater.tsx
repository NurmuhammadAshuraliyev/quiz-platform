"use client"

import { useEffect } from "react"
import { clearAllDemoData } from "../hooks/useDynamicStats"

export default function RealTimeStatsUpdater() {
  useEffect(() => {
    // Sahifa yuklanganda demo ma'lumotlarni tozalash
    const initializeCleanSystem = () => {
      // Faqat development muhitida demo ma'lumotlarni tozalash
      if (process.env.NODE_ENV === "development") {
        clearAllDemoData()
      }
    }

    // Dastlabki tozalash
    initializeCleanSystem()

    // Faqat real hodisalarni kuzatish
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "users" || event.key === "testResults" || event.key === "userRatings") {
        window.dispatchEvent(
          new CustomEvent("localStorageChange", {
            detail: { key: event.key, timestamp: Date.now() },
          }),
        )
        console.log(`📊 Real data event: ${event.key}`)
      }
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  return null
}
