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
  buttonselected: ViewStyle;
  value: string;
  byLabel?: boolean;
};

export default function MySwitchSelector({
  selectFunc,
  options,
  switchStyle,
  value,
  buttonselected,
  byLabel = false,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(1);

  useLayoutEffect(() => {
    const index = options?.map(el =>
      byLabel ? el.label === value : el.value === value,
    );
    setSelectedIndex(index || 1);
  }, [options, value, byLabel]);

  return (
    <SwitchSelector
      selectedColor="#1E1B26"
      textColor="rgba(30, 27, 38, 0.5)"
      selectedTextStyle="#1E1B26"
      buttonColor={appStyles.SWITCHSELECTOR_BTN}
      backgroundColor={appStyles.SWITCHSELECTOR_BG}
      borderRadius={10}
      hasPadding
      height={50}
      style={switchStyle}
      borderColor="transparent"
      valuePadding={5}
      options={options}
      selectedTextContainerStyle={buttonselected}
      value={selectedIndex}
      initial={selectedIndex}
      onPress={(val: string) => selectFunc(val)}
    />
  );
}
