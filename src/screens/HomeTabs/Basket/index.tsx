import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Orders from './Orders';

const Stack = createNativeStackNavigator();

export default function Contacts() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="orders"
        initialParams={{ openingSheet: false }}
        component={Orders}
      />
    </Stack.Navigator>
  );
}
