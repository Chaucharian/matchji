import React, { Component } from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";
import * as Animatable from "react-native-animatable";
import { ThemeContext } from "../context/theme/themeContext";

const _styles = StyleSheet.create({
  container: {},
  tile: {
    zIndex: 1,
    // backgroundColor: "powderblue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    elevation: 4,
    // borderColor: "skyblue",
  },
  unmountTile: {
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "transparent",
  },
  emptyTile: {
    zIndex: 1,
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

const animationTypes = { in: "bounceIn", out: "bounceOut" };

export class Tile extends Component {
  static contextType = ThemeContext;

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.show !== this.props.show &&
      nextProps._key !== this.props._key &&
      nextProps.onPress !== this.props.onPress
    ) {
      return true;
    } else {
      return false;
    }
  }

  getFontSize(styles) {
    return styles.width <= 50 ? 25 : 45;
  }

  render() {
    const { onPress, show, unmount, content, animationDuration, styles } =
      this.props;
    const {
      state: { primary },
    } = this.context;

    return (
      <>
        {show ? (
          <TouchableHighlight onPress={onPress}>
            <Animatable.View
              style={[
                _styles.emptyTile,
                { ...styles, backgroundColor: primary },
              ]}
              animation={animationTypes.in}
              duration={animationDuration}
              onAnimationEnd={() => {}}
            >
              <Text
                style={[
                  _styles.content,
                  { fontSize: this.getFontSize(styles) },
                ]}
              >
                {content}
              </Text>
            </Animatable.View>
          </TouchableHighlight>
        ) : unmount ? (
          <TouchableHighlight onPress={onPress}>
            <Animatable.View
              style={[_styles.unmountTile, styles.unmountTile]}
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
              style={[_styles.tile, { ...styles, backgroundColor: primary }]}
              animation={animationTypes.in}
              duration={animationDuration}
              onAnimationEnd={() => {}}
            ></Animatable.View>
          </TouchableHighlight>
        )}
      </>
    );
  }
}
