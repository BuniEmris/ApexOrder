import React from 'react';
import { StyleSheet, View } from 'react-native';
import appStyles from '../../constants/styles';
import { ChildrenType } from '../../utils/types';

interface IProps {
  children: ChildrenType;
  handleComponent?: JSX.Element;
}

export default function CustomBottomSheet({
  children,
  handleComponent,
}: IProps) {
  return (
    <View style={styles.container}>
      {handleComponent}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    flex: 1,
    backgroundColor: appStyles.BACKGROUND_DEFAULT,
  },
});
