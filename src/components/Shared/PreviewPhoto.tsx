import React from 'react';
import { memo } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import appStyles from '../../constants/styles';
import BackBtn from './BackBtn';

export default memo(function PreviewPhoto({ base64 }: { base64?: string }) {
  return (
    <ImageBackground
      resizeMode="stretch"
      source={{
        uri: 'data:image/png;base64, ' + base64,
      }}
      style={styles.imageContainer}>
      <BackBtn />
    </ImageBackground>
  );
});

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    height: appStyles.SCREEN_WIDTH,
    backgroundColor: '#ccc',
    position: 'relative',
  },
});
