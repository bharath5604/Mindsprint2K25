'use client';
import { useState, useEffect } from 'react';

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState({
        days: '00', hours: '00', minutes: '00', seconds: '00'
    });

    useEffect(() => {
        const eventDate = new Date("December 11, 2025 09:00:00").getTime();
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = eventDate - now;

            if (distance < 0) {
                clearInterval(timer);
                // Handle event start
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({
                days: String(days).padStart(2, '0'),
                hours: String(hours).padStart(2, '0'),
                minutes: String(minutes).padStart(2, '0'),
                seconds: String(seconds).padStart(2, '0')
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="hero-badge countdown-container">
            <i className="fas fa-hourglass-start"></i>
            <span>Countdown</span>
            <div className="countdown-timer" id="countdown">
                <div className="time-unit"><span className="time-value">{timeLeft.days}</span><span className="time-label">Days</span></div>
                <div className="time-unit"><span className="time-value">{timeLeft.hours}</span><span className="time-label">Hours</span></div>
                <div className="time-unit"><span className="time-value">{timeLeft.minutes}</span><span className="time-label">Minutes</span></div>
                <div className="time-unit"><span className="time-value">{timeLeft.seconds}</span><span className="time-label">Seconds</span></div>
            </div>
        </div>
    );
}