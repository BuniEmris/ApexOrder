import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import PayIcon from '../../assets/icons/Play';
import appStyles from '../../constants/styles';
import { RootState } from '../../redux/store';
import { ordersType } from '../../screens/HomeTabs/Profile/History';
import { getResource } from '../../utils/api';
import { RH, RW } from '../../utils/helpers/responsive';
import { NavigationType } from '../../utils/types';
import QueryWrapper from '../Shared/QueryWrapper';
import Row from '../Shared/Row';

export default function MyOrders() {
  const navigation = useNavigation<NavigationType>();
  const { phone } = useSelector((state: RootState) => state.auth);

  const { data, isLoading } = useQuery<ordersType[]>(
    ['user-orders'],
    async () => {
      const response = await getResource('orders?phone=' + phone);
      return response.result;
    },
  );

  const currentOrders = useMemo(() => data?.filter(el => !el?.Ready), [data]);

  return (
    <QueryWrapper isLoading={isLoading}>
      {currentOrders?.map((el, i) => (
        <TouchableOpacity
          key={i}
          onPress={() =>
            navigation.navigate('basket', {
              screen: 'order',
              params: {
                UID: el.UIDOrder,
              },
            })
          }>
          <Row containerStyle={styles.header}>
            <Text style={styles.title}>Заказ</Text>

            <View style={styles.numRow}>
              <Text style={styles.num}>X{i + 1}</Text>
              <PayIcon active />
            </View>
          </Row>
        </TouchableOpacity>
      ))}
    </QueryWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: RH(32),
    paddingBottom: RH(20),
    borderBottomColor: appStyles.FONT_COLOR_SECONDARY,
    borderBottomWidth: 0.2,
  },
  title: {
    fontFamily: appStyles.FONT,
    fontSize: RW(20),
    color: appStyles.FONT_COLOR,
  },
  numRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  num: {
    fontFamily: appStyles.FONT,
    fontSize: RW(18),
    color: appStyles.FONT_COLOR,
    marginRight: RW(5),
  },
});
