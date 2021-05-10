import { useEffect } from 'react';
import { useGameContext, pause } from '../context/game';

export const usePause = (stopGame) => {
    const { dispatch } = useGameContext();

    useEffect( () => {
        if(stopGame) {
          dispatch(pause({ pause: true }));
        } else {
            dispatch(pause({ pause: false }));
        }
      }, [dispatch, stopGame]);
}