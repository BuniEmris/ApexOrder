import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { VibrancyView, BlurView } from '@react-native-community/blur';
import React, { RefObject, useMemo, useState } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ContactIcon from '../../assets/icons/tabs/Contacts';
import appStyles from '../../constants/styles';
import AcceptFooter from '../Shared/AcceptFooter';
import PaddWrapper from '../Shared/PaddWrapper';
import Row from '../Shared/Row';
import cashIcon from '../../assets/icons/basket/cash-icon.png';
import clickIcon from '../../assets/icons/basket/click-icon.png';
import paymeIcon from '../../assets/icons/basket/payme-icon.png';
import therminalIcon from '../../assets/icons/basket/therminal-icon.png';
import BottomSheetHandle from '../Shared/BottomSheetHandle';
import { useQuery } from 'react-query';
import { getResource } from '../../utils/api';
import QueryWrapper from '../Shared/QueryWrapper';
import MySwitchSelector from '../Shared/MySwitchSelector';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  setOrderDate,
  setOrderType,
  setPaymentType,
} from '../../redux/slices/order-slice';
import { NavigationType } from '../../utils/types';
import moment from 'moment';
import { RH, RW } from '../../utils/helpers/responsive';

const paymentsRender = (namePayment: string) => {
  switch (namePayment) {
    case 'Payme':
      return paymeIcon;
    case 'Click':
      return clickIcon;
    case 'Оплата наличными':
      return cashIcon;
    case 'Оплата терминалом':
      return therminalIcon;
    default:
      return cashIcon;
  }
};

type PaymenyType = {
  UIDPayment: string;
  Name: string;
};

type Props = {
  orderPrice: number;
  bottomSheetModalRef: RefObject<BottomSheetModal>;
  closeBottomSheet: () => void;
  navigation: NavigationType;
  order: () => void;
};

