import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CencelIcon from '../../assets/icons/Cencel';
import appStyles from '../../constants/styles';
import { ChildrenType } from '../../utils/types';
import AcceptFooter from '../Shared/AcceptFooter';
import PaddWrapper from '../Shared/PaddWrapper';

type PropsType = {
  children: ChildrenType;
  handleNextStep: () => void;
  onBackPress: () => void;
};

export default function UserInfoLayout({
  children,
  handleNextStep,
  onBackPress,
}: PropsType) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onBackPress} style={styles.backCircle}>
          <CencelIcon />
        </TouchableOpacity>

        <PaddWrapper>{children}</PaddWrapper>

        <AcceptFooter fixed={false} onPress={handleNextStep} text="Далее" />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backCircle: {
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 40,
    height: 40,
    position: 'absolute',
    top: appStyles.HORIZONTAL_PADDING,
    left: appStyles.HORIZONTAL_PADDING,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});
