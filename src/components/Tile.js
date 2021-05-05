import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TouchableHighlight,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { TILE_MOUNT_ANIMATION_DURATION } from "../const/variables";

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

// export const Tile = ({
//   content,
//   show,
//   unmount,
//   animationDuration: _animationDuration = 500,
//   onPress,
//   styles,
// }) => {
//   const [tileAnimation, setTileAnimation] = useState("bounceIn");
//   const [contentAnimation, setContentAnimation] = useState("bounceIn");
//   const [showContent, setShowContent] = useState(false);
//   const [showUnmount, setShowUnmount] = useState(false);
//   const [animationDuration, setAnimationDuration] = useState(
//     _animationDuration
//   );

//   useEffect(() => {
//     if (!show) {
//       if (showContent) {
//         setContentAnimation("bounceOut");
//         setShowContent(false);
//       } else {
//         setTileAnimation("bounceOut");
//       }
//     } else {
//       setShowContent(false);
//       setTileAnimation("bounceIn");
//     }
//   }, [show]);

//   useEffect(() => {
//     let timeoutId;
//     if (unmount) {
//       timeoutId = setTimeout(() => {
//         setShowContent(false);
//         setShowUnmount(true);
//       }, 800);
//     }
//     return () => clearTimeout(timeoutId);
//   }, [unmount]);

//   // once mounted go back to original animation duration
//   useEffect(() => {
//     if (animationDuration !== TILE_MOUNT_ANIMATION_DURATION) {
//       setAnimationDuration(TILE_MOUNT_ANIMATION_DURATION);
//     }
//   }, [animationDuration]);

//   return (
//     <>
//       {!showContent ? (
//         <TouchableHighlight
//           style={[_styles.container, styles.container]}
//           onPress={onPress}
//         >
//           <Animatable.View
//             style={[_styles.tile, styles.tile]}
//             animation={tileAnimation}
//             duration={animationDuration}
//             onAnimationEnd={() =>
//               tileAnimation === "bounceOut" &&
//               !showUnmount &&
//               setShowContent(true)
//             }
//           ></Animatable.View>
//         </TouchableHighlight>
//       ) : (
//         <TouchableHighlight onPress={onPress}>
//           <Animatable.View
//             style={[_styles.emptyTile, styles.tile]}
//             animation={contentAnimation}
//             duration={animationDuration}
//             onAnimationEnd={() =>
//               contentAnimation === "bounceOut" && setShowContent(false)
//             }
//           >
//             <Text style={[_styles.content]}>{content}</Text>
//           </Animatable.View>
//         </TouchableHighlight>
//       )}
//     </>
//   );
// };

const animationTypes = { in: "bounceIn", out: "bounceOut" };

export const Tile = ({
  content,
  show,
  unmount,
  animationDuration = 500,
  onPress,
  styles,
}) => {
  return (
    <>
      {show ? (
        <TouchableHighlight onPress={onPress}>
          <Animatable.View
            style={[_styles.emptyTile, styles.tile]}
            animation={animationTypes.in}
            duration={animationDuration}
            onAnimationEnd={() => {}}
          >
            <Text style={[_styles.content]}>{content}</Text>
          </Animatable.View>
        </TouchableHighlight>
      ) : unmount ? (
        <TouchableHighlight onPress={onPress}>
          <Animatable.View
            style={[_styles.emptyTile, styles.tile]}
            animation={animationTypes.in}
            duration={animationDuration}
            onAnimationEnd={() => {}}
          ></Animatable.View>
        </TouchableHighlight>
      ) : (
        <TouchableHighlight
          style={[_styles.container, styles.container]}
          onPress={onPress}
        >
          <Animatable.View
            style={[_styles.tile, styles.tile]}
            animation={animationTypes.in}
            duration={animationDuration}
            onAnimationEnd={() => {}}
          ></Animatable.View>
        </TouchableHighlight>
      )}
    </>
  );
};
