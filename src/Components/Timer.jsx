import { useState,useEffect } from "react";


const Timer = ({ duration, onTimeUp, lock }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (lock) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          onTimeUp(); // time's up, call parent function
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // cleanup when component unmounts
  }, [lock]);

  useEffect(() => {
    setTimeLeft(duration); // reset timer when question changes
  }, [duration]);

  return <div style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "10px" }}>
  Time Left: {timeLeft}s
</div>
};
export default Timer;