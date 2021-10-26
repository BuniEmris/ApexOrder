import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import appStyles from '../../constants/styles';

type PropTypes = {
  children: React.ReactNode;
  styleWrapper?: ViewStyle;
};

export default function PaddWrapper({ children, styleWrapper }: PropTypes) {
  return <View style={[styles.wrapper, styleWrapper]}>{children}</View>;
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: appStyles.HORIZONTAL_PADDING,
    width: '100%',
  },
});
