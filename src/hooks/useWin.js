import { useEffect } from 'react';
import { useGameContext } from '../context/game';
import { useLayoutContext } from '../context/layout';
import { useModalContext } from '../context/modal';
import { useInitializeBoard } from './useInitializeBoard';

export const useWin = () => {
    const { state: { boardCompleted } } = useLayoutContext();
    const { dispatch: { openWin: openWinModal } } = useModalContext();
    const initializeBoard = useInitializeBoard();

    useEffect( () => {
        if(boardCompleted) {
          openWinModal({ show: true });
        }
      }, [initializeBoard, openWinModal, boardCompleted]);
}