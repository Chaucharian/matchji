import { useEffect } from 'react';
import { useLayoutContext } from '../context/layout';
import { useModalContext } from '../context/modal';
import { useGeneralContext } from '../context/general';
import { GAME_MODES } from '../const/variables';

export const useWin = () => {
    const { state: { boardCompleted } } = useLayoutContext();
    const { dispatch: { openWin: openWinModal } } = useModalContext();
    const { state: { currentMode } } = useGeneralContext();

    useEffect( () => {
        if(boardCompleted && currentMode === GAME_MODES.CLASSIC) {
          openWinModal({ show: true });
        }
      }, [openWinModal, boardCompleted, currentMode]);
}