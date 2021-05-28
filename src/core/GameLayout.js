import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Layout } from "../components/Layout";
import { useTiles } from "../hooks/useTiles";
import { useInitializeBoard } from "../hooks/useInitializeBoard";
import { useGameContext } from "../context/game";
import { useWin } from "../hooks/useWin";
import { useGeneralContext } from "../context/general";

export const GameLayout = () => {
  const { tiles } = useTiles();
  const {
    state: { isFirstTimeClassic },
  } = useGeneralContext();
  const {
    state: { currentLevelParams, resetLayout },
    dispatch: { setResetLayout },
  } = useGameContext();
  const { initialize: initializeBoard, reset: resetBoard } =
    useInitializeBoard();
  useWin();

  useEffect(() => {
    if (!isFirstTimeClassic) {
      const initializeCleanUp = initializeBoard(currentLevelParams);
      return initializeCleanUp;
    }
  }, [currentLevelParams, initializeBoard, isFirstTimeClassic]);

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
