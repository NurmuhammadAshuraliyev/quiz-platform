"use client"

import { useState, useEffect } from "react"
import type { LucideIcon } from "lucide-react"

interface StatsAnimatorProps {
  icon: LucideIcon
  value: number
  label: string
  suffix?: string
  color: string
  bgColor: string
  change: string
}

export default function StatsAnimator({
  icon: Icon,
  value,
  label,
  suffix = "",
  color,
  bgColor,
  change,
}: StatsAnimatorProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  return (
    <div
      className={`${bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 border border-white/20 backdrop-blur-sm relative overflow-hidden group`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Floating particles */}
      <div className="absolute top-2 right-2 w-1 h-1 bg-current rounded-full opacity-20 animate-ping"></div>
      <div
        className="absolute bottom-3 left-3 w-1 h-1 bg-current rounded-full opacity-30 animate-ping"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${color.replace("text-", "bg-").replace("-600", "-100")} shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${color.replace("text-", "bg-")} animate-pulse`}></div>
            <span className="text-xs text-gray-500 font-medium">Live</span>
          </div>
        </div>

        <div className="space-y-2">
          <div
            className={`text-3xl font-bold ${color} transition-all duration-300 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
          >
            {displayValue.toLocaleString()}
            {suffix}
          </div>
          <div className="text-sm font-medium text-gray-700 leading-tight">{label}</div>
          <div className="text-xs text-gray-500 flex items-center space-x-1">
            <div className={`w-1 h-1 rounded-full ${color.replace("text-", "bg-")} animate-pulse`}></div>
            <span>{change}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