export default function BottomSheet({
  orderPrice,
  bottomSheetModalRef,
  closeBottomSheet,
  navigation,
  order,
}: Props) {
  const dispatch = useDispatch();
  const [timePick, setTimePick] = useState(false);
  const { address, orderDate, selectedStructure, orderType, paymentType } =
    useSelector((state: RootState) => state.orderSlice);

  const snapPoints = useMemo(() => [RW(550)], []);

  const {
    data: payments,
    isError,
    isLoading,
  } = useQuery<PaymenyType[]>(['payments', orderType], async () => {
    const response = await getResource<PaymenyType[]>(
      `payments?pickup=${orderType}`,
    );
    return response?.result;
  });

  const changeOrderType = (val: 'false' | 'true') => {
    dispatch(setOrderType(val));
    dispatch(setPaymentType(val));
  };

  const onTimePick = (_: any, selectedDate: any) => {
    setTimePick(Platform.OS === 'ios');
    const currentDate =
      moment(selectedDate).format('YYYYMMDDHHmmss') || orderDate;
    dispatch(setOrderDate(currentDate));
  };

  const selfOrder = orderType === 'true';

  const renderPlace = () => {
    if (selfOrder && selectedStructure?.Structure) {
      return (
        <View style={sheetStyles.locationBlock}>
          <ContactIcon
            opacity={0.5}
            width={15}
            height={18}
            fill={appStyles.FONT_COLOR}
          />
          <Text style={sheetStyles.locationBlockText}>
            {selectedStructure?.Structure}
          </Text>
        </View>
      );
    } else if (address?.street) {
      return (
        <View style={sheetStyles.locationBlock}>
          <ContactIcon
            opacity={0.5}
            width={15}
            height={18}
            fill={appStyles.FONT_COLOR}
          />
          <Text style={sheetStyles.locationBlockText}>{address?.street}</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  const renderPicker = () =>
    Platform.OS === 'ios' ? (
      <>
        <Text style={sheetStyles.labelText}>Время приезда </Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={moment(orderDate, 'YYYYMMDDHHmmss').toDate()}
          mode={'time'}
          is24Hour={true}
          display="spinner"
          textColor={appStyles.COLOR_PRIMARY}
          style={sheetStyles.IOSTimePicker}
          locale="ru-RU"
          onChange={onTimePick}
        />
      </>
    ) : (
      <>
        <Text style={sheetStyles.labelText}>Время приезда </Text>
        <TouchableOpacity
          style={sheetStyles.AndroidTimePicker}
          onPress={() => setTimePick(true)}>
          <Text style={sheetStyles.AndroidTimePickerText}>
            {moment(orderDate, 'YYYYMMDDHHmmss').format('HH:mm')}
          </Text>
        </TouchableOpacity>
        {timePick && (
          <DateTimePicker
            testID="dateTimePicker"
            value={moment(orderDate, 'YYYYMMDDHHmmss').toDate()}
            mode="time"
            is24Hour={true}
            textColor={appStyles.COLOR_PRIMARY}
            locale="ru-RU"
            onChange={onTimePick}
          />
        )}
      </>
    );

  return (
    <BottomSheetModal
      handleComponent={BottomSheetHandle}
      backdropComponent={() =>
        Platform.OS === 'ios' ? (
          <VibrancyView
            blurType="dark"
            style={sheetStyles.gradientBackdrop}
            blurAmount={1}
          />
        ) : (
          <TouchableWithoutFeedback onPress={closeBottomSheet}>
            <BlurView
              style={sheetStyles.gradientBackdrop}
              blurType="dark"
              blurAmount={1}
            />
          </TouchableWithoutFeedback>
        )
      }
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}>
      <BottomSheetScrollView
        contentContainerStyle={sheetStyles.scroll}
        style={sheetStyles.container}
        showsVerticalScrollIndicator={false}>
        <PaddWrapper>
          <Text style={sheetStyles.headText}>Доставка</Text>
          <TouchableOpacity
            onPress={() => {
              closeBottomSheet();
              if (selfOrder) {
                navigation.navigate('contacts', {
                  screen: 'locations',
                  params: { choosing: true },
                });
              } else {
                navigation.navigate('map');
              }
            }}>
            <Row containerStyle={sheetStyles.addingBlock}>
              <Text style={sheetStyles.addingBlockText}>
                {selfOrder
                  ? 'Указать локацию самовывоза'
                  : 'Добавить адрес доставки'}
              </Text>
              <View style={sheetStyles.addingBlockBtn}>
                <ContactIcon fill="#fff" />
              </View>
            </Row>
          </TouchableOpacity>

          {renderPlace()}

          <MySwitchSelector
            options={[
              { label: 'Доставка', value: 'false' },
              { label: 'Самовывоз', value: 'true' },
            ]}
            selectFunc={changeOrderType}
            switchStyle={sheetStyles.switch}
            value={orderType}
          />

          {selfOrder && renderPicker()}

          <Text style={sheetStyles.labelText}>Cпособ оплаты</Text>
        </PaddWrapper>

        <QueryWrapper isLoading={isLoading} isError={isError}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={sheetStyles.paymentTypeContainer}
            contentContainerStyle={sheetStyles.paymentTypeConentContainer}>
            {payments?.map((payment, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => dispatch(setPaymentType(payment?.UIDPayment))}
                style={[
                  sheetStyles.paymentTypeItem,
                  paymentType === payment?.UIDPayment &&
                    sheetStyles.paymentTypeContainer_active,
                ]}>
                <Image source={paymentsRender(payment?.Name)} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </QueryWrapper>
      </BottomSheetScrollView>
      <AcceptFooter text="ОФОРМИТЬ ЗАКАЗ" onPress={order}>
        <Row>
          <Text style={sheetStyles.labelText}>Стоимость заказа</Text>
          <Text style={sheetStyles.labelText}>{orderPrice} сум</Text>
        </Row>
      </AcceptFooter>
    </BottomSheetModal>
  );
}

const sheetStyles = StyleSheet.create({
  gradientBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    flex: 1,
    backgroundColor: appStyles.BACKGROUND_DEFAULT,
  },
  scroll: {
    paddingBottom: RH(150),
  },
  headText: {
    fontSize: RW(20),
    fontFamily: appStyles.FONT,
    color: appStyles.FONT_COLOR,
    marginBottom: RH(20),
  },
  addingBlock: {
    height: RH(60),
    borderWidth: RW(0.5),
    borderRadius: RW(20),
    borderColor: appStyles.FONT_COLOR_SECONDARY,
    marginBottom: RH(20),
  },
  addingBlockText: {
    color: appStyles.COLOR_PRIMARY,
    fontSize: RW(16),
    fontFamily: appStyles.FONT,
    marginLeft: RW(20),
  },
  addingBlockBtn: {
    width: RW(60),
    height: RH(60),
    borderRadius: RW(20),
    backgroundColor: appStyles.COLOR_PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationBlock: {
    width: '100%',
    height: RH(60),
    borderWidth: RW(0.5),
    borderRadius: RW(20),
    borderColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: RH(20),
    paddingHorizontal: RH(20),
  },
  locationBlockText: {
    marginLeft: RW(20),
    color: appStyles.FONT_COLOR,
    fontFamily: appStyles.FONT,
    fontSize: RW(14),
    width: RW(175),
    opacity: 0.5,
  },
  switch: {
    marginBottom: RH(20),
  },
  IOSTimePicker: {
    height: RH(130),
    borderColor: appStyles.COLOR_PRIMARY,
    borderWidth: 1,
    borderRadius: RW(10),
    marginBottom: RH(20),
  },
  AndroidTimePickerText: {
    color: appStyles.FONT_COLOR,
    fontSize: 16,
    fontFamily: appStyles.FONT,
  },
  AndroidTimePicker: {
    height: RH(50),
    borderColor: appStyles.COLOR_PRIMARY,
    borderWidth: 1,
    borderRadius: RW(10),
    marginBottom: RH(20),
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 16,
    fontFamily: appStyles.FONT,
    color: appStyles.FONT_COLOR,
    marginBottom: RH(20),
  },
  paymentTypeContainer: {
    width: '100%',
    backgroundColor: appStyles.BACKGROUND_DEFAULT,
  },
  paymentTypeContainer_active: {
    backgroundColor: appStyles.COLOR_PRIMARY,
  },
  paymentTypeConentContainer: {
    paddingHorizontal: RW(15),
  },
  paymentTypeItem: {
    paddingVertical: RH(10),
    paddingHorizontal: RW(19),
    backgroundColor: '#F2F2F4',
    borderRadius: RW(200),
    marginHorizontal: RH(5),
  },
});
