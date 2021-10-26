import React, { useLayoutEffect, useRef } from 'react';
import { StyleSheet, View, Animated, TextInput } from 'react-native';
import appStyles from '../../constants/styles';
import { SettingState } from '../../utils/types';

type Props = {
  setText: SettingState<string> | ((text: string) => void);
  text: string;
  labelText: string;
};

export default function AnimatedInput({ setText, text, labelText }: Props) {
  const labelAnimation = useRef(new Animated.Value(0)).current;

  const focusing = (focusingVal?: boolean) => {
    Animated.timing(labelAnimation, {
      toValue: focusingVal ? -35 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useLayoutEffect(() => {
    if (text) focusing(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!text]);

  return (
    <View style={styles.inputContainer}>
      <Animated.Text
        style={[
          styles.labelText,
          { transform: [{ translateY: labelAnimation }] },
        ]}>
        {labelText}
      </Animated.Text>
      <TextInput
        style={styles.input}
        onFocus={() => {
          if (!text) focusing(true);
        }}
        onBlur={() => {
          if (!text) focusing(false);
        }}
        defaultValue={text}
        onChangeText={setText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 14,
    height: 70,
    flexDirection: 'row',
    borderColor: 'rgba(30, 27, 38, 0.15)',
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'relative',
  },
  labelText: {
    fontFamily: appStyles.FONT,
    fontSize: 16,
    color: 'rgba(30, 27, 38, 0.15)',
    backgroundColor: appStyles.BACKGROUND_DEFAULT,
    paddingHorizontal: 2,
    zIndex: -10,
    position: 'absolute',
    left: 20,
  },
  input: {
    width: '100%',
    height: '100%',
  },
});
