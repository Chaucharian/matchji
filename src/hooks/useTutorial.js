import React, { useRef, useEffect } from "react";
import { View } from "react-native";
import { useGeneralContext } from "../context/general";
import { GAME_MODES } from "../const/variables";
import { useModalContext } from "../context/modal";
import { Text } from "../components/Text";

export const useTutorial = () => {
  const {
    state: { currentMode, isFirstTimeClassic, isFirstTimeZen },
  } = useGeneralContext();
  const {
    dispatch: { openTutorial },
  } = useModalContext();

  const { current: instructions } = useRef({
    classic: {
      title: <Text title>¿Como jugar?</Text>,
      body: (
        <View style={[{ justifyContent: "center" }]}>
          <Text body>
            Tienes
            <Text body styles={{ color: "red"}} >
              5 segundos
            </Text>
            {" "}para recordar todas las imagenes y
            <Text body styles={{ color: "red"}}>
              60 segundos
            </Text>
            para completar el nivel
          </Text>
            <Text body styles={{ justifyContent: "center", color: "#00AF65"}}>
             ¡+2 segundos extra por acierto!
            </Text> 
        </View>
      ),
    },
    zen: { title: <></>, body: <></> },
  });

  useEffect(() => {
    if (currentMode === GAME_MODES.CLASSIC && isFirstTimeClassic) {
        openTutorial({ content: instructions.classic, show: true });
    } 
  }, [currentMode, instructions.classic, isFirstTimeClassic, isFirstTimeZen, openTutorial]);
};
