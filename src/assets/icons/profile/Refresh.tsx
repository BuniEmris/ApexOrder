import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function RefreshIcon(props: SvgProps) {
  return (
    <Svg {...props} width={19} height={20} viewBox="0 0 19 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.733 10.75A.743.743 0 0116 10c0-2.72-.644-4.387-1.579-5.377C13.506 3.655 11.995 3 9.5 3s-4.006.655-4.921 1.623c-.391.415-.732.948-.995 1.627-.168.433-.567.75-1.032.75-.652 0-1.143-.605-.927-1.22C2.745 2.593 5.37 1 9.5 1c5.667 0 8.5 3 8.5 9 0 .42-.346.75-.766.75h-.501zm-1.058 2.189c.014-.057.11-.047.11.012 0 .027.022.049.049.049h.814c.55 0 .962.508.791 1.03C16.358 17.343 13.711 19 9.5 19 3.833 19 1 16 1 10c0-.42.346-.75.766-.75h.501c.409 0 .733.342.733.75 0 2.72.644 4.387 1.579 5.377C5.494 16.345 7.005 17 9.5 17s4.006-.655 4.921-1.623c.535-.567.976-1.356 1.254-2.438z"
        fill="#FF7C21"
      />
      <Path
        d="M1.739 1.75v4.5h4.435M17.261 18.25v-4.5h-4.435"
        stroke="#FF7C21"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default RefreshIcon;
