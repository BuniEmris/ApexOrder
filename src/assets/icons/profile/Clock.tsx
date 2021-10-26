import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function ClockIcon(props: SvgProps) {
  return (
    <Svg {...props} width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 18c-4.968 0-9-4.023-9-9 0-4.968 4.032-9 9-9 4.977 0 9 4.032 9 9 0 4.977-4.023 9-9 9zm2.87-5.661a.668.668 0 00.927-.234.678.678 0 00-.233-.927L9.36 9.27V5.112a.674.674 0 10-1.35 0v4.545c0 .234.126.45.333.576l3.528 2.106z"
        fill="#1E1B26"
      />
    </Svg>
  );
}

export default ClockIcon;
