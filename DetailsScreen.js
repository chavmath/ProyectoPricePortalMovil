import React from 'react';
import { View, Text } from 'react-native';
import Juegos from './Juegos';

export default function DetailsScreen() {
  return (
    <View>
      <Juegos favorites={0} />
    </View>
  );
}
