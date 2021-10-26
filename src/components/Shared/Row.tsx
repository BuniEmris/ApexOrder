import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { ChildrenType } from '../../utils/types';

type Props = {
  children: ChildrenType;
  containerStyle?: ViewStyle;
};

export default function Row({ children, containerStyle }: Props) {
  return <View style={[styles.row, containerStyle]}>{children}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});
