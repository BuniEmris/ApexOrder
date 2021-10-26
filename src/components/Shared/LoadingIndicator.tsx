import React from 'react';
import { ViewStyle } from 'react-native';
import { ActivityIndicator, StyleSheet } from 'react-native';
import appStyles from '../../constants/styles';

type Props = {
  size?: number | 'small' | 'large' | undefined;
  IndicatorStyle?: ViewStyle;
  colorWhite?: boolean;
};

export default function LoadingIndicator({
  colorWhite = false,
  size = 'small',
  IndicatorStyle,
}: Props) {
  return (
    <ActivityIndicator
      style={[styles.container, IndicatorStyle]}
      size={size}
      color={colorWhite ? '#fff' : appStyles.COLOR_PRIMARY}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignSelf: 'center',
  },
});
