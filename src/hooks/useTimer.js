import { useState, useEffect } from "react";

export const useTimer = ({ currentTime = 10, onStop, onSetTime }) => {
  // const [time, setTime] = useState(intialTime);

  useEffect(() => {
    if (currentTime !== 0) {
      // const timeout = setTimeout(() => setTime(time - 1), 1000);
      const timeout = setTimeout(() => onSetTime(currentTime - 1), 1000);
      return () => clearTimeout(timeout);
    }
    onStop();
  }, [currentTime]);

  return currentTime;
};
