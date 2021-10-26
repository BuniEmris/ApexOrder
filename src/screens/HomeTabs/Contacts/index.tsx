import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Location from './Location';
import Locations from './Locations';

const Stack = createNativeStackNavigator();

export default function Contacts() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="locations"
        component={Locations}
        initialParams={{ choosing: false }}
      />
      <Stack.Screen name="location" component={Location} />
    </Stack.Navigator>
  );
}
