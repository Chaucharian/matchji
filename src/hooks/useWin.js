import { useEffect } from 'react';
import { useGameContext } from '../context/game';
import { useLayoutContext } from '../context/layout';
import { initializeBoard } from '../context/layout/customActions';

export const useWin = () => {
    const { dispatch: { nextLevel } } = useGameContext();
    const { state: { boardCompleted }, layoutDispatch } = useLayoutContext();

    useEffect( () => {
        if(boardCompleted) {
          nextLevel();
          initializeBoard(layoutDispatch, 6);
        }
      }, [layoutDispatch, nextLevel, boardCompleted]);
}