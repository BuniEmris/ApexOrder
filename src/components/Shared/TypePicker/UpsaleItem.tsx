import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { checkAndGetItemUID } from '.';

import appStyles from '../../../constants/styles';
import {
  pickUpsaleItem,
  setUpsaleList,
} from '../../../redux/slices/order-slice';
import { getResource } from '../../../utils/api';
import { SettingState } from '../../../utils/types';
import { IGroup, ISauce, IUpsale } from '../../../utils/types/api';

interface Props {
  cartUpsale?: boolean;
}

export default function UpsaleItem({ cartUpsale }: Props) {
  const dispatch = useDispatch();
  const { data } = useQuery<IUpsale[]>('upsales', async () => {
    const response = await getResource<IUpsale[]>('upsales');
    dispatch(setUpsaleList(response?.result));
    return response?.result;
  });
  const { upsales } = useSelector((state: RootState) => state.orderSlice);

  const onChangeUpsale = (UIDNomenclature: string) => {
    dispatch(pickUpsaleItem(UIDNomenclature));
  };
  return (
    <>
      {cartUpsale ? (
        <View style={styles.container}>
          {upsales?.map((el, i) => (
            <TouchableOpacity
              onPress={() => onChangeUpsale(el.uidNomenclature)}
              key={i}
              style={[styles.item, el.selected ? styles.item_active : {}]}>
              <Image
                style={styles.iconContainer}
                source={{ uri: 'data:image/png;base64, ' + el?.image }}
              />
              <View>
                <Text style={styles.text}>{el.name}</Text>
                <Text style={styles.text}>{el?.price} сум</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        upsales?.map((el, i) => (
          <TouchableOpacity
            onPress={() => onChangeUpsale(el.uidNomenclature)}
            style={[styles.item2, el.selected ? styles.item_active : {}]}>
            <Image
              source={{ uri: 'data:image/png;base64, ' + el?.image }}
              style={{
                width: 80,
                height: 90,
                resizeMode: 'contain',
              }}
            />
            <View
              style={{
                width: 128,
                justifyContent: 'space-evenly',
                marginHorizontal: 9,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: appStyles.FONT,
                  fontWeight: '400',
                }}>
                {el.name}
              </Text>
              <View
                style={{
                  borderRadius: 100,
                  height: 29,
                  width: 96,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 124, 33, 0.1)',
                }}>
                <Text
                  style={{
                    fontFamily: appStyles.FONT,
                    fontWeight: '600',
                    color: '#FF7C21',
                    fontSize: 12,
                    lineHeight: 11,
                  }}>
                  {el?.price} сум
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    paddingTop: 15,
    flexDirection: 'row',
    paddingBottom: 20,
    flexWrap: 'wrap',
  },

  item: {
    width: 106,
    marginBottom: 10,
    height: 133,
    padding: 9,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
    shadowColor: 'rgba(30, 27, 38, 0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 1,
  },
  item2: {
    width: 221,
    height: 100,
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    margin: 10,
    padding: 5,
  },
  item_active: {
    backgroundColor: 'red',
  },
  iconContainer: {
    width: 57,
    height: 57,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  iconContainer_active: {
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 12,
    fontFamily: appStyles.FONT,
    color: 'rgba(30, 27, 38, 0.5)',
    textAlign: 'center',
  },
  text_active: {
    color: appStyles.FONT_COLOR,
  },
});
