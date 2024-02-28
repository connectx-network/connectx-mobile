import * as React from 'react';
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import {memo} from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg width={31} height={30} fill="none" {...props}>
    <Path
      fill="url(#a)"
      d="M29 .394 0 15.608l10.875 3.804 3.625 11.41L29 .395Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={14.5}
        x2={14.5}
        y1={0.394}
        y2={30.823}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#6465FF" />
        <Stop offset={1} stopColor="#8E5EFF" />
      </LinearGradient>
    </Defs>
  </Svg>
);
const AutoCurrentIcon = memo(SvgComponent);
export default AutoCurrentIcon;
