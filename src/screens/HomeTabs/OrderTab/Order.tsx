import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BackBtn from '../../../components/Shared/BackBtn';
import CustomBottomSheet from '../../../components/Shared/CustomBottomSheet';
import PaddWrapper from '../../../components/Shared/PaddWrapper';
import HandleWithImg from '../../../components/Basket/HandleWithImg';
import BlockWrapper from '../../../components/Profile/BlockWrapper';
import Row from '../../../components/Shared/Row';
import appStyles from '../../../constants/styles';
import CallIcon from '../../../assets/icons/Call';
import StepIndicator from 'react-native-step-indicator';
import CheckedIcon from '../../../assets/icons/CheckedIcon';
import { BubblesLoader } from 'react-native-indicator';
import { useQuery } from 'react-query';
import { getResource } from '../../../utils/api';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { IOrder } from '../../../utils/types/api';
import { NavigationType } from '../../../utils/types';
import CurierIcon from '../../../assets/icons/CurierIcon';
import OperatorIcon from '../../../assets/icons/OperatorIcon';
import ArrowBackIcon from '../../../assets/icons/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { setCurrentOrders } from '../../../redux/slices/order-slice';

const labels = ['Принято', 'Готовится', 'Доставка', 'Завершен'];
const customStyles = {
  stepIndicatorSize: 26,
  currentStepIndicatorSize: 34,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 2,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: appStyles.COLOR_PRIMARY,
  stepStrokeUnFinishedColor: '#D8D7DA',
  separatorFinishedColor: appStyles.COLOR_PRIMARY,
  separatorUnFinishedColor: '#D8D7DA',
  stepIndicatorFinishedColor: appStyles.COLOR_PRIMARY,
  stepIndicatorUnFinishedColor: '#D8D7DA',
  stepIndicatorCurrentColor: appStyles.COLOR_PRIMARY,
  stepIndicatorLabelFontSize: 12,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: appStyles.FONT_COLOR_SECONDARY,
  labelSize: 10,
  currentStepLabelColor: appStyles.FONT_COLOR,
};

