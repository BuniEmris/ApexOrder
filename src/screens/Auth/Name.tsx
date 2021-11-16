import React from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import appStyles from '../../constants/styles';
import {
  setFromBasket,
  setIsSignedIn,
  setName,
} from '../../redux/slices/auth-slice';
import { RootState } from '../../redux/store';
import UserInfoLayout from '../../components/Layouts/UserInfoLayout';
import { sendData } from '../../utils/api';
import { RH } from '../../utils/helpers/responsive';

export type PhoneComponentProps = {
  navigation: any;
};

export default function Name({ navigation }: PhoneComponentProps) {
  const dispatch = useDispatch();
  const { name, phone, fromBasket } = useSelector(
    (state: RootState) => state.auth,
  );

  const handlePrevStep = () => navigation.goBack();

  const endingAuthorization = () => {
    const body = {
      name,
      phone,
    };
    sendData('clients', body)
      .then(() => {
        dispatch(setIsSignedIn(true));
        if (fromBasket) {
          navigation.navigate('basket', {
            screen: 'orders',
            params: {
              openingSheet: true,
            },
          });
          dispatch(setFromBasket(false));
        } else {
          navigation.navigate('home');
        }
      })
      .catch(err => Alert.alert(err));
  };

  return (
    <UserInfoLayout
      handleNextStep={endingAuthorization}
      onBackPress={handlePrevStep}>
      <Text style={styles.textContainer}>
        <Text style={styles.text1}>Как вас </Text>
        <Text style={[styles.text1, styles.text2]}>зовут?</Text>
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          defaultValue={name}
          onChangeText={text => dispatch(setName(text))}
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
  input: {
    flex: 1,
    height: '100%',
    fontFamily: appStyles.FONT,
    fontSize: 16,
    color: appStyles.FONT_COLOR,
  },
});
