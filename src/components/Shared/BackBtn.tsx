import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { memo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import ArrowBackIcon from '../../assets/icons/ArrowBack';
import { NavigationType } from '../../utils/types';

export default memo(function BackBtn({ fixed = true }: { fixed?: boolean }) {
  const navigation = useNavigation<NavigationType>();

  const goBack = () => navigation.goBack();

  return (
    <TouchableOpacity
      style={[styles.backBtn, fixed ? styles.fixed : {}]}
      onPress={goBack}>
      <ArrowBackIcon />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  backBtn: {
    zIndex: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    shadowColor: 'rgba(30, 27, 38, 0.04)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 1,
  },
  fixed: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
});
