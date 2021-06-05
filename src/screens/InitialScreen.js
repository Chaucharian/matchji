import React, { useEffect} from "react";
import { StyleSheet, View } from "react-native";
import { useSoundContext } from "../context/sound";
import { useTheme } from "../context/theme/themeContext";
import { GameMenu } from "../core/GameMenu";
import { useCurrentMode } from "../hooks/useCurrentMode";
import { Banner } from '../components/Banner';

export const InitialScreen = () => {
  const GameMode = useCurrentMode();
  const {
    state: { secondary },
  } = useTheme();
  const { playMusic } = useSoundContext();

  // TODO 
  // REMOVE WHEN PROD
  useEffect( () => {
    playMusic();
  },[playMusic]);

  return (
    <>
    <View style={[{ ..._styles.container, backgroundColor: secondary }]}>
      {GameMode ? <GameMode /> : <GameMenu />}
    </View>
    <Banner />
    </>
  );
};

const _styles = StyleSheet.create({
  container: {
    height: "93%",
  },
});
