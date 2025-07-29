"use client";

import { useState, useEffect } from "react";

interface StatsAnimatorProps {
  targetValue: number;
  formatter?: (value: number) => string;
  duration?: number;
}

export default function StatsAnimator({
  targetValue,
  formatter = (value) => value.toString(),
  duration = 1000,
}: StatsAnimatorProps) {
  const [currentValue, setCurrentValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (targetValue === currentValue) return;

    setIsAnimating(true);
    const startValue = currentValue;
    const difference = targetValue - startValue;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const newValue = startValue + difference * easeOut;

      setCurrentValue(newValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentValue(targetValue);
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  }, [targetValue, currentValue, duration]);

  return (
    <span
      className={`tabular-nums transition-colors duration-300 ${
        isAnimating ? "text-green-600" : ""
      }`}
    >
      {formatter(Math.round(currentValue))}
    </span>
  );
}