export default function Order({
  route,
  navigation,
}: {
  route: { params: { UID: string } };
  navigation: NavigationType;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const { UID } = route.params;

  const { data: order } = useQuery<IOrder>(
    ['user-orders', UID],
    async () => {
      const response = await getResource<IOrder>('orders?UIDOrder=' + UID);
      return response.result;
    },
    { enabled: !!UID, refetchInterval: 10000 },
  );
  const phoneNumber = '8712022020';
  const MakeCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const renderStepIndicator = useCallback(
    ({ stepStatus }: { position: number; stepStatus: string }) => {
      if (stepStatus === 'current') {
        return <BubblesLoader color="#fff" size={17} dotRadius={4} />;
      } else if (stepStatus === 'unfinished') {
        return <View style={styles.unfinishedStepIndicator} />;
      } else {
        return <CheckedIcon />;
      }
    },
    [],
  );

  const stepKeyVal = useMemo(
    () => ({
      Новый: 0,
      Готовится: 1,
      Надоставке: 2,
      Завершен: 3,
    }),
    [],
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setCurrentStep(stepKeyVal[order?.State || 'Новый']);
  }, [order, stepKeyVal]);
  console.log(order?.State, 'steeep22222');
  console.log(currentStep, 'steeep22111111');
  const { phone } = useSelector((state: RootState) => state.auth);
  const backHistoryOrder = async () => {
    const response = await getResource('orders?phone=' + phone);
    dispatch(setCurrentOrders(response?.result));
    navigation.navigate('orders');
  };
  return (
    <View style={styles.container}>
      <View style={styles.mapBackground}>
        <TouchableOpacity style={styles.backBtn} onPress={backHistoryOrder}>
          <ArrowBackIcon />
        </TouchableOpacity>
        {/* <BackBtn fixed /> */}
      </View>
      <CustomBottomSheet handleComponent={<HandleWithImg />}>
        <ScrollView>
          <>
            <View style={styles.timeBlock}>
              <Text style={styles.timeText}>{order?.Time}</Text>
            </View>
            <View style={{ marginBottom: 25 }}>
              <StepIndicator
                customStyles={customStyles}
                currentPosition={currentStep}
                stepCount={4}
                labels={labels}
                renderStepIndicator={renderStepIndicator}
              />
            </View>
            <PaddWrapper>
              {currentStep === 0 || currentStep === 1 ? (
                <BlockWrapper>
                  {order?.Goods?.map((good, i) => (
                    <Row key={i} containerStyle={styles.goodRow}>
                      <Text style={styles.blockText}>{good.Nomenclature}</Text>
                      <Text style={styles.blockText}>x{good.Amount}</Text>
                    </Row>
                  ))}
                </BlockWrapper>
              ) : (
                <>
                  <BlockWrapper blockStyles={styles.courierBlock}>
                    <Row>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <CurierIcon />
                        <View style={{ marginLeft: 10 }}>
                          <Text style={styles.curierName}>
                            {order?.Courier}
                          </Text>
                          <Text style={styles.courierWork}>
                            {order?.carDetails}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          Linking.openURL(
                            `tel:${order?.CourierPhone.split(' ')}`,
                          )
                        }>
                        <CallIcon
                          fill={
                            order?.Courier ? appStyles.COLOR_PRIMARY : '#BBBBBE'
                          }
                        />
                      </TouchableOpacity>
                    </Row>
                  </BlockWrapper>
                  <BlockWrapper blockStyles={styles.courierBlock}>
                    <Row>
                      <OperatorIcon />
                      <View>
                        <Text style={styles.curierName}>Колл-центр</Text>
                      </View>
                      <TouchableOpacity onPress={MakeCall}>
                        <CallIcon
                          fill={
                            order?.Courier ? appStyles.COLOR_PRIMARY : '#BBBBBE'
                          }
                        />
                      </TouchableOpacity>
                    </Row>
                  </BlockWrapper>
                </>
              )}
            </PaddWrapper>
          </>
        </ScrollView>
      </CustomBottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapBackground: {
    height: 230,
    backgroundColor: '#ccc',
    marginBottom: -10,
  },
  timeBlock: {
    alignItems: 'center',
    marginBottom: 25,
  },
  timeText: {
    fontFamily: appStyles.FONT_REGULAR,
    color: appStyles.FONT_COLOR,
    fontSize: 20,
  },
  unfinishedStepIndicator: {
    width: 6,
    height: 6,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  goodRow: {
    marginVertical: 10,
  },
  blockText: {
    fontFamily: appStyles.FONT,
    color: appStyles.FONT_COLOR,
    fontSize: 16,
  },
  courierBlock: {
    height: 80,
    justifyContent: 'center',
    shadowColor: 'rgba(30, 27, 38, 0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 1,
  },
  curierNameScleton: {
    width: 93,
    height: 13,
    borderRadius: 18,
    backgroundColor: 'rgba(30, 27, 38, 0.3)',
  },
  courierWorkScleton: {
    backgroundColor: 'rgba(30, 27, 38, 0.2)',
    marginTop: 7,
    width: 41,
  },
  curierName: {
    marginBottom: 7,
    fontFamily: appStyles.FONT,
    color: appStyles.FONT_COLOR,
    fontSize: 14,
  },
  courierWork: {
    fontFamily: appStyles.FONT_REGULAR,
    color: appStyles.FONT_COLOR_SECONDARY,
    fontSize: 14,
  },
  unactive: {
    opacity: 0.5,
  },
  backBtn: {
    zIndex: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    shadowColor: 'rgba(30, 27, 38, 0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 1,
    position: 'absolute',
    top: 20,
    left: 20,
  },
});
//   <View style={styles.curierNameScleton} />
// <View
//   style={[
//     styles.curierNameScleton,
//     styles.courierWorkScleton,
//   ]}
// />
//  <BlockWrapper>
//           <Text>Оцените нас</Text>

//           <TouchableOpacity
//             onPress={() => navigation.navigate('home-tabs')}>
//             <Text>Отзыв</Text>
//           </TouchableOpacity>
//         </BlockWrapper>
