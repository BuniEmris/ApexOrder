import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import MinusIcon from '../../assets/icons/Minus';
import PlusIcon from '../../assets/icons/Plus';
import appStyles from '../../constants/styles';
import {
  decrementSauce,
  incrementSauce,
  setSaucesList,
} from '../../redux/slices/order-slice';
import { RootState } from '../../redux/store';
import { getResource } from '../../utils/api';
import { ISauce } from '../../utils/types/api';
import PaddWrapper from '../Shared/PaddWrapper';
import Row from '../Shared/Row';

export default function SauceAdd() {
  const dispatch = useDispatch();
  const { sauces } = useSelector((state: RootState) => state.orderSlice);
  const { data, isError, isLoading } = useQuery<ISauce[]>(
    'sauces',
    async () => {
      const response = await getResource<ISauce[]>('sauces');
      dispatch(setSaucesList(response?.result));
      return response?.result;
    },
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Соусы к бортикам и закускам </Text>
        <Text style={styles.sum}>2000 sum </Text>
      </View>
      <PaddWrapper>
        <View style={styles.listContainer}>
          {sauces?.map((el, i) => (
            <Row key={el.UIDNomenclature} containerStyle={styles.item}>
              <Image
                style={styles.itemImage}
                source={{ uri: 'data:image/png;base64, ' + el?.Image }}
              />
              <View style={styles.itemBody}>
                <Text style={styles.name}>{el.Name}</Text>
                <Text style={styles.price}>{el?.Price} сум</Text>
              </View>
              <View style={styles.itemActions}>
                <MinusIcon
                  color="#BAB8BC"
                  onPress={() => dispatch(decrementSauce(i))}
                />
                <Text style={styles.itemActionsNumber}>{el.Amount}</Text>
                <PlusIcon
                  color="#BAB8BC"
                  onPress={() => dispatch(incrementSauce(i))}
                />
              </View>
            </Row>
          ))}
        </View>
      </PaddWrapper>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 326,
    width: '100%',
  },
  header: {
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    borderBottomColor: appStyles.FONT_COLOR_SECONDARY,
    borderBottomWidth: 0.2,
    paddingVertical: 10,
    marginBottom: 10,
  },
  item: {
    marginVertical: 10,
    // borderBottomColor: '#F0F0F4',
    // borderBottomWidth: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
  },
  itemBody: {
    flex: 1,
    paddingHorizontal: 10,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemActionsNumber: {
    marginHorizontal: 10,
    fontFamily: appStyles.FONT,
    fontSize: 14,
    color: appStyles.FONT_COLOR,
  },
  name: {
    fontFamily: appStyles.FONT,
    fontSize: 16,
    color: appStyles.FONT_COLOR,
  },
  price: {
    marginTop: 10,
    fontFamily: appStyles.FONT,
    color: appStyles.FONT_COLOR_SECONDARY,
  },
  sum: {
    fontFamily: appStyles.FONT,
    fontSize: 14,
    color: appStyles.FONT_COLOR_SECONDARY,
  },
});
