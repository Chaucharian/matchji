import { useEffect } from 'react';
import { useLayoutContext } from '../context/layout';
import { useModalContext } from '../context/modal';

export const useWin = () => {
    const { state: { boardCompleted } } = useLayoutContext();
    const { dispatch: { openWin: openWinModal } } = useModalContext();

    useEffect( () => {
        if(boardCompleted) {
          openWinModal({ show: true });
        }
      }, [openWinModal, boardCompleted]);
}