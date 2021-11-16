import React from 'react';
import { memo } from 'react';
import { ImageBackground, Image, StyleSheet } from 'react-native';
import appStyles from '../../constants/styles';
import BackBtn from './BackBtn';

export default memo(function PreviewPhoto({ base64 }: { base64?: string }) {
  return (
    <>
      <ImageBackground
        resizeMode="stretch"
        source={{
          uri: 'data:image/png;base64, ' + base64,
        }}
        style={styles.imageContainer}></ImageBackground>
      <BackBtn />
    </>
  );
});

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    marginTop: 20,
    height: 300,
    width: 300,
    alignContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    position: 'relative',
  },
});
