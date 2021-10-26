import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import appStyles from '../../constants/styles';

export default memo(function Divider() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          'rgba(30, 27, 38, 0)',
          'rgba(30, 27, 38, 0.15)',
          'rgba(30, 27, 38, 0)',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.divider}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: appStyles.BACKGROUND_DEFAULT,
    paddingTop: 20,
  },
  divider: {
    height: 1,
    width: 201,
    alignSelf: 'center',
  },
});
