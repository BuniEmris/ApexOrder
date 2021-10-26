import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function ArrowIcon(props: SvgProps) {
  return (
    <Svg {...props} width={9} height={16} viewBox="0 0 9 16" fill="none">
      <Path
        d="M8.707 8.707a1 1 0 000-1.414L2.343.929A1 1 0 00.93 2.343L6.586 8 .929 13.657a1 1 0 101.414 1.414l6.364-6.364zM7 9h1V7H7v2z"
        fill="#1E1B26"
      />
    </Svg>
  );
}

export default ArrowIcon;
