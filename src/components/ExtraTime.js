import React, { useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";

export const ExtraTime = ({ value="2", styles }) => {
  const [animation, setAnimation] = useState("bounceInDown");

    useEffect( () => {
        if(value !== 0) {
            setAnimation("bounceInDown");
        }
    }, [value])

  return (
    <Animatable.Text
      style={[{ fontSize: 40, color: "gold", ...styles }]}
      animation={animation}
      duration={1000}
      onAnimationEnd={() => setAnimation("fadeOut")}
    >
        +2
    </Animatable.Text>
  );
};
