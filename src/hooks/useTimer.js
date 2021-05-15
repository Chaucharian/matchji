import { useEffect } from "react";

export const useTimer = ({ currentTime = 10, stop, onSetTime }) => {
  // const [time, setTime] = useState(intialTime);

  useEffect(() => {
    if (currentTime !== 0 && !stop) {
      // const timeout = setTimeout(() => setTime(time - 1), 1000);
      const timeout = setTimeout(() => onSetTime(currentTime - 1), 1000);
      return () => clearTimeout(timeout);
    }
  }, [currentTime, onSetTime, stop]);

  return currentTime;
};
