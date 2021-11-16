import React from 'react';
import { View } from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

export default function RadioTypePicker({ itemList, setSelected, selected }) {
  return (
    <View>
      <RadioForm formHorizontal={true} animation={true}>
        {itemList.map((el, i) => (
          <RadioButton labelHorizontal={true} key={i}>
            <RadioButtonLabel
              obj={el}
              index={i}
              onPress={setSelected}
              labelStyle={{ fontSize: 20, color: '#2ecc71' }}
              labelWrapStyle={{}}
            />
            <RadioButtonInput
              obj={el}
              index={i}
              isSelected={selected}
              onPress={setSelected}
              borderWidth={1}
              buttonInnerColor={'#e74c3c'}
              buttonOuterColor={selected === i ? '#2196f3' : '#000'}
              buttonSize={20}
              buttonOuterSize={80}
              buttonStyle={{}}
              buttonWrapStyle={{ marginLeft: 10 }}
            />
          </RadioButton>
        ))}
      </RadioForm>
    </View>
  );
}
