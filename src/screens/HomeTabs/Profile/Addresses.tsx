import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useSelector } from 'react-redux';
import DeleteIcon from '../../../assets/icons/Delete';
import BlockWrapper from '../../../components/Profile/BlockWrapper';
import Header from '../../../components/Profile/Header';
import LoadingIndicator from '../../../components/Shared/LoadingIndicator';
import Row from '../../../components/Shared/Row';
import appStyles from '../../../constants/styles';
import { RootState } from '../../../redux/store';
import { getResource, sendData } from '../../../utils/api';

export interface IAdress {
  street: string;
  lon: number;
  lat: number;
  main: boolean;
}

export default function Addresses() {
  const { phone, name } = useSelector((state: RootState) => state.auth);
  const [addresses, setAddresses] = useState<IAdress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResource<IAdress[]>(`clients?phone=${phone}&Address=true`)
      .then(response => setAddresses(response?.result))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [phone]);

  const handleSwitch = async (idx: number) => {
    const newList = addresses?.map((el, index) => {
      if (index === idx) return { ...el, main: true };
      return { ...el, main: false };
    });
    sendData('clients', {
      phone,
      name,
      addresses: newList,
    })
      .then(() => setAddresses(newList))
      .catch(() => {});
  };

  const handleDelete = async (idx: number) => {
    const newList = addresses?.filter((_, index) => index !== idx);
    sendData('clients', {
      phone,
      name,
      addresses: newList,
    })
      .then(() => setAddresses(newList))
      .catch(() => {});
  };

  return (
    <View style={styles.container}>
      <Header text="Адреса доставки" />

      {loading ? (
        <LoadingIndicator size="large" IndicatorStyle={styles.feetbackMargin} />
      ) : addresses.length ? (
        <SwipeListView
          data={addresses}
          keyExtractor={(_, index) => index.toString()}
          useNativeDriver
          leftOpenValue={60}
          stopLeftSwipe={60}
          disableLeftSwipe
          renderHiddenItem={(data, rowMap) => (
            <TouchableOpacity
              style={styles.deleteBlock}
              onPress={() => {
                if (!data?.item?.main) {
                  handleDelete(data?.index);
                }
                rowMap[data?.index.toString()].closeRow();
              }}>
              <DeleteIcon />
            </TouchableOpacity>
          )}
          renderItem={data => (
            <BlockWrapper blockStyles={styles.blockStyle}>
              <Row>
                <Text style={styles.blockText}>{data?.item?.street}</Text>
                <Switch
                  trackColor={{
                    false: 'rgba(30, 27, 38, 0.1)',
                    true: appStyles.COLOR_PRIMARY,
                  }}
                  disabled={data?.item?.main}
                  onValueChange={() => handleSwitch(data?.index)}
                  value={data?.item?.main}
                />
              </Row>
            </BlockWrapper>
          )}
        />
      ) : (
        <Text style={styles.empty}>Пусто</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: appStyles.HORIZONTAL_PADDING },
  scroll: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    fontFamily: appStyles.FONT,
    color: appStyles.FONT_COLOR,
    fontSize: 24,
    marginLeft: 20,
  },
  deleteBlock: {
    borderRadius: 20,
    height: 70,
    width: 90,
    paddingRight: 20,
    backgroundColor: '#F74A4A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockStyle: {
    justifyContent: 'center',
  },
  blockText: {
    width: '50%',
    fontFamily: appStyles.FONT_REGULAR,
    color: appStyles.FONT_COLOR_SECONDARY,
    fontSize: 14,
  },
  feetbackMargin: {
    marginTop: 50,
  },
  empty: {
    marginTop: 20,
    fontSize: 20,
    fontFamily: appStyles.FONT,
    textAlign: 'center',
  },
});
