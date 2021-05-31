import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Layout } from "../components/Layout";
import { useTiles } from "../hooks/useTiles";
import { useInitializeBoard } from "../hooks/useInitializeBoard";
import { useGameContext } from "../context/game";
import { useWin } from "../hooks/useWin";
import { useZen } from "../hooks/useZen";
import { useGeneralContext } from "../context/general";
import { GAME_MODES } from '../const/variables';

export const GameLayout = () => {
  const { tiles } = useTiles();
  const {
    state: { isFirstTimeClassic, isFirstTimeZen, currentMode },
  } = useGeneralContext();
  const {
    state: { currentLevelParams, currentRandomLevelParams, resetLayout },
    dispatch: { setResetLayout },
  } = useGameContext();
  const { initialize: initializeBoard, reset: resetBoard } =
    useInitializeBoard();
  useWin();
  useZen();

  useEffect(() => {
    if (!isFirstTimeClassic || !isFirstTimeZen) {
      const levelParams = currentMode === GAME_MODES.CLASSIC ? currentLevelParams : currentRandomLevelParams; 
      const initializeCleanUp = initializeBoard(levelParams);
      return initializeCleanUp;
    }
  }, [currentLevelParams, initializeBoard, isFirstTimeZen, isFirstTimeClassic, currentMode, currentRandomLevelParams]);

  useEffect(() => {
    if (resetLayout) {
      const resetCleanUp = resetBoard();
      setResetLayout({ resetLayout: false });
      return () => resetCleanUp;
    }
  }, [resetBoard, resetLayout, setResetLayout]);

  return (
    <View style={[styles.container]}>
      <Layout tiles={tiles} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginLeft: 50,
    marginRight: 50,
  },
});
