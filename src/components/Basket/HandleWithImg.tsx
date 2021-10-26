import React, { memo } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import dishImg from '../../assets/image/dish.png';
import { RH, RW } from '../../utils/helpers/responsive';

export default memo(function () {
  return (
    <View style={styles.container}>
      <View style={styles.whiteCircle}>
        <Image source={dishImg} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    position: 'relative',
    marginBottom: RH(82),
    backgroundColor: 'transparent',
  },
  whiteCircle: {
    position: 'absolute',
    width: RW(123),
    height: RH(123),
    borderRadius: RW(60),
    backgroundColor: '#fff',
    transform: [{ translateY: RH(-61.5) }],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
