import * as React from 'react';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';
import {memo} from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Circle
      cx={10.614}
      cy={6.671}
      r={4.38}
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.667 17.143a2.03 2.03 0 0 1 .201-.89c.42-.839 1.603-1.283 2.584-1.485a15.38 15.38 0 0 1 2.148-.302 22.956 22.956 0 0 1 4.02 0c.722.05 1.44.152 2.147.302.982.202 2.165.604 2.585 1.485a2.08 2.08 0 0 1 0 1.788c-.42.88-1.603 1.283-2.585 1.476-.707.158-1.425.262-2.147.31a23.67 23.67 0 0 1-3.273.051c-.252 0-.495 0-.747-.05a14.14 14.14 0 0 1-2.14-.31c-.99-.194-2.164-.596-2.592-1.477a2.089 2.089 0 0 1-.201-.898Z"
      clipRule="evenodd"
    />
  </Svg>
);
const PersonIcon = memo(SvgComponent);
export default PersonIcon;
