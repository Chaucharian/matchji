import React from "react";
import LottieView from "lottie-react-native";
import { useState } from "react";

// const getSource = (source) => require(source)

export const Animation = ({ source = "../assets/winner-animation.json" }) => {
  const [show, setShow] = useState(true);
  return show ? (
    <LottieView
      source={require("../assets/winner-animation.json")}
      autoPlay
      loop={false}
      onAnimationFinish={() => setShow(false)}
    />
  ) : (
    <></>
  );
};
