import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Order from './Order';
import OrderList from './OrderList';

const Stack = createNativeStackNavigator();

export default function OrderTab() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="orders"
        initialParams={{ openingSheet: false }}
        component={OrderList}
      />
      <Stack.Screen name="order" component={Order} />
    </Stack.Navigator>
  );
}
