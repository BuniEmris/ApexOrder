import * as React from 'react';
import Svg, { SvgProps, Circle, Rect } from 'react-native-svg';

function PlusIcon(props: SvgProps) {
  return (
    <Svg width={26} height={26} viewBox="0 0 26 26" fill="none" {...props}>
      <Circle cx={13} cy={13} r={13} fill="#1E1B26" fillOpacity={0.1} />
      <Rect x={8} y={12} width={10} height={2} rx={1} fill="#BAB8BC" />
      <Rect
        x={14}
        y={8}
        width={10}
        height={2}
        rx={1}
        transform="rotate(90 14 8)"
        fill="#BAB8BC"
      />
    </Svg>
  );
}

export default PlusIcon;
