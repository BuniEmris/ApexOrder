import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LogOutIcon from '../../../assets/icons/profile/LogOut';
import AnimatedInput from '../../../components/Profile/AnimatedInput';
import Header from '../../../components/Profile/Header';
import appStyles from '../../../constants/styles';
import { logOut, setName, setPhone } from '../../../redux/slices/auth-slice';
import { RootState } from '../../../redux/store';
import { sendData } from '../../../utils/api';
import { NavigationType } from '../../../utils/types';

export default function Settings({
  navigation,
}: {
  navigation: NavigationType;
}) {
  const dispatch = useDispatch();
  const { phone, name } = useSelector((state: RootState) => state.auth);
  const [newName, setNewName] = useState(name);
  const [newPhone, setNewPhone] = useState(phone);

  const handlingPhoneText = (text: string) => {
    if (text.length === 7) {
    }
    setNewPhone(text);
  };

  const saveUser = () => {
    const body = {
      newName,
      newPhone,
    };
    sendData('clients', body)
      .then(() => {
        dispatch(setName(newName));
        dispatch(setPhone(newPhone));
      })
      .then(() => navigation.navigate('profile', { screen: 'user' }))
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>
      <Header text="Настройки">
        <Text style={[styles.exitText, styles.mlAuto]} onPress={saveUser}>
          Сохранить
        </Text>
      </Header>

      <AnimatedInput text={newName} setText={setNewName} labelText="Имя" />
      <AnimatedInput
        text={newPhone}
        setText={handlingPhoneText}
        labelText="Телефон"
      />
      <TouchableOpacity
        style={styles.exitRow}
        onPress={() => {
          dispatch(logOut());
          navigation.navigate('profile', { screen: 'user' });
        }}>
        <LogOutIcon />
        <Text style={styles.exitText}>Выход</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: appStyles.HORIZONTAL_PADDING },
  inputContainer: {
    marginVertical: 14,
    height: 70,
    flexDirection: 'row',
    borderColor: 'rgba(30, 27, 38, 0.15)',
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'relative',
  },
  labelText: {
    fontFamily: appStyles.FONT,
    fontSize: 16,
    color: 'rgba(30, 27, 38, 0.15)',
    backgroundColor: appStyles.BACKGROUND_DEFAULT,
    paddingHorizontal: 2,
    zIndex: -10,
    position: 'absolute',
    left: 20,
  },
  exitRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exitText: {
    marginLeft: 10,
    color: appStyles.COLOR_PRIMARY,
    fontFamily: appStyles.FONT,
    fontSize: 16,
  },
  mlAuto: {
    marginLeft: 'auto',
  },
});
