
import React from 'react';
import { Text, Button, View } from 'react-native';
import { CloseButton } from '../../components/CloseButton';

export const MenuTemplate = ({ onClose }) => <View>
    <CloseButton onPress={onClose} />
    <Text>MENU</Text>
    </View>;
export const WinTemplate = ({ onPress, level }) => <View>
    <Text>GANASTE!</Text>
    <Text>NIVEL: {level}</Text>
    <Button title="NEXT" onPress={onPress} ></Button>
</View>