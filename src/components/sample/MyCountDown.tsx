import React, { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: Date;
}

export const MyCountDown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const formatTimeUnit = (time: number) => {
    return time < 10 ? `0${time}` : `${time}`;
  };

  return (
    <div className="countdown">
      <div className="countdown-unit">
        <div className="countdown-value-circle">
          <span className="countdown-value">
            {formatTimeUnit(timeLeft.days)}
          </span>
        </div>
        <span className="countdown-label">Days</span>
      </div>
      <div className="countdown-unit">
        <div className="countdown-value-circle">
          <span className="countdown-value">
            {formatTimeUnit(timeLeft.hours)}
          </span>
        </div>
        <span className="countdown-label">Hours</span>
      </div>
      <div className="countdown-unit">
        <div className="countdown-value-circle">
          <span className="countdown-value">
            {formatTimeUnit(timeLeft.minutes)}
          </span>
        </div>
        <span className="countdown-label">Minutes</span>
      </div>
      <div className="countdown-unit">
        <div className="countdown-value-circle">
          <span className="countdown-value">
            {formatTimeUnit(timeLeft.seconds)}
          </span>
        </div>
        <span className="countdown-label">Seconds</span>
      </div>
    </div>
  );
};
