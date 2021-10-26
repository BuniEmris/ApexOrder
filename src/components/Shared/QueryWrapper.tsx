import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { ChildrenType } from '../../utils/types';
import ErrorText from './ErrorText';
import LoadingIndicator from './LoadingIndicator';

type Props = {
  children: ChildrenType;
  isLoading: boolean;
  isError?: boolean;
  errorTextStyle?: TextStyle;
  IndicatorStyle?: ViewStyle;
  indicatorSize?: number | 'small' | 'large' | undefined;
};

export default function QueryWrapper({
  children,
  isLoading,
  isError,
  errorTextStyle,
  IndicatorStyle,
  indicatorSize,
}: Props) {
  if (isLoading) {
    return (
      <LoadingIndicator size={indicatorSize} IndicatorStyle={IndicatorStyle} />
    );
  }

  if (isError) {
    return <ErrorText errorTextStyle={errorTextStyle} />;
  }

  return <>{children}</>;
}
