"use client"

import type { LucideIcon } from "lucide-react"

interface RealTimeIndicatorProps {
  icon: LucideIcon
  value: number
  label: string
  color: "green" | "blue" | "purple" | "orange" | "red"
}

export default function RealTimeIndicator({ icon: Icon, value, label, color }: RealTimeIndicatorProps) {
  const colorClasses = {
    green: "bg-green-100 text-green-700 border-green-200",
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    purple: "bg-purple-100 text-purple-700 border-purple-200",
    orange: "bg-orange-100 text-orange-700 border-orange-200",
    red: "bg-red-100 text-red-700 border-red-200",
  }

  const dotColors = {
    green: "bg-green-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
    red: "bg-red-500",
  }

  return (
    <div
      className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full shadow-lg border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${colorClasses[color]}`}
    >
      <div className={`w-2 h-2 rounded-full animate-pulse ${dotColors[color]}`}></div>
      <Icon className="w-4 h-4" />
      <span className="font-medium text-sm">
        {value} {label}
      </span>
    </div>
  )
}
