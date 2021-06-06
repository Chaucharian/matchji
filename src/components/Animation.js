import React from "react";
import LottieView from "lottie-react-native";
import { useState } from "react";
import { MODAL_TYPES } from "../const";

// const getSource = (source) => require(source)

export const Animation = ({
  source = "../assets/winner-animation.json",
  type,
  onEnd = () => {},
  children,
}) => {
  const [show, setShow] = useState(true);
  const isWin = (() => {
    if (type === MODAL_TYPES.WIN) {
      return true;
    } else if (type === MODAL_TYPES.GAME_OVER) {
      return false;
    }
  })();

  return show ? (
    isWin ? (
      <>
        <LottieView
          source={require("../assets/confetti-win.json")}
          autoPlay
          loop={false}
          onAnimationFinish={() => {
            onEnd();
            setShow(false);
          }}
        />
        <LottieView
          source={require("../assets/winner-animation.json")}
          autoPlay
          loop={false}
          onAnimationFinish={() => {
            onEnd();
            setShow(false);
          }}
        />
      </>
    ) : (
      <LottieView
        source={require("../assets/confetti-lose.json")}
        autoPlay
        loop={false}
        onAnimationFinish={() => {
          onEnd();
          setShow(false);
        }}
      />
    )
  ) : (
    children
  );
};
