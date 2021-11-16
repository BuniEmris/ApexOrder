import * as React from 'react';
import Svg, { SvgProps, Rect, Path } from 'react-native-svg';

function CurierIcon(props: SvgProps) {
  return (
    <Svg
      width={50}
      height={50}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect width={50} height={50} rx={10} fill="#F0F0F4" />
      <Path
        d="M14 32c0 4.117 1.941 5 11 5s11-.883 11-5-1.941-5-11-5-11 .883-11 5zM19 19a6 6 0 1012 0 6 6 0 00-12 0z"
        fill="#1E1B26"
        fillOpacity={0.5}
      />
    </Svg>
  );
}

export default CurierIcon;
