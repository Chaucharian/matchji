
import React from 'react';
import { Text, Button, View } from 'react-native';

export const MenuTemplate = () => <Text>MENU</Text>;
export const WinTemplate = ({ onPress, level }) => <View>
    <Text>GANASTE!</Text>
    <Text>NIVEL: {level}</Text>
    <Button title="NEXT" onPress={onPress} ></Button>
</View>