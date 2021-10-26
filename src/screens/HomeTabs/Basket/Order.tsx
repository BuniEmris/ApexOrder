import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
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

const labels = ['Принято', 'Готовится', 'Доставка', 'Complete'];
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
      НаДоставку: 2,
      Завершен: 3,
    }),
    [],
  );

  useEffect(() => {
    setCurrentStep(stepKeyVal[order?.State || 'Новый']);
  }, [order, stepKeyVal]);

  return (
    <View style={styles.container}>
      <View style={styles.mapBackground}>
        <BackBtn fixed />
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
              <BlockWrapper>
                {order?.Goods?.map((good, i) => (
                  <Row key={i} containerStyle={styles.goodRow}>
                    <Text style={styles.blockText}>{good.Nomenclature}</Text>
                    <Text style={styles.blockText}>x{good.Amount}</Text>
                  </Row>
                ))}
              </BlockWrapper>

              <BlockWrapper blockStyles={styles.courierBlock}>
                <Row>
                  <View>
                    <View style={styles.curierNameScleton} />
                    <View
                      style={[
                        styles.curierNameScleton,
                        styles.courierWorkScleton,
                      ]}
                    />

                    {/* <Text style={styles.curierName}>{order?.Courier}</Text>
                    <Text style={styles.courierWork}>
                      {order?.CourierPhone}
                    </Text> */}
                  </View>
                  <CallIcon
                    fill={order?.Courier ? appStyles.COLOR_PRIMARY : '#BBBBBE'}
                  />
                </Row>
              </BlockWrapper>

              <BlockWrapper>
                <Text>Оцените нас</Text>

                <TouchableOpacity
                  onPress={() => navigation.navigate('home-tabs')}>
                  <Text>Отзыв</Text>
                </TouchableOpacity>
              </BlockWrapper>
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
    justifyContent: 'center',
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
});
