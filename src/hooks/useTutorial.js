import React, { useRef, useEffect } from "react";
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
        <>
          <Text subtitle bold>
            Tienes
            <Text subtitle bold>
              5 segundos
            </Text>
            para recordar todas las imagenes y
            <Text bold subtitle>
              60 segundos
            </Text>
            para completar el nivel
          </Text>
          <Text subtitle>
            ¡
            <Text subtitle bold>
              2 segundos
            </Text>
            extra por acierto!
          </Text>
        </>
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
