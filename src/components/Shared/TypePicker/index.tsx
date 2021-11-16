import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Item from './Item';

// import waterImg from '../../../assets/image/categories/water.png';
// import snackImg from '../../../assets/image/categories/snack.png';
// import dessertImg from '../../../assets/image/categories/dessert.png';
import appStyles from '../../../constants/styles';
import { IGroup, ISauce } from '../../../utils/types/api';
import RadioItem from './RadioItem';

type itemsType = IGroup[] | ISauce[] | string[] | undefined;

type Props = {
  itemList: itemsType;
  radio: boolean;

  setSelected: (val: string) => void;
  selected: string;
};

export const checkAndGetItemUID = (item: IGroup | ISauce | string) => {
  if (!item) return '';
  if (typeof item === 'string') return item;
  if ('UIDGroup' in item) return item.UIDGroup;
  if ('UIDNomenclature' in item) return item.UIDNomenclature;
  return '';
};

export default function TypePicker({
  itemList,
  radio,

  selected,
  setSelected,
}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}>
      {radio
        ? itemList?.map((el, i) => (
            <RadioItem
              key={i}
              info={el}
              active={checkAndGetItemUID(el) === selected}
              setSelected={setSelected}
            />
          ))
        : itemList?.map((el, i) => (
            <Item
              key={i}
              info={el}
              active={checkAndGetItemUID(el) === selected}
              setSelected={setSelected}
            />
          ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: appStyles.BACKGROUND_DEFAULT,
    paddingTop: 20,
    paddingBottom: 20,
  },
  content: { paddingHorizontal: 15 },
});
