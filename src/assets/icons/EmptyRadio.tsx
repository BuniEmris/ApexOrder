import * as React from 'react';
import Svg, { SvgProps, Circle } from 'react-native-svg';

function EmptyRadio(props: SvgProps) {
  return (
    <Svg
      width={22}
      height={22}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={11} cy={11} r={10} stroke="#C4C4C4" strokeWidth={2} />
    </Svg>
  );
}

export default EmptyRadio;
