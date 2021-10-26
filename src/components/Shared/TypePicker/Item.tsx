import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { checkAndGetItemUID } from '.';
import appStyles from '../../../constants/styles';
import { SettingState } from '../../../utils/types';
import { IGroup, ISauce } from '../../../utils/types/api';

interface Props {
  info: IGroup | ISauce;
  active?: boolean;
  setSelected: SettingState<string>;
}

export default function Item({ info, active, setSelected }: Props) {
  const getName = () => {
    if (info?.Group !== undefined) return info?.Group;
    if (info?.Name !== undefined) return info?.Name;
    return info;
  };

  return (
    <TouchableOpacity
      onPress={() => setSelected(checkAndGetItemUID(info))}
      style={[styles.item, active ? styles.item_active : {}]}>
      <View
        style={[
          styles.iconContainer,
          active ? styles.iconContainer_active : {},
        ]}>
        <Image
          style={styles.image}
          source={{ uri: 'data:image/png;base64,' + info?.Image }}
        />
      </View>
      <Text style={[styles.text, active ? styles.text_active : {}]}>
        {getName()}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
  },
  item: {
    minHeight: 116,
    width: 73,
    alignItems: 'center',
    padding: 9,
    backgroundColor: '#fff',
    borderRadius: 100,
    marginHorizontal: 5,
    shadowColor: 'rgba(30, 27, 38, 0.04)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 20,
    shadowOpacity: 1.0,
    elevation: 1,
  },
  item_active: {
    backgroundColor: appStyles.COLOR_PRIMARY,
  },
  iconContainer: {
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: '#F2F2F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  iconContainer_active: {
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 12,
    fontFamily: appStyles.FONT,
    color: appStyles.FONT_COLOR,
    textAlign: 'center',
  },
  text_active: {
    color: '#fff',
  },
});
