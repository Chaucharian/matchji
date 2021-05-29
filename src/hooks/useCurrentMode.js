import { GAME_MODES } from "../const";
import { useGeneralContext } from "../context/general"
import { ClassicScreen } from '../screens/ClassicScreen';
import { ZenScreen } from '../screens/ZenScreen';

export const useCurrentMode = () => {
    const { state: { currentMode } } = useGeneralContext();
    
    return currentMode === null ? null : currentMode === GAME_MODES.CLASSIC ? ClassicScreen : ZenScreen;
}