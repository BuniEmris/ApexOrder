import * as React from 'react';
import Svg, {SvgProps, Rect} from 'react-native-svg';

function PlusIcon(props: SvgProps) {
  return (
    <Svg {...props} width={22} height={22} viewBox="0 0 22 22" fill="none">
      <Rect y={10} width={22} height={2} rx={1} fill="#fff" />
      <Rect
        x={12}
        width={22}
        height={2}
        rx={1}
        transform="rotate(90 12 0)"
        fill="#fff"
      />
    </Svg>
  );
}

export default PlusIcon;
