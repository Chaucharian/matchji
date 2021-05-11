import { useEffect } from 'react';
import { useGameContext } from '../context/game';
import { useLayoutContext } from '../context/layout';
import { useInitializeBoard } from '../context/hooks/useInitializeBoard';

export const useWin = () => {
    const { dispatch: { nextLevel } } = useGameContext();
    const { state: { boardCompleted } } = useLayoutContext();
    const initializeBoard = useInitializeBoard();

    useEffect( () => {
        if(boardCompleted) {
          nextLevel();
          initializeBoard(6);
        }
      }, [initializeBoard, nextLevel, boardCompleted]);
}