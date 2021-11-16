import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function OrderIcon(props: SvgProps) {
  return (
    <Svg
      {...props}
      width={24}
      height={19}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 2.976c0 .639.358 1.329.973 1.5 4.366 1.214 5.841 4.675 6.01 9.524.02.552-.43 1-.983 1H3a.974.974 0 01-.983-1c.169-4.849 1.644-8.31 6.01-9.524.615-.171.973-.861.973-1.5C9 1.333 10.343 0 12 0s3 1.333 3 2.976zm-3 .977c.567 0 1-.452 1-.977A.988.988 0 0012 2c-.567 0-1 .452-1 .976 0 .525.433.977 1 .977z"
        {...props}
      />
      <Path d="M1.5 16a1.5 1.5 0 000 3h21a1.5 1.5 0 00.002-3H1.5z" {...props} />
    </Svg>
  );
}

export default OrderIcon;
