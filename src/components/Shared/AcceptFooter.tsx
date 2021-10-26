import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import appStyles from '../../constants/styles';
import { RH, RW } from '../../utils/helpers/responsive';
import LoadingIndicator from './LoadingIndicator';

type PropsType = {
  text: string;
  fixed?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
  loading?: boolean;
};

export default memo(function AcceptFooter({
  text,
  fixed = true,
  onPress,
  children,
  loading = false,
}: PropsType) {
  return (
    <View style={fixed ? styles.acceptContainer_fixed : styles.acceptContainer}>
      {children}
      <TouchableOpacity
        disabled={loading}
        onPress={onPress}
        style={[styles.acceptBtn, fixed && { height: 60 }]}>
        {loading ? (
          <LoadingIndicator colorWhite IndicatorStyle={styles.indicator} />
        ) : (
          <Text style={styles.acceptBtnText}>{text}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  acceptContainer: {
    marginTop: 'auto',
    height: RH(80),
    width: '100%',
    backgroundColor: appStyles.BACKGROUND_DEFAULT,
    paddingVertical: 15,
    paddingHorizontal: appStyles.HORIZONTAL_PADDING,
  },
  acceptContainer_fixed: {
    width: '100%',
    backgroundColor: appStyles.BACKGROUND_DEFAULT,
    paddingVertical: 15,
    paddingHorizontal: appStyles.HORIZONTAL_PADDING,
    position: 'absolute',
    bottom: 0,
    shadowColor: 'rgba(30, 27, 38, 0.05)',
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    elevation: 1,
    shadowOpacity: 1.0,
  },
  acceptBtn: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RW(200),
    backgroundColor: appStyles.COLOR_PRIMARY,
  },
  indicator: {
    marginTop: 0,
  },
  acceptBtnText: {
    color: '#fff',
    fontFamily: appStyles.FONT,
  },
});
