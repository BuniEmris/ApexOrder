import * as React from 'react';
import Svg, {SvgProps, Rect} from 'react-native-svg';

function BarIcon(props: SvgProps) {
  return (
    <Svg {...props} width={20} height={17} viewBox="0 0 20 17" fill="none">
      <Rect width={10} height={3} rx={1.5} fill="#1E1B26" />
      <Rect y={7} width={20} height={3} rx={1.5} fill="#1E1B26" />
      <Rect y={14} width={16} height={3} rx={1.5} fill="#1E1B26" />
    </Svg>
  );
}

export default BarIcon;
