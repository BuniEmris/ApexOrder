import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function CencelIcon(props: SvgProps) {
  return (
    <Svg {...props} width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        d="M7.293 7.293a1 1 0 000 1.414l6.364 6.364a1 1 0 001.414-1.414L9.414 8l5.657-5.657A1 1 0 0013.657.93L7.293 7.293zM9 7H8v2h1V7z"
        fill="#1E1B26"
      />
      <Path
        d="M8.707 8.707a1 1 0 000-1.414L2.343.929A1 1 0 00.93 2.343L6.586 8 .929 13.657a1 1 0 101.414 1.414l6.364-6.364zM7 9h1V7H7v2z"
        fill="#1E1B26"
      />
    </Svg>
  );
}

export default CencelIcon;
