import * as React from 'react';
import {memo} from 'react';
import Svg, {Circle, Path, SvgProps} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={19} height={22} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 7.667a5 5 0 0 0-10 0c0 5.833-2.5 7.5-2.5 7.5h15S14 13.5 14 7.667M10.442 18.5a1.667 1.667 0 0 1-2.884 0"
    />
    <Circle
      cx={14.5}
      cy={4.5}
      r={3.5}
      fill="#02E9FE"
      stroke="#524CE0"
      strokeWidth={2}
    />
  </Svg>
);
const NotifyIcon = memo(SvgComponent);
export default NotifyIcon;
