import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import appStyles from '../../../constants/styles';
import Addresses from './Addresses';
import History from './History';
import Owner from './Owner';
import Settings from './Settings';

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: appStyles.BACKGROUND_DEFAULT },
      }}>
      <Stack.Screen name="user" component={Owner} />
      <Stack.Screen name="user-history" component={History} />
      <Stack.Screen name="user-addresses" component={Addresses} />
      <Stack.Screen name="user-settings" component={Settings} />
    </Stack.Navigator>
  );
}
