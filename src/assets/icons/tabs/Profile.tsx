import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function ProfileIcon(props: SvgProps) {
  return (
    <Svg width={17} height={21} viewBox="0 0 17 21" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.959 5.556A5.538 5.538 0 018.4 11.112a5.539 5.539 0 01-5.559-5.556A5.538 5.538 0 018.4 0a5.537 5.537 0 015.559 5.556zM8.4 21C3.845 21 0 20.26 0 17.404c0-2.857 3.87-3.571 8.4-3.571 4.556 0 8.4.74 8.4 3.596C16.8 20.286 12.93 21 8.4 21z"
        {...props}
      />
    </Svg>
  );
}

export default ProfileIcon;
