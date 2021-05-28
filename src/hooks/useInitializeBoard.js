import { useCallback, useState, useEffect, useRef } from "react";
import { sleep } from "../utils";
import {
  INITIAL_TILE_ANIMATION_DURATION,
  SHOWING_TIME_BEFORE_HIDING_TILES,
} from "../const/variables";
import { useLayoutContext } from "../context/layout";

export const useInitializeBoard = (initialParams = { amount: 0, size: 0 }) => {
  // const [{ amount, size }, setParams] = useState(initialParams);
  const isMounted = useRef(true);
  const {
    dispatch: { init: initBoard, reset: resetBoard, hideAll, changeTiles },
  } = useLayoutContext();
  const cleanUp = () => (isMounted.current = false);

  const runInitialize = useCallback(async ({ amount,size }) => {
    initBoard({ amount, size, show: true });
    await sleep(SHOWING_TIME_BEFORE_HIDING_TILES);
    if (isMounted.current) {
      hideAll({ show: false });
      changeTiles({ animationDuration: INITIAL_TILE_ANIMATION_DURATION });
    }
    return cleanUp;
  }, [changeTiles, hideAll, initBoard, isMounted]);

  const runReset = useCallback(async () => {
    resetBoard();
    await sleep(SHOWING_TIME_BEFORE_HIDING_TILES);
    if (isMounted.current) {
      hideAll({ show: false });
      changeTiles({ animationDuration: INITIAL_TILE_ANIMATION_DURATION });
    }
    return cleanUp;
  }, [hideAll, changeTiles, resetBoard]);

  useEffect(() => {
    // if (amount) {
      // reset mount after render
      isMounted.current = true;
      // runInitialize();
    // }
  }, []);

  const initialize = useCallback(
    (params) => {
      isMounted.current = true;
      runInitialize(params)
      // setParams(params);
      return cleanUp;
    },
    [runInitialize]
  );

  const reset = useCallback(() => {
    // reset mount after render
    isMounted.current = true;
    runReset();
    return cleanUp;
  }, [runReset]);

  return { initialize, reset };
};
