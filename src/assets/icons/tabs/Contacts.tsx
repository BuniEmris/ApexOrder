import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function ContactIcon(props: SvgProps) {
  return (
    <Svg {...props} width={19} height={22} viewBox="0 0 19 22" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 9.15C0 4.09 4.235 0 9.358 0c5.137 0 9.372 4.09 9.372 9.15 0 2.55-.929 4.916-2.457 6.923a24.294 24.294 0 01-6.105 5.655c-.536.35-1.02.376-1.607 0a23.828 23.828 0 01-6.104-5.655C.927 14.066 0 11.699 0 9.15zm6.274.285c0 1.695 1.385 3.028 3.084 3.028 1.7 0 3.098-1.333 3.098-3.028 0-1.682-1.398-3.08-3.098-3.08a3.097 3.097 0 00-3.084 3.08z"
        {...props}
      />
    </Svg>
  );
}

export default ContactIcon;
