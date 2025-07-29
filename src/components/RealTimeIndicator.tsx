"use client";

import { useState, useEffect } from "react";
import { Activity, Users, TrendingUp } from "lucide-react";
import { useDynamicStats } from "../hooks/useDynamicStats";

export default function RealTimeIndicator() {
  const [isVisible, setIsVisible] = useState(true);
  const dynamicStats = useDynamicStats();

  useEffect(() => {
    // Auto-hide after 10 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-sm">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-gray-900">
            Real-time yangilanish
          </span>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Users size={12} />
              <span>Online foydalanuvchilar</span>
            </div>
            <span className="font-semibold text-green-600">
              {dynamicStats.realTimeData.onlineUsers}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Activity size={12} />
              <span>Bugun yangi userlar</span>
            </div>
            <span className="font-semibold text-blue-600">
              +{dynamicStats.realTimeData.newUsersToday}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <TrendingUp size={12} />
              <span>Bugun testlar</span>
            </div>
            <span className="font-semibold text-purple-600">
              +{dynamicStats.realTimeData.testsToday}
            </span>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-gray-100 text-xs text-gray-500">
          Oxirgi yangilanish:{" "}
          {new Date(dynamicStats.realTimeData.lastUpdated).toLocaleTimeString(
            "uz-UZ"
          )}
        </div>
      </div>
    </div>
  );
}
