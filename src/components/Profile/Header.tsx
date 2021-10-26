import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import appStyles from '../../constants/styles';
import BackBtn from '../Shared/BackBtn';

export default function Header({
  text,
  children,
}: {
  text: string;
  children?: JSX.Element;
}) {
  return (
    <View style={styles.header}>
      <BackBtn fixed={false} />
      <Text style={styles.headerText}>{text}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
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
});
