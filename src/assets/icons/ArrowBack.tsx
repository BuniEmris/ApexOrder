import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function ArrowBackIcon(props: SvgProps) {
  return (
    <Svg
      {...props}
      style={{marginRight: 2}}
      width={9}
      height={16}
      viewBox="0 0 9 16"
      fill="none">
      <Path
        d="M.293 7.293a1 1 0 000 1.414l6.364 6.364a1 1 0 001.414-1.414L2.414 8l5.657-5.657A1 1 0 006.657.93L.293 7.293zM2 7H1v2h1V7z"
        fill="#1E1B26"
      />
    </Svg>
  );
}

export default ArrowBackIcon;
