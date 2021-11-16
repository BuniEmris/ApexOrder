import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { checkAndGetItemUID } from '.';
import EmptyRadio from '../../../assets/icons/EmptyRadio';
import FullRadio from '../../../assets/icons/FullRadio';
import appStyles from '../../../constants/styles';
import { SettingState } from '../../../utils/types';
import { IGroup, ISauce } from '../../../utils/types/api';

interface Props {
  info: IGroup | ISauce;
  active?: boolean;
  setSelected: SettingState<string>;
}

export default function RadioItem({ info, active, setSelected }: Props) {
  const getName = () => {
    if (info?.Group !== undefined) return info?.Group;
    if (info?.Name !== undefined) return info?.Name;
    return info;
  };

  return (
    <TouchableOpacity
      onPress={() => setSelected(checkAndGetItemUID(info))}
      style={styles.item}>
      {active ? <FullRadio /> : <EmptyRadio />}
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
    width: '50%',
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 9,

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
  item_active: {},
  iconContainer: {
    width: 55,
    height: 55,
    borderRadius: 50,

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
    color: 'rgba(30, 27, 38, 0.5)',
    textAlign: 'center',
  },
  text_active: {
    color: appStyles.FONT_COLOR,
  },
});
