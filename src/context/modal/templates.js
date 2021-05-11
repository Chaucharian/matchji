
import React from 'react';
import { Text, Button, View } from 'react-native';

export const MenuTemplate = () => <Text>MENU</Text>;
export const WinTemplate = ({ onPress }) => <View>
    <Text>GANASTE!</Text>
    <Button title="NEXT" onPress={onPress} ></Button>
</View>