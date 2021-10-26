import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function BasketIcon(props: SvgProps) {
  return (
    <Svg width={20} height={21} viewBox="0 0 20 21" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.07 5.25a.513.513 0 00.047-.237h.028C15.025 2.211 12.641 0 9.742 0c-2.9 0-5.283 2.211-5.404 5.013a.661.661 0 000 .237H5.93a.662.662 0 000-.237C5.93 3 7.618 1.367 9.7 1.367c2.08 0 3.768 1.633 3.768 3.646a.663.663 0 00.047.237h1.555zm3.477 3.276l.832 6.505C19.99 19.27 17.534 21 14.235 21H5.267C1.959 21-.575 19.806.113 15.03l.842-6.504c.43-2.388 1.912-3.276 3.298-3.276H15.24c1.367 0 2.801.955 3.308 3.276zm-11.951.22a.956.956 0 110 1.91.956.956 0 010-1.91zm5.306.955a.956.956 0 101.911-.001.956.956 0 00-1.91 0z"
        {...props}
      />
    </Svg>
  );
}

export default BasketIcon;
