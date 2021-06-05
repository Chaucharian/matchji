import React, { useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";

export const ExtraTime = ({ value = 0, styles, onEnd= ()=>{} }) => {
  const [animation, setAnimation] = useState("bounceInDown");

  useEffect(() => {
    console.log(" VALUE ",value)
    if (value !== 0) {
      setAnimation("bounceInDown");
    }
  }, [value]);

  return (
    <Animatable.Text
      style={[{ fontSize: 40, color: "gold", ...styles }]}
      animation={animation}
      duration={1000}
      onAnimationEnd={() => {
          setAnimation("fadeOut");
          onEnd();
      }}
    >
      { value === 0 ? "" : `+${value}` }
    </Animatable.Text>
  );
};
