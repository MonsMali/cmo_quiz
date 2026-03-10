'use client';

import { useEffect, useState, useRef } from 'react';

interface TimerProps {
    duration: number; // in seconds
    onTimeUp: () => void;
    isActive: boolean;
    resetKey: number; // Change this to reset the timer
}

export default function Timer({ duration, onTimeUp, isActive, resetKey }: TimerProps) {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [tick, setTick] = useState(false);
    const onTimeUpRef = useRef(onTimeUp);

    // Keep ref current without restarting the interval
    useEffect(() => {
        onTimeUpRef.current = onTimeUp;
    }, [onTimeUp]);

    // Reset timer when resetKey changes
    useEffect(() => {
        setTimeLeft(duration);
    }, [resetKey, duration]);

    // Countdown logic — stable deps, no restarts mid-countdown
    useEffect(() => {
        if (!isActive) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onTimeUpRef.current();
                    return 0;
                }
                // Trigger tick animation for last 5 seconds
                if (prev <= 6) {
                    setTick(true);
                    setTimeout(() => setTick(false), 300);
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isActive, resetKey]);

    // Calculate circle properties
    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const progress = timeLeft / duration;
    const strokeDashoffset = circumference * (1 - progress);

    // Updated colors for Mediterranean palette
    const getColor = () => {
        if (timeLeft <= 5) return '#e07a5f';  // coral-500 (warm red)
        if (timeLeft <= 10) return '#e4bc6a'; // sand-400 (amber)
        return '#14b0e6';                      // ocean-500 (blue)
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
                        className={`text-lg font-bold ${tick ? 'timer-tick' : ''} ${isWarning ? 'text-coral-500' : 'text-ocean-600'}`}
                    >
                        {timeLeft}
                    </span>
                </div>
            </div>
        </div>
    );
}
