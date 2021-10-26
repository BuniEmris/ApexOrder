import * as React from 'react';
import Svg, {SvgProps, Rect} from 'react-native-svg';

function HandleIcon(props: SvgProps) {
  return (
    <Svg {...props} width={30} height={4} viewBox="0 0 30 4" fill="none">
      <Rect width={30} height={4} rx={2} fill="#1E1B26" fillOpacity={0.2} />
    </Svg>
  );
}

export default HandleIcon;
