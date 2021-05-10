import { useEffect } from 'react';
import { useGameContext } from '../context/game';
import { useLayoutContext } from '../context/layout';
import { nextLevel } from '../context/game/actions';
import { initializeBoard } from '../context/layout/customActions';

export const useWin = () => {
    const { gameDispatch } = useGameContext();
    const { state: { boardCompleted }, layoutDispatch } = useLayoutContext();

    useEffect( () => {
        if(boardCompleted) {
          gameDispatch(nextLevel());
          initializeBoard(layoutDispatch, 6);
        }
      }, [layoutDispatch, gameDispatch, boardCompleted]);
}