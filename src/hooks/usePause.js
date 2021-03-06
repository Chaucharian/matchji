import { useEffect } from "react";
import { useGameContext } from "../context/game";

export const usePause = (stopGame) => {
  const {
    dispatch: { pause },
  } = useGameContext();

  useEffect(() => {
    if (stopGame) {
      pause({ pause: true });
    } else {
      pause({ pause: false });
    }
  }, [pause, stopGame]);
};
