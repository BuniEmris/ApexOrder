import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function FacebookIcon(props: SvgProps) {
  return (
    <Svg {...props} width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M0 9.999a10.005 10.005 0 008.437 9.879v-6.99H5.9v-2.89h2.54v-2.2a3.528 3.528 0 013.773-3.9c.75.013 1.5.08 2.24.2v2.46h-1.264a1.446 1.446 0 00-1.628 1.563v1.878h2.771l-.443 2.89h-2.328v6.989A10 10 0 100 9.998z"
        fill="#FF7C21"
      />
    </Svg>
  );
}

export default FacebookIcon;
