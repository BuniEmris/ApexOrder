import * as React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';

function CallIcon(props: SvgProps) {
  return (
    <Svg
      width={33}
      height={33}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={16.5} cy={16.5} r={16.5} fill="#30DF2C" />
      <Path
        d="M21.125 18.284c-.504-.108-.902.126-1.255.33-.361.21-1.049.768-1.443.625-2.016-.83-3.913-2.595-4.734-4.62-.145-.402.41-1.094.62-1.46.202-.353.43-.756.326-1.263-.094-.456-1.315-2.01-1.747-2.435-.285-.28-.576-.435-.876-.46-1.126-.048-2.383 1.454-2.604 1.814-.552.766-.55 1.786.01 3.022 1.346 3.322 6.439 8.334 9.772 9.731.616.288 1.178.432 1.684.432.494 0 .934-.138 1.313-.412.285-.164 1.85-1.484 1.808-2.64-.025-.295-.179-.59-.456-.875-.421-.436-1.965-1.694-2.418-1.789z"
        fill="#fff"
      />
    </Svg>
  );
}

export default CallIcon;
