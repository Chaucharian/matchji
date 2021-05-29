import { useEffect } from 'react';
import { useLayoutContext } from '../context/layout';
import { useGameContext } from '../context/game';
import { useGeneralContext } from '../context/general';
import { GAME_MODES } from '../const/variables';

export const useZen = () => {
    const { state: { boardCompleted } } = useLayoutContext();
    const { dispatch: { randomLevel }} = useGameContext();
    const { state: { currentMode } } = useGeneralContext();

    useEffect( () => {
        if(boardCompleted && currentMode === GAME_MODES.ZEN) {
          randomLevel();
        }
      }, [randomLevel, boardCompleted, currentMode]);
}