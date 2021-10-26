import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { useDispatch, useSelector } from 'react-redux';
import appStyles from '../../constants/styles';
import { setCode } from '../../redux/slices/auth-slice';
import { RootState } from '../../redux/store';
import UserInfoLayout from '../../components/Layouts/UserInfoLayout';
import { RH } from '../../utils/helpers/responsive';

export type PhoneComponentProps = {
  navigation: any;
};

export default function Code({ navigation }: PhoneComponentProps) {
  const handleNextStep = () => navigation.push('auth-name');
  const onBackPress = () => navigation.goBack();
  const dispatch = useDispatch();
  const { code } = useSelector((state: RootState) => state.auth);

  const pinRef = useRef(null);

  const handlingCode = (val: string) => {
    dispatch(setCode(val));
    if (val === '1234') handleNextStep();
  };

  return (
    <UserInfoLayout handleNextStep={handleNextStep} onBackPress={onBackPress}>
      <Text style={styles.textContainer}>
        <Text style={styles.text1}>Введите </Text>
        <Text style={[styles.text1, styles.text2]}>код</Text>
      </Text>
      <View style={styles.subTextContainer}>
        <Text style={styles.subText}>
          Введите 4-значный код, который мы отправили на
        </Text>
        <Text style={[styles.subText, styles.subTextNumber]}>
          +998 92 6542198
        </Text>
      </View>

      <SmoothPinCodeInput
        ref={pinRef}
        value={code}
        onTextChange={handlingCode}
        cellStyle={styles.input}
        cellStyleFocused={styles.input_focused}
        textStyle={styles.inputText}
        textStyleFocused={styles.inputText_focused}
        containerStyle={styles.inputContainer}
        cellSpacing={10}
        restrictToNumbers
        autoFocus
      />
    </UserInfoLayout>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
    marginTop: RH(100),
    textAlign: 'center',
  },
  text1: {
    fontFamily: appStyles.FONT_BOLDER,
    color: appStyles.FONT_COLOR,
    fontSize: 24.7,
  },
  text2: {
    color: appStyles.COLOR_PRIMARY,
  },
  subTextContainer: {
    alignItems: 'center',
    marginTop: RH(11),
  },
  subText: {
    width: 155,
    lineHeight: 18,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: appStyles.FONT_REGULAR,
    color: appStyles.FONT_COLOR_SECONDARY,
  },
  subTextNumber: {
    lineHeight: 18,
    textAlign: 'center',
    fontFamily: appStyles.FONT_BOLDER,
    color: appStyles.FONT_COLOR_SECONDARY,
  },
  inputContainer: {
    marginTop: RH(110),
    width: '100%',
  },
  input: {
    height: RH(60),
    width: RH(60),
    borderColor: 'rgba(30, 27, 38, 0.15)',
    borderWidth: 1,
    borderRadius: 10,
  },
  inputText: {
    fontFamily: appStyles.FONT,
    fontSize: 16,
    color: appStyles.FONT_COLOR,
    textAlign: 'center',
  },
  input_focused: {
    borderColor: appStyles.COLOR_PRIMARY,
    borderWidth: 2,
  },
  inputText_focused: {
    color: appStyles.COLOR_PRIMARY,
  },
});
