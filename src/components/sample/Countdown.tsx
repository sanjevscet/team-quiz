import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CountdownTimer: React.FC = () => {
  const [count, setCount] = useState(120);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const getProgressBarColor = (value: number): string => {
    if (value >= 90) {
      return "#00AB12"; // Green
    } else if (value >= 30) {
      return "#ffa500"; // Orange
    } else {
      return "#ff0000"; // Red
    }
  };

  return (
    <div>
      {/* <h1>Countdown: {count}</h1> */}
      <div style={{ width: 120 }}>
        <CircularProgressbar
          value={count}
          maxValue={120}
          text={`${count}s`}
          strokeWidth={6}
          styles={buildStyles({
            pathColor: getProgressBarColor(count),
            textColor: getProgressBarColor(count),
            textSize: "18px",
            pathTransitionDuration: 0.5, // Controls the animation speed
          })}
        />
      </div>
    </div>
  );
};

export { CountdownTimer };
