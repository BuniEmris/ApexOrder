import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function CheckedIcon(props: SvgProps) {
  return (
    <Svg {...props} width={12} height={9} viewBox="0 0 12 9" fill="none">
      <Path
        d="M1.707 4.293A1 1 0 00.293 5.707l1.414-1.414zm10-2.586A1 1 0 0010.293.293l1.414 1.414zM3.293 7.293L2.586 8l.707-.707zm-3-1.586L2.586 8 4 6.586 1.707 4.293.293 5.707zM5.414 8l6.293-6.293L10.293.293 4 6.586 5.414 8zM2.586 8a2 2 0 002.828 0L4 6.586 2.586 8z"
        fill="#fff"
      />
    </Svg>
  );
}

export default CheckedIcon;
