import React from 'react';
import { StyleSheet, View } from 'react-native';
import HandleIcon from '../../assets/icons/BottomSheetHandle';
import appStyles from '../../constants/styles';

export default function BottomSheetHandle() {
  return (
    <View style={styles.handleContainer}>
      <HandleIcon />
    </View>
  );
}

const styles = StyleSheet.create({
  handleContainer: {
    paddingVertical: 15,
    alignItems: 'center',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: appStyles.BACKGROUND_DEFAULT,
  },
});
