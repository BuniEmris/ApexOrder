import React from 'react';
import { ScrollView } from 'react-native';
import MyOrders from '../../../components/Basket/MyOrders';

export default function OrderList() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }}>
      <MyOrders />
    </ScrollView>
  );
}
