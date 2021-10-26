import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import appStyles from '../../constants/styles';
import { setPhone } from '../../redux/slices/auth-slice';
import { RootState } from '../../redux/store';
import { NavigationType } from '../../utils/types';
import UserInfoLayout from '../../components/Layouts/UserInfoLayout';
import { RH } from '../../utils/helpers/responsive';

export type PhoneComponentProps = {
  navigation: NavigationType;
};

export default function Phone({ navigation }: PhoneComponentProps) {
  const dispatch = useDispatch();
  const { phone } = useSelector((state: RootState) => state.auth);

  const handleNextStep = () => navigation.push('auth-code');
  const goBack = () => navigation.goBack();

  return (
    <UserInfoLayout handleNextStep={handleNextStep} onBackPress={goBack}>
      <Text style={styles.textContainer}>
        <Text style={styles.text1}>Для оформления заказа</Text>
        <Text style={[styles.text1, styles.text2]}> нужен ваш телефон</Text>
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>+998</Text>
        <View style={styles.inputDivider} />
        <TextInput
          keyboardType="numeric"
          onChangeText={text => dispatch(setPhone(text))}
          defaultValue={phone}
          style={[styles.inputText, styles.input]}
        />
      </View>
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
  inputContainer: {
    marginTop: RH(110),
    height: RH(70),
    flexDirection: 'row',
    borderColor: 'rgba(30, 27, 38, 0.15)',
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputText: {
    fontFamily: appStyles.FONT,
    fontSize: 16,
    color: appStyles.FONT_COLOR,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  inputDivider: {
    height: RH(42),
    width: 0.5,
    backgroundColor: appStyles.FONT_COLOR_SECONDARY,
    marginHorizontal: appStyles.HORIZONTAL_PADDING,
  },
});
