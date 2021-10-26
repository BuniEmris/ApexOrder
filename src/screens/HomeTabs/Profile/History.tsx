import React, { Fragment } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import RefreshIcon from '../../../assets/icons/profile/Refresh';
import BlockWrapper from '../../../components/Profile/BlockWrapper';
import Header from '../../../components/Profile/Header';
import QueryWrapper from '../../../components/Shared/QueryWrapper';
import Row from '../../../components/Shared/Row';
import appStyles from '../../../constants/styles';
import { RootState } from '../../../redux/store';
import { getResource } from '../../../utils/api';

export type ordersType = {
  UIDOrder: string;
  Date: string;
  Ready: boolean;
  Goods: {
    UIDNomenclature: string;
    Nomenclature: string;
    Amount: number;
  }[];
};

export default function History() {
  const { phone } = useSelector((state: RootState) => state.auth);
  const {
    isLoading,
    isError,
    data: orders,
  } = useQuery<ordersType[]>(['user-orders'], async () => {
    const response = await getResource<ordersType[]>('orders?phone=' + phone);
    return response.result;
  });

  return (
    <View style={styles.container}>
      <Header text="История заказов" />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <QueryWrapper
          isError={isError}
          isLoading={isLoading}
          indicatorSize="large"
          IndicatorStyle={styles.feetbackMargin}
          errorTextStyle={styles.feetbackMargin}>
          {orders?.map((order, i) => (
            <Fragment key={i}>
              <Row containerStyle={styles.refreshRow}>
                <Text>{order.Date}</Text>
                <RefreshIcon />
              </Row>
              <BlockWrapper>
                {order?.Goods.map((good, j) => (
                  <Row key={j} containerStyle={styles.blockRow}>
                    <Text style={styles.blockText}>{good.Nomenclature}</Text>
                    <Text style={styles.blockText}>x{good.Amount}</Text>
                  </Row>
                ))}
              </BlockWrapper>
            </Fragment>
          ))}
        </QueryWrapper>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: appStyles.HORIZONTAL_PADDING },
  scroll: {
    flex: 1,
  },
  refreshRow: {
    marginVertical: 10,
  },
  blockRow: {
    marginVertical: 10,
  },
  blockText: {
    fontFamily: appStyles.FONT,
    color: appStyles.FONT_COLOR,
    fontSize: 16,
  },
  feetbackMargin: {
    marginTop: 50,
  },
});
