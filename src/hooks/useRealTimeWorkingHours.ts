"use client"

import { useState, useEffect } from "react"

interface WorkingHoursStatus {
  status: string
  statusColor: string
  statusIcon: string
  nextWorkingTime?: string
  timeUntilWork?: string
}

export function useRealTimeWorkingHours(): WorkingHoursStatus {
  const [status, setStatus] = useState<WorkingHoursStatus>({
    status: "Yuklanmoqda...",
    statusColor: "text-gray-500",
    statusIcon: "⏳",
  })

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date()
      const currentHour = now.getHours()
      const currentDay = now.getDay() // 0 = Sunday, 1 = Monday, etc.
      const currentMinute = now.getMinutes()

      let newStatus: WorkingHoursStatus

      // Sunday = 0, Saturday = 6
      if (currentDay === 0) {
        // Sunday - Dam olish kuni
        newStatus = {
          status: "Dam olish kuni",
          statusColor: "text-red-600",
          statusIcon: "🔴",
          nextWorkingTime: "Dushanba 9:00",
          timeUntilWork: getTimeUntil(1, 9, 0), // Monday 9:00
        }
      } else if (currentDay === 6) {
        // Saturday
        if (currentHour >= 9 && currentHour < 14) {
          newStatus = {
            status: "Hozir ishlaymiz",
            statusColor: "text-green-600",
            statusIcon: "🟢",
          }
        } else if (currentHour < 9) {
          newStatus = {
            status: "Hali ishlamayapmiz",
            statusColor: "text-yellow-600",
            statusIcon: "🟡",
            nextWorkingTime: "Bugun 9:00",
            timeUntilWork: getTimeUntil(6, 9, 0),
          }
        } else {
          newStatus = {
            status: "Ish vaqti tugadi",
            statusColor: "text-red-600",
            statusIcon: "🔴",
            nextWorkingTime: "Dushanba 9:00",
            timeUntilWork: getTimeUntil(1, 9, 0),
          }
        }
      } else {
        // Monday to Friday
        if (currentHour >= 9 && currentHour < 18) {
          newStatus = {
            status: "Hozir ishlaymiz",
            statusColor: "text-green-600",
            statusIcon: "🟢",
          }
        } else if (currentHour < 9) {
          newStatus = {
            status: "Hali ishlamayapmiz",
            statusColor: "text-yellow-600",
            statusIcon: "🟡",
            nextWorkingTime: "Bugun 9:00",
            timeUntilWork: getTimeUntil(currentDay, 9, 0),
          }
        } else {
          // After 18:00
          const nextDay = currentDay === 5 ? 6 : currentDay + 1 // If Friday, next is Saturday
          const nextHour = nextDay === 6 ? 9 : 9 // Saturday starts at 9, weekdays at 9

          newStatus = {
            status: "Ish vaqti tugadi",
            statusColor: "text-red-600",
            statusIcon: "🔴",
            nextWorkingTime: nextDay === 6 ? "Ertaga 9:00" : "Ertaga 9:00",
            timeUntilWork: getTimeUntil(nextDay, nextHour, 0),
          }
        }
      }

      setStatus(newStatus)
    }

    const getTimeUntil = (targetDay: number, targetHour: number, targetMinute: number): string => {
      const now = new Date()
      const target = new Date()

      // Set target day
      const daysUntilTarget = (targetDay - now.getDay() + 7) % 7
      target.setDate(now.getDate() + daysUntilTarget)
      target.setHours(targetHour, targetMinute, 0, 0)

      // If target is today but time has passed, move to next week
      if (daysUntilTarget === 0 && target <= now) {
        target.setDate(target.getDate() + 7)
      }

      const diff = target.getTime() - now.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

      if (hours > 24) {
        const days = Math.floor(hours / 24)
        const remainingHours = hours % 24
        return `${days} kun ${remainingHours} soat`
      } else if (hours > 0) {
        return `${hours} soat ${minutes} daqiqa`
      } else {
        return `${minutes} daqiqa`
      }
    }

    // Initial update
    updateStatus()

    // Update every minute
    const interval = setInterval(updateStatus, 60000)

    return () => clearInterval(interval)
  }, [])

  return status
}
