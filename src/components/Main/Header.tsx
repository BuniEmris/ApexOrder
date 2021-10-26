import React from 'react';
import { StyleSheet, Text } from 'react-native';
import BarIcon from '../../assets/icons/Bar';
import CallIcon from '../../assets/icons/Call';
import appStyles from '../../constants/styles';
import Row from '../Shared/Row';

export default function Header() {
  return (
    <Row containerStyle={styles.container}>
      <BarIcon />
      <Text style={styles.name}>apexpizza</Text>
      <CallIcon />
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
    fontFamily: 'Comfortaa-Bold',
    color: appStyles.FONT_COLOR,
  },
});
