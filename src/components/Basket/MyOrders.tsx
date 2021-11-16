import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from 'react-native-reanimated';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import PayIcon from '../../assets/icons/Play';
import appStyles from '../../constants/styles';
import { setCurrentOrders } from '../../redux/slices/order-slice';
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
  const { currentOrders } = useSelector((state: RootState) => state.orderSlice);
  const dispatch = useDispatch();
  const { data, isLoading } = useQuery<ordersType[]>(
    ['user-orders'],
    async () => {
      const response = await getResource('orders?phone=' + phone);
      dispatch(setCurrentOrders(response?.result));
      return response.result;
    },
  );

  return (
    <View>
      {currentOrders?.length > 0 ? (
        <QueryWrapper isLoading={isLoading}>
          {currentOrders?.map((el, i) => (
            <TouchableOpacity
              key={i}
              style={styles.paddingWrap}
              onPress={() =>
                navigation.navigate('OrderTab', {
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
      ) : (
        <View style={styles.empty}>
          <Text style={styles.epmtyText}>Нет текущих заказов</Text>
        </View>
      )}
    </View>
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
  epmtyText: {
    fontFamily: appStyles.FONT,
    fontSize: RW(20),
    color: 'rgba(30, 27, 38, 0.5)',
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
  paddingWrap: {
    padding: 20,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    height: 768,
  },
});
