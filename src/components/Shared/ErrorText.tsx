import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import appStyles from '../../constants/styles';

export default function ErrorText({
  errorTextStyle,
}: {
  errorTextStyle?: TextStyle;
}) {
  return <Text style={[styles.errorText, errorTextStyle]}>Ошибка</Text>;
}

const styles = StyleSheet.create({
  errorText: {
    marginTop: 20,
    fontSize: 20,
    color: 'red',
    fontFamily: appStyles.FONT,
    textAlign: 'center',
  },
});
