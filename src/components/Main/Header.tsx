import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BarIcon from '../../assets/icons/Bar';
import CallIcon from '../../assets/icons/Call';
import appStyles from '../../constants/styles';
import Row from '../Shared/Row';
import { Linking } from 'react-native';

export default function Header() {
  const phoneNumber = '8712022020';
  const MakeCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  return (
    <Row containerStyle={styles.container}>
      {/* <BarIcon /> */}
      <Text style={styles.name}>apexpizza</Text>
      <TouchableOpacity onPress={MakeCall}>
        <CallIcon />
      </TouchableOpacity>
    </Row>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    paddingHorizontal: appStyles.HORIZONTAL_PADDING,
    backgroundColor: appStyles.BACKGROUND_DEFAULT,
  },
  name: {
    fontSize: 30,
    marginLeft: 90,
    fontFamily: 'Comfortaa-Bold',
    color: appStyles.FONT_COLOR,
  },
});
