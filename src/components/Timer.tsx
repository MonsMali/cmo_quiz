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
        }, 1000);

        return () => clearInterval(interval);
    }, [isActive, timeLeft, onTimeUp]);

    // Calculate circle properties
    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const progress = timeLeft / duration;
    const strokeDashoffset = circumference * (1 - progress);

    // Determine color based on time left
    const getColor = () => {
        if (timeLeft <= 5) return '#f43f5e'; // coral/red
        if (timeLeft <= 10) return '#f59e0b'; // amber
        return '#0ea5e9'; // ocean blue
    };

    const isWarning = timeLeft <= 5;

    return (
        <div className={`flex items-center gap-2 ${isWarning ? 'timer-warning' : ''}`}>
            <div className="relative w-14 h-14">
                {/* Background circle */}
                <svg className="w-14 h-14 transform -rotate-90">
                    <circle
                        cx="28"
                        cy="28"
                        r={radius}
                        stroke="#e0f2fe"
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
                        className={`text-lg font-bold ${isWarning ? 'text-coral-500' : 'text-ocean-600'}`}
                    >
                        {timeLeft}
                    </span>
                </div>
            </div>
        </div>
    );
}
