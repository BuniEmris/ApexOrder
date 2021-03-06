import * as React from 'react';
import Svg, { SvgProps, Rect, Path } from 'react-native-svg';

function OperatorIcon(props: SvgProps) {
  return (
    <Svg
      width={50}
      height={50}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect width={50} height={50} rx={10} fill="#F0F0F4" />
      <Path
        d="M18.445 14.996c-1.429 1.225-2.229 4.452-2.407 6.57C13.576 21.832 13 22.992 13 26.5c0 3.49.57 4.656 3.002 4.93A5 5 0 0021 36.5h1a1 1 0 100-2h-1a3 3 0 01-3-3v-.006c3.278-.084 4-1.069 4-4.994 0-3.904-.714-4.9-3.947-4.993.176-1.578.783-4.212 1.694-4.993 1.117-.958 2.842-1.514 5.22-1.514 2.38 0 4.124.55 5.259 1.509.923.78 1.542 3.415 1.72 4.998C28.715 21.6 28 22.597 28 26.5c0 4.117.794 5 4.5 5s4.5-.883 4.5-5c0-3.508-.577-4.668-3.039-4.934-.18-2.134-.999-5.363-2.445-6.585C29.893 13.61 27.62 13 24.966 13c-2.654 0-4.913.617-6.521 1.996z"
        fill="#1E1B26"
        fillOpacity={0.5}
      />
    </Svg>
  );
}

export default OperatorIcon;
