import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TouchableHighlight,
} from "react-native";
import * as Animatable from "react-native-animatable";

const _styles = StyleSheet.create({
  container: {},
  tile: {
    zIndex: 1,
    width: 100,
    height: 100,
    backgroundColor: "powderblue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "skyblue",
  },
  emptyTile: {
    zIndex: 1,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "skyblue",
  },
  content: {
    fontSize: 45, // calculate size base on tile size
  },
});

export const Tile = ({ content, show, unmount: _unmount, onPress, styles }) => {
  const [tileAnimation, setTileAnimation] = useState("bounceIn");
  const [contentAnimation, setContentAnimation] = useState("bounceIn");
  const [showContent, setShowContent] = useState(false);
  const [unmount, setUnmount] = useState(_unmount);

  useEffect(() => {
    if (!show) {
      setTileAnimation("bounceOut");
    } else {
      setShowContent(false);
      setTileAnimation("bounceIn");
    }
  }, [show]);

  useEffect(() => {
    if (unmount) {
      setContentAnimation("bounceOut");
    }
  }, [unmount]);

  return (
    <>
      {
        !showContent ? (
          <TouchableHighlight
            style={[_styles.container, styles.container]}
            onPress={onPress}
          >
            <Animatable.View
              style={[_styles.tile, styles.tile]}
              animation={tileAnimation}
              duration={500}
              onAnimationEnd={() =>
                tileAnimation === "bounceOut" && setShowContent(true)
              }
            ></Animatable.View>
          </TouchableHighlight>
        ) : (
          <TouchableHighlight onPress={onPress}>
            <Animatable.View
              style={[_styles.emptyTile, styles.tile]}
              animation={contentAnimation}
              duration={500}
              onAnimationEnd={() =>
                contentAnimation === "bounceOut" && setUnmount(true)
              }
            >
              <Text style={[_styles.content]}>{content}</Text>
            </Animatable.View>
          </TouchableHighlight>
        )

        //   : !unmount ? (
        //     <TouchableHighlight onPress={onPress}>
        //       <Animatable.View
        //         style={[_styles.emptyTile, styles.tile]}
        //         animation={contentAnimation}
        //         duration={500}
        //         onAnimationEnd={() =>
        //           contentAnimation === "bounceOut" && setUnmount(true)
        //         }
        //       >
        //         <Text style={[_styles.content]}>{content}</Text>
        //       </Animatable.View>
        //     </TouchableHighlight>
        //   ) : (
        //     <TouchableHighlight onPress={onPress}>
        //       <Animatable.View
        //         style={[_styles.emptyTile, styles.tile]}
        //         // animation={contentAnimation}
        //         duration={500}
        //       ></Animatable.View>
        //     </TouchableHighlight>
      }
    </>
  );
};
