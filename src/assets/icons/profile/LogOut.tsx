import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function LogOutIcon(props: SvgProps) {
  return (
    <Svg {...props} width={21} height={20} viewBox="0 0 21 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.979 9.23a.775.775 0 00-.792.77c0 .42.35.77.792.77h6.17v4.78c0 2.45-2.047 4.45-4.576 4.45H4.565C2.046 20 0 18.01 0 15.56V4.45C0 1.99 2.056 0 4.576 0h5.017c2.509 0 4.555 1.99 4.555 4.44v4.79h-6.17zm9.838-2.69l2.95 2.91A.76.76 0 0121 10c0 .2-.08.4-.232.54l-2.951 2.91a.788.788 0 01-.546.23.793.793 0 01-.556-.23.767.767 0 010-1.09l1.617-1.59h-4.184V9.23h4.184l-1.617-1.59a.767.767 0 010-1.09.777.777 0 011.102-.01z"
        fill="#FF7C21"
      />
    </Svg>
  );
}

export default LogOutIcon;
