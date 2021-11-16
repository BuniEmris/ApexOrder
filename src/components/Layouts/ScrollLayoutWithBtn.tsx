import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ChildrenType } from '../../utils/types';
import AcceptFooter from '../Shared/AcceptFooter';

type PropTypes = {
  children: ChildrenType;
  btnText: string;
  onBtnPress?: () => void;
};

export default function ScrollLayoutWithBtn({
  children,
  btnText,
  onBtnPress,
}: PropTypes) {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        contentInsetAdjustmentBehavior="automatic">
        {children}
      </ScrollView>

      <AcceptFooter fixed text={btnText} onPress={onBtnPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 106,
  },
});
