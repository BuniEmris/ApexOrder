import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import appStyles from '../../constants/styles';
import { ChildrenType } from '../../utils/types';

type Props = {
  children: ChildrenType;
  blockStyles?: ViewStyle;
};

export default function BlockWrapper({ children, blockStyles }: Props) {
  return <View style={[styles.container, blockStyles]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    minHeight: 70,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: appStyles.HORIZONTAL_PADDING,
    paddingVertical: 10,
    marginBottom: 20,
  },
});
