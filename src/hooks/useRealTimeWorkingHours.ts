"use client";

import { useState, useEffect } from "react";

interface WorkingHoursStatus {
  isWorking: boolean;
  status: string;
  statusColor: string;
  statusIcon: string;
  nextWorkingTime: string;
  timeUntilWork: string;
}

export function useRealTimeWorkingHours(): WorkingHoursStatus {
  const [status, setStatus] = useState<WorkingHoursStatus>({
    isWorking: false,
    status: "Yuklanmoqda...",
    statusColor: "text-gray-500",
    statusIcon: "⏳",
    nextWorkingTime: "",
    timeUntilWork: "",
  });

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const hour = now.getHours();
      const minute = now.getMinutes();
      const currentTime = hour * 60 + minute; // Minutes since midnight

      // Working hours in minutes
      const weekdayStart = 9 * 60; // 9:00
      const weekdayEnd = 18 * 60; // 18:00
      const saturdayStart = 9 * 60; // 9:00
      const saturdayEnd = 14 * 60; // 14:00

      let isWorking = false;
      let statusText = "";
      let statusColor = "";
      let statusIcon = "";
      let nextWorkingTime = "";
      let timeUntilWork = "";

      if (day === 0) {
        // Sunday - closed
        isWorking = false;
        statusText = "Yakshanba - Dam olish kuni";
        statusColor = "text-red-600";
        statusIcon = "🔴";
        nextWorkingTime = "Dushanba 9:00";

        const mondayStart = new Date(now);
        mondayStart.setDate(now.getDate() + 1);
        mondayStart.setHours(9, 0, 0, 0);
        const timeDiff = mondayStart.getTime() - now.getTime();
        const hoursUntil = Math.floor(timeDiff / (1000 * 60 * 60));
        timeUntilWork = `${hoursUntil} soat`;
      } else if (day >= 1 && day <= 5) {
        // Monday to Friday
        if (currentTime >= weekdayStart && currentTime < weekdayEnd) {
          isWorking = true;
          statusText = "Hozir ishlaymiz";
          statusColor = "text-green-600";
          statusIcon = "🟢";

          const endTime = new Date(now);
          endTime.setHours(18, 0, 0, 0);
          const timeDiff = endTime.getTime() - now.getTime();
          const hoursUntil = Math.floor(timeDiff / (1000 * 60 * 60));
          const minutesUntil = Math.floor(
            (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
          );
          timeUntilWork = `${hoursUntil}:${minutesUntil
            .toString()
            .padStart(2, "0")} gacha`;
        } else if (currentTime < weekdayStart) {
          isWorking = false;
          statusText = "Ish vaqtidan oldin";
          statusColor = "text-orange-600";
          statusIcon = "🟡";
          nextWorkingTime = "Bugun 9:00";

          const startTime = new Date(now);
          startTime.setHours(9, 0, 0, 0);
          const timeDiff = startTime.getTime() - now.getTime();
          const hoursUntil = Math.floor(timeDiff / (1000 * 60 * 60));
          const minutesUntil = Math.floor(
            (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
          );
          timeUntilWork = `${hoursUntil}:${minutesUntil
            .toString()
            .padStart(2, "0")}`;
        } else {
          isWorking = false;
          statusText = "Ish vaqtidan keyin";
          statusColor = "text-orange-600";
          statusIcon = "🟡";

          if (day === 5) {
            nextWorkingTime = "Shanba 9:00";
          } else {
            nextWorkingTime = "Ertaga 9:00";
          }

          const nextDay = new Date(now);
          nextDay.setDate(now.getDate() + 1);
          nextDay.setHours(9, 0, 0, 0);
          const timeDiff = nextDay.getTime() - now.getTime();
          const hoursUntil = Math.floor(timeDiff / (1000 * 60 * 60));
          timeUntilWork = `${hoursUntil} soat`;
        }
      } else if (day === 6) {
        // Saturday
        if (currentTime >= saturdayStart && currentTime < saturdayEnd) {
          isWorking = true;
          statusText = "Hozir ishlaymiz (Shanba)";
          statusColor = "text-green-600";
          statusIcon = "🟢";

          const endTime = new Date(now);
          endTime.setHours(14, 0, 0, 0);
          const timeDiff = endTime.getTime() - now.getTime();
          const hoursUntil = Math.floor(timeDiff / (1000 * 60 * 60));
          const minutesUntil = Math.floor(
            (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
          );
          timeUntilWork = `${hoursUntil}:${minutesUntil
            .toString()
            .padStart(2, "0")} gacha`;
        } else if (currentTime < saturdayStart) {
          isWorking = false;
          statusText = "Ish vaqtidan oldin (Shanba)";
          statusColor = "text-orange-600";
          statusIcon = "🟡";
          nextWorkingTime = "Bugun 9:00";

          const startTime = new Date(now);
          startTime.setHours(9, 0, 0, 0);
          const timeDiff = startTime.getTime() - now.getTime();
          const hoursUntil = Math.floor(timeDiff / (1000 * 60 * 60));
          const minutesUntil = Math.floor(
            (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
          );
          timeUntilWork = `${hoursUntil}:${minutesUntil
            .toString()
            .padStart(2, "0")}`;
        } else {
          isWorking = false;
          statusText = "Shanba ish vaqti tugadi";
          statusColor = "text-red-600";
          statusIcon = "🔴";
          nextWorkingTime = "Dushanba 9:00";

          const mondayStart = new Date(now);
          mondayStart.setDate(now.getDate() + 2);
          mondayStart.setHours(9, 0, 0, 0);
          const timeDiff = mondayStart.getTime() - now.getTime();
          const hoursUntil = Math.floor(timeDiff / (1000 * 60 * 60));
          timeUntilWork = `${hoursUntil} soat`;
        }
      }

      setStatus({
        isWorking,
        status: statusText,
        statusColor,
        statusIcon,
        nextWorkingTime,
        timeUntilWork,
      });
    };

    // Update immediately
    updateStatus();

    // Update every minute
    const interval = setInterval(updateStatus, 60000);

    return () => clearInterval(interval);
  }, []);

  return status;
}
