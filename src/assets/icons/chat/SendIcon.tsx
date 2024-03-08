import * as React from 'react';
import {memo} from 'react';
import Svg, {
  ClipPath,
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
  SvgProps,
} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path fill="url(#b)" d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2 .01 7Z" />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={3.25}
        x2={29.046}
        y1={12}
        y2={14.293}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.25} stopColor="#6465FF" />
        <Stop offset={0.818} stopColor="#985CFF" />
      </LinearGradient>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
const SendIcon = memo(SvgComponent);
export default SendIcon;
