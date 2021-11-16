import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MinusIcon from '../../../assets/icons/Minus';
import PayIcon from '../../../assets/icons/Play';
import PlusIcon from '../../../assets/icons/Plus';
import BottomSheet from '../../../components/Basket/BottomSheetModal';
import ScrollLayoutWithBtn from '../../../components/Layouts/ScrollLayoutWithBtn';
import PaddWrapper from '../../../components/Shared/PaddWrapper';
import Row from '../../../components/Shared/Row';
import appStyles from '../../../constants/styles';
import {
  decrementProduct,
  incrementProduct,
  refreshOrderState,
  setAddress,
} from '../../../redux/slices/order-slice';
import { RootState } from '../../../redux/store';
import { getResource, sendData } from '../../../utils/api';
import { NavigationType } from '../../../utils/types';
import { setFromBasket } from '../../../redux/slices/auth-slice';
import { IAdress } from '../Profile/Addresses';
import { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native-gesture-handler';
import SauceAdd from '../../../components/Basket/SauceAdd';
import UpsaleItem from '../../../components/Shared/TypePicker/UpsaleItem';

export default function Orders({
  navigation,
  route,
}: {
  navigation: NavigationType;
  route: { params: { openingSheet: boolean } };
}) {
  const dispatch = useDispatch();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { openingSheet } = route?.params;
  const {
    products,
    address,
    sauces,
    upsales,
    orderDate,
    selectedStructure,
    orderType,
    paymentType,
  } = useSelector((state: RootState) => state.orderSlice);

  const { phone, isSignedIn, name } = useSelector(
    (state: RootState) => state.auth,
  );
  const openBottomSheet = () => {
    if (isSignedIn) {
      bottomSheetModalRef.current?.present();
    } else {
      dispatch(setFromBasket(true));
      navigation.navigate('auth-phone');
    }
  };

  const closeBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  useEffect(() => {
    if (openingSheet) openBottomSheet();

    getResource<IAdress[]>(`clients?phone=${phone}&Address=true`)
      .then(response => {
        const adressesArray = response?.result;
        if (adressesArray.length) {
          const main = adressesArray?.find(el => el.main);
          if (main) dispatch(setAddress(main));
        }
      })
      .catch(() => {});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openingSheet]);

  const orderPrice = useMemo(() => {
    return (
      products?.reduce((acc, curr) => {
        return acc + curr.Amount * curr.Price;
      }, 0) +
      15000 +
      sauces?.reduce((acc, curr) => {
        return acc + curr.Amount * curr.Price;
      }, 0) +
      upsales?.reduce((acc, curr) => {
        return curr.selected ? acc + curr.price : acc;
      }, 0)
    );
  }, [products, sauces, upsales]);

  const order = async () => {
    if (!paymentType) {
      showMessage({
        message: 'Ошибка',
        description: 'Выберите тип оплаты!',
        type: 'danger',
      });
      return;
    }

    if (orderType === 'true' && !selectedStructure) {
      showMessage({
        message: 'Ошибка',
        description: 'Выберите ближайший филиал!',
        type: 'danger',
      });
      return;
    }

    if (orderType === 'false' && !address) {
      showMessage({
        message: 'Ошибка',
        description: 'Выберите адресс!',
        type: 'danger',
      });
      return;
    }

    sendData('clients', {
      phone,
      name,
      addresses: [{ ...address, main: true }],
    })
      .then(() => {})
      .catch(() => {});

    const goods = products
      .concat(
        sauces
          .filter(el => el.Amount !== 0)
          .map(el => ({
            UIDProduct: el.UIDNomenclature,
            Amount: el.Amount,
            Price: el.Price,
            Key: '',
          })),
      )
      .concat(
        upsales
          .filter(el => el.selected)
          .map(el => ({
            ...el,
            Amount: 1,
            UIDProduct: el.uidNomenclature,
            Price: el.price,
            Key: '',
          })),
      );
    console.log(goods, 'goodsUPSALEEEEEEEE111');

    const orderBody = {
      Goods: goods,
      UIDPayment: paymentType,
      Pickup: orderType,
      Address: address,
      Phone: phone,
      PickupTime: orderDate,
      // PickupTime: moment(orderDate).format('YYYYMMDDHHmmss'),
      UIDStructure: selectedStructure?.UIDStructure,
    };
    sendData('orders', orderBody)
      .then(res => {
        closeBottomSheet();
        dispatch(refreshOrderState());
        navigation.navigate('OrderTab', {
          screen: 'order',
          params: { UID: res?.result },
        });
      })
      .catch(err => Alert.alert(err.message));
  };

  return (
    <>
      <ScrollLayoutWithBtn
        onBtnPress={() => {
          products.length ? openBottomSheet() : navigation.navigate('home');
        }}
        // onBtnPress={() => {
        //   NativeModules.ActivityStarterModule.navigateToMap();
        // }}
        btnText={
          'ОФОРМИТЬ ЗА' + (products.length ? ` ${orderPrice} сум` : 'КАЗ')
        }>
        <PaddWrapper>
          <View style={styles.container}>
            {/* <MyOrders /> */}

            <Row containerStyle={styles.header}>
              <Text style={styles.title}>Корзина</Text>
              <PayIcon />
            </Row>
            {!!products.length && (
              <>
                <View style={styles.listContainer}>
                  {products.map((el, i) => (
                    <Row key={i} containerStyle={styles.item}>
                      <Image
                        style={styles.itemImage}
                        source={{ uri: 'data:image/png;base64, ' + el?.Image }}
                      />
                      <View style={styles.itemBody}>
                        <Text style={styles.name}>{el.Product}</Text>
                        <Text style={styles.price}>{el?.Price} сум</Text>
                      </View>
                      <View style={styles.itemActions}>
                        <MinusIcon
                          color="#F0F0F4"
                          onPress={() => dispatch(decrementProduct(i))}
                        />
                        <Text style={styles.itemActionsNumber}>
                          {el.Amount}
                        </Text>
                        <PlusIcon
                          color="#F0F0F4"
                          onPress={() => dispatch(incrementProduct(i))}
                        />
                      </View>
                    </Row>
                  ))}
                </View>

                <Row containerStyle={styles.row}>
                  <Text style={styles.name}>Доставка</Text>
                  <Text style={styles.sum}>15 000 сум</Text>
                </Row>
              </>
            )}
          </View>
        </PaddWrapper>

        <View style={styles.upsaleContainer}>
          <Text style={styles.addItemHeader}>Добавить к заказу?</Text>
          <ScrollView
            style={{ paddingLeft: 10 }}
            horizontal
            showsHorizontalScrollIndicator={false}>
            <UpsaleItem />
          </ScrollView>
        </View>

        {!!products.length && <SauceAdd />}
      </ScrollLayoutWithBtn>
      <BottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        orderPrice={orderPrice}
        navigation={navigation}
        closeBottomSheet={closeBottomSheet}
        order={order}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    marginTop: 32,
    paddingBottom: 20,
    borderBottomColor: appStyles.FONT_COLOR_SECONDARY,
    borderBottomWidth: 0.2,
  },
  row: {
    marginVertical: 10,
  },
  title: {
    fontFamily: appStyles.FONT,
    fontSize: 20,
    color: appStyles.FONT_COLOR,
  },
  listContainer: {
    borderBottomColor: appStyles.FONT_COLOR_SECONDARY,
    borderBottomWidth: 0.2,
    paddingVertical: 10,
    marginBottom: 10,
  },
  addItemHeader: {
    fontFamily: appStyles.FONT,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    color: '#1E1B26',
    marginVertical: 12,
    marginHorizontal: 20,
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
    width: 96,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F4',
    borderRadius: 100,
  },
  upsaleContainer: {
    width: '100%',
    backgroundColor: '#F0F0F4',
    paddingBottom: 10,
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
