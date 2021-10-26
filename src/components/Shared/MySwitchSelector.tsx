import React, { useLayoutEffect, useState } from 'react';
import { ViewStyle } from 'react-native';
import SwitchSelector, {
  ISwitchSelectorOption,
} from 'react-native-switch-selector';
import appStyles from '../../constants/styles';

type Props = {
  options: ISwitchSelectorOption[];
  selectFunc: (val: any) => void;
  switchStyle: ViewStyle;
  value: string;
  byLabel?: boolean;
};

export default function MySwitchSelector({
  selectFunc,
  options,
  switchStyle,
  value,
  byLabel = false,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useLayoutEffect(() => {
    const index = options?.findIndex(el =>
      byLabel ? el.label === value : el.value === value,
    );
    setSelectedIndex(index || 0);
  }, [options, value, byLabel]);

  console.log(selectedIndex);

  return (
    <SwitchSelector
      selectedColor="#fff"
      textColor={appStyles.FONT_COLOR_SECONDARY}
      buttonColor={appStyles.COLOR_PRIMARY}
      hasPadding
      height={50}
      style={switchStyle}
      borderColor="transparent"
      valuePadding={5}
      options={options}
      value={selectedIndex}
      initial={selectedIndex}
      onPress={(val: string) => selectFunc(val)}
    />
  );
}
