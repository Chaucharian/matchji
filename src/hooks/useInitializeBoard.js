import { sleep } from '../utils';
import { INITIAL_TILE_ANIMATION_DURATION, SHOWING_TIME_BEFORE_HIDING_TILES } from '../const/variables';
import { useLayoutContext } from '../context/layout';
import { useCallback, useState, useEffect  } from 'react';
// TODO merge hideAll and changeTiles into a same action
export const useInitializeBoard = (initialParams = { amount: 0, size: 0 }) => {
    const [{ amount, size }, setParams] = useState(initialParams);
    const { dispatch: { init: initBoard, reset: resetBoard, hideAll, changeTiles } } = useLayoutContext();

    const runInitialize = useCallback( async () => {
        initBoard({ amount, size, show: true });
        await sleep(SHOWING_TIME_BEFORE_HIDING_TILES);
        hideAll({ show: false });
        changeTiles({ animationDuration: INITIAL_TILE_ANIMATION_DURATION });
    }, [amount, size, changeTiles, hideAll, initBoard]);

    const runReset = useCallback( async () => {
        resetBoard();
        await sleep(SHOWING_TIME_BEFORE_HIDING_TILES);
        hideAll({ show: false });
        changeTiles({ animationDuration: INITIAL_TILE_ANIMATION_DURATION });
    }, [hideAll, changeTiles, resetBoard]);

    useEffect( () => {
        if(amount) {
            runInitialize();
        }
    }, [amount, runInitialize]);

    const initialize = useCallback( (params) => setParams(params), [setParams]);
    const reset = useCallback( () => runReset(), [runReset]);

    return { initialize, reset };
}
