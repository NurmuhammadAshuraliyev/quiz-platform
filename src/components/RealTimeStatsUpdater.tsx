"use client"

import { useEffect } from "react"
import { useDynamicStats } from "../hooks/useDynamicStats"

export default function RealTimeStatsUpdater() {
  const stats = useDynamicStats()

  useEffect(() => {
    // Update page title with real-time stats
    document.title = `Akam Quiz - ${stats.realTimeData.onlineUsers} online`

    // Update favicon based on activity
    const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement
    if (favicon) {
      // You could change favicon based on activity level
      if (stats.realTimeData.onlineUsers > 200) {
        // High activity - could use green favicon
      }
    }

    // Dispatch global stats update event
    window.dispatchEvent(
      new CustomEvent("statsUpdated", {
        detail: stats,
      }),
    )
  }, [stats])

  return null // This component doesn't render anything
}
