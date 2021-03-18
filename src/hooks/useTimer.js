import React, { useState, useEffect } from "react";

export const useTimer = ({ intialTime = 10, onStop }) => {
  const [time, setTime] = useState(intialTime);

  useEffect(() => {
    if (time !== 0) {
      const timeout = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timeout);
    }
    onStop();
  }, [time]);

  return time;
};
