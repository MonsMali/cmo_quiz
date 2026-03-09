'use client';

import { useEffect, useState, useCallback } from 'react';

interface TimerProps {
    duration: number; // in seconds
    onTimeUp: () => void;
    isActive: boolean;
    resetKey: number; // Change this to reset the timer
}

export default function Timer({ duration, onTimeUp, isActive, resetKey }: TimerProps) {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [tick, setTick] = useState(false);

    // Reset timer when resetKey changes
    useEffect(() => {
        setTimeLeft(duration);
    }, [resetKey, duration]);

    // Countdown logic
    useEffect(() => {
        if (!isActive || timeLeft <= 0) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onTimeUp();
                    return 0;
                }
                return prev - 1;
            });
            // Trigger tick animation for last 5 seconds
            if (timeLeft <= 6) {
                setTick(true);
                setTimeout(() => setTick(false), 300);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isActive, timeLeft, onTimeUp]);

    // Calculate circle properties
    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const progress = timeLeft / duration;
    const strokeDashoffset = circumference * (1 - progress);

    // Updated colors for Mediterranean palette
    const getColor = () => {
        if (timeLeft <= 5) return '#e07a5f';  // coral-500 (warm red)
        if (timeLeft <= 10) return '#e4bc6a'; // sand-400 (amber)
        return '#14b8a6';                      // ocean-500 (teal)
    };

    const isWarning = timeLeft <= 5;
    const isUrgent = timeLeft <= 10;

    return (
        <div className={`flex items-center gap-2 ${isWarning ? 'timer-warning' : ''} ${isUrgent ? 'timer-urgent' : ''}`}>
            <div className="relative w-14 h-14">
                {/* Background circle */}
                <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 56 56">
                    <circle
                        cx="28"
                        cy="28"
                        r={radius}
                        stroke="#ccfbf1"
                        strokeWidth="4"
                        fill="transparent"
                    />
                    {/* Progress circle */}
                    <circle
                        cx="28"
                        cy="28"
                        r={radius}
                        stroke={getColor()}
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="timer-ring"
                    />
                </svg>
                {/* Time text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span
                        className={`text-lg font-bold ${tick ? 'timer-tick' : ''} ${isWarning ? 'text-coral-500' : 'text-ocean-600'}`}
                    >
                        {timeLeft}
                    </span>
                </div>
            </div>
        </div>
    );
}
