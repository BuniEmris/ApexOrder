import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function InstagramIcon(props: SvgProps) {
  return (
    <Svg {...props} width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 5a5 5 0 015-5h8a5 5 0 015 5v8a5 5 0 01-5 5H5a5 5 0 01-5-5V5zm9 7.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM9 14A5 5 0 109 4a5 5 0 000 10zm5-10a1 1 0 100-2 1 1 0 000 2z"
        fill="#FF7C21"
      />
    </Svg>
  );
}

export default InstagramIcon;
