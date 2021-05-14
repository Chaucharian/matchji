import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { CloseButton } from "../../components/CloseButton";
import { Button } from "../../components/Button";

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    //   display: "flex",
    justifyContent: "center",
  },
  header: {
    justifyContent: "flex-end",
    flexDirection: "row",
    padding: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1
  },  
  title: {
    fontSize: 30,
    fontWeight: "bold"
  },
  optionsContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  options: {
    justifyContent: "space-around",
  },
});

export const MenuTemplate = ({ onClose }) => (
  <View style={[_styles.container]}>
    <View style={[_styles.header]}>
      <View style={[_styles.titleContainer]}>
        <Text style={[_styles.title]}>MENU</Text>
      </View>
    </View>
    {/* <CloseButton onPress={onClose} /> */}
    <View style={[_styles.optionsContainer]}>
      <View style={[_styles.options]}>
        <Button>
          <Text>RESET</Text>
        </Button>
        <Button>
          <Text>BACK</Text>
        </Button>
        <Button>
          <Text>BACK</Text>
        </Button>
      </View>
    </View>
  </View>
);
export const WinTemplate = ({ onPress, level }) => (
  <View>
    <Text>GANASTE!</Text>
    <Text>NIVEL: {level}</Text>
    <Button title="NEXT" onPress={onPress}></Button>
  </View>
);
