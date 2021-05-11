import { sleep } from '../utils';
import { INITIAL_TILE_ANIMATION_DURATION } from '../const/variables';
import { useLayoutContext } from '../context/layout';
import { useCallback, useState, useEffect  } from 'react';

// TODO merge hideAll and changeTiles into a same action
export const useInitializeBoard = (initialAmount) => {
    const [amount, setAmount] = useState(initialAmount);
    const { dispatch: { init, hideAll, changeTiles } } = useLayoutContext();

    const run = useCallback( async () => {
        init({ amount, show: true });
        await sleep(5000);
        hideAll({ show: false });
        changeTiles({ animationDuration: INITIAL_TILE_ANIMATION_DURATION });
    }, [amount, changeTiles, hideAll, init]);

    useEffect( () => {
        if(amount) {
            run();
        }
    }, [amount, run]);

    return useCallback( (amount) => setAmount(amount), [setAmount]);
}
